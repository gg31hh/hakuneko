import MangaToon from './templates/MangaToon.mjs';

/**
 *
 */
export default class MangaToonEN extends MangaToon {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'mangatoon-en';
        super.label = 'MangaToon (English)';
        this.tags = [ 'webtoon', 'english' ];
        this.path = '/en/genre?page=';
    }
}