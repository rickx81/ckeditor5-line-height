import type { LINE_HEIGHT } from './utils.js'
import type { LineHeight, LineHeightConfig, LineHeightEditing, LineHeightCommand, LineHeightUI } from './index.js'

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
