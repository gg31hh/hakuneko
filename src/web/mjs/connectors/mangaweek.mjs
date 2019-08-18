<link rel="import" href="./templates/FlatManga.mjs">

<script>

    /**
     * 
     */
    class MangaWeek extends FlatManga {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'mangaweek';
            super.label      = 'MangaWeek';
            this.tags        = [ 'manga', 'english' ];
            this.url         = 'https://mangaweek.com';
            this.requestOptions.headers.set( 'x-referer', this.url );

            this.queryChapters = 'div#tab-chapper div#list-chapters span.title a.chapter';
        }
    }

</script>