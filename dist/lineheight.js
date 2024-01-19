import { Plugin } from 'ckeditor5/src/core';
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
