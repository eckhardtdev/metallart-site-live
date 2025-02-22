import alpine from '@astrojs/alpinejs'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
// import sentry from '@sentry/astro'
import storyblok from '@storyblok/astro'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import { components } from './storyblok.config.mjs'
// import { interceptor } from './storyblok/interceptor.js'

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// TODO: CSP Integration https://app.netlify.com/sites/reliable-rabanadas-659a34/integrations/security

const isPublished = env.PUBLIC_STORYBLOK_VERSION === 'published'
// TODO: Condition based on PUBLIC_ENV
const output =
  env.PUBLIC_ENV === 'production' || env.PUBLIC_ENV === 'staging'
    ? 'static'
    : 'server'
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
        // responseInterceptor: interceptor,
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
    // spotlightjs(),
    alpine({ entrypoint: '/src/alpine/entrypoint' }),
    react(),
    // Sentry Error Monitoring
    // https://docs.sentry.io/platforms/javascript/guides/astro/#configure
    // sentry({
    //   dsn: 'https://a2da306d88df32d6e51c1cdd861652a8@o4506671757852672.ingest.us.sentry.io/4506700051185664',
    //   sourceMapsUploadOptions: {
    //     project: 'metallart',
    //     authToken: process.env.SENTRY_AUTH_TOKEN,
    //   },
    // }),
  ],
  output,
  adapter: netlify({
    imageCDN: true,
  }),
  devToolbar: {
    enabled: false,
  },
  redirects: {
    '/branchen/': '/de/',
    '/branchen/buero-und-verwaltungsgebaeude/': '/de/',
    '/branchen/einzelhandel/': '/de/',
    '/branchen/forschung-und-bildung/': '/de/',
    '/branchen/hotel/': '/de/',
    '/branchen/kultur-freizeit/': '/de/',
    '/branchen/neue-treppen-altbau/': '/de/',
    '/branchen/wohnen/': '/de/',
    '/datenschutz/': '/de/',
    '/impressum/': '/de/',
    '/karriere/': '/de/',
    '/karriere/ausbildung-bueromanagement/': '/de/',
    '/karriere/ausbildung-metallbauer/': '/de/',
    '/karriere/ausbildung-technischer-systemplaner/': '/de/',
    '/karriere/bauleiter/': '/de/',
    '/karriere/digital-marketing-manager-m-w-d/': '/de/',
    '/karriere/kalkulator-m-w-d/': '/de/',
    '/karriere/kaufmaennischer-mitarbeiter-auftragsbearbeitung-m-w-d/': '/de/',
    '/karriere/konstrukteur/': '/de/',
    '/karriere/lackierer/': '/de/',
    '/karriere/marketing-specialist-2/': '/de/',
    '/karriere/metallbauer-m-w-d/': '/de/',
    '/karriere/metallbauer/': '/de/',
    '/karriere/monteur/': '/de/',
    '/karriere/personalsachbearbeiter/': '/de/',
    '/karriere/schweisser/': '/de/',
    '/karriere/social-media-manager/': '/de/',
    '/karriere/techniker/': '/de/',
    '/karriere/vertriebsassistenz-m-w-d/': '/de/',
    '/nachhaltigkeit/': '/de/',
    '/news': '/de/',
    '/news/100-jahre-metallart/': '/de/',
    '/news/arbeitgeber-der-zukunft-2023/': '/de/',
    '/news/architects-darling-2022/': '/de/',
    '/news/azubitag-2022/': '/de/',
    '/news/besuch-buergermeister-salach/': '/de/',
    '/news/besuch-sascha-binder/': '/de/',
    '/news/bildungsmesse-2021/': '/de/',
    '/news/buergermeister-suessen': '/de/',
    '/news/deutscher-metallbaupreis-2022/': '/de/',
    '/news/ehrenamtliche-aktion/': '/de/',
    '/news/foodtruck-bei-metallart/': '/de/',
    '/news/gesundheitstag-2023/': '/de/',
    '/news/heinze-architektour-2/': '/de/',
    '/news/heinze-architektour/': '/de/',
    '/news/innovati-on-tour/': '/de/',
    '/news/news-online-seminare-treppenplanung/': '/de/',
    '/news/news-projekt-blickle/': '/de/',
    '/news/news-stadtwerke-willich/': '/de/',
    '/news/news-verbandskaesten-ukraine/': '/de/',
    '/news/spende-statt-geschenke/': '/de/',
    '/news/stahlwendeltreppen-fuer-den-bau-2-in-basel-stadt/': '/de/',
    '/news/treppe-des-jahres-2019/': '/de/',
    '/news/treppen-des-jahres-2020/': '/de/',
    '/partnernetzwerk/': '/de/',
    '/referenz/': '/de/',
    '/referenz/designer-treppe-norderstedter-bank/': '/de/',
    '/referenz/designtreppe-bruestungswangen/': '/de/',
    '/referenz/designtreppe-futurium/': '/de/',
    '/referenz/designtreppe-hamburg/': '/de/',
    '/referenz/designtreppe-nhow/': '/de/',
    '/referenz/designtreppe-steelcase/': '/de/',
    '/referenz/designtreppe-uzwil/': '/de/',
    '/referenz/designtreppe-weiss/': '/de/',
    '/referenz/edelstahltreppe/': '/de/',
    '/referenz/einholmtreppe/': '/de/',
    '/referenz/einholmtreppen-stilvoll/': '/de/',
    '/referenz/faltwerktreppe-lampertheim/': '/de/',
    '/referenz/faltwerktreppe-stahl/': '/de/',
    '/referenz/flachstahlwangentreppe-comcenter/': '/de/',
    '/referenz/flachstahlwangentreppe-wohnhaus/': '/de/',
    '/referenz/ganzglasgelaender-geradlaeufig/': '/de/',
    '/referenz/ganzglasgelaender-rund/': '/de/',
    '/referenz/ganzglasgelaender-segmueller/': '/de/',
    '/referenz/ganzglasgelaender/': '/de/',
    '/referenz/gewendelte-treppe-nuernberg/': '/de/',
    '/referenz/gewendelte-treppe-winxtower/': '/de/',
    '/referenz/glasgelaender-betontreppe/': '/de/',
    '/referenz/glasgelaender-betzold/': '/de/',
    '/referenz/glasgelaender-edelstahlhandlauf/': '/de/',
    '/referenz/glasgelaender-glasbruestung/': '/de/',
    '/referenz/glasgelaender-glasstege/': '/de/',
    '/referenz/glasgelaender-holzhandlauf/': '/de/',
    '/referenz/glasgelaender-trimini/': '/de/',
    '/referenz/innentreppe-firmament/': '/de/',
    '/referenz/innentreppe-fluessigmetall/': '/de/',
    '/referenz/innentreppe-saegezahnwangen/': '/de/',
    '/referenz/innentreppe/': '/de/',
    '/referenz/innentreppen-design/': '/de/',
    '/referenz/kastenwangentreppe-galileo-garching/': '/de/',
    '/referenz/kragarmtreppe/': '/de/',
    '/referenz/manuel-benna/': '/de/',
    '/referenz/metallwangentreppe-muenchen/': '/de/',
    '/referenz/moderne-wangentreppe/': '/de/',
    '/referenz/simon-graf/': '/de/',
    '/referenz/skulpturtreppe-innsbruck/': '/de/',
    '/referenz/skulpturtreppe-staketengelaender/': '/de/',
    '/referenz/skulpturtreppen-sindelfingen/': '/de/',
    '/referenz/spindeltreppe-axel-springer-neubau-berlin/': '/de/',
    '/referenz/spindeltreppe-bruestungswangen/': '/de/',
    '/referenz/spindeltreppe-filigran/': '/de/',
    '/referenz/spindeltreppe-glasgelaender/': '/de/',
    '/referenz/spindeltreppe-glasstufen/': '/de/',
    '/referenz/spindeltreppe-modern/': '/de/',
    '/referenz/spindeltreppe-stilvoll/': '/de/',
    '/referenz/stahl-bruestungswangen-betontreppe/': '/de/',
    '/referenz/stahlgelaender-airporthotel/': '/de/',
    '/referenz/stahlgelaender-rahel-hirsch/': '/de/',
    '/referenz/stahltreppe-design/': '/de/',
    '/referenz/stahltreppe-dreiecksfoermig/': '/de/',
    '/referenz/stahltreppe-glasgelaender/': '/de/',
    '/referenz/stahltreppe-glasstufen/': '/de/',
    '/referenz/stahltreppe-industrie/': '/de/',
    '/referenz/stahltreppe-kita/': '/de/',
    '/referenz/stahltreppe-skulptural/': '/de/',
    '/referenz/stahltreppe-stadtbuecherei/': '/de/',
    '/referenz/stahltreppe-wien/': '/de/',
    '/referenz/stahltreppe/': '/de/',
    '/referenz/stahltreppen-bruestungswangen/': '/de/',
    '/referenz/stahltreppen-design/': '/de/',
    '/referenz/stahltreppen-ganzglasgelaender/': '/de/',
    '/referenz/stahltreppen-glasstufen/': '/de/',
    '/referenz/stahltreppen-holzstufen/': '/de/',
    '/referenz/stahltreppen-kastenwangen/': '/de/',
    '/referenz/stahltreppen-modern/': '/de/',
    '/referenz/stahlwangentreppe-ganzglasgelaender/': '/de/',
    '/referenz/stahlwangentreppe-holz/': '/de/',
    '/referenz/stahlwangentreppe-led/': '/de/',
    '/referenz/stahlwangentreppe-untersichtsverkleidung/': '/de/',
    '/referenz/stahlwendeltreppen-hoffmann-la-roche/': '/de/',
    '/referenz/systemtreppe-design-metallart/': '/de/',
    '/referenz/therme-ganzglasgelaender/': '/de/',
    '/referenz/treppe-longchamp/': '/de/',
    '/referenz/treppe-modern/': '/de/',
    '/referenz/treppen-ausdrucksstark/': '/de/',
    '/referenz/treppen-design/': '/de/',
    '/referenz/treppen-glasgelaender/': '/de/',
    '/referenz/treppen-lochblechverkleidung/': '/de/',
    '/referenz/treppen-modern/': '/de/',
    '/referenz/treppen-stahlwangen/': '/de/',
    '/referenz/treppen-volksbank/': '/de/',
    '/referenz/treppen/': '/de/',
    '/referenz/wangentreppe-evf-goeppingen/': '/de/',
    '/referenz/wangentreppe-heraeus/': '/de/',
    '/referenz/wangentreppe-innen-bulgarien/': '/de/',
    '/referenz/wangentreppe-kantstufen/': '/de/',
    '/referenz/wangentreppe-kreuzfahrtschiff/': '/de/',
    '/referenz/wangentreppe-monumental/': '/de/',
    '/referenz/wangentreppe-stahlbruestung/': '/de/',
    '/referenz/wangentreppe-taunusturm/': '/de/',
    '/referenz/wendeltreppe-glasgelaender/': '/de/',
    '/referenz/wendeltreppe-lilienthalhaus/': '/de/',
    '/referenz/wendeltreppe-paneum/': '/de/',
    '/referenz/wendeltreppe-sparkasse/': '/de/',
    '/referenz/wendeltreppe-stahl/': '/de/',
    '/referenz/wendeltreppe/': '/de/',
    '/referenz/wendeltreppen-stahlbruestung/': '/de/',
    '/service/': '/de/',
    '/service/architekten': '/de/',
    '/service/verarbeitendes-gewerbe/': '/de/',
    '/service/verarbeitendes-gewerbe/biegetechnik/': '/de/',
    '/service/verarbeitendes-gewerbe/laserschneiden/': '/de/',
    '/service/verarbeitendes-gewerbe/treppen-bauteile/': '/de/',
    '/treppen-glasstufen/': '/de/',
    '/treppen/': '/de/',
    '/treppen/bruestungsgelaender/': '/de/',
    '/treppen/faltwerktreppen/': '/de/',
    '/treppen/fluessigmetall/': '/de/',
    '/treppen/glasgelaender/': '/de/',
    '/treppen/mittelholmtreppen/': '/de/',
    '/treppen/skulpturtreppen/': '/de/',
    '/treppen/spindeltreppen/': '/de/',
    '/treppen/wangentreppen/': '/de/',
    '/treppen/wendeltreppen/': '/de/',
    '/unternehmen/': '/de/',
    '/unternehmen/ansprechpartner/': '/de/',
    '/unternehmen/auszeichnungen/': '/de/',
    '/unternehmen/downloads/': '/de/',
    '/unternehmen/events/': '/de/',
    '/unternehmen/firmenportraet/': '/de/',
    '/unternehmen/innovative-techniken/': '/de/',
    '/unternehmen/newsletter/': '/de/',
    '/unternehmen/presse/': '/de/',
    '/unternehmen/zertifikate/': '/de/',
    // EN
    '/en': '/',
    '/en/author/anitarieger': '/',
    '/en/author/ulrikeheckbuero': '/',
    '/en/company': '/',
    '/en/company/awards/': '/',
    '/en/company/certifications/': '/',
    '/en/company/company-portrait/': '/',
    '/en/company/downloads/': '/',
    '/en/company/innovative-technology/': '/',
    '/en/company/news-overview': '/',
    '/en/company/newsletter/': '/',
    '/en/company/partner-network/': '/',
    '/en/company/points-of-contact/': '/',
    '/en/company/sustainability': '/',
    '/en/imprint/': '/',
    '/en/privacy-policy/': '/',
    '/en/reference/aesthetic-sculptural-staircases-bitzer-headquarter/': '/',
    '/en/reference/design-stairs-balustrade-stringers/': '/',
    '/en/reference/design-stairs-futurium/': '/',
    '/en/reference/design-stairs-hamburg/': '/',
    '/en/reference/design-stairs-nhow/': '/',
    '/en/reference/design-stairs-steelcase/': '/',
    '/en/reference/design-stairs-uzwil/': '/',
    '/en/reference/design-stairs-white/': '/',
    '/en/reference/flat-steel-stringer-stairs-muenster/': '/',
    '/en/reference/folded-stairs-steel/': '/',
    '/en/reference/glass-railing-spiral-stairs/': '/',
    '/en/reference/glass-railings-wooden-handrail/': '/',
    '/en/reference/impressive-rounded-designer-staircase/': '/',
    '/en/reference/interior-staircase-liquid-metal/': '/',
    '/en/reference/interior-stairs-firmament/': '/',
    '/en/reference/modern-stringer-stairs/': '/',
    '/en/reference/pieter-dozy/': '/',
    '/en/reference/sculptural-staircase-paling-balustrades/': '/',
    '/en/reference/sculptural-stairs-innsbruck/': '/',
    '/en/reference/spiral-staircase-lilienthalhaus/': '/',
    '/en/reference/spiral-staircase-nuremberg/': '/',
    '/en/reference/spiral-staircase-winxtower/': '/',
    '/en/reference/spiral-stairs-balustrade-stringers/': '/',
    '/en/reference/spiral-stairs-glass-railing/': '/',
    '/en/reference/spiral-stairs-paneum/': '/',
    '/en/reference/spiral-stairs-sparkasse/': '/',
    '/en/reference/spiral-stairs-steel-balustrade/': '/',
    '/en/reference/staircase-modern/': '/',
    '/en/reference/staircase-with-perforated-underside-cladding/': '/',
    '/en/reference/stairs-design/': '/',
    '/en/reference/stairs-expressive-design/': '/',
    '/en/reference/stairs-modern/': '/',
    '/en/reference/stairs-volksbank/': '/',
    '/en/reference/stairs-with-glass-railing/': '/',
    '/en/reference/steel-balustrades-rahel-hirsch/': '/',
    '/en/reference/steel-spiral-staircase/': '/',
    '/en/reference/steel-spiral-staircases-hoffmann-la-roche/': '/',
    '/en/reference/steel-staircase-modern/': '/',
    '/en/reference/steel-staircase-sculptural-shapes/': '/',
    '/en/reference/steel-staircase-with-box-type-stringers/': '/',
    '/en/reference/steel-staircase-wooden-steps/': '/',
    '/en/reference/steel-stairs-balustrade-stringers/': '/',
    '/en/reference/steel-stairs-design/': '/',
    '/en/reference/steel-stairs-glass-railings/': '/',
    '/en/reference/steel-stairs-glass-treads/': '/',
    '/en/reference/steel-stairs-industrial/': '/',
    '/en/reference/steel-stairs-vienna/': '/',
    '/en/reference/steel-stairs/': '/',
    '/en/reference/steel-stringer-staircase-all-glass-railing/': '/',
    '/en/reference/steel-stringer-stairs-cladding/': '/',
    '/en/reference/steel-stringer-stairs-led/': '/',
    '/en/reference/steel-stringer-stairs-wood/': '/',
    '/en/reference/stringer-staircase-evf-goeppingen/': '/',
    '/en/reference/stringer-staircase-taunusturm/': '/',
    '/en/reference/stringer-stairs-heraeus/': '/',
    '/en/reference/stringer-stairs-interiors-bulgaria/': '/',
    '/en/reference/stringer-stairs-monumental/': '/',
    '/en/reference/stringer-stairs-steel-balustrade/': '/',
    '/en/sectors/': '/',
    '/en/sectors/cultural-and-leisure-facilities/': '/',
    '/en/sectors/detached-houses/': '/',
    '/en/sectors/hotel/': '/',
    '/en/sectors/new-stairs-existing-buildings/': '/',
    '/en/sectors/office-and-administration-buildings/': '/',
    '/en/sectors/research-and-educational-institutions/': '/',
    '/en/sectors/shop-fitting/': '/',
    '/en/service/': '/',
    '/en/service/architects/': '/',
    '/en/service/manufacturing-sector/': '/',
    '/en/stairs/': '/',
    '/en/stairs/central-stringer-stairs/': '/',
    '/en/stairs/folded-stairs/': '/',
    '/en/stairs/glass-railings/': '/',
    '/en/stairs/liquid-metal/': '/',
    '/en/stairs/newel-stairs/': '/',
    '/en/stairs/spiral-stairs/': '/',
    '/en/stairs/spiral-stairs/#ankerspiral': '/',
    '/en/stairs/spiral-stairs/#content': '/',
    '/en/stairs/steel-balustrade-stringers/': '/',
    '/en/stairs/stringer-stairs/': '/',
  },
})
