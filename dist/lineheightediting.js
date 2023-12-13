import { Plugin } from '@ckeditor/ckeditor5-core';
import LineHeightCommand from './lineheightcommand';
import { LINE_HEIGHT, buildDefinition, normalizeOptions } from './utils';
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
            options: [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5],
        });
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        // Allow LineHeight attribute on all blocks.
        schema.extend('$block', { allowAttributes: LINE_HEIGHT });
        editor.model.schema.setAttributeProperties(LINE_HEIGHT, {
            isFormatting: true,
        });
        // Allow LineHeight attribute on text nodes.
        editor.model.schema.extend('$text', { allowAttributes: LINE_HEIGHT });
        // Define view to model conversion.
        const options = normalizeOptions(editor.config.get('lineHeight.options')).filter(item => item.model);
        const definition = buildDefinition(LINE_HEIGHT, options);
        // Set-up the two-way conversion.
        editor.conversion.attributeToElement(definition);
        editor.conversion.for('upcast').elementToAttribute({
            view: {
                name: 'span',
                styles: {
                    'line-height': /^\d+(.\d+)?$/, // 非负浮点数
                },
            },
            model: {
                key: LINE_HEIGHT,
                value: (viewElement) => viewElement.getStyle('line-height'),
            },
        });
        // Add LineHeight Command.
        editor.commands.add(LINE_HEIGHT, new LineHeightCommand(editor));
    }
}
