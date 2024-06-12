export const projectsSortBy = `sort_by_date:desc,content.year:desc,published_at:desc,created_at:desc`
export const newsSortBy = `sort_by_date:desc,content.date:desc,published_at:desc,created_at:desc`

// default, en -> b37723e7-e568-4ba4-b69f-5c856714c8ff
// de-ch -> 2f84b0e4-6272-4aa1-936c-e9d5daa60b2f
// 'ba079170-cb89-496b-8383-a246b1dae5ad' (Old CH site)
const siteIds = {
  'default': 'b37723e7-e568-4ba4-b69f-5c856714c8ff',
  'en': 'b37723e7-e568-4ba4-b69f-5c856714c8ff',
  'de-ch': '2f84b0e4-6272-4aa1-936c-e9d5daa60b2f',
}
export const sitesFilterQuery = (sbLang) => {
  return {
    sites: {
      any_in_array: siteIds[sbLang ?? 'default'],
    },
  }
}
