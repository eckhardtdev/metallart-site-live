// import type { GetLocaleOptions } from 'astro:i18n'
// import { getRelativeLocaleUrl } from 'astro:i18n'
import {
  removeLeadingSlash,
  removeTrailingSlash,
  addTrailingSlash,
  addLeadingSlash,
} from '@/utils/url'

const isPublished = import.meta.env.PUBLIC_STORYBLOK_VERSION === 'published'

const sbSiteForLocale = {
  'en': 'germany',
  'de': 'germany',
  'ch': 'switzerland',
}

const sbLanguages = ['en', 'de-ch']

const sbLanguagesForLocale = {
  'en': 'en',
  'de': 'de',
  'ch': 'de-ch',
  'de-ch': 'de-ch',
}

const localeForSbLanguage = {
  'en': '',
  'de': 'de',
  'de-ch': 'ch',
}

export const sbDefaultLang = 'de'

function getDefaultLocale() {
  return isPublished ? 'en' : 'de'
}

function getLocales() {
  return isPublished ? ['en', 'de', 'ch'] : ['de', 'en', 'de-ch']
}

export function getSbLanguageFromLocale(
  locale?: string,
  excludeDefault = false,
) {
  if (!locale) return

  let lang = sbLanguagesForLocale[locale] ?? sbDefaultLang
  let sbLang = excludeDefault && lang === sbDefaultLang ? 'default' : lang
  // console.log('getSbLanguageFromLocale', sbLang)
  return sbLang
}

export function getSbLanguage(locale: string) {
  const lang = sbLanguagesForLocale[locale]
  if (!lang) {
    return sbDefaultLang
  }
  return lang
}

function getSbLangFromSlug(slug: string) {
  if (!slug) return sbDefaultLang
  let [lang] = removeLeadingSlash(slug)?.split('/') ?? []

  if (!sbLanguages.includes(lang)) return sbDefaultLang
  return lang
}

function getLocaleFromSlug(slug: string) {
  let [locale, globalContentLocale] = slug.split('/')

  if (locale === 'global') {
    locale = globalContentLocale
  }

  if (!getLocales().includes(locale)) return getDefaultLocale()
  return locale
}

function getSbSlugFromAstroSlug(astroSlug: string) {
  if (!isPublished) return astroSlug

  astroSlug = removeTrailingSlash(astroSlug)
  const locale = getLocaleFromSlug(astroSlug)
  const sbLang = getSbLanguage(locale)

  const regex = new RegExp(`^${locale}/?`)
  let slug = astroSlug.replace(regex, '').replace('/index.htm', '')

  // console.log('SLUG astroSlug', astroSlug)
  // console.log('SLUG locale', locale)
  // console.log('SLUG sbLang', sbLang)
  // console.log('SLUG slug', slug)

  // /samplepage               -> /en/sites/germany/samplepage
  // /de/beispielseite         -> /sites/germany/beispielseite
  // /ch                       -> /de-ch/sites/switzerland
  // /ch/beispielseite-schweiz -> /de-ch/sites/switzerland/beispielseite-schweiz
  // /global/de/projekte       -> /global/projekte
  // /global/en/projects       -> /en/global/projects

  if (slug.startsWith('global/')) {
    slug = slug.replace(`global/${locale}`, 'global')
  } else {
    // Storyblok folder 'sites'
    const site = 'sites/' + sbSiteForLocale[locale]
    slug = site + '/' + slug
  }

  if (locale === getDefaultLocale()) {
    slug = `${sbLang}/${slug}`
  } else {
    // const regex = new RegExp(`^${locale}`)
    // slug = slug.replace(regex, '')
    const prefix = sbLang === sbDefaultLang ? '' : sbLang
    slug = removeLeadingSlash(prefix + '/' + slug) ?? ''
  }

  return slug
}

export function getLocalePath(sbSlug: string) {
  if (!isPublished) return sbSlug
  if (!sbSlug) return sbSlug

  const sbLang = getSbLangFromSlug(sbSlug)
  const regex = new RegExp(`^/\?${sbLang}/?`)
  let slug = sbSlug
    // Remove locale
    .replace(regex, '')
    // Remove sites/*/
    .replace(/^\/?sites\/[^\/]*\/?/, '')

  const locale = localeForSbLanguage[sbLang]

  let path = ''

  const isGlobalContent =
    sbSlug.match(/^(\/?[a-z]{2})?(\/?-[a-z]{2})?\/?global/) !== null

  if (isGlobalContent) {
    const globalSlug = removeLeadingSlash(slug) ?? 'global'
    const parts = globalSlug.split('/')
    const globalLocale = locale === '' ? getDefaultLocale() : locale

    // if (parts[0] === 'global') {
    //   slug = [parts[0], globalLocale, ...parts.slice(1)].join('/')
    // } else {
    //   slug = [parts[1], globalLocale, ...parts.slice(2)].join('/')
    // }

    if (parts[0] === 'global') {
      slug = [parts[0], ...parts.slice(1)].join('/')
    } else {
      slug = [parts[1], ...parts.slice(2)].join('/')
    }

    path = slug
  } else {
    // REVIEW: getRelativeLocaleUrl is not working on client side (used with AlpineJS)
    // const path = getRelativeLocaleUrl(locale, slug)
  }
  path = locale === getDefaultLocale() ? `${slug}` : `${locale}/${slug}`

  path = addTrailingSlash(addLeadingSlash(path)) ?? ''

  // console.log('-----getLocalePath-----')
  // console.log('isGlobalContent?', isGlobalContent)
  // console.log('sbLang', sbLang)
  // console.log('sbSlug', sbSlug)
  // console.log('locale', locale)
  // console.log('slug', slug)
  // console.log('path', path)

  // /en/sites/germany/samplepage

  return path
}

export function getPageLocale(astroSlug = '') {
  // if (!astroSlug) return undefined

  // In preview de-ch in production ch
  const locale = getLocaleFromSlug(astroSlug)
  const sbLang = getSbLanguage(locale)
  const path = astroSlug
  // const path = getLocalePath(astroSlug)
  // const path = getLocaleUrl(astroSlug)
  const sbSlug = getSbSlugFromAstroSlug(astroSlug)

  const page = {
    sbLanguage: sbLang === sbDefaultLang ? 'default' : sbLang,
    locale,
    path,
    sbSlug,
  }

  return page
}
