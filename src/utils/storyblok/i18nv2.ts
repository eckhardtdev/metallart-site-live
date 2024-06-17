import { defaultLanguage } from '../langs'
import {
  addLeadingSlash,
  addTrailingSlash,
  removeLeadingSlash,
  removeTrailingSlash,
} from '../url'

type StoryLocaleConfig = {
  namespace: string
  lang: string
  sbConfigSlug: string
}

type StoryConfig = {
  namespace: string
  locales: Record<string, StoryLocaleConfig>
}
type StoryConfigs = Record<string, StoryConfig>
type StoryPathConfig = {
  path: string
  sbLang: string
  lang: string
  sbConfigSlug: string
  sbContentSlug: string
}

export const sbDefaultLang = 'de'
export const sbLanguages = ['en', 'de-ch']

// NOTE: Order matters to get more specific locales first
// '/de/global'
// '/ch/global'
// '/global'
// '/ch'
// '/de'
// '/'
export const storyConfigs: StoryConfigs = {
  'global/': {
    namespace: 'global',

    locales: {
      'default': {
        namespace: 'de',
        lang: 'de',
        sbConfigSlug: 'sites/germany/_config',
      },
      'de-ch': {
        namespace: 'ch',
        lang: 'de-ch',
        sbConfigSlug: 'sites/switzerland/_config',
      },
      'en': {
        namespace: '',
        lang: 'en',
        sbConfigSlug: 'sites/germany/_config',
      },
    },
  },
  'sites/switzerland': {
    namespace: '',
    locales: {
      // 'default': {
      //   namespace: 'ch',
      //   lang: 'de-ch',
      //   sbConfigSlug: 'sites/switzerland/_config',
      // },
      'de-ch': {
        namespace: 'ch',
        lang: 'de-ch',
        sbConfigSlug: 'sites/switzerland/_config',
      },
      // 'en': {
      //   namespace: 'ch-en',
      //   lang: 'en',
      //   sbConfigSlug: 'en/sites/switzerland/_config',
      // },
    },
  },
  'sites/germany': {
    namespace: '',
    locales: {
      'default': {
        namespace: 'de',
        lang: 'de',
        sbConfigSlug: 'sites/germany/_config',
      },
      'en': {
        namespace: '',
        lang: 'en',
        sbConfigSlug: 'sites/germany/_config',
      },
    },
  },
}

const getStoryConfigByPath = (sbContentSlug: string, config: StoryConfig) => {
  const siteNamespace = `${config.namespace}`
  const localeNS = Object.entries(config.locales).map(([sbLang, locale]) => ({
    path:
      (addLeadingSlash(
        [locale.namespace, siteNamespace].filter(Boolean).join('/'),
      ) as string) ?? '',
    sbLang,
    lang: locale.lang,
    sbConfigSlug: locale.sbConfigSlug,
    sbContentSlug,
  }))
  return localeNS
}

export const storyConfigByPath: StoryPathConfig[] = Object.entries(
  storyConfigs,
).flatMap(([sbContentSlug, config]) => {
  return getStoryConfigByPath(sbContentSlug, config)
})

export const [storyConfigFallback] = getStoryConfigByPath('en/sites/germany', {
  namespace: '',
  locales: {
    'default': {
      namespace: '',
      lang: 'en',
      sbConfigSlug: 'en/sites/germany/_config',
    },
  },
})

// export function getSbLangFromLocale(locale?: string) {
//   if (!locale) return 'default'

//   return sbLang
// }

export const getLanguageFromSbStory = ({
  full_slug,
  lang,
}: {
  full_slug: string
  lang: string
}) => {
  const config = getStoryConfig(full_slug)
  if (!config) return 'default'
  const sbLang = config.locales[lang]?.lang ?? 'default'
  return sbLang
}

export const splitLangFromSbSlug = (sbSlug: string) => {
  return removeLeadingSlash(removeTrailingSlash(sbSlug))?.split('/') ?? []
}

export const getLanguageFromSbSlug = (sbSlug: string) => {
  let [lang] = splitLangFromSbSlug(sbSlug)
  if (sbLanguages.includes(lang)) return lang
}

export function getSbSlugWithoutLang(sbSlug: string) {
  if (!sbSlug) return sbSlug
  let [lang, ...rest] = splitLangFromSbSlug(sbSlug)

  if (!sbLanguages.includes(lang)) return sbSlug
  return rest.join('/')
}

export const getStoryConfigKey = (sbSlugWithLang: string) => {
  const sbSlug = getSbSlugWithoutLang(sbSlugWithLang)
  return Object.keys(storyConfigs).find((key) => {
    return sbSlug?.startsWith(key)
  })
}

export const getStoryConfig = (sbSlug: string) => {
  const key = getStoryConfigKey(sbSlug)
  return key ? storyConfigs[key] : undefined
}

export const isSbLangSupported = (sbLang: string, config: StoryConfig) => {
  if (!sbLang || !config) return false
  return getLocaleForSbLang(sbLang, config) !== undefined
}

