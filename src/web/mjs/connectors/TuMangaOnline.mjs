import Connector from '../engine/Connector.mjs';

/**
 *
 */
export default class TuMangaOnline extends Connector {

    /**
     *
     */
    constructor() {
        super();
        // Public members for usage in UI (mandatory)
        super.id = 'tumangaonline';
        super.label = 'TuMangaOnline';
        this.tags = [ 'manga', 'spanish' ];
        super.isLocked = false;
        // Private members for internal usage only (convenience)
        this.url = 'https://tmofans.com';
        this.requestOptions.headers.set( 'x-referer', this.url );
        // Private members for internal use that can be configured by the user through settings menu (set to undefined or false to hide from settings menu!)
        this.config = undefined;
    }

    /**
     *
     */
    _initializeConnector() {
        let domains = [
            this.url
            //'https://img1.tumangaonline.me'
        ];
        let promises = domains.map( domain => {
            /*
             * sometimes cloudflare bypass will fail, because chrome successfully loads the page from its cache
             * => append random search parameter to avoid caching
             */
            let uri = new URL( domain );
            uri.searchParams.set( 'ts', Date.now() );
            uri.searchParams.set( 'rd', Math.random() );
            let request = new Request( uri.href, this.requestOptions );
            return Engine.Request.fetchUI( request, '', 25000 );
        } );
        return Promise.all( promises );
    }

    /**
     *
     */
    _getMangaListFromPages( mangaPageLinks, index ) {
        if( index === undefined ) {
            index = 0;
        }
        return this.wait( 0 )
            .then ( () => this.fetchDOM( mangaPageLinks[ index ], 'div.row div.element a', 5 ) )
            .then( data => {
                let mangaList = data.map( element => {
                    // use title attribute to avoid cf-mail decryption
                    return {
                        id: this.getRelativeLink( element ),
                        title: element.querySelector( 'h4' ).title.trim()
                    };
                } );
                if( mangaList.length > 0 && index < mangaPageLinks.length - 1 ) {
                    return this._getMangaListFromPages( mangaPageLinks, index + 1 )
                        .then( mangas => mangas.concat( mangaList ) );
                } else {
                    return Promise.resolve( mangaList );
                }
            } );
    }

    /**
     *
     */
    _getMangaList( callback ) {
        Promise.resolve( 800 )
            .then( pageCount => {
                let pageLinks = [...( new Array( pageCount ) ).keys()].map( page => this.url + '/library?order_item=alphabetically&order_dir=asc&page=' + ( page + 1 ) );
                return this._getMangaListFromPages( pageLinks );
            } )
            .then( data => {
                callback( null, data );
            } )
            .catch( error => {
                console.error( error, this );
                callback( error, undefined );
            } );
    }

    /**
     *
     */
    _getChapterList( manga, callback ) {
        this.fetchDOM( this.url + manga.id, 'div.chapters ul.list-group li.list-group-item.p-0' )
            .then( data => {
                let chapterList = data.reduce( ( accumulator, element ) => {
                    let title = element.querySelector( 'h4  a[role="button"]' ).text;
                    let chapters = [...element.querySelectorAll( 'ul.chapter-list li.list-group-item:not([style])' )].map( element => {
                        let id = element.querySelector( 'div.text-right a' );
                        let language = element.querySelector( 'i.flag-icon' );
                        let scanlator = element.querySelector( 'div.text-truncate a' ).text.trim();
                        scanlator = ( scanlator ? ' [' + scanlator + ']' : '' );
                        return {
                            id: this.getRelativeLink( id ).replace( /paginated[\/]?\d*$/, '/cascade' ),
                            title: title.replace( manga.title, '' ).trim() + scanlator,
                            language: language.className.match( /flag-icon-([a-z]+)/ )[1]
                        };
                    } );
                    return accumulator.concat( chapters );
                }, [] );
                callback( null, chapterList );
            } )
            .catch( error => {
                console.error( error, manga );
                callback( error, undefined );
            } );
    }

    /**
     *
     */
    _getPageList( manga, chapter, callback ) {
        let request = new Request( this.url + chapter.id, this.requestOptions );
        fetch( request )
            .then( response => {
                if( !response.redirected ) {
                    throw new Error( 'No redirect detected ...' + response.url );
                }
                request = new Request( response.url.replace( /paginated[\/]?\d*$/, 'cascade' ), this.requestOptions );
                return this.fetchDOM( request, 'div.viewer-image-container source' );
            } )
            .then( data => {
                let pageList = data.map( element => this.getAbsolutePath( element, request.url ) );
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
    }
}