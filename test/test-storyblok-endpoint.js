import StoryblokClient from 'storyblok-js-client'

// init with access token
const Storyblok = new StoryblokClient({
  accessToken: 'vxiUlYGKxpy9roqTXgPEjgtt',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})

Storyblok.get('cdn/stories', {
  version: 'published',
  resolve_links: 'url',
  starts_with: 'en/global/projects/test-project',
  // language: 'en'
})
.then(response => {
  console.log(response?.data?.stories)
}).catch(error => { 
  console.log(error)
})