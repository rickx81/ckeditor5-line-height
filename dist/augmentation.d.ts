import type LineHeight from './lineheight';
import type LineHeightCommand from './lineheightcommand';
import type { LineHeightConfig } from './lineheightconfig';
import type LineHeightEditing from './lineheightediting';
import type LineHeightUI from './lineheightui';
import type { LINE_HEIGHT } from './utils';
declare module '@ckeditor/ckeditor5-core' {
    interface EditorConfig {
        /**
         * The configuration of the {@link module:lineheight/lineheight~LineHeight lineheight feature}.
         *
         * Read more in {@link module:lineheight/lineheightconfig~LineHeightConfig}.
         */
        lineHeight?: LineHeightConfig;
    }
    interface PluginsMap {
        [LineHeight.pluginName]: LineHeight;
        [LineHeightUI.pluginName]: LineHeightUI;
        [LineHeightEditing.pluginName]: LineHeightEditing;
    }
    interface CommandsMap {
        [LINE_HEIGHT]: LineHeightCommand;
    }
}
