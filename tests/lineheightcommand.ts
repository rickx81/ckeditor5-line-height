import { expect } from 'chai'
import { ClassicEditor, Command } from 'ckeditor5'

import LineHeightCommand from '../src/lineheightcommand.js'

describe('LineHeightCommand', () => {
  let domElement: HTMLElement,
    editor: ClassicEditor,
    command: LineHeightCommand

  beforeEach(async () => {
    domElement = document.createElement('div')
    document.body.appendChild(domElement)

    editor = await ClassicEditor.create(domElement)

    command = new LineHeightCommand(editor)
    editor.commands.add('lineHeight', command)
  })

  afterEach(() => {
    domElement.remove()
    return editor.destroy()
  })

  it('is a Command', () => {
    expect(LineHeightCommand.prototype).to.be.instanceOf(Command)
    expect(command).to.be.instanceOf(Command)
  })
})
