import { describe, it, expect } from 'vitest'
import { getLangFromUrl } from './utils'

const urls = {
  '': 'en',
  'subpage/': 'en',
  'de/': 'de',
  'de/subpage/': 'de',
  'chfr/': 'fr',
  'chfr/subpage/': 'fr',
  'global/en/': 'en',
  'global/en/subpage/': 'en',
  'global/fr/subpage/': 'fr',
}

describe('getLangFromUrl', () => {
  Object.entries(urls).forEach(([testUrl, lang]) => {
    it(`should return "${lang}" for the URL "https://domain.com/${testUrl}"`, () => {
      const url = new URL(`https://domain.com/${testUrl}`)
      const result = getLangFromUrl(url)
      expect(result).toBe(lang)
    })
  })
})
