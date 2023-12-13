import { Plugin } from '@ckeditor/ckeditor5-core';
import LineHeightEditing from './lineheightediting';
import LineHeightUI from './lineheightui';
export default class LineHeight extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof LineHeightEditing, typeof LineHeightUI];
    /**
     * @inheritDoc
     */
    static get pluginName(): "LineHeight";
}
