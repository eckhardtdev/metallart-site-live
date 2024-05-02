import { applyLinkAttrs } from '@/utils/link'
import { getImageSrc } from './utils/picture'
import { getLangFromUrl } from '@/i18n/utils'
import pDebounce from 'p-debounce'

type InitialState = {
  items: { id: string; filters: string[] }[]
  type?: string
}

function getFiltersByCategory(filterList) {
  return filterList.reduce(
    (acc, filter) => {
      const [category, value] = filter.split('_')
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(value)
      return acc
    },
    {} as Record<string, string[]>,
  )
}

function filterData(data, filters) {
  return data.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!item.filters[key]) return false

      return filters[key].some((filterValue) =>
        item.filters[key].includes(filterValue),
      )
    })
  })
}

export function entrygrid(initialState: InitialState) {
  // @ts-ignore
  let component = {
    items:
      initialState.items?.map((item) => ({
        id: item.id,
        filters: getFiltersByCategory(item.filters),
      })) ?? [],
    filtered: false,
    activeFilters: [] as string[],
    activeFiltersByCategory: {},
    filteredResults: [] as string[],
    closestMatchFilters: [] as string[],
    type: initialState?.type ?? 'projects',
    loading: false,
    currentFetchId: 0,
    setActiveFiltersByCategory() {
      this.activeFiltersByCategory = getFiltersByCategory(this.activeFilters)
    },
    init() {
      let qp = new URLSearchParams(window.location.search)
      let filters = qp.get('f')
      if (filters) {
        this.activeFilters = filters.split(',').filter(Boolean)
        this.setActiveFiltersByCategory()
      }
      this.fetchData()
    },
    reset() {
      this.filtered = false
      this.activeFilters = []
      this.filteredResults = []
      this.closestMatchFilters = []
      this.setActiveFiltersByCategory()
      this.updateURL()
    },
    useClosestMatchFilters() {
      this.activeFilters = this.closestMatchFilters.slice(0)
      this.setActiveFiltersByCategory()
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
        this.activeFilters = [...this.activeFilters, name]
      }
      this.setActiveFiltersByCategory()
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

      const results = filterData(this.items, this.activeFiltersByCategory)
      this.filteredResults = results.map((item) => item.id)

      this.filtered = this.activeFilters.length > 0
      if (this.filteredResults?.length) {
        this.closestMatchFilters = this.activeFilters.slice(0)
      }
      this.loading = false
    },
    requestFetchingData() {},
  }
  component = {
    ...component,
    requestFetchingData: pDebounce(component.fetchData, 100),
  }
  return component
}

export function entrygriditem(state) {
  return {
    id: state.id,
    get visible() {
      // @ts-ignore
      return this.filteredResults?.includes(this.id)
    },
  }
}
