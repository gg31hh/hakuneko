import FoolSlide from './templates/FoolSlide.mjs';

/**
 *
 */
export default class BunnysScans extends FoolSlide {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'bunnysscans';
        super.label = 'BunnysScans';
        this.tags = [ 'manga', 'high-quality', 'english', 'scanlation' ];
        this.url = 'http://bns.shounen-ai.net';
        this.path = '/read/directory/';
        this.language = 'english';
    }
}