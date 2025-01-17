import Connector from '../engine/Connector.mjs';

/**
 *
 */
export default class YesMangasBR extends Connector { // extends MangaHost ?

    /**
     *
     */
    constructor() {
        super();
        // Public members for usage in UI (mandatory)
        super.id = 'yesmangasbr';
        super.label = 'YesMangasBR';
        this.tags = [ 'manga', 'portuguese' ];
        super.isLocked = false;
        // Private members for internal usage only (convenience)
        this.url = 'https://yesmangasbr.com';
        // Private members for internal use that can be configured by the user through settings menu (set to undefined or false to hide from settings menu!)
        this.config = undefined;
    }

    /**
     *
     */
    _getMangaListFromPages( mangaPageLinks, index ) {
        if( index === undefined ) {
            index = 0;
        }
        return this.wait( 0 )
            .then ( () => this.fetchDOM( mangaPageLinks[ index ], 'div#mangas div.two.columns h3 a.button', 5 ) )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: this.getRelativeLink( element ),
                        title: element.text.trim()
                    };
                } );
                if( index < mangaPageLinks.length - 1 ) {
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
        this.fetchDOM( this.url + '/mangas', 'div#mangas div.pagination a.last' )
            .then( data => {
                let pageCount = parseInt( data[0].href.match( /(\d+)$/ )[1] );
                let pageLinks = [...( new Array( pageCount ) ).keys()].map( page => this.url + '/mangas/page/' + ( page + 1 ) );
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
        this.fetchDOM( this.url + manga.id, 'div#capitulos div a.button' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: this.getRelativeLink( element ),
                        title: element.title.replace( /^Ler\s+Online\s+-\s+/, '' ).trim(),
                        language: 'pt'
                    };
                } );
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
        fetch( this.url + chapter.id, this.requestOptions )
            .then( response => {
                if( response.status !== 200 ) {
                    throw new Error( `Failed to receive page list (status: ${response.status}) - ${response.statusText}` );
                }
                return response.text();
            } )
            .then( data => {
                let pageList = [];
                let match = undefined;
                let regex = new RegExp( /<img\s+id='img_\d+'\s+src='(.*?)'/g);
                // eslint-disable-next-line no-cond-assign
                while( match = regex.exec( data ) ) {
                    pageList.push( match[1] );
                }
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
    }
}