<link rel="import" href="ninemanga.html">



    /**
     * 
     */
export default class NineMangaDE extends NineManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ninemanga-de';
            super.label      = 'NineMangaDE';
            this.tags        = [ 'manga', 'german' ];
            this.url         = 'http://de.ninemanga.com';

            this.pageCount = 50;
        }
    }

