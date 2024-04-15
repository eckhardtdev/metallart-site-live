import type { Preset } from '@/components/shared/Button.astro'

type Replacement = {
  [key: string]: string
}

export const replaceButtonPreset = (
  preset: Preset,
  replacements: Replacement,
) => {
  if (!replacements) return preset

  const replacement = replacements[preset]

  return replacement ?? preset
}
