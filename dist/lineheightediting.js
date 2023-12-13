import { Plugin } from '@ckeditor/ckeditor5-core';
import LineHeightCommand from './lineheightcommand';
import { LINE_HEIGHT, buildDefinition } from './utils';
export default class LineHeightEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'LineHeightEditing';
    }
    constructor(editor) {
        super(editor);
        // Define default configuration using named presets.
        editor.config.define(LINE_HEIGHT, {
            options: ['default', '1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '2', '2.5'],
        });
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const options = editor.config.get('lineHeight.options').map(option => String(option));
        // Allow LineHeight attribute on all blocks.
        schema.extend('$block', { allowAttributes: LINE_HEIGHT });
        editor.model.schema.setAttributeProperties(LINE_HEIGHT, {
            isFormatting: true,
        });
        // Define view to model conversion.
        const definition = buildDefinition(LINE_HEIGHT, options);
        editor.conversion.attributeToAttribute(definition);
        // Add LineHeight Command.
        editor.commands.add(LINE_HEIGHT, new LineHeightCommand(editor));
    }
}
