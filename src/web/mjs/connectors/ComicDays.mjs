import CoreView from './templates/CoreView.mjs';

/**
 *
 */
export default class ComicDays extends CoreView {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'comicdays';
        super.label = 'コミックDAYS (Comic Days)';
        this.tags = [ 'manga', 'japanese' ];
        this.url = 'https://comic-days.com';

        this.path = [ /*'/series',*/ '/oneshot', '/newcomer' ];
        this.queryManga = 'div.yomikiri-container ul.yomikiri-items > li.yomikiri-item-box > a.yomikiri-link';
        this.queryMangaTitle = 'div.yomikiri-link-title h4';

        this.queryChaptersSkip = 'div.series-episode-list-price';
    }

    /**
     *
     */
    _getMangaList( callback ) {
        this.fetchDOM( this.url + '/series', 'section.daily ul.daily-series > li.daily-series-item a.daily-series-thumb-img-container' )
            .then( data => {
                let mangaList = data.map( element => {
                    return {
                        id: this.getRelativeLink( element ),
                        title: element.querySelector( 'source' ).getAttribute( 'alt' ).trim()
                    };
                } );
                return this._getMangaListFromPages( this.path.map( path => this.url + path ) )
                    .then( data => {
                        callback( null, mangaList.concat( data ) );
                    } );
            } )
            .catch( error => {
                console.error( error, this );
                callback( error, undefined );
            } );
    }
}