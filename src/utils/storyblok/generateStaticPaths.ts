import type { Hreflang } from '@/types/hreflang'
import { normalizePath, normalizeUrl, removeTrailingSlash } from '@/utils/url'
import { fetchStory } from '.'
import type { StoryblokLink } from './types'
import { getPageLocale } from './i18n'

type Site = {
  siteCountry: string
  siteDefaultLang: string
  siteLangs: string[]
  siteAlternates: string[]
  siteUrl: string
}

type DefaultPage = {
  language: string
  name: string
  slug: string
  fullSlug: string
  path: string
}

type Translation = {
  language: string
  name: string
  slug: string
  fullSlug: string
  path: string
}

type Alternate = {
  siteCountry: string
  language: string
  slug: string
  fullSlug: string
  path: string
}

export type AstroStoryblokPage = Site &
  DefaultPage & {
    translations: Translation[]
    alternates: Alternate[]
    hreflangs: Hreflang[]
  }

export const filterStoryLinks = (links: StoryblokLink[]) => {
  return (
    links
      // Whitelist
      .filter((link) => {
        const passed =
          link?.slug?.startsWith('jobs') ||
          link?.slug?.startsWith('news') ||
          link?.slug?.startsWith('projects') ||
          link?.slug?.startsWith('sites') ||
          link?.slug?.startsWith('knowledge-base') ||
          link?.slug?.startsWith('test')
        return passed
      })
      // Blacklist
      .filter((link) => {
        const block =
          link?.is_folder === true ||
          link?.slug?.endsWith('configuration') ||
          link?.slug?.endsWith('_config') ||
          link?.slug?.startsWith('contact-form-presets')

        return !block
      })
  )
}

