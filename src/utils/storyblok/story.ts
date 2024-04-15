import { parseStoryDateField } from './date'

export const getStoryDates = (story) => {
  const firstPublishedAt = new Date(story?.first_published_at)
  const publishedAt = new Date(story?.published_at)
  const createdAt = new Date(story?.created_at)
  const contentPublishedAt = parseStoryDateField(story?.content?.publishedAt)
  const contentUpdatedAt = parseStoryDateField(story?.content?.updatedAt)

  const datePublished =
    contentPublishedAt ?? publishedAt ?? firstPublishedAt ?? createdAt

  return {
    dates: {
      firstPublishedAt,
      publishedAt,
      createdAt,
      contentPublishedAt,
      contentUpdatedAt,
    },
    datePublished,
    dateModified: contentUpdatedAt ?? datePublished,
    date: contentUpdatedAt ?? datePublished,
  }
}
