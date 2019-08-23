import Connector from '../engine/Connector.mjs';

/**
 *
 */
export default class HeavenManga2 extends Connector {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'heavenmanga2';
        super.label = 'HeavenManga';
        this.tags = [ 'manga', 'spanish' ];
        this.url = 'http://heavenmanga.com';
    }

    /**
     *
     */
    _initializeConnector() {
        /*
         * sometimes cloudflare bypass will fail, because chrome successfully loads the page from its cache
         * => append random search parameter to avoid caching
         */
        let uri = new URL( this.url );
        uri.searchParams.set( 'ts', Date.now() );
        uri.searchParams.set( 'rd', Math.random() );
        let request = new Request( uri.href, this.requestOptions );
        /*
         * website sometimes loads infinity (because of broken image links)
         * => always resolve
         */
        return Engine.Request.fetchUI( request, '' )
            .catch( error => Promise.resolve() );
    }

    /**
     *
     */
    _getMangaList( callback ) {
        let request = new Request( this.url, this.requestOptions );
        this.fetchDOM( request, 'div#mamain ul.holder li a' )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element, request.url ),
                        title: element.text.trim()
                    };
                } );
                callback( null, mangaList );
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
        let request = new Request( this.url + manga.id, this.requestOptions );
        this.fetchDOM( request, 'div#mamain ul.manga_episodios li a' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element, request.url ),
                        title: element.text.replace( manga.title, '' ).trim(),
                        language: ''
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
        let request = new Request( this.url + chapter.id, this.requestOptions );
        this.fetchDOM( request, 'div#cp.ad a#l' )
            .then( data => {
                let uri = this.getAbsolutePath( data[0], request.url );
                return this.fetchDOM( new Request( uri, this.requestOptions ), 'div.pagenav div.chaptercontrols select option' );
            } )
            .then( data => {
                let pageList = data.map( element => this.createConnectorURI( this.getAbsolutePath( element.value, request.url ) ) );
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
    }

    /**
     *
     */
    _handleConnectorURI( payload ) {
        let request = new Request( payload, this.requestOptions );
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        return this.fetchDOM( request, 'source#p' )
            .then( data => super._handleConnectorURI( this.getAbsolutePath( data[0], request.url ) ) );
    }
}