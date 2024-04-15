// import spacing from '../../public/__spacing.json'

const spacing: Spacing = {
  'auto': {
    cmsLabel: 'Automatisch',
  },
  'none': {
    cmsLabel: 'Kein Abstand',
    classes: '!mt-0',
  },
  'xs': {
    cmsLabel: 'xs',
    classes: 'mt-5',
  },
  'sm': {
    cmsLabel: 'sm',
    classes: 'mt-10',
  },
  'md': {
    cmsLabel: 'md',
    classes: 'mt-15',
  },
  'lg': {
    cmsLabel: 'lg',
    classes: 'mt-25',
  },
  'xl': {
    cmsLabel: 'xl',
    classes: 'mt-50',
  },
}

type Spacing = {
  [key in string]: {
    cmsLabel: string
    classes?: string
  }
}

type SpacingKey = keyof typeof spacing

export const addSpacing = (spacingKey: SpacingKey, defaultSpacing = '') => {
  return spacing[spacingKey]?.classes ?? spacing[defaultSpacing]?.classes
}
