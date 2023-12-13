import { Command } from '@ckeditor/ckeditor5-core';
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
        const doc = model.document;
        this.value = doc.selection.getAttribute(LINE_HEIGHT);
        this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, LINE_HEIGHT);
    }
    execute(options = {}) {
        const editor = this.editor;
        const model = editor.model;
        const document = model.document;
        const selection = document.selection;
        const value = options.value;
        model.change((writer) => {
            if (selection.isCollapsed) {
                if (value)
                    writer.setSelectionAttribute(LINE_HEIGHT, value);
                else
                    writer.removeSelectionAttribute(LINE_HEIGHT);
            }
            else {
                const ranges = model.schema.getValidRanges(selection.getRanges(), LINE_HEIGHT);
                for (const range of ranges) {
                    if (value)
                        writer.setAttribute(LINE_HEIGHT, value, range);
                    else
                        writer.removeAttribute(LINE_HEIGHT, range);
                }
            }
        });
    }
}
