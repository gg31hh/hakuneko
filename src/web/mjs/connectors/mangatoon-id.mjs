<link rel="import" href="mangatoon.html">



    /**
     *
     */
export default class MangaToonID extends MangaToon {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'mangatoon-id';
            super.label      = 'MangaToon (Indonesian)';
            this.tags        = [ 'webtoon', 'indonesian' ];
            this.path        = '/id/genre?page=';
        }
    }

