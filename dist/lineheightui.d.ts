import { Plugin } from '@ckeditor/ckeditor5-core';
export default class LineHeightUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "LineHeightUI";
    /**
     * @inheritDoc
     */
    init(): void;
    private _getLocalizedOptions;
}
