import type {
  MatcherPattern,
  ViewElementDefinition,
} from '@ckeditor/ckeditor5-engine'
import type { ArrayOrItem } from '@ckeditor/ckeditor5-utils'
import type { LineHeightOption } from './lineheightconfig'

/**
 * The name of the lineHeight plugin.
 */
export const LINE_HEIGHT = 'lineHeight'

function getOptionDefinition(option: number | string | LineHeightOption) {
  if (typeof option === 'object')
    return option

  // 'Default' lineHeight. It will be used to remove the lineHeight attribute.
  if (option === 'default') {
    return {
      model: undefined,
      title: 'Default',
    }
  }

  return generatePreset(option)
}

function generatePreset(size: number | string): LineHeightOption {
  const sizeStr = String(size)

  return {
    title: sizeStr,
    model: sizeStr,
    view: {
      name: 'span',
      styles: {
        // @ts-expect-error
        // lineHeight: 1.5;
        // lineHeight: 16px;
        'line-height': size,
      },
      priority: 5,
    },
  }
}

export function normalizeOptions(
  configuredOptions: Array<string | number | LineHeightOption>,
): Array<LineHeightOption> {
  return configuredOptions
    .map(getOptionDefinition)
    .filter(option => !!option)
}

export function buildDefinition(
  modelAttributeKey: string,
  options: LineHeightOption[],
): LineHeightConverterDefinition {
  const definition: LineHeightConverterDefinition = {
    model: {
      key: modelAttributeKey,
      values: [],
    },
    view: {},
    upcastAlso: {},
  }

  for (const option of options) {
    definition.model.values.push(option.model!)
    definition.view[option.model!] = option.view!

    if (option.upcastAlso)
      definition.upcastAlso[option.model!] = option.upcastAlso
  }

  return definition
}

export interface LineHeightConverterDefinition {
  model: { key: string, values: Array<string> }
  view: Record<string, ViewElementDefinition>
  upcastAlso: Record<string, ArrayOrItem<MatcherPattern>>
}
