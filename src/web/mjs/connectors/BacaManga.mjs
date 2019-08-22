import WordPressEManga from './templates/WordPressEManga.mjs'



    /**
     * 
     */
export default class BacaManga extends WordPressEManga {

        /**
         * limited access for indonesian (and surounding) regions only
         */
        constructor() {
            super();
            super.id         = 'bacamanga';
            super.label      = 'BacaManga';
            this.tags        = [ 'manga', 'indonesian' ];
            this.url         = 'https://bacamanga.co';
            this.path        = '/manga/?list';

            this.queryMangas = 'div#content div.soralist ul li a.series';
            this.queryChapters = 'div.bxcl ul li span.lchx a';
        }

        /**
         *
         */
        _getPageList( manga, chapter, callback ) {
            let script = `
                new Promise( resolve => {
                    resolve( [...document.querySelectorAll('div.maincontent div#readerarea p img')].map( img => img.src ) );
                } );
            `;
            let request = new Request( this.url + chapter.id, this.requestOptions );
            Engine.Request.fetchUI( request, script )
            .then( data => {
                callback( null, data );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
        }
    }