export const getLocaleForSbLang = (
  sbLang: string | undefined = undefined,
  config: StoryConfig | undefined = undefined,
) => {
  if (!config) return undefined
  if (!sbLang) return config?.locales?.default?.namespace
  const locale = config?.locales?.[sbLang]?.namespace
  return locale
}

export const getLocale = (sbSlug: string, config: StoryConfig) => {
  const sbLang = getLanguageFromSbSlug(sbSlug)
  const locale = getLocaleForSbLang(sbLang, config)
  return locale
}

export const getLangForSbLang = (
  sbLang: string | undefined = undefined,
  config: StoryConfig | undefined = undefined,
) => {
  if (!config) return undefined
  if (!sbLang) return config?.locales?.default?.lang
  const lang = config?.locales?.[sbLang]?.lang
  return lang
}

export const getLang = (sbSlug: string, config: StoryConfig) => {
  const sbLang = getLanguageFromSbSlug(sbSlug)
  const lang = getLangForSbLang(sbLang, config)
  return lang
}

export const getPath = (sbSlug: string, locale: string) => {
  if (sbSlug === undefined) return sbSlug

  let path = getSbSlugWithoutLang(sbSlug)
  // Remove sites/* from the path
  path = path.replace(/^\/?sites\/[^\/]*\/?/, '')
  if (locale) {
    path = `${locale}/${path}`
  }
  path = addLeadingSlash(addTrailingSlash(path))

  return path
}

// const isPublished = import.meta.env.PUBLIC_STORYBLOK_VERSION === 'published'
// const isPublished = import.meta.env.PUBLIC_ENV === 'production'
const siteUrl = import.meta.env.SITE_URL

// const localeBySbLanguage = isPublished
//   ? {
//       'en': '',
//       'de': 'de',
//       'de-ch': 'ch',
//     }
//   : {
//       'en': 'en',
//       'de': '',
//       'de-ch': 'de-ch',
//     }
// const sbCountryConfigs = {
//   'sites/germany': {
//     country: 'de',
//     siteSlug: 'sites/germany',
//     languages: ['default', 'en'],
//     defaultLocale: '',
//   },
//   'sites/switzerland': {
//     country: 'ch',
//     siteSlug: 'sites/switzerland',
//     languages: ['default'],
//     defaultLocale: 'ch',
//   },
// }

// function getSbLangFromSlug(sbSlug: string) {
//   if (!sbSlug) return 'default'
//   let [lang] = removeLeadingSlash(sbSlug)?.split('/') ?? []

//   if (!sbLanguages.includes(lang)) return 'default'
//   return lang
// }

// export function getLocaleFromSbSlug(sbSlug: string) {
//   // sites/switzerland/test
//   if (!sbSlug) return sbSlug

//   const countrySlug = getSbSlugWithoutLang(sbSlug)
//     .split('/')
//     .slice(0, 2)
//     .join('/')
//   const countryConfig = sbCountryConfigs[countrySlug]
//   const sbLang = getSbLangFromSlug(sbSlug)
//   const localeByLang = localeBySbLanguage[sbLang]
//   const locale =
//     countryConfig && localeByLang === sbDefaultLang
//       ? countryConfig.defaultLocale
//       : localeByLang

//   return locale
// }

export function getPathFromSbSlug(slug: string) {
  const sbSlug = removeTrailingSlash(removeLeadingSlash(slug))

  const config = getStoryConfig(sbSlug)
  const locale = config !== undefined ? getLocale(sbSlug, config) : undefined
  const path = locale !== undefined ? getPath(sbSlug, locale) : undefined

  return path
}

// export function getPathFromSbSlug(sbSlug: string, isProduction = true) {
//   if (!sbSlug) return sbSlug
//   if (!isProduction) return sbSlug

//   // sbSlug is something like:
//   // sites/germany/beispielseite
//   // en/sites/germany/sample-page
//   // en/sites/switzerland/beispielseite-schweiz
//   // de-ch/sites/switzerland/beispielseite-schweiz

//   const locale = getLocaleFromSbSlug(sbSlug)

//   let path = getSbSlugWithoutLang(sbSlug)

//   // Remove sites/* from the path
//   path = path.replace(/^\/?sites\/[^\/]*\/?/, '')

//   if (locale) {
//     path = `${locale}/${path}`
//   }
//   path = addLeadingSlash(addTrailingSlash(path))

//   return path
// }

export function isDefaultSite(sbSlug) {
  // return !sbSlug.startsWith('sites/') || sbSlug.startsWith('sites/germany')
  return true
}

