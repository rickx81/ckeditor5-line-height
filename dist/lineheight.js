import { Plugin } from '@ckeditor/ckeditor5-core';
import LineHeightEditing from './lineheightediting';
import LineHeightUI from './lineheightui';
export default class LineHeight extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [LineHeightEditing, LineHeightUI];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'LineHeight';
    }
}
