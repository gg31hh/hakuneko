import FoolSlide from './templates/FoolSlide.mjs';

/**
 *
 */
export default class OneTimeScans extends FoolSlide {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'onetimescans';
        super.label = 'OneTimeScans';
        this.tags = [ 'manga', 'high-quality', 'english', 'scanlation' ];
        this.url = 'https://otscans.com';
        this.path = '/foolslide/directory/';
        this.language = 'english';
    }
}