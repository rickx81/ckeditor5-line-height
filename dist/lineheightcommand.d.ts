import { Command, type Editor } from '@ckeditor/ckeditor5-core';
import type { LineHeightOption } from './lineheightconfig';
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
    value: string | number;
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
        value?: LineHeightOption;
    }): void;
}
