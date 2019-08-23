import Connector from '../engine/Connector.mjs';

/**
 *
 */
export default class Nightow extends Connector {

    /**
     *
     */
    constructor() {
        super();
        // Public members for usage in UI (mandatory)
        super.id = 'nightow';
        super.label = 'Nightow';
        this.tags = [ 'manga', 'high-quality', 'spanish', 'scanlation' ];
        super.isLocked = false;
        // Private members for internal usage only (convenience)
        this.url = 'http://nightow.net/online/';
        // Private members for internal use that can be configured by the user through settings menu (set to undefined or false to hide from settings menu!)
        this.config = undefined;
    }

    /**
     *
     */
    _getMangaList( callback ) {
        return this.fetchDOM( this.url, 'div#navig div.options a' )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: element.href.replace( window.location, '' ),
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
        return this.fetchDOM( this.url + manga.id, 'div.theList div.chapter b a' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: element.href.replace( window.location, '' ),
                        title: element.text.replace( /^\[Nightow\]/i, '' ).trim(),
                        language: 'spanish'
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
                let regex = new RegExp( /imageArray\s*\[\s*\d+\s*\]\s*=\s*'(.*)'\s*;/g);
                while( match = regex.exec( data ) ) {
                    pageList.push( this.url + match[1] );
                }
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
    }
}