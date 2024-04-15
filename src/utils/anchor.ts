import { slugify } from './slug'
import type { AnchorLink } from '@/components/shared/AnchorNavigation.astro'

export const getAnchor = (anchor?: string): AnchorLink | undefined => {
  if (!anchor) return undefined

  const id = slugify(anchor) ?? ''
  const href = `#${id}`
  const label = anchor

  return { id, href, label }
}
