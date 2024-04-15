import type { Site } from '@/types'

const now = new Date()
const year = now.getFullYear()

const site: Site = {
  copyright: `© ${year} METALLART Treppen GmbH`,
  defaultTitle: 'METALLART - The Art of The Staircase',
  defaultDescription: undefined,
  defaultImage: undefined,
  facebookTitle: undefined,
  facebookDescription: undefined,
  facebookImage: undefined,
  twitterTitle: undefined,
  twitterDescription: undefined,
  twitterImage: undefined,
}

export default site
