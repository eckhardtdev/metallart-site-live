export const isPreview = () => {
  return import.meta.env.PUBLIC_ENV === 'preview'
}

export const isDevelopment = () => {
  return import.meta.env.PUBLIC_ENV === 'development'
}

export const storyblokVersion = () => {
  return import.meta.env.PUBLIC_STORYBLOK_VERSION === 'draft'
    ? 'draft'
    : 'published'
}
