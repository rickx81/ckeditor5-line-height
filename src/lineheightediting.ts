import { type Editor, Plugin } from 'ckeditor5'

import LineHeightCommand from './lineheightcommand.js'
import { buildDefinition, LINE_HEIGHT, normalizeOptions } from './utils.js'

export default class LineHeightEditing extends Plugin {
  public static get pluginName() {
    return 'LineHeightEditing' as const
  }

  constructor(editor: Editor) {
    super(editor)

    // Define default configuration using named presets.
    editor.config.define(LINE_HEIGHT, {
      options: ['default', 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.5],
    })
  }

  public init(): void {
    const editor = this.editor
    const schema = editor.model.schema

    const options = normalizeOptions(editor.config.get('lineHeight.options')!)
      .filter(option => option.model)

    // Allow LineHeight attribute on all blocks.
    schema.extend('$block', { allowAttributes: LINE_HEIGHT })
    editor.model.schema.setAttributeProperties(LINE_HEIGHT, {
      isFormatting: true,
    })

    // Define view to model conversion.
    const definition = buildDefinition(LINE_HEIGHT, options)

    editor.conversion.attributeToAttribute(definition)

    // Add LineHeight Command.
    editor.commands.add(LINE_HEIGHT, new LineHeightCommand(editor))
  }
}
