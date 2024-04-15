export const parseStoryDateField = (dateStr = '') => {
  if (!dateStr) return
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
  // Transform storyblok's format "2022-10-15 00:00"
  const transformedDateStr = dateStr.split(' ').join('T')
  // To ISO 8601 like format "2022-10-15T00:00:00"
  const date = new Date(Date.parse(transformedDateStr))
  return date
}

export const formatStoryDate = (
  dateStr = '',
  locale = 'de-DE',
  options = {},
) => {
  if (!dateStr) return
  const date = parseStoryDateField(dateStr)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  }).format(date)
  return formattedDate
}
