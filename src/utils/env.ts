export const isPreview = () => {
  return import.meta.env.PUBLIC_ENV === 'preview'
}

export const storyblokVersion = () => {
  return import.meta.env.PUBLIC_STORYBLOK_VERSION === 'draft'
    ? 'draft'
    : 'published'
}
