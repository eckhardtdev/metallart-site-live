import type { ConfigurationStoryblok } from '@/types/storyblok'
import { fetchStories } from '@/utils/storyblok'
import { resolveFullSlug } from '@/utils/storyblok/resolveSlug'

const configs = {}

type SiteConfiguration = {
  id: string
  name: string
  homePageSlug: string
  projectsSlug?: string
  config: ConfigurationStoryblok
}

export const fetchSiteConfig = async (params): Promise<SiteConfiguration> => {
  const { site = 'germany', lang = undefined } = params
  const siteSlug = `sites/${site}/*`

  const [config] =
    (await fetchStories({
      content_type: 'Configuration',
      by_slugs: siteSlug,
      language: lang,
      resolve_links: 'url',
    })) ?? []

  const [projectArchive] =
    (await fetchStories({
      content_type: 'ProjectArchive',
      by_slugs: siteSlug,
      language: lang,
      resolve_links: 'url',
    })) ?? []

  const homePageSlug = config?.content?.homePage?.story?.full_slug

  return {
    id: site,
    name: config.name,
    homePageSlug,
    projectsSlug: resolveFullSlug(projectArchive?.full_slug),
    config: config.content as ConfigurationStoryblok,
  }
}

export const useSiteConfig = async (params): Promise<SiteConfiguration> => {
  const { site = 'germany', lang = 'de-de' } = params
  const configId = `${site}-${lang}`

  let config = configs[configId]
  if (!config) {
    config = await fetchSiteConfig(params)
    configs[configId] = config
  }

  return config
}
