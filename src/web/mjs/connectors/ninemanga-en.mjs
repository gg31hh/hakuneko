<link rel="import" href="ninemanga.html">



    /**
     * 
     */
export default class NineMangaEN extends NineManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ninemanga-en';
            super.label      = 'NineMangaEN';
            this.tags        = [ 'manga', 'english' ];
            this.url         = 'http://en.ninemanga.com';

            this.pageCount = 950;
        }
    }

