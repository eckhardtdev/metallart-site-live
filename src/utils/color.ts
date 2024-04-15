import { replaceButtonPreset as replacePreset } from './button'
import { setDefinedString } from './string'

export const colorConfig = {
  'DEFAULT': {
    containerColor: 'text-body bg-cream',
    proseColor: '',
    muteColor: 'text-steel',
    theme: 'dark',
    addPadding: false,
  },
  '#f2f2f2': {
    containerColor: 'text-body bg-cream',
    proseColor: '',
    muteColor: 'text-steel',
    theme: 'dark',
    addPadding: false,
  },
  '#ffffff': {
    containerColor: 'text-body bg-white',
    proseColor: '',
    muteColor: 'text-steel',
    theme: 'dark',
    addPadding: true,
  },
  '#00474f': {
    containerColor: 'text-white bg-velvet',
    proseColor: 'prose-white',
    muteColor: 'text-white',
    theme: 'light',
    addPadding: true,
    buttonPresetReplacements: {
      'primary': 'secondary',
    },
  },
  '#ad9467': {
    containerColor: 'text-white bg-gold',
    proseColor: 'prose-white',
    muteColor: 'text-white',
    theme: 'light',
    addPadding: true,
    buttonPresetReplacements: {
      'primary': 'secondary',
    },
  },
  '#f9685d': {
    containerColor: 'text-white bg-spark',
    proseColor: 'prose-white',
    muteColor: 'text-white',
    theme: 'light',
    addPadding: true,
    buttonPresetReplacements: {
      'primary': 'secondary',
    },
  },
  '#363f46': {
    containerColor: 'text-white bg-steel',
    proseColor: 'prose-white',
    muteColor: 'text-white',
    theme: 'light',
    addPadding: true,
  },
}

export const getBlokColorClasses = (blok) => {
  const bgColor = setDefinedString(blok.backgroundColor?.value, '')
  const config = colorConfig[bgColor] || colorConfig['DEFAULT']

  config.replaceButtonPreset = function replaceButtonPreset(buttons) {
    if (!buttons || !buttons.length) return buttons
    if (!config.buttonPresetReplacements) return buttons

    buttons = buttons.map((button) => ({
      ...button,
      preset:
        typeof button.preset === 'string'
          ? replacePreset(button.preset, config.buttonPresetReplacements)
          : button.preset,
    }))

    return buttons
  }

  return config
}
