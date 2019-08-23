import WordPressMadara from './templates/WordPressMadara.mjs';

/**
 *
 */
export default class ZeroScans extends WordPressMadara {

    /**
     *
     */
    constructor() {
        super();
        // Public members for usage in UI (mandatory)
        super.id = 'zeroscans';
        super.label = 'ZeroScans';
        this.tags = [ 'manga', 'high-quality', 'english', 'scanlation' ];
        // Private members for internal usage only (convenience)
        this.url = 'https://zeroscans.com';
    }
}