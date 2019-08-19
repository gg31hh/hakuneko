<link rel="import" href="mangaeden.html">



    /**
     * 
     */
export default class MangaEdenEN extends MangaEden {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'mangaeden-en';
            super.label      = 'MangaEdenEN';
            this.tags        = [ 'manga', 'english' ];
            this.url         = 'https://www.mangaeden.com';
            this.urlMangas   = '/en/en-directory/';
        }
    }

