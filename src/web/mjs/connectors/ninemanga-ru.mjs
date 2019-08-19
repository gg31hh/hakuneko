<link rel="import" href="ninemanga.html">



    /**
     * 
     */
export default class NineMangaRU extends NineManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ninemanga-ru';
            super.label      = 'NineMangaRU';
            this.tags        = [ 'manga', 'russian' ];
            this.url         = 'http://ru.ninemanga.com';

            this.pageCount = 550;
        }
    }