export const generateStaticPaths = async (links) => {
  const pathsNew = links.map((link) => {
    const pageLocale = getPageLocale(link.slug)

    return {
      props: {
        page: {
          ...pageLocale,
          slug: link.slug,
        },
      },
      params: {
        slug: pageLocale?.sbSlug,
      },
    }
  })

  return pathsNew

  // const siteCountry = import.meta.env.SITE_SLUG || 'de'
  // const onlyPublished = import.meta.env.PUBLIC_STORYBLOK_VERSION === 'published'

  // const sites = {
  //   de: {
  //     siteCountry: 'de',
  //     siteDefaultLang: 'de',
  //     siteLangs: ['de', 'en'],
  //     siteAlternates: ['ch'],
  //     siteUrl: import.meta.env.SITE_URL,
  //   },
  //   ch: {
  //     siteCountry: 'ch',
  //     siteDefaultLang: 'ch',
  //     siteLangs: [],
  //     siteAlternates: ['de', 'en'],
  //     siteUrl: import.meta.env.SITE_URL,
  //   },
  // }

  // const resolveSlug = (slug: string) => {
  //   if (typeof slug !== 'string') return

  //   slug = slug.replace(/sites\/[\w\-_]+\//, '')
  //   if (slug === 'home') slug = ''

  //   return slug
  // }

  // const resolvePath = (slug: string, lang: string, defaultLang: string) => {
  //   if (typeof slug !== 'string') return

  //   const langPath = lang === defaultLang ? '' : lang
  //   const path = normalizePath(
  //     slug.startsWith(langPath) ? slug : `${langPath}/${slug}`,
  //   )

  //   return path
  // }

  // const linksMap = links.reduce((acc, link) => {
  //   acc[link.slug] = link
  //   return acc
  // }, {})

  // const site = sites[siteCountry]

  // const paths = []
  // for (const link of links) {
  //   // if (
  //   //   link.real_path === '/sites/de/beispielseite' ||
  //   //   link.real_path === '/test/text-block'
  //   // ) {
  //   //   console.log(link)
  //   // }
  //   let story
  //   try {
  //     // We need the story to get the country alternatives. These are not included in the link object.
  //     story = await fetchStory(link.slug)
  //   } catch (error) {
  //     if (link.slug === 'favicon.svg') {
  //       console.error(
  //         "Heads up: You have Astro's default favicon.svg somewhere linked, which leads to this error.",
  //         error,
  //       )
  //     }
  //     throw new Error(JSON.stringify(error))
  //   }

  //   if (!story) {
  //     throw new Error('No story found for link: ' + link)
  //   }
  //   const slug = resolveSlug(link.slug)

  //   const translations: Translation[] = link.alternates
  //     ? link.alternates
  //         .filter((alternate) => site.siteLangs.includes(alternate.lang))
  //         .filter((alternate) => alternate.published || !onlyPublished)
  //         .map((alternate) => {
  //           const alternateSlug = resolveSlug(alternate.translated_slug)
  //           const alternatePath = resolvePath(
  //             alternateSlug,
  //             alternate.lang,
  //             site.siteDefaultLang,
  //           )
  //           const translation: Translation = {
  //             language: alternate.lang,
  //             name: alternate.name,
  //             slug: alternateSlug,
  //             fullSlug: alternate.path,
  //             path: alternatePath,
  //           }
  //           return translation
  //         })
  //     : []
  //   const alternates: Alternate[] =
  //     story?.alternates
  //       .flatMap((alternate) => linksMap[alternate.full_slug]?.alternates)
  //       .filter((alternate) => site.siteAlternates.includes(alternate?.lang))
  //       .map((alternate) => {
  //         const alternateCountry = alternate.path.split('/')?.[1]
  //         if (!alternateCountry) return

  //         const alternateSite = sites[alternateCountry]
  //         if (!alternateSite) return

  //         const alternateSlug = resolveSlug(alternate.translated_slug)
  //         const alternatePath = resolvePath(
  //           alternateSlug,
  //           alternate.lang,
  //           alternateSite.siteDefaultLang,
  //         )
  //         return {
  //           siteCountry: alternateSite.siteCountry,
  //           language: alternate.lang,
  //           slug: alternateSlug,
  //           fullSlug: alternate.path,
  //           path: normalizeUrl(`${alternateSite.siteUrl}/${alternatePath}`),
  //         }
  //       })
  //       .filter(Boolean) ?? []

  //   const page: DefaultPage = {
  //     language: site.siteDefaultLang,
  //     name: link.name,
  //     slug,
  //     fullSlug: removeTrailingSlash(link.slug),
  //     path: `/${slug}`,
  //   }

  //   const pageProps = {
  //     ...site,
  //     ...page,
  //     translations: [...translations],
  //     alternates,
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
  //   }

  //   const path = {
  //     props: {
  //       page: pageProps,
  //     },
  //     params: {
  //       slug: pageProps.fullSlug,
  //     },
  //   }

  //   // if (
  //   //   link.real_path === '/sites/de/beispielseite' ||
  //   //   link.real_path === '/test/text-block'
  //   // ) {
  //   //   console.log(link, path)
  //   // }

  //   paths.push(path)

  //   // languages.forEach((language) => {
  //   //   //This slug will be used for fetching data from storyblok
  //   //   let slug = link.slug === 'home' ? undefined : link.slug
  //   //   let name = slug ? slug.split('/').pop() : undefined
  //   //   //This will be used for generating all the urls for astro
  //   //   let fullUrl =
  //   //     language === defaultLanguage ? slug : `${language}/${slug ?? ''}`
  //   //   let fullUrlId =
  //   //     language === defaultLanguage
  //   //       ? `${link.id}/${name}`
  //   //       : `${language}/${link.id}/${name ?? ''}`
  //   //   //This will let us change the url for diffrent versions
  //   //   let langSwitch = {}
  //   //   languages.forEach((lang) => {
  //   //     langSwitch = {
  //   //       ...langSwitch,
  //   //       [lang]:
  //   //         lang === defaultLanguage
  //   //           ? `/${slug ?? ''}`
  //   //           : `/${lang}/${slug ?? ''}`,
  //   //     }
  //   //   })
  //   //   paths.push({
  //   //     props: { language, slug, langSwitch },
  //   //     params: {
  //   //       slug: fullUrl,
  //   //       slugWithId: fullUrlId,
  //   //     },
  //   //   })
  //   // })
  // }
  // // console.log('paths', paths)
  // return paths
}
