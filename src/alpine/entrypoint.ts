import { carousel } from '@/alpine/carousel'
import { projects } from '@/alpine/projects'
import { entrygrid, entrygriditem } from '@/alpine/entrygrid'
import collapse from '@alpinejs/collapse'
import persist from '@alpinejs/persist'
import type { Alpine } from 'alpinejs'
// import * as bodyScrollLock from 'body-scroll-lock'

export default (Alpine: Alpine) => {
  // console.log('Alpine entrypoint', Alpine)
  Alpine.plugin(collapse)
  Alpine.plugin(persist)

  Alpine.data('carousel', carousel)
  Alpine.data('projects', projects)
  Alpine.data('entrygrid', entrygrid)
  Alpine.data('entrygriditem', entrygriditem)

  type UiStore = {
    navOpen: boolean
    contactOpen: boolean
    lang: string
    setLang(lang: string): void
    toggleNav(force?: boolean): void
    toggleContact(force?: boolean): void
  }

  Alpine.store('ui', {
    // CookieStorage is defined in AlpineSetup.astro
    lang: window.Cookiebot?.consent?.preferences
      ? // @ts-ignore
        Alpine.$persist('en').as('i18n').using(window.cookieStorage)
      : 'en',
    setLang(lang: string) {
      this.lang = lang
    },
    navOpen: false,
    contactOpen: false,
    toggleNav(force: boolean) {
      this.navOpen = force ?? !this.navOpen
      this.contactOpen = false
    },
    toggleContact(force: boolean) {
      this.contactOpen = force ?? !this.navOpen
      this.navOpen = false
    },
  } as UiStore)
}
