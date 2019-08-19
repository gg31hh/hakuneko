<link rel="import" href="ninemanga.html">



    /**
     * 
     */
export default class NineMangaES extends NineManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ninemanga-es';
            super.label      = 'NineMangaES';
            this.tags        = [ 'manga', 'spanish' ];
            this.url         = 'http://es.ninemanga.com';

            this.pageCount = 750;
        }
    }

