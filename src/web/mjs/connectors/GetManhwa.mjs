import Connector from '../engine/Connector.mjs';

/**
 *
 */
export default class GetManhwa extends Connector {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'getmanhwa';
        super.label = 'GetManhwa';
        this.tags = [ 'webtoon', 'english' ];
        this.url = 'https://www.getmanhwa.com';
    }

    /**
     *
     */
    _getMangaFromURI( uri ) {
        let request = new Request( uri.href, this.requestOptions );
        return this.fetchDOM( request, 'div.elementor-widget-container h2.elementor-heading-title' )
            .then( data => {
                let id = uri.pathname + uri.search;
                let title = data[0].innerText.trim();
                return Promise.resolve( new Manga( this, id, title ) );
            } );
    }

    /**
     *
     */
    _getMangaListFromPages( mangaPageLinks, index ) {
        index = index || 0;
        let request = new Request( mangaPageLinks[ index ], this.requestOptions );
        return this.fetchDOM( request, 'section.elementor-hidden-tablet.elementor-hidden-phone div.make-column-clickable-elementor h2.elementor-heading-title', 5 )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element.closest( 'div.make-column-clickable-elementor' ).dataset.columnClickable, request.url ),
                        title: element.innerText.replace( /[\r\n\t]/g, '' ).trim()
                    };
                } );
                if( index < mangaPageLinks.length - 1 ) {
                    return this._getMangaListFromPages( mangaPageLinks, index + 1 )
                        .then( mangas => mangaList.concat( mangas ) );
                } else {
                    return Promise.resolve( mangaList );
                }
            } );
    }

    /**
     *
     */
    _getMangaList( callback ) {
        let pageLinks = [ 'romance', 'drama', 'comedy', 'fantasy', 'action', 'bl', 'school-life' ].map( genre => this.url + '/g-' + genre + '/' );
        this._getMangaListFromPages( pageLinks )
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
        let request = new Request( this.url + manga.id, this.requestOptions );
        this.fetchDOM( request, 'section.elementor-section-boxed div.make-column-clickable-elementor h2.elementor-heading-title' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element.closest( 'div.make-column-clickable-elementor' ).dataset.columnClickable, request.url ),
                        title: element.innerText.replace( manga.title, '' ).trim(),
                        language: ''
                    };
                } )
                    .filter( chapter => chapter.title.toLowerCase() !== 'read' );
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
        this.fetchDOM( request, 'article.single-page-article div.elementor-image source' )
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