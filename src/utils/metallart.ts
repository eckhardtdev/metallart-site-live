export const projectsSortBy = `created_at:desc,published_at:desc,content.year:desc,sort_by_date:desc`
export const newsSortBy = `created_at:desc,published_at:desc,content.date:desc,sort_by_date:desc`

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
    // sitesBlacklist: {
    //   not_in: siteIds[sbLang ?? 'default'],
    // },
  }
}
