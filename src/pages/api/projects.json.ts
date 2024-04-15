import { defaultLanguage, languages } from '@/utils'
import { fetchStories } from '@/utils/storyblok'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams
  console.log('filters', params.get('filters'))
  const tags = params.get('tags')?.split(',') ?? []
  const category = params.get('category')
  const languageRequested = params.get('language') ?? defaultLanguage
  const language = languages.includes(languageRequested)
    ? languageRequested
    : defaultLanguage

  // https://api.storyblok.com/v2/cdn/stories?content_type=Post&starts_with=posts%2Fsample&token=[TOKEN]
  const stories = await fetchStories({
    language,
    content_type: 'Project',
    // starts_with: category ? `posts/${category}` : 'posts',
    // ...(tags && tags.length && { with_tag: tags.join(',') }),
  })

  return new Response(
    JSON.stringify({
      stories,
    }),
    {
      status: 200,
    },
  )
}
