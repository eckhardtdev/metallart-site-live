import slugifyModule from 'slugify'

export const slugify = (str: string | undefined) =>
  str
    ? slugifyModule(str, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'de-DE',
        trim: true,
      })
    : undefined

export const slugifyAnchor = (str: string | undefined) => {
  return slugify(str)
}

export const setAnchor = (anchor: string) => {
  if (!anchor) return

  return { id: slugify(anchor) }
}

// type ResolveStorySlugProps = {
//   full_slug: string
// }
// export const resolveStorySlug = (story: ResolveStorySlugProps) => {
//   const { full_slug: slug } = story
//   if (!slug) return

//   const countryCode = slug.split('/')[1]
// }
