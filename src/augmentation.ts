import type LineHeight from './lineheight.js'
import type LineHeightCommand from './lineheightcommand.js'
import type { LineHeightConfig } from './lineheightconfig.js'
import type LineHeightEditing from './lineheightediting.js'
import type LineHeightUI from './lineheightui.js'

import type { LINE_HEIGHT } from './utils.js'

declare module '@ckeditor/ckeditor5-core' {
  interface EditorConfig {
    lineHeight?: LineHeightConfig
  }

  interface PluginsMap {
    [LineHeight.pluginName]: LineHeight
    [LineHeightUI.pluginName]: LineHeightUI
    [LineHeightEditing.pluginName]: LineHeightEditing
  }

  interface CommandsMap {
    [LINE_HEIGHT]: LineHeightCommand
  }
}
