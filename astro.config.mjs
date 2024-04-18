import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import alpine from '@astrojs/alpinejs'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import storyblok from '@storyblok/astro'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import { components } from './storyblok.config.mjs'
import { interceptor } from './storyblok/interceptor.js'

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// TODO: CSP Integration https://app.netlify.com/sites/reliable-rabanadas-659a34/integrations/security

const isPublished = env.PUBLIC_STORYBLOK_VERSION === 'published'
// TODO: Condition based on PUBLIC_ENV
const output = env.PUBLIC_ENV === 'production' ? 'hybrid' : 'server'
const storyblokBridge = env.PUBLIC_ENV !== 'production'
console.log('environment', env.PUBLIC_ENV)
console.log('storyblok version', env.PUBLIC_STORYBLOK_VERSION)
console.log('storyblok bridge', storyblokBridge)
console.log('astro output', output)
console.log('site url', env.SITE_URL)
const i18n = {
  defaultLocale: isPublished ? 'en' : 'de',
  locales: [
    'de',
    'en',
    {
      path: 'ch',
      // no slashes included
      codes: ['de-ch', 'ch'],
    },
  ],
  routing: {
    prefixDefaultLocale: false,
  },
}

// https://astro.build/config
export default defineConfig({
  site: env.SITE_URL,
  i18n,
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      // Using the Storyblok Bridge
      // https://github.com/storyblok/storyblok-astro?tab=readme-ov-file#using-the-storyblok-bridge
      bridge: storyblokBridge
        ? {
            preventClicks: true,
          }
        : undefined,
      apiOptions: {
        // Choose your Storyblok space region
        region: 'eu',
        // TODO: Not working. Idea intercepting the response and adding width/height to svgs
        responseInterceptor: interceptor,
      },
      components,
      // resolveRelations: ['Post.previousPost', 'Post.nextPost'],
      componentsDir: 'src',
      enableFallbackComponent: true,
      // customFallbackComponent: 'storyblok/FallbackComponent',
      useCustomApi: false,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        'fa-brands': [
          'facebook',
          'houzz',
          'instagram',
          'linkedin',
          'pinterest',
          'x-twitter',
          'xing',
          'youtube',
        ],
      },
    }),
    sitemap(),
    // sentry({
    //   dsn: 'https://a2da306d88df32d6e51c1cdd861652a8@us.sentry.io/4506700051185664',
    //   sourceMapsUploadOptions: {
    //     project: 'metallart',
    //     authToken: process.env.SENTRY_AUTH_TOKEN,
    //   },
    // }),
    // spotlightjs(),
    alpine({ entrypoint: '/src/alpine/entrypoint' }),
    react(),
  ],
  output,
  adapter: netlify({
    imageCDN: true,
  }),
  devToolbar: {
    enabled: false,
  },
})
