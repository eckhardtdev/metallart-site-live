import { describe, expect, it } from 'vitest'
import {
  getLanguageFromSbSlug,
  getLocale,
  getLocaleForSbLang,
  getPath,
  getSbSiteFromUrl,
  getSbSlugWithoutLang,
  getStoryConfigKey,
  getLanguageFromSbStory,
  storyConfigs,
} from './i18nv2'

describe('getLanguageFromSbStory', () => {
  const stories = [
    {
      full_slug: 'sites/germany',
      lang: 'default',
      output: 'de',
    },
    {
      full_slug: 'sites/germany',
      lang: 'en',
      output: 'en',
    },
    {
      full_slug: 'sites/switzerland',
      lang: 'default',
      output: 'de-ch',
    },
    {
      full_slug: 'global/projects',
      lang: 'default',
      output: 'de',
    },
    {
      full_slug: 'global/projects',
      lang: 'en',
      output: 'en',
    },
    {
      full_slug: 'global/projects',
      lang: 'de-ch',
      output: 'de-ch',
    },
  ]

  stories.forEach(({ full_slug, lang, output }) => {
    it(`${full_slug} (lang: ${lang}) →  ${output}`, () => {
      const result = getLanguageFromSbStory({ full_slug, lang })
      expect(result).toBe(output)
    })
  })
})

describe('getSbSiteFromUrl', () => {
  const slugs = {
    'https://www.domain.tld/ch/beispielseite/': {
      site: 'switzerland',
      lang: 'de-ch',
    },
  }

  Object.entries(slugs).forEach(([input, output]) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getSbSiteFromUrl(input)
      expect(result).toBe(output)
    })
  })
})

describe('getPath', () => {
  const tests = [
    {
      input: 'sites/germany/beispielseite',
      output: '/de/beispielseite/',
      locale: 'de',
    },
    {
      input: 'en/sites/germany/sample-page',
      output: '/sample-page/',
      locale: '',
    },
    {
      input: 'sites/switzerland/beispielseite-schweiz',
      output: '/ch/beispielseite-schweiz/',
      locale: 'ch',
    },
    {
      input: 'en/sites/switzerland/sample-page-switzerland',
      output: '/ch-en/sample-page-switzerland/',
      locale: 'ch-en',
    },
    {
      input: 'global/news',
      output: '/de/global/news/',
      locale: 'de',
    },
    {
      input: 'en/global/news',
      output: '/global/news/',
      locale: '',
    },
    {
      input: 'de-ch/global/news',
      output: '/ch/global/news/',
      locale: 'ch',
    },
  ]

  tests.forEach(({ input, output, locale }) => {
    it(`${input} (locale: ${locale}) → ${output}`, () => {
      const result = getPath(input, locale)
      expect(result).toBe(output)
    })
  })
})

describe('getLanguageFromSbSlug', () => {
  const slugs = {
    'sites/germany/beispielseite': undefined,
    'en/sites/germany/sample-page': 'en',
    'sites/switzerland/beispielseite-schweiz': undefined,
    'de-ch/sites/switzerland/beispielseite-schweiz': 'de-ch',
    'global/jobs/job-de': undefined,
    'en/global/jobs/job-en': 'en',
    'de-ch/global/jobs/job-ch': 'de-ch',
  }

  Object.entries(slugs).forEach(([input, output]) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getLanguageFromSbSlug(input)
      expect(result).toBe(output)
    })
  })
})

describe('getSbSlugWithoutLang', () => {
  const slugs = {
    'sites/germany/beispielseite': 'sites/germany/beispielseite',
    'en/sites/germany/sample-page': 'sites/germany/sample-page',
    'sites/switzerland/beispielseite-schweiz':
      'sites/switzerland/beispielseite-schweiz',
    'de-ch/sites/switzerland/beispielseite-schweiz':
      'sites/switzerland/beispielseite-schweiz',
    'global/news/news-de': 'global/news/news-de',
    'en/global/news/news-en': 'global/news/news-en',
    'de-ch/global/news/news-ch': 'global/news/news-ch',
  }

  Object.entries(slugs).forEach(([input, output]) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getSbSlugWithoutLang(input)
      expect(result).toBe(output)
    })
  })
})

