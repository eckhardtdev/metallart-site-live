import type { ConfigurationStoryblok } from '@/types/storyblok'
import { fetchStories } from '@/utils/storyblok'
import {
  getPathFromSbSlug,
  getSbSiteFromUrl,
  getStoryConfig,
} from './storyblok/i18nv2'

const configs = {}

type SiteConfiguration = {
  id: string
  name: string
  homePageSlug: string
  projectsSlug?: string
  newsSlug?: string
  jobsSlug?: string
  storyConfig: ReturnType<typeof getStoryConfig>
  showLanguageSwitcher: boolean
  config: ConfigurationStoryblok
}

export const fetchSiteConfig = async (
  slug: string,
  language: string,
): Promise<SiteConfiguration> => {
  const [sbConfigStory] =
    (await fetchStories({ by_slugs: slug, language })) ?? []
  const sbConfig = sbConfigStory?.content as ConfigurationStoryblok

  // IDEA: maybe use "contains" instead of "startsWith" to cover "en/sites/switzerland/"
  const showLanguageSwitcher = !slug.startsWith('sites/switzerland')

  // console.log(
  //   'ueSiteConfig.ts: slug',
  //   language,
  //   sbConfig?.projectArchiveLink?.story?.full_slug,
  //   getPathFromSbSlug(sbConfig?.projectArchiveLink?.story?.full_slug),
  // )

  return {
    id: slug,
    name: sbConfigStory?.name as string,
    homePageSlug: getPathFromSbSlug(sbConfig?.homePage?.story?.full_slug),
    projectsSlug: getPathFromSbSlug(
      sbConfig?.projectArchiveLink?.story?.full_slug,
    ),
    newsSlug: getPathFromSbSlug(sbConfig?.newsArchiveLink?.story?.full_slug),
    jobsSlug: getPathFromSbSlug(sbConfig?.jobListingPage?.story?.full_slug),
    storyConfig: getStoryConfig(slug),
    showLanguageSwitcher,
    config: sbConfig,
  }

  // const { site = 'germany', lang = undefined } = params
  // const siteSlug = `sites/${site}/*`

  // const [config] =
  //   (await fetchStories({
  //     content_type: 'Configuration',
  //     by_slugs: siteSlug,
  //     language: lang,
  //     resolve_links: 'url',
  //   })) ?? []

  // const [projectArchive] =
  //   (await fetchStories({
  //     content_type: 'ProjectArchive',
  //     by_slugs: siteSlug,
  //     language: lang,
  //     resolve_links: 'url',
  //   })) ?? []

  // const homePageSlug = config?.content?.homePage?.story?.full_slug

  // const { href: projectArchiveUrl } =
  //   applyLinkAttrs(projectArchive?.full_slug) ?? {}

  // return {
  //   id: site,
  //   name: config?.name,
  //   homePageSlug,
  //   projectsSlug: projectArchiveUrl,
  //   config: config?.content as ConfigurationStoryblok,
  // }
}

export const useSiteConfig = async (params): Promise<SiteConfiguration> => {
  const storyPathConfig = getSbSiteFromUrl(params.url?.href)

  let config = configs[storyPathConfig.sbConfigSlug]
  if (!config) {
    config = await fetchSiteConfig(
      storyPathConfig.sbConfigSlug,
      storyPathConfig.sbLang,
    )
    if (config) {
      configs[storyPathConfig.sbConfigSlug] = config
    }
  }

  // console.log('storyPathConfig', storyPathConfig)
  // console.log('config', config)

  return config
}
