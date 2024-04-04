import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

const output = 'static'

// https://astro.build/config
export default defineConfig({
  site: env.SITE_URL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output,
  adapter: netlify({
    imageCDN: true,
  }),
  devToolbar: {
    enabled: false,
  },
})
