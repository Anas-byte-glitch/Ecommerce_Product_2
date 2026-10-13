import { audiences } from '../data/categories'
import { collections } from '../data/collections'
import { journals } from '../data/journals'
import { products } from '../data/products'

// Indexable URLs for sitemap.xml (generated at build time by scripts/generate-seo-files.mjs).
// Not listed on purpose: /cart, /checkout, /checkout/success, /favourite (personal pages) and /404.
export const getSitemapEntries = () => [
  { path: '/' },
  { path: '/shop' },
  ...audiences.map((audience) => ({ path: `/${audience.slug}` })),
  ...collections.map((collection) => ({ path: `/${collection.audience}-category/${collection.slug}` })),
  ...products.map((product) => ({ path: `/product/${product.slug}` })),
  { path: '/about' },
  { path: '/contact' },
  { path: '/journals' },
  ...journals.map((journal) => ({ path: `/journals/${journal.slug}`, lastmod: journal.date })),
  { path: '/terms' },
  { path: '/privacy-policy' },
  { path: '/refund-policy' },
]

// Paths crawlers should not fetch at all.
export const disallowedPaths = ['/checkout']
