import './augmentation'
import lineHeightIcon from './../theme/icons/line-height.svg'

export { default as LineHeight } from './lineheight.js'
export { default as LineHeightEditing } from './lineheightediting.js'
export { default as LineHeightUI } from './lineheightui.js'
export type { default as LineHeightCommand } from './lineheightcommand.js'
export type { LineHeightConfig } from './lineheightconfig.js'

export { LINE_HEIGHT } from './utils.js'

export const icons = {
  lineHeight: lineHeightIcon,
}
