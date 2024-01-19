import { Command, type Editor } from 'ckeditor5/src/core';
/**
 * The lineHeight command plugin.
 */
export default class LineHeightCommand extends Command {
    /**
     * A value of the current block's lineHeight.
     *
     * @observable
     * @readonly
     */
    value: string;
    /**
     * @inheritDoc
     */
    static get pluginName(): "LineHeightEditing";
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    refresh(): void;
    execute(options?: {
        value?: string;
    }): void;
    private _canSetLineHeight;
}
