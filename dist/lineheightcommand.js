import { Command } from 'ckeditor5/src/core';
import { first } from 'ckeditor5/src/utils';
import { LINE_HEIGHT } from './utils';
/**
 * The lineHeight command plugin.
 */
export default class LineHeightCommand extends Command {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'LineHeightEditing';
    }
    constructor(editor) {
        super(editor);
    }
    /**
     * @inheritDoc
     */
    refresh() {
        const model = this.editor.model;
        const document = model.document;
        const firstBlock = first(document.selection.getSelectedBlocks());
        // As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
        this.isEnabled = !!firstBlock && this._canSetLineHeight(firstBlock);
        this.value = (this.isEnabled && firstBlock.hasAttribute(LINE_HEIGHT))
            ? firstBlock.getAttribute(LINE_HEIGHT)
            : 'default';
    }
    execute(options = {}) {
        const editor = this.editor;
        const model = editor.model;
        const document = model.document;
        const value = options.value;
        model.change((writer) => {
            const blocks = Array.from(document.selection.getSelectedBlocks())
                .filter(block => this._canSetLineHeight(block));
            const currentLineHeight = blocks[0].getAttribute(LINE_HEIGHT);
            const removeLineHeight = currentLineHeight === value || !value;
            if (removeLineHeight)
                removeLineHeightFromSelection(blocks, writer);
            else
                setLineHeightOnSelection(blocks, writer, value);
        });
    }
    _canSetLineHeight(block) {
        return this.editor.model.schema.checkAttribute(block, LINE_HEIGHT);
    }
}
function removeLineHeightFromSelection(blocks, writer) {
    for (const block of blocks)
        writer.removeAttribute(LINE_HEIGHT, block);
}
function setLineHeightOnSelection(blocks, writer, lineHeight) {
    for (const block of blocks)
        writer.setAttribute(LINE_HEIGHT, lineHeight, block);
}
