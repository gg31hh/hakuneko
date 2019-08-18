<link rel="import" href="ReaderFront.html">

<script>

    /**
     * 
     */
    class RavensScansES extends ReaderFront {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'ravensscans-es';
            super.label      = 'RavensScans (Spanish)';
            this.tags        = [ 'manga', 'high-quality', 'spanish', 'scanlation' ];
            this.url         = 'https://ravens-scans.com';
            this.baseURL     = 'https://api.ravens-scans.com';
            this.language    = 'es';
        }
    }

</script>
