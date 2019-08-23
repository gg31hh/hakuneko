import WordPressEManga from './templates/WordPressEManga.mjs';

/**
 *
 */
export default class KomikIndoWeb extends WordPressEManga {

    /**
     *
     */
    constructor() {
        super();
        super.id = 'komikindoweb';
        super.label = 'KomikIndoWeb';
        this.tags = [ 'manga', 'indonesian' ];
        this.url = 'https://www.komikindo.web.id';
        this.path = '/daftar-manga/?list';
    }
}