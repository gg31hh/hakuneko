import Connector from '../engine/Connector.mjs'



    /**
     *
     */
export default class AllHentai extends Connector {

        /**
         *
         */
        constructor() {
            super();
            super.id         = 'allhentai';
            super.label      = 'AllHentai';
            this.tags        = [];
            this.url         = 'http://allhentai.ru';
        }

        _getMangaList( callback ) {
            callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
        }
        _getChapterList( manga, callback ) {
            callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
        }
        _getPageList( manga, chapter, callback ) {
            callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
        }
    }