describe('getStoryConfigKey', () => {
  const slugs = {
    'test': undefined,
    'sites/germany/beispielseite': 'sites/germany',
    'en/sites/germany/sample-page': 'sites/germany',
    'sites/switzerland/beispielseite-schweiz': 'sites/switzerland',
    'en/sites/switzerland/beispielseite-schweiz': 'sites/switzerland',
    'de-ch/sites/switzerland/beispielseite-schweiz': 'sites/switzerland',
    'global/news/news-de': 'global/',
    'en/global/news/news-en': 'global/',
    'de-ch/global/news/news-ch': 'global/',
  }

  Object.entries(slugs).forEach(([input, output]) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getStoryConfigKey(input)
      expect(result).toBe(output)
    })
  })
})

describe('getLocale', () => {
  const configSwitzerland = storyConfigs['sites/switzerland']
  const configGermany = storyConfigs['sites/germany']
  const configGlobal = storyConfigs['global/']
  const tests = [
    {
      input: 'sites/germany/beispielseite',
      output: 'de',
      config: configGermany,
    },
    {
      input: 'en/sites/germany/sample-page',
      output: '',
      config: configGermany,
    },
    {
      input: 'sites/switzerland/beispielseite-schweiz',
      output: 'ch',
      config: configSwitzerland,
    },
    // {
    //   input: 'en/sites/switzerland/sample-page-switzerland',
    //   output: 'ch-en',
    //   config: configSwitzerland,
    // },
    {
      input: 'global/news',
      output: 'de',
      config: configGlobal,
    },
    {
      input: 'en/global/news',
      output: '',
      config: configGlobal,
    },
    {
      input: 'de-ch/global/news',
      output: 'ch',
      config: configGlobal,
    },
  ]

  tests.forEach(({ input, output, config }) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getLocale(input, config)
      expect(result).toBe(output)
    })
  })
})

describe('getLocaleForSbLang', () => {
  const configSwitzerland = storyConfigs['sites/switzerland']
  const configGermany = storyConfigs['sites/germany']
  const tests = [
    {
      input: undefined,
      output: 'de',
      config: configGermany,
    },
    {
      input: 'default',
      output: 'de',
      config: configGermany,
    },
    {
      input: 'en',
      output: '',
      config: configGermany,
    },
    {
      input: 'ch-de',
      output: undefined,
      config: configGermany,
    },
    {
      input: 'fr',
      output: undefined,
      config: configGermany,
    },
    {
      input: undefined,
      output: 'ch',
      config: configSwitzerland,
    },
    {
      input: 'default',
      output: 'ch',
      config: configSwitzerland,
    },
    {
      input: 'en',
      output: 'ch-en',
      config: configSwitzerland,
    },
    // {
    //   input: 'fr-ch',
    //   output: 'ch-fr',
    //   config: configSwitzerland,
    // },
  ]

  tests.forEach(({ input, output, config }) => {
    it(`should return "${output}" for the slug "${input}"`, () => {
      const result = getLocaleForSbLang(input, config)
      expect(result).toBe(output)
    })
  })
})

const locales = {
  'sites/germany/beispielseite': 'de',
  'en/sites/germany/sample-page': '',
  'sites/switzerland/beispielseite-schweiz': 'ch',
  'de-ch/sites/switzerland/beispielseite-schweiz': 'ch',
  'global/news/news-de': 'de',
  'en/global/news/news-en': '',
  'de-ch/global/news/news-ch': 'ch',
}

// describe('getLocaleFromSbSlug', () => {
//   Object.entries(locales).forEach(([slug, locale]) => {
//     it(`should return "${locale}" for the slug "${slug}"`, () => {
//       const result = getLocaleFromSbSlug(slug)
//       expect(result).toBe(locale)
//     })
//   })
// })

const slugs = {
  'sites/germany/beispielseite': '/de/beispielseite/',
  'en/sites/germany/sample-page': '/sample-page/',
  'sites/switzerland/beispielseite-schweiz': '/ch/beispielseite-schweiz/',
  'de-ch/sites/switzerland/beispielseite-schweiz': undefined,
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

// describe('getPathFromSbSlug', () => {
//   Object.entries(slugs).forEach(([slug, path]) => {
//     it(`should return "${path}" for the slug "${slug}"`, () => {
//       const result = getPathFromSbSlug(slug)
//       expect(result).toBe(path)
//     })
//   })
// })
