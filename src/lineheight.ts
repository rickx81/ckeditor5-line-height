import { Plugin } from 'ckeditor5'

import LineHeightEditing from './lineheightediting.js'
import LineHeightUI from './lineheightui.js'

export default class LineHeight extends Plugin {
  public static get requires() {
    return [LineHeightEditing, LineHeightUI] as const
  }

  public static get pluginName() {
    return 'LineHeight' as const
  }
}
