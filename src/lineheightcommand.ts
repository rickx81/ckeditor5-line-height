import { Command, type Editor } from 'ckeditor5/src/core'
import { first } from 'ckeditor5/src/utils'
import type { Element, Writer } from 'ckeditor5/src/engine'

import { LINE_HEIGHT } from './utils'

/**
 * The lineHeight command plugin.
 */
export default class LineHeightCommand extends Command {
  /**
   * A value of the current block's lineHeight.
   *
   * @observable
   * @readonly
   */
  public declare value: string

  /**
   * @inheritDoc
   */
  public static get pluginName() {
    return 'LineHeightEditing' as const
  }

  constructor(editor: Editor) {
    super(editor)
  }

  /**
   * @inheritDoc
   */
  public override refresh(): void {
    const model = this.editor.model
    const document = model.document

    const firstBlock = first(document.selection.getSelectedBlocks())
    // As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
    this.isEnabled = !!firstBlock && this._canSetLineHeight(firstBlock)

    this.value = (this.isEnabled && firstBlock!.hasAttribute(LINE_HEIGHT))
      ? firstBlock!.getAttribute(LINE_HEIGHT) as string
      : 'default'
  }

  public override execute(options: { value?: string } = {}): void {
    const editor = this.editor
    const model = editor.model
    const document = model.document

    const value = options.value

    model.change((writer) => {
      const blocks = Array.from(document.selection.getSelectedBlocks())
        .filter(block => this._canSetLineHeight(block))

      const currentLineHeight = blocks[0].getAttribute(LINE_HEIGHT)
      const removeLineHeight = currentLineHeight === value || !value

      if (removeLineHeight)
        removeLineHeightFromSelection(blocks, writer)
      else
        setLineHeightOnSelection(blocks, writer, value)
    })
  }

  private _canSetLineHeight(block: Element) {
    return this.editor.model.schema.checkAttribute(block, LINE_HEIGHT)
  }
}

function removeLineHeightFromSelection(blocks: Element[], writer: Writer) {
  for (const block of blocks)
    writer.removeAttribute(LINE_HEIGHT, block)
}

function setLineHeightOnSelection(blocks: Element[], writer: Writer, lineHeight: string) {
  for (const block of blocks)
    writer.setAttribute(LINE_HEIGHT, lineHeight, block)
}
