<link rel="import" href="./templates/FlatManga.mjs">

<script>

    /**
     * 
     */
    class LHScan extends FlatManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'lhscan';
            super.label      = 'LHScan';
            this.tags        = [ 'manga', 'raw', 'japanese' ];
            this.url         = 'http://lhscan.net';
            this.requestOptions.headers.set( 'x-referer', this.url );
        }
    }

</script>