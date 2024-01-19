import { Plugin } from 'ckeditor5/src/core';
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
