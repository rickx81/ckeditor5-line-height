import type { ButtonExecuteEvent, ListDropdownButtonDefinition } from 'ckeditor5'
import type LineHeightCommand from './lineheightcommand.js'
import type { LineHeightOption } from './lineheightconfig.js'

import { addListToDropdown, Collection, createDropdown, MenuBarMenuListItemButtonView, MenuBarMenuListItemView, MenuBarMenuListView, MenuBarMenuView, Plugin, UIModel } from 'ckeditor5'

import lineHeightIcon from './../theme/icons/line-height.svg'
import { getDefaultLineHeight, LINE_HEIGHT, normalizeOptions } from './utils.js'

export default class LineHeightUI extends Plugin {
  public static get pluginName() {
    return 'LineHeightUI' as const
  }

  public init(): void {
    const editor = this.editor
    const componentFactory = editor.ui.componentFactory
    const t = editor.t

    const command: LineHeightCommand = editor.commands.get(LINE_HEIGHT)!
    const accessibleLabel = t('Line Height')

    const listOptions = this._prepareListOptions()

    // Register UI component.
    componentFactory.add(LINE_HEIGHT, (locale) => {
      const dropdownView = createDropdown(locale)
      addListToDropdown(dropdownView, listOptions, {
        role: 'menu',
        ariaLabel: accessibleLabel,
      })

      // Create dropdown model.
      dropdownView.buttonView.set({
        label: accessibleLabel,
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
      this.listenTo<ButtonExecuteEvent>(dropdownView, 'execute', (evt) => {
        const { commandName, commandParam } = evt.source as any
        editor.execute(commandName, {
          value: commandParam,
        })
        editor.editing.view.focus()
      })

      return dropdownView
    })

    componentFactory.add(`menuBar:${LINE_HEIGHT}`, (locale) => {
      const menuView = new MenuBarMenuView(locale)

      menuView.buttonView.set({
        role: 'menuitem',
        label: accessibleLabel,
        icon: lineHeightIcon,
      })

      menuView.bind('isEnabled').to(command)

      const listView = new MenuBarMenuListView(locale)

      for (const option of listOptions) {
        const listItemView = new MenuBarMenuListItemView(locale, menuView)
        const buttonView = new MenuBarMenuListItemButtonView(locale)

        buttonView.set({ role: 'menuitemradio', isToggleable: true })

        buttonView.bind(...Object.keys(option.model) as Array<keyof MenuBarMenuListItemButtonView>)
          .to(option.model)

        buttonView.delegate('execute').to(menuView)
        buttonView.on<ButtonExecuteEvent>('execute', () => {
          editor.execute(option.model.commandName as string, {
            value: option.model.commandParam,
          })
          editor.editing.view.focus()
        })

        listItemView.children.add(buttonView)
        listView.items.add(listItemView)
      }

      menuView.panelView.children.add(listView)

      return menuView
    })
  }

  // Prepares LineHeight dropdown items.
  private _prepareListOptions(): Collection<ListDropdownButtonDefinition> {
    const command = this.editor.commands.get(LINE_HEIGHT)!
    const defaultValue = getDefaultLineHeight()
    const options = this._getLocalizedOptions()
    const itemDefinitions = new Collection<ListDropdownButtonDefinition>()

    const isDefault = (value?: string) => value === 'Default' || value === String(defaultValue)

    for (const option of options) {
      const def: ListDropdownButtonDefinition = {
        type: 'button' as const,
        model: new UIModel({
          commandName: LINE_HEIGHT,
          // commandParam: option.model,
          label: option.title,
          role: 'menuitemradio',
          class: 'ck-line-height-option',
          withText: true,
        }),
      }

      if (isDefault(option.model)) {
        def.model.bind('isOn').to(command, 'value', value => !value)
        def.model.commandParam = undefined
      }
      else {
        def.model.bind('isOn').to(command, 'value', value => value === option.model)
        def.model.commandParam = option.model
      }

      // Add the option to the collection.
      itemDefinitions.add(def)
    }

    return itemDefinitions
  }

  private _getLocalizedOptions(): Array<LineHeightOption> {
    const editor = this.editor
    const t = editor.t
    const config = editor.config.get(LINE_HEIGHT)!

    const localizedTitles: Record<string, string> = {
      Default: t('Default'),
    }

    const options = normalizeOptions(config.options!)

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
