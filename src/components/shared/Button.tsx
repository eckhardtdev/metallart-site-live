import React from 'react'
import { defineInk } from '@/utils/ink'
import { config } from './Button.ink'
import { ButtonArrow } from './ButtonArrow'

const presets = {
  'primary-dark': {
    variant: 'contained',
    color: 'spark',
  },
  'primary-light': {
    variant: 'contained',
    color: 'spark',
  },
  'secondary-dark': {
    variant: 'contained',
    color: 'white',
  },
  'secondary-light': {
    variant: 'contained',
    color: 'white',
  },
  'outline-dark': {
    variant: 'outlined',
    color: 'steel',
  },
  'outline-light': {
    variant: 'outlined',
    color: 'white',
  },
  'link-dark': {
    variant: 'link',
    color: 'spark',
    arrow: 'right',
  },
  'link-light': {
    variant: 'link',
    color: 'white',
    arrow: 'right',
  },
}

export type Color = 'DEFAULT' | 'spark' | 'white'

export type Variant = 'DEFAULT' | 'contained' | 'outlined'

export type Size = 'DEFAULT'

export type Preset = keyof typeof presets

export type Arrow = 'none' | 'left' | 'right'

export type Props = {
  as?: string
  class?: string
  label?: string
  variant?: Variant
  color?: Color
  size?: Size
  arrow?: Arrow
  preset?: Preset
}

export function Button(props) {
  let { as: Component, class: className, preset, label, ...rest } = props

  const presetProps = presets[preset] || presets['link-dark']
  const inkProps = {
    variant: props?.variant ?? presetProps.variant,
    color: props?.color ?? presetProps.color,
    size: props?.size ?? presetProps.size,
  }
  const arrow = props?.arrow || presetProps.arrow

  const { ink, inkProp } = defineInk({
    config,
    ...inkProps,
  })

  if (!Component) {
    Component = rest?.href ? 'a' : 'button'
  }

  return (
    <Component className={ink('root', className)} {...rest}>
      {arrow === 'left' && inkProp('showArrow') && <ButtonArrow />}
      <span className={ink('label', 'inline-block')}>{label}</span>
      {arrow === 'right' && inkProp('showArrow') && <ButtonArrow />}
    </Component>
  )
}
