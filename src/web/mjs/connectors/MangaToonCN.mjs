import MangaToon from './templates/MangaToon.mjs';

/**
 *
 */
export default class MangaToonCN extends MangaToon {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'mangatoon-cn';
        super.label = 'MangaToon (Chinese)';
        this.tags = [ 'webtoon', 'chinese' ];
        this.path = '/cn/genre?page=';
    }
}