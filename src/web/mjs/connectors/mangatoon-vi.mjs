<link rel="import" href="mangatoon.html">



    /**
     *
     */
export default class MangaToonVI extends MangaToon {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'mangatoon-vi';
            super.label      = 'MangaToon (Vietnamese)';
            this.tags        = [ 'webtoon', 'vietnamese' ];
            this.path        = '/vi/genre?page=';
        }
    }

