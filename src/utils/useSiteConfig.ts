import type { ConfigurationStoryblok } from '@/types/storyblok'
import { fetchStories } from '@/utils/storyblok'
import { getSbSiteFromUrl, getStoryConfig } from './storyblok/i18nv2'

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

  return {
    id: slug,
    name: sbConfigStory?.name as string,
    homePageSlug: sbConfig?.homePage?.story?.full_slug,
    projectsSlug: sbConfig?.projectArchiveLink?.story?.full_slug,
    newsSlug: sbConfig?.newsArchiveLink?.story?.full_slug,
    jobsSlug: sbConfig?.jobListingPage?.story?.full_slug,
    storyConfig: getStoryConfig(slug),
    showLanguageSwitcher,
    config: sbConfig,
  }
}

export const useSiteConfig = async (params): Promise<SiteConfiguration> => {
  const storyPathConfig = getSbSiteFromUrl(params.url?.href)

  const configKey = `${storyPathConfig.sbLang}/${storyPathConfig.sbConfigSlug}`

  let config = configs[configKey]
  if (!config) {
    config = await fetchSiteConfig(
      storyPathConfig.sbConfigSlug,
      storyPathConfig.sbLang,
    )
    if (config) {
      configs[configKey] = config
    }
  }

  return config
}
