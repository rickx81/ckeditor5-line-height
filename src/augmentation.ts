import type { LineHeight, LineHeightCommand, LineHeightConfig, LineHeightEditing, LineHeightUI } from './index.js'
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
