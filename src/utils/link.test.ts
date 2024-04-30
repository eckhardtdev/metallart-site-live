import { describe, it, expect } from 'vitest'
import { applyLinkAttrs } from './link'
import type { Link } from './link'

describe('applyLinkAttrs', () => {
  it('should return href with mailto for an email link in a richtext field', () => {
    const link: Link = {
      href: 'info@domain.com',
      uuid: null,
      anchor: null,
      target: '_self',
      linktype: 'email',
    }
    const result = applyLinkAttrs(link)
    expect(result).toEqual({
      href: 'mailto:info@domain.com',
      as: 'a',
      target: '_self',
    })
  })

  it('should return href with mailto for an tel link in a richtext field', () => {
    const link: Link = {
      href: 'tel:+49123456789',
      uuid: undefined,
      anchor: undefined,
      target: '_self',
      linktype: 'url',
    }
    const result = applyLinkAttrs(link)
    expect(result).toEqual({
      href: 'tel:+49123456789',
      as: 'a',
      target: '_self',
    })
  })

  it('should return href a link in a richtext field', () => {
    const link: Link = {
      id: '',
      url: 'https://www.external.com/page/',
      linktype: 'url',
      fieldtype: 'multilink',
      cached_url: 'https://www.external.com/page/',
    }
    const result = applyLinkAttrs(link)
    expect(result).toEqual({
      as: 'a',
      href: 'https://www.external.com/page/',
      rel: 'noopener noreferrer',
      target: '_blank',
    })
  })

  it('should return undefined if linkOrUrl is undefined', () => {
    const result = applyLinkAttrs(undefined)
    expect(result).toBeUndefined()
  })

  it('should return undefined if linkOrUrl is an empty string', () => {
    const result = applyLinkAttrs('')
    expect(result).toEqual(undefined)
  })

  it('should return link attributes for a story link with contact-form-presets in full_slug', () => {
    const link: Link = {
      linktype: 'story',
      story: {
        id: 123456789,
        uuid: '12345678-1234-1234-1234-123456789012',
        name: '',
        slug: 'contact-form-presets',
        full_slug: 'contact-form-presets',
      },
    }
    const result = applyLinkAttrs(link)
    expect(result).toEqual({
      as: ' button',
      type: 'button',
      'x-data': '',
      'x-on:click': '$store.ui.toggleContact(true)',
    })
  })

  // Add more test cases as needed
})
