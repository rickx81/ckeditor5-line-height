import { type Editor, Plugin } from 'ckeditor5/src/core';
export default class LineHeightEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "LineHeightEditing";
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
}
