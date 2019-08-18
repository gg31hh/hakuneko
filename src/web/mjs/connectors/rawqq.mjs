<link rel="import" href="./templates/FlatManga.mjs">

<script>

    /**
     * 
     */
    class RawQQ extends FlatManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'rawqq';
            super.label      = 'RawQQ';
            this.tags        = [ 'manga', 'raw', 'japanese' ];
            this.url         = 'https://rawqq.com';
            this.requestOptions.headers.set( 'x-referer', this.url );

            this.queryChapters = 'div#tab-chapper span[class^="title"] a.chapter';
        }
    }

</script>