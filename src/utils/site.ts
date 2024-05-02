import siteDefaults from '@/site.config'
import type { Site } from '@/types'

const env = import.meta.env.PUBLIC_ENV
const languages = import.meta.env.PUBLIC_LANGUAGES
const defaultLanguage = import.meta.env.PUBLIC_DEFAULT_LANGUAGE ?? 'de'

export const setSite = async (Astro: any, page: Site = {}) => {
  const defaults = {
    env,
    ...siteDefaults,
    languages,
    defaultLanguage,
  }

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
