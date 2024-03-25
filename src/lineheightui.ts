import { Plugin } from 'ckeditor5/src/core'
import { Collection } from 'ckeditor5/src/utils'
import { type ListDropdownItemDefinition, Model, addListToDropdown, createDropdown } from 'ckeditor5/src/ui'

import lineHeightIcon from '../theme/line-height.svg'
import { LINE_HEIGHT, normalizeOptions } from './utils'
import type { LineHeightOption } from './lineheightconfig'
import type LineHeightCommand from './lineheightcommand'

export default class LineHeightUI extends Plugin {
  /**
   * @inheritDoc
   */
  public static get pluginName() {
    return 'LineHeightUI' as const
  }

  /**
   * @inheritDoc
   */
  public init(): void {
    const editor = this.editor
    const componentFactory = editor.ui.componentFactory
    const t = editor.t

    const options = this._getLocalizedOptions()

    const command: LineHeightCommand = editor.commands.get(LINE_HEIGHT)!

    // Register UI component.
    componentFactory.add(LINE_HEIGHT, (locale) => {
      const dropdownView = createDropdown(locale)
      addListToDropdown(dropdownView, _prepareListOptions(options, command))

      // Create dropdown model.
      dropdownView.buttonView.set({
        label: t('Line Height'),
        icon: lineHeightIcon,
        tooltip: true,
      })

      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-line-height-dropdown'],
        },
      })

      dropdownView.bind('isEnabled').to(command)

      // Execute command when an item from the dropdown is selected.
      this.listenTo(dropdownView, 'execute', (evt) => {
        editor.execute((evt.source as any).commandName, {
          value: (evt.source as any).commandParam,
        })
        editor.editing.view.focus()
      })

      return dropdownView
    })
  }

  private _getLocalizedOptions(): LineHeightOption[] {
    const editor = this.editor
    const t = editor.t

    const localizedTitles: Record<string, string> = {
      Default: t('Default'),
    }

    const options = normalizeOptions(editor.config.get(LINE_HEIGHT)!.options!)

    return options.map((option) => {
      const title = localizedTitles[option.title]

      if (title && title !== option.title) {
        // Clone the option to avoid altering the original `namedPresets` from `./utils.js`.
        option = Object.assign({}, option, { title })
      }

      return option
    })
  }
}

// Prepares LineHeight dropdown items.
function _prepareListOptions(options: LineHeightOption[], command: LineHeightCommand): Collection<ListDropdownItemDefinition> {
  const itemDefinitions = new Collection<ListDropdownItemDefinition>()

  for (const option of options) {
    const def: ListDropdownItemDefinition = {
      type: 'button' as const,
      model: new Model({
        commandName: LINE_HEIGHT,
        commandParam: option.model,
        label: option.title,
        class: 'ck-line-height-option',
        withText: true,
      }),
    }

    def.model.bind('isOn').to(command, 'value', (value) => {
      return value === option.model
    })

    // Add the option to the collection.
    itemDefinitions.add(def)
  }

  return itemDefinitions
}