export function getLocalizedPages(link) {
  if (!link) return []

  const sbSlug = removeTrailingSlash(link.slug)

  const config = getStoryConfig(sbSlug)
  const locale = config ? getLocale(sbSlug, config) : undefined
  const lang = config ? getLang(sbSlug, config) : undefined
  const path = locale !== undefined ? getPath(sbSlug, locale) : undefined

  console.log('config', sbSlug, locale, lang)

  // {
  //   sbLanguage: 'de',
  //   sbSlug: 'sites/switzerland/test',
  //   locale: 'de',
  //   path: '/de/test/'
  // }
  const defaultPage = {
    sbLanguage: 'default',
    sbSlug,
    lang,
    locale,
    path,
  }

  // console.log('siteCountrySlug', link.slug, defaultPage)

  const alternatePages =
    link.alternates
      // ?.filter(
      //   (alternate) => !isPublished || (isPublished && alternate.published),
      // )
      ?.filter((alternate) => {
        // if (!countryConfig) {
        //   // No country config found, so only render page if it's a global story
        //   return !sbSlug.startsWith('sites/')
        // }

        // console.log(
        //   'Check alternate',
        //   alternate.translated_slug,
        //   siteCountrySlug,
        //   alternate.lang,
        // )
        const isSupportedLanguage = isSbLangSupported(
          alternate.lang,
          config as StoryConfig,
        )
        // console.log(
        //   'isSupportedLanguage',
        //   alternate.translated_slug,
        //   alternate.lang,
        //   isSupportedLanguage,
        // )
        return Boolean(isSupportedLanguage)
      })
      .map((alternate) => {
        const sbSlug = removeTrailingSlash(alternate.translated_slug)
        const sbLanguage = alternate.lang
        const sbFullSlug = `${sbLanguage}/${sbSlug}`
        const locale = config ? getLocale(sbFullSlug, config) : undefined
        const lang = config ? getLang(sbFullSlug, config) : undefined
        // console.log(`-------> ${sbFullSlug} -> ${lang}`)
        const path =
          locale !== undefined ? getPath(sbFullSlug, locale) : undefined

        const page = {
          sbLanguage,
          sbSlug: sbFullSlug,
          lang,
          locale,
          path,
        }

        return page
      }) ?? []

  const pages = [defaultPage, ...alternatePages].filter(Boolean)

  pages.forEach((page) => {
    console.log('PAGE', page.path, page.sbSlug)
  })

  const hreflangs = [
    ...pages
      .filter((page) => !page.locale)
      .slice(0, 1)
      .map((page) => ({
        href: `${siteUrl}${page.path}`,
        hreflang: 'x-default',
      })),
    ...pages.map((page) => ({
      href: `${siteUrl}${page.path}`,
      hreflang: page.lang,
    })),
  ]

  // console.log(`--------------------\n${link.slug}\n--------------------`)
  // console.log('link', link)
  // console.log('pages', pages)
  // console.log('hreflangs', hreflangs)

  //     hreflangs: [
  //       {
  //         language: page.language,
  //         url: normalizeUrl(`${site.siteUrl}/${page.path}`),
  //       },
  //       {
  //         language: 'x-default',
  //         url: normalizeUrl(`${site.siteUrl}/${page.path}`),
  //       },
  //       ...translations?.map((translation) => ({
  //         language: translation.language,
  //         url: normalizeUrl(`${site.siteUrl}/${translation.path}`),
  //       })),
  //       ...alternates.map((alternate) => ({
  //         language: alternate.language,
  //         url: alternate.path,
  //       })),
  //     ],

  // link {
  //   id: 449890548,
  //   uuid: 'f9c2735c-22bd-4cc9-bcde-ce6a58eff220',
  //   slug: 'sites/germany/',
  //   path: null,
  //   parent_id: 434272520,
  //   name: 'Home Page',
  //   is_folder: false,
  //   published: true,
  //   is_startpage: true,
  //   position: -190,
  //   real_path: '/sites/germany/',
  //   alternates: [
  //     {
  //       path: '/',
  //       name: null,
  //       lang: 'de-ch',
  //       published: null,
  //       translated_slug: 'sites/germany/'
  //     },
  //     {
  //       path: '/',
  //       name: null,
  //       lang: 'en',
  //       published: null,
  //       translated_slug: 'sites/germany/'
  //     }
  //   ]
  // }
  // pages [
  //   {
  //     sbLanguage: 'de',
  //     sbSlug: 'sites/germany',
  //     locale: 'de',
  //     path: '/de/'
  //   },
  //   {
  //     sbLanguage: 'en',
  //     sbSlug: 'en/sites/germany',
  //     locale: '',
  //     path: '/'
  //   }
  // ]

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

export function getSbSiteFromUrl(urlStr): StoryPathConfig {
  // https://www.metallart.com/ch/test/

  if (!urlStr) return storyConfigFallback

  // console.log('getSbSiteFromUrl urlStr', urlStr)
  const url = new URL(urlStr)
  // console.log('getSbSiteFromUrl url', url)
  const path = url.pathname
  const storyPathConfig =
    storyConfigByPath.find((config) => path.startsWith(config.path)) ??
    storyConfigFallback

  return storyPathConfig
}
