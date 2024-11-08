// export const projectsSortBy = `sort_by_date:desc`
// export const projectsSortBy = `sort_by_date:desc,content.year:desc,published_at:desc,created_at:desc`
// export const newsSortBy = `created_at:desc,published_at:desc,content.date:desc,sort_by_date:desc`

export const sortProjects = (projects) => {
  if (!Array.isArray(projects)) return []

  const sorted = projects.sort((a, b) => {
    const dateA = new Date(
      a.sort_by_date || a.content?.year || a.published_at || a.created_at,
    )
    const dateB = new Date(
      b.sort_by_date || b.content?.year || b.published_at || b.created_at,
    )

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime()
    } else if (dateB) {
      return -1
    } else if (dateA) {
      return 1
    } else {
      return 0
    }
  })
  return sorted
}

export const sortNews = (news) => {
  if (!Array.isArray(news)) return []

  const sorted = news.sort((a, b) => {
    const dateA = new Date(
      a.sort_by_date || a.content?.date || a.published_at || a.created_at,
    )
    const dateB = new Date(
      b.sort_by_date || b.content?.date || b.published_at || b.created_at,
    )

    if (dateA && dateB) {
      return dateB.getTime() - dateA.getTime()
    } else if (dateB) {
      return -1
    } else if (dateA) {
      return 1
    } else {
      return 0
    }
  })
  return sorted
}

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
