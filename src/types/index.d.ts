import type { Hreflang } from './hreflang'

export type Asset =
  | AssetStoryblok
  | {
      src?: string
    }

export type Site = {
  defaultLanguage?: string
  languages?: string[]
  copyright?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultImage?: string | Asset
  title?: string
  description?: string
  slug?: string
  canonicalUrl?: string
  facebookDescription?: string
  facebookImage?: string | Asset
  facebookTitle?: string
  facebookType?: string
  facebookUrl?: string
  og_description?: string
  ogDescription?: string
  og_image?: string | Asset
  ogImage?: string | Asset
  og_title?: string
  ogTitle?: string
  ogType?: string
  ogUrl?: string
  twitter_title?: string
  twitterTitle?: string
  twitter_description?: string
  twitterDescription?: string
  twitter_image?: string | Asset
  twitterImage?: string | Asset
  twitterUrl?: string
  twitterCard?: string
  hreflangs?: Hreflang[]
}

export type JustifyType =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type AlignType = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
