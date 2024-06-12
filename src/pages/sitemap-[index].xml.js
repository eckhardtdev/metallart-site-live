import {
  fetchAllLinks,
  fetchStories,
  filterStoryLinks,
  generateStaticPathsV2,
} from '@/utils/storyblok'

export async function getStaticPaths() {
  const stories = await fetchStories()
  console.log('----> stories', stories.length)
  // const validStories = filterStoryLinks(stories)
  // console.log('----> validStories', validStories.length)

  const sitemaps = [
    {
      index: '0',
      content: '<loc>0</loc>',
    },
    {
      index: '1',
      content: '<loc>1</loc>',
    },
    {
      index: '2',
      content: '<loc>2</loc>',
    },
  ]

  return [
    ...sitemaps.map((sitemap) => ({
      props: {
        ...sitemap,
      },
      params: {
        index: sitemap.index,
      },
    })),
  ]
}

export async function get({ params, site, props }) {
  console.log(props)
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  return {
    headers: {
      'Content-Type': 'application/xml',
    },
    body: sitemap,
  }
}
