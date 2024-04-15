import { GET } from '@/pages/api/site.ts'
import type { Site } from '@/types'

export const setSite = async (Astro: any, page: Site = {}) => {
  let response = await GET(Astro)
  const defaults = await (response as Response).json()

  const slug = page.slug ?? ''
  const siteUrl = Astro.site ?? ''
  const canonicalUrl = page.canonicalUrl ?? `${siteUrl}${slug}`
  const site = {
    ...defaults,
    ...page,
    canonicalUrl,
  } as Site

  return site
}
