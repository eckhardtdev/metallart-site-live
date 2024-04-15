import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
// import sentry from '@sentry/astro'
// import spotlightjs from '@spotlightjs/astro'
import storyblok from '@storyblok/astro'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import { components } from './storyblok.config.mjs'
import icon from 'astro-icon'
import { interceptor } from './storyblok/interceptor.js'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// TODO: CSP Integration https://app.netlify.com/sites/reliable-rabanadas-659a34/integrations/security

const isPublished = env.PUBLIC_STORYBLOK_VERSION === 'published'
const output = 'server'
const storyblokBridge = env.PUBLIC_ENV !== 'production'
console.log('environment', env.PUBLIC_ENV)
console.log('storyblok version', env.PUBLIC_STORYBLOK_VERSION)
console.log('storyblok bridge', storyblokBridge)
console.log('astro output', output)
console.log('site url', env.SITE_URL)
console.log('secure', env.SECURE)
const ssl = env.SECURE === 'on' ? true : false
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
