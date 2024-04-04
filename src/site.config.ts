import type { Site } from '@/types'

const now = new Date()
const year = now.getFullYear()

const site: Site = {
  copyright: `© ${year} METALLART Treppen GmbH`,
  defaultTitle: 'METALLART',
  defaultDescription: 'The art of the staircase',
  defaultImage: '',
}

export default site
