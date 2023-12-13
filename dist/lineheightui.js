import { Plugin } from '@ckeditor/ckeditor5-core';
import { Collection } from '@ckeditor/ckeditor5-utils';
import { Model, addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui';
import lineHeightIcon from '../theme/line-height.svg';
import { LINE_HEIGHT, normalizeOptions } from './utils';
export default class LineHeightUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'LineHeightUI';
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        const options = this._getLocalizedOptions();
        const command = editor.commands.get(LINE_HEIGHT);
        // Register UI component.
        editor.ui.componentFactory.add(LINE_HEIGHT, (locale) => {
            const dropdownView = createDropdown(locale);
            addListToDropdown(dropdownView, _prepareListOptions(options, command));
            // Create dropdown model.
            dropdownView.buttonView.set({
                label: t('Line Height'),
                icon: lineHeightIcon,
                tooltip: true,
            });
            dropdownView.extendTemplate({
                attributes: {
                    class: ['ck-line-height-dropdown'],
                },
            });
            dropdownView.bind('isEnabled').to(command);
            // Execute command when an item from the dropdown is selected.
            this.listenTo(dropdownView, 'execute', (evt) => {
                editor.execute(evt.source.commandName, {
                    value: evt.source.commandParam,
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
            Default: t('Default'),
        };
        const options = normalizeOptions(editor.config.get(LINE_HEIGHT).options);
        return options.map((option) => {
            const title = localizedTitles[option.title];
            if (title && title !== option.title) {
                // Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
                option = Object.assign({}, option, { title });
            }
            return option;
        });
    }
}
// Prepares LineHeight dropdown items.
function _prepareListOptions(options, command) {
    const itemDefinitions = new Collection();
    for (const option of options) {
        const def = {
            type: 'button',
            model: new Model({
                commandName: LINE_HEIGHT,
                commandParam: option.model,
                label: option.title,
                class: 'ck-line-height-option',
                withText: true,
            }),
        };
        if (option.view && typeof option.view !== 'string' && option.view.classes)
            def.model.set('class', `${def.model.class} ${option.view.classes}`);
        def.model.bind('isOn').to(command, 'value', (value) => {
            if (!value)
                return false;
            if (value === 'default')
                return false;
            return value === option.model;
        });
        // Add the option to the collection.
        itemDefinitions.add(def);
    }
    return itemDefinitions;
}
