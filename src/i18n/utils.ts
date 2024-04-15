import { ui, defaultLang } from './ui'

// TODO: Build a function that returns the site from the route
export const getSiteFromRoute = (route: string) => {
  return 'germany'
}

export function getLangFromUrl(url: URL) {
  let [_, lang, langGlobal] = url.pathname.split('/')

  if (lang === 'global') {
    lang = langGlobal
  }
  if (lang.length > 2) {
    lang = lang.slice(2)
  }

  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export function useTranslate(url: URL, namespace: string = '') {
  const lang = getLangFromUrl(url)

  return function t(key) {
    const namespacedKey = namespace ? `${namespace}.${key}` : key
    return ui[lang][namespacedKey] || ui[defaultLang][namespacedKey]
  }
}
