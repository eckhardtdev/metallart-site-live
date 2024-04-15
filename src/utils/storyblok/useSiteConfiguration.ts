import { fetchStories } from '.'
import { getSbLanguage, sbDefaultLang } from './i18n'

const localeConfig = {
  'de': 'sites/germany',
  'en': 'sites/germany',
  'ch': 'sites/switzerland',
  'de-ch': 'sites/switzerland',
}

export async function useSiteConfiguration(locale: string) {
  const sbLang = getSbLanguage(locale)
  const siteSlug = localeConfig[sbLang] || localeConfig[sbDefaultLang]

  const stories = await fetchStories({
    starts_with: siteSlug,
    content_type: 'Configuration',
    language: sbLang,
  })

  const [siteConfig] = stories ?? []
  const { content } = siteConfig
  return content
}
