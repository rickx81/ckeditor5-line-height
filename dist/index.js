import { Command, first, Plugin, createDropdown, addListToDropdown, Collection, ViewModel } from 'ckeditor5';

var lineHeightIcon = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1545631834210\" class=\"icon\" style=\"\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1840\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"20\" height=\"20\"><defs><style type=\"text/css\"></style></defs><path d=\"M648 160H104c-4.4 0-8 3.6-8 8v128c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-64h168v560h-92c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h264c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-92V232h168v64c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V168c0-4.4-3.6-8-8-8z m272.8 546H856V318h64.8c6 0 9.4-7 5.7-11.7L825.7 178.7c-2.9-3.7-8.5-3.7-11.3 0L713.6 306.3c-3.7 4.7-0.4 11.7 5.7 11.7H784v388h-64.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.8-4.7 0.4-11.7-5.6-11.7z\" fill=\"#000000\" p-id=\"1841\"></path></svg>";

/**
 * The name of the lineHeight plugin.
 */ const LINE_HEIGHT = 'lineHeight';
function getOptionDefinition(option) {
    // Check whether passed option is a full item definition provided by user in configuration.
    if (typeof option === 'object' && isFullItemDefinition(option)) return option;
    // 'Default' lineHeight. It will be used to remove the lineHeight attribute.
    if (option === 'default') {
        return {
            model: undefined,
            title: 'Default'
        };
    }
    return generatePreset(option);
}
function generatePreset(definition) {
    if (typeof definition !== 'object') {
        definition = {
            title: String(definition),
            model: String(definition)
        };
    }
    return {
        title: definition.title,
        model: definition.model
    };
}
function normalizeOptions(configuredOptions) {
    return configuredOptions.map((item)=>getOptionDefinition(item)).filter((option)=>!!option);
}
function buildDefinition(modelAttributeKey, options) {
    const definition = {
        model: {
            key: modelAttributeKey,
            values: []
        },
        view: {}
    };
    for (const option of options){
        definition.model.values.push(option.model);
        definition.view[option.model] = {
            key: 'style',
            value: {
                'line-height': option.model
            }
        };
    }
    return definition;
}
/**
 * We treat `definition` as completed if it is an object that contains `title`, `model` and `view` values.
 */ function isFullItemDefinition(definition) {
    return definition.title && definition.model && definition.view;
}

/**
 * The lineHeight command plugin.
 */ class LineHeightCommand extends Command {
    static get pluginName() {
        return 'LineHeightEditing';
    }
    constructor(editor){
        super(editor);
    }
    refresh() {
        const model = this.editor.model;
        const document = model.document;
        const firstBlock = first(document.selection.getSelectedBlocks());
        // As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
        this.isEnabled = !!firstBlock && this._canSetLineHeight(firstBlock);
        this.value = this.isEnabled && firstBlock.hasAttribute(LINE_HEIGHT) ? firstBlock.getAttribute(LINE_HEIGHT) : 'default';
    }
    execute(options = {}) {
        const editor = this.editor;
        const model = editor.model;
        const document = model.document;
        const value = options.value;
        model.change((writer)=>{
            const blocks = Array.from(document.selection.getSelectedBlocks()).filter((block)=>this._canSetLineHeight(block));
            const currentLineHeight = blocks[0].getAttribute(LINE_HEIGHT);
            const removeLineHeight = currentLineHeight === value || !value;
            if (removeLineHeight) removeLineHeightFromSelection(blocks, writer);
            else setLineHeightOnSelection(blocks, writer, value);
        });
    }
    _canSetLineHeight(block) {
        return this.editor.model.schema.checkAttribute(block, LINE_HEIGHT);
    }
}
function removeLineHeightFromSelection(blocks, writer) {
    for (const block of blocks)writer.removeAttribute(LINE_HEIGHT, block);
}
function setLineHeightOnSelection(blocks, writer, lineHeight) {
    for (const block of blocks)writer.setAttribute(LINE_HEIGHT, lineHeight, block);
}

class LineHeightEditing extends Plugin {
    static get pluginName() {
        return 'LineHeightEditing';
    }
    constructor(editor){
        super(editor);
        // Define default configuration using named presets.
        editor.config.define(LINE_HEIGHT, {
            options: [
                'default',
                1,
                1.1,
                1.2,
                1.3,
                1.4,
                1.5,
                1.6,
                2,
                2.5
            ]
        });
    }
    init() {
        const editor = this.editor;
        const schema = editor.model.schema;
        const options = normalizeOptions(editor.config.get('lineHeight.options')).filter((option)=>option.model);
        // Allow LineHeight attribute on all blocks.
        schema.extend('$block', {
            allowAttributes: LINE_HEIGHT
        });
        editor.model.schema.setAttributeProperties(LINE_HEIGHT, {
            isFormatting: true
        });
        // Define view to model conversion.
        const definition = buildDefinition(LINE_HEIGHT, options);
        editor.conversion.attributeToAttribute(definition);
        // Add LineHeight Command.
        editor.commands.add(LINE_HEIGHT, new LineHeightCommand(editor));
    }
}

class LineHeightUI extends Plugin {
    static get pluginName() {
        return 'LineHeightUI';
    }
    init() {
        const editor = this.editor;
        const componentFactory = editor.ui.componentFactory;
        const t = editor.t;
        const options = this._getLocalizedOptions();
        const command = editor.commands.get(LINE_HEIGHT);
        // Register UI component.
        componentFactory.add(LINE_HEIGHT, (locale)=>{
            const dropdownView = createDropdown(locale);
            addListToDropdown(dropdownView, _prepareListOptions(options, command));
            // Create dropdown model.
            dropdownView.buttonView.set({
                label: t('Line Height'),
                icon: lineHeightIcon,
                tooltip: true
            });
            dropdownView.extendTemplate({
                attributes: {
                    class: [
                        'ck-line-height-dropdown'
                    ]
                }
            });
            dropdownView.bind('isEnabled').to(command);
            // Execute command when an item from the dropdown is selected.
            this.listenTo(dropdownView, 'execute', (evt)=>{
                editor.execute(evt.source.commandName, {
                    value: evt.source.commandParam
                });
                editor.editing.view.focus();
            });
            return dropdownView;
        });
    }
    _getLocalizedOptions() {
        const editor = this.editor;
        const t = editor.t;
        const localizedTitles = {
            Default: t('Default')
        };
        const options = normalizeOptions(editor.config.get(LINE_HEIGHT).options);
        return options.map((option)=>{
            const title = localizedTitles[option.title];
            if (title && title !== option.title) {
                // Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
                option = Object.assign({}, option, {
                    title
                });
            }
            return option;
        });
    }
}
// Prepares LineHeight dropdown items.
function _prepareListOptions(options, command) {
    const itemDefinitions = new Collection();
    for (const option of options){
        const def = {
            type: 'button',
            model: new ViewModel({
                commandName: LINE_HEIGHT,
                commandParam: option.model,
                label: option.title,
                class: 'ck-line-height-option',
                withText: true
            })
        };
        def.model.bind('isOn').to(command, 'value', (value)=>{
            return value === option.model;
        });
        // Add the option to the collection.
        itemDefinitions.add(def);
    }
    return itemDefinitions;
}

class LineHeight extends Plugin {
    static get requires() {
        return [
            LineHeightEditing,
            LineHeightUI
        ];
    }
    static get pluginName() {
        return 'LineHeight';
    }
}

const icons = {
    lineHeight: lineHeightIcon
};

export { LINE_HEIGHT, LineHeight, LineHeightEditing, LineHeightUI, icons };
//# sourceMappingURL=index.js.map
