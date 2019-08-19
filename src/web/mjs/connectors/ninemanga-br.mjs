<link rel="import" href="ninemanga.html">



    /**
     * 
     */
export default class NineMangaBR extends NineManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ninemanga-br';
            super.label      = 'NineMangaBR';
            this.tags        = [ 'manga', 'portuguese' ];
            this.url         = 'http://br.ninemanga.com';

            this.pageCount = 300;
        }
    }

