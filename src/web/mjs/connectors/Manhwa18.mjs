import FlatManga from './templates/FlatManga.mjs';

/**
 *
 */
export default class Manhwa18 extends FlatManga {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'manhwa18';
        super.label = 'Manhwa 18';
        this.tags = [ 'hentai', 'english' ];
        this.url = 'https://manhwa18.com';
        this.requestOptions.headers.set( 'x-referer', this.url );

        this.language = 'en';
    }
}