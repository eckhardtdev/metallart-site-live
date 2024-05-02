import { describe, it, expect } from 'vitest'
import { getPathFromSbSlug } from './i18nv2'

const slugs = {
  'sites/germany/beispielseite': '/de/beispielseite/',
  'en/sites/germany/sample-page': '/sample-page/',
  'de-ch/sites/switzerland/beispielseite-schweiz': '/ch/beispielseite-schweiz/',
  'global/jobs/job-de': '/de/global/jobs/job-de/',
  'en/global/jobs/job-en': '/global/jobs/job-en/',
  'de-ch/global/jobs/job-ch': '/ch/global/jobs/job-ch/',
  'global/news/news-de': '/de/global/news/news-de/',
  'en/global/news/news-en': '/global/news/news-en/',
  'de-ch/global/news/news-ch': '/ch/global/news/news-ch/',
  'global/projects/project-de': '/de/global/projects/project-de/',
  'en/global/projects/project-en': '/global/projects/project-en/',
  'de-ch/global/projects/project-ch': '/ch/global/projects/project-ch/',
}

describe('getPathFromSbSlug', () => {
  Object.entries(slugs).forEach(([slug, path]) => {
    it(`should return "${path}" for the slug "${slug}"`, () => {
      const result = getPathFromSbSlug(slug)
      expect(result).toBe(path)
    })
  })
})
