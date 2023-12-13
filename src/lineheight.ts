import { Plugin } from '@ckeditor/ckeditor5-core'

import LineHeightEditing from './lineheightediting'
import LineHeightUI from './lineheightui'

export default class LineHeight extends Plugin {
  /**
   * @inheritDoc
   */
  public static get requires() {
    return [LineHeightEditing, LineHeightUI] as const
  }

  /**
   * @inheritDoc
   */
  public static get pluginName() {
    return 'LineHeight' as const
  }
}
