import siteDefaults from '@/site.config'
import type { APIRoute } from 'astro'

const env = import.meta.env.PUBLIC_ENV
const languages = import.meta.env.PUBLIC_LANGUAGES
const defaultLanguage = import.meta.env.PUBLIC_DEFAULT_LANGUAGE ?? 'de'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      env,
      ...siteDefaults,
      languages,
      defaultLanguage,
    }),
  )
}
