import { applyLinkAttrs } from '@/utils/link'
import { getImageSrc } from './utils/picture'
import { getLangFromUrl } from '@/i18n/utils'
import pDebounce from 'p-debounce'

type InitialState = {
  type?: string
}

export function projects(initialState: InitialState) {
  // @ts-ignore
  let component = {
    filtered: false,
    activeFilters: [] as string[],
    filteredResults: [],
    closestMatchFilters: [] as string[],
    type: initialState?.type ?? 'projects',
    loading: false,
    currentFetchId: 0,
    init() {
      let qp = new URLSearchParams(window.location.search)
      let filters = qp.get('f')
      if (filters) {
        this.activeFilters = filters.split(',').filter(Boolean)
        this.fetchData()
      }
    },
    reset() {
      this.filtered = false
      this.activeFilters = []
      this.filteredResults = []
      this.closestMatchFilters = []
      this.updateURL()
    },
    useClosestMatchFilters() {
      this.activeFilters = this.closestMatchFilters.slice(0)
      this.updateURL()
      this.requestFetchingData()
    },
    updateFilter(filterOptionId) {
      const name = filterOptionId
      if (this.activeFilters.includes(name)) {
        this.activeFilters = this.activeFilters.filter(
          (filter) => filter !== name,
        )
      } else {
        this.activeFilters.push(name)
      }

      this.updateURL()
      this.requestFetchingData()
    },
    updateURL() {
      let qp = new URLSearchParams()
      if (this.activeFilters.length) {
        qp.set('f', this.activeFilters.join(','))
      }

      history.replaceState(null, '', '?' + qp.toString())
    },
    async fetchData() {
      this.loading = true
      // const params = new URLSearchParams()
      // params.append('f', this.activeFilters)
      const locale = getLangFromUrl(new URL(window.location.href))
      this.currentFetchId = new Date().getTime()

      // console.log('------------')
      // console.log('NEW FETCH ID', this.currentFetchId)

      try {
        const filters = this.activeFilters.join('!')
        const type = this.type === 'news' ? 'news' : 'projects'
        const endpoint = `/api/${type}/${locale}/${filters}?t=${this.currentFetchId}`
        // console.log('FETCHING', endpoint)
        const result = await fetch(endpoint)
        const data = await result.json()
        // console.log(
        //   `FETCHED\n       currentFetchId=${this.currentFetchId}\n       data.meta.t=   ${data.meta?.t}\n       current=${parseInt(data.meta?.t) === this.currentFetchId}\n       total=${data?.stories?.length}`,
        // )

        if (parseInt(data.meta?.t) === this.currentFetchId) {
          this.filteredResults = data?.stories?.map((story, index) => {
            const title = story.content?.listTitle || story.content?.title
            const link = applyLinkAttrs(story.full_slug)
            const image = story.content?.cover?.filename
              ? story.content?.cover
              : story.content?.image
            return {
              ...story.content,
              uuid: story.uuid,
              url: link?.href,
              link,
              title,
              imageSrc: getImageSrc({
                image,
                aspectRatio:
                  index % 2 === 0 || this.type === 'news' ? '1/1' : '16/9',
              }),
              copyright: image?.copyright,
              imageAlt: title,
              imageClass:
                index % 2 === 0 || this.type === 'news'
                  ? 'aspect-1/1'
                  : 'aspect-16/9',
            }
          })

          this.filtered = this.activeFilters.length > 0

          if (this.filteredResults?.length) {
            this.closestMatchFilters = this.activeFilters.slice(0)
          }
          this.loading = false
        }
      } catch (error) {
        console.error('error', error)
        this.loading = false
      }
    },
    requestFetchingData() {},
  }
  component = {
    ...component,
    requestFetchingData: pDebounce(component.fetchData, 500),
  }
  return component
}
