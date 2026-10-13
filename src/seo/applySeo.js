import { site } from '../config/site'
import { absoluteUrl } from './jsonLd'

function upsert(selector, create, set) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  set(el)
}

const meta = (attr, key, content) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement('meta')
      el.setAttribute(attr, key)
      return el
    },
    (el) => el.setAttribute('content', content),
  )

// Updates the document head for the current route (title, description, canonical, Open Graph,
// Twitter, robots, route JSON-LD). Static defaults for non-JS crawlers live in index.html.
export function applySeo({ title, description, path, noindex = false, jsonLd = [] }) {
  document.title = title
  const url = absoluteUrl(path === '/' ? '/' : path)
  meta('name', 'description', description)
  meta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
  meta('property', 'og:title', title)
  meta('property', 'og:description', description)
  meta('property', 'og:url', url)
  meta('name', 'twitter:title', title)
  meta('name', 'twitter:description', description)
  upsert(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement('link')
      el.rel = 'canonical'
      return el
    },
    (el) => el.setAttribute('href', url),
  )
  document.head.querySelectorAll('script[data-route-ld]').forEach((el) => el.remove())
  for (const item of jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.routeLd = ''
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  }
  document.documentElement.lang = site.locale
}
