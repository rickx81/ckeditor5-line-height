import type { AttributeDescriptor } from '@ckeditor/ckeditor5-engine'
import type { AttributeCreatorFunction } from '@ckeditor/ckeditor5-engine/src/conversion/downcasthelpers'

import type { ArrayOrItem, PriorityString } from '@ckeditor/ckeditor5-utils'
import type { LineHeightOption } from './lineheightconfig'

/**
 * The name of the lineHeight plugin.
 */
export const LINE_HEIGHT = 'lineHeight'

function getOptionDefinition(option: number | string): LineHeightOption {
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
        'line-height': sizeStr,
      },
      priority: 5,
    },
  }
}

export function normalizeOptions(configuredOptions: Array<string | number>): LineHeightOption[] {
  return configuredOptions
    .map(getOptionDefinition)
    .filter(option => !!option)
}

export function buildDefinition(
  modelAttributeKey: string,
  options: string[],
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
    definition.model.values.push(option)
    definition.view[option] = {
      key: 'style',
      value: {
        'line-height': option,
      },
    }
  }

  return definition
}

export type LineHeightConverterDefinition<T extends string = string> = {
  model: string | {
    key: string
    name?: string
  }
  view: string | (AttributeDescriptor & {
    name?: string
  })
  upcastAlso?: ArrayOrItem<string | (AttributeDescriptor & {
    name?: string
  }) | AttributeCreatorFunction>
  converterPriority?: PriorityString
} | {
  model: {
    key: string
    name?: string
    values: Array<T>
  }
  view: Record<T, (AttributeDescriptor & {
    name?: string
  })>
  upcastAlso?: Record<T, (AttributeDescriptor & {
    name?: string
  }) | AttributeCreatorFunction>
  converterPriority?: PriorityString
}
