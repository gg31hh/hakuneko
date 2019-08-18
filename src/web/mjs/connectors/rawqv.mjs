<link rel="import" href="./templates/FlatManga.mjs">

<script>

    /**
     * 
     */
    class RawQV extends FlatManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'rawqv';
            super.label      = 'RawQV';
            this.tags        = [ 'manga', 'raw', 'japanese' ];
            this.url         = 'https://mangahato.com';
            this.requestOptions.headers.set( 'x-referer', this.url );
        }
    }

</script>