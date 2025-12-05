import type { ButtonView, DropdownView, ListItemView, MenuBarMenuView } from 'ckeditor5'

import type { LineHeightCommand } from '../src/index.js'
import { ClassicEditor } from 'ckeditor5'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { icons, LineHeightEditing, LineHeightUI } from '../src/index.js'

describe('LineHeightUI', () => {
  let domElement: HTMLElement,
    editor: ClassicEditor,
    command: LineHeightCommand

  beforeEach(async () => {
    domElement = document.createElement('div')
    document.body.appendChild(domElement)

    editor = await ClassicEditor.create(domElement, {
      licenseKey: 'GPL',
      plugins: [LineHeightEditing, LineHeightUI],
      lineHeight: {
        options: [
          'default',
          '12px',
          '16px',
          '24px',
        ],
      },
    })
  })

  afterEach(() => {
    domElement.remove()
    return editor.destroy()
  })

  it('should have pluginName', () => {
    expect(LineHeightUI.pluginName).to.equal('LineHeightUI')
  })

  describe('toolbar dropdown', () => {
    let dropdown: DropdownView

    beforeEach(() => {
      command = editor.commands.get('lineHeight')!
      dropdown = editor.ui.componentFactory.create('lineHeight') as DropdownView
    })

    it('button has the base properties', () => {
      const button = dropdown.buttonView

      expect(button).to.have.property('label', 'Line Height')
      expect(button).to.have.property('tooltip', true)
      expect(button).to.have.property('icon', icons.lineHeight)
    })

    it('should add custom CSS class to dropdown', () => {
      dropdown.render()

      expect(dropdown.element!.classList.contains('ck-line-height-dropdown')).to.be.equal(true)
    })

    it('should activate current option in dropdown', () => {
      // Make sure that list view is not created before first dropdown open.
      expect(dropdown.listView).to.be.equal(undefined)

      // Trigger list view creation (lazy init).
      dropdown.isOpen = true

      const listView = dropdown.listView

      command.value = 'default'

      expect(listView!.items.map(item => ((item as ListItemView).children.first as ButtonView).isOn)).to.deep.equal([false, false, false, false])

      command.value = '16px'

      expect(listView!.items.map(item => ((item as ListItemView).children.first as ButtonView).isOn)).to.deep.equal([false, false, true, false])
    })

    describe('model to command binding', () => {
      it('isEnabled', () => {
        command.isEnabled = false

        expect(dropdown.buttonView.isEnabled).to.be.equal(false)

        command.isEnabled = true
        expect(dropdown.buttonView.isEnabled).to.be.equal(true)
      })
    })
  })

  describe('menu bar', () => {
    let subMenu: MenuBarMenuView

    beforeEach(() => {
      command = editor.commands.get('lineHeight')!
      subMenu = editor.ui.componentFactory.create('menuBar:lineHeight') as MenuBarMenuView
    })

    it('button has the base properties', () => {
      const button = subMenu.buttonView

      expect(button).to.have.property('label', 'Line Height')
      expect(button).to.have.property('icon', icons.lineHeight)
    })

    it('button has binding to isEnabled', () => {
      command.isEnabled = false

      expect(subMenu.buttonView.isEnabled).to.equal(false)

      command.isEnabled = true
      expect(subMenu.buttonView.isEnabled).to.equal(true)
    })
  })
})
