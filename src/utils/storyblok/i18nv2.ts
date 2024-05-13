import {
  addLeadingSlash,
  addTrailingSlash,
  removeLeadingSlash,
  removeTrailingSlash,
} from '../url'

const isPublished = import.meta.env.PUBLIC_STORYBLOK_VERSION === 'published'

const sbDefaultLang = 'de'
const sbLanguages = ['en', 'de-ch']
const localeBySbLanguage = isPublished
  ? {
      'en': '',
      'de': 'de',
      'de-ch': 'ch',
    }
  : {
      'en': 'en',
      'de': '',
      'de-ch': 'de-ch',
    }
const sbCountryConfigs = {
  'sites/germany': {
    country: 'de',
    siteSlug: 'sites/germany',
    languages: ['default', 'en'],
  },
  'sites/switzerland': {
    country: 'ch',
    siteSlug: 'sites/switzerland',
    languages: ['ch'],
  },
}

function getSbLangFromSlug(sbSlug: string) {
  if (!sbSlug) return sbDefaultLang
  let [lang] = removeLeadingSlash(sbSlug)?.split('/') ?? []

  if (!sbLanguages.includes(lang)) return sbDefaultLang
  return lang
}

export function getLocaleFromSbSlug(sbSlug: string) {
  const sbLang = getSbLangFromSlug(sbSlug)
  const locale = localeBySbLanguage[sbLang]

  return locale
}

export function getSbSlugWithoutLang(sbSlug: string) {
  if (!sbSlug) return sbSlug
  let [lang, ...rest] =
    removeLeadingSlash(removeTrailingSlash(sbSlug))?.split('/') ?? []

  if (!sbLanguages.includes(lang)) return sbSlug
  return rest.join('/')
}

export function getPathFromSbSlug(sbSlug: string, isProduction = true) {
  if (!sbSlug) return sbSlug
  if (!isProduction) return sbSlug

  // sbSlug is something like:
  // sites/germany/beispielseite
  // en/sites/germany/sample-page
  // de-ch/sites/switzerland/beispielseite-schweiz

  const locale = getLocaleFromSbSlug(sbSlug)

  let path = getSbSlugWithoutLang(sbSlug)

  // Remove sites/* from the path
  path = path.replace(/^\/?sites\/[^\/]*\/?/, '')

  if (locale) {
    path = `${locale}/${path}`
  }
  path = addLeadingSlash(addTrailingSlash(path))

  return path
}

export function isDefaultSite(sbSlug) {
  return !sbSlug.startsWith('sites/') || sbSlug.startsWith('sites/germany')
}

export function getLocalizedPages(link) {
  if (!link) return []

  const sbSlug = removeTrailingSlash(link.slug)
  const sbLanguage = sbDefaultLang
  const locale = getLocaleFromSbSlug(sbSlug)
  const path = getPathFromSbSlug(sbSlug)

  // If slug starts with "site/" only render the default country
  const defaultPage = isDefaultSite(sbSlug)
    ? {
        sbLanguage,
        sbSlug,
        locale,
        path,
      }
    : undefined

  const alternatePages =
    link.alternates
      // ?.filter(
      //   (alternate) => !isPublished || (isPublished && alternate.published),
      // )
      ?.filter((alternate) => {
        const siteCountrySlug = alternate.translated_slug
          .split('/')
          .slice(0, 2)
          .join('/')
        const countryConfig = sbCountryConfigs[siteCountrySlug]
        if (!countryConfig) {
          // No country config found, so only render page if it's a global story
          return !sbSlug.startsWith('sites/')
        }

        // console.log(
        //   'Check alternate',
        //   alternate.translated_slug,
        //   siteCountrySlug,
        //   alternate.lang,
        // )
        const isSupportedLanguage = countryConfig.languages.includes(
          alternate.lang,
        )
        // console.log('isSupportedLanguage', isSupportedLanguage)
        return isSupportedLanguage
      })
      .map((alternate) => {
        const sbSlug = removeTrailingSlash(alternate.translated_slug)
        const sbLanguage = alternate.lang
        const sbFullSlug = `${sbLanguage}/${sbSlug}`
        const locale = getLocaleFromSbSlug(sbFullSlug)
        const path = getPathFromSbSlug(sbFullSlug)

        const page = {
          sbLanguage,
          sbSlug: sbFullSlug,
          locale,
          path,
        }

        return page
      }) ?? []

  const pages = [defaultPage, ...alternatePages].filter(Boolean)

  return pages
}

export function getLocalizedPaths(link) {
  const pages = getLocalizedPages(link)
  const paths = pages.map((page) => {
    return {
      props: { page },
      params: { slug: page.path },
    }
  })
  return paths
}
