import { type Editor, Plugin } from '@ckeditor/ckeditor5-core';
export default class LineHeightEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "LineHeightEditing";
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
}
