import { newsSortBy } from '@/utils/metallart'
import { fetchStories } from '@/utils/storyblok'
import { buildFilterQueryFromParams } from '@/utils/storyblok/datasource-field-mapping'
import { getSbLanguageFromLocale } from '@/utils/storyblok/i18n'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const filter_query = buildFilterQueryFromParams(params.filters)
  const searchParams = new URL(request.url).searchParams
  const requestParams = searchParams ? Object.fromEntries(searchParams) : {}
  const language = getSbLanguageFromLocale(params.locale, true)

  // TODO: Add pagination for projects
  const storyQuery = {
    language,
    content_type: 'NewsArticle',
    // per_page: 100,
    sort_by: newsSortBy,
    ...(filter_query ? { filter_query } : undefined),
  }
  const stories = await fetchStories(storyQuery)

  return new Response(
    JSON.stringify({
      stories,
      meta: requestParams,
    }),
    {
      status: 200,
    },
  )
}
