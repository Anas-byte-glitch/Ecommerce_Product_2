import { site } from '../config/site'

// JSON-LD builders. Every value comes from src/config/site.js or the data files.
export const absoluteUrl = (path = '/') => `${site.siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`

// Placeholder images are tiny SVGs that Vite inlines as data: URIs, which are not valid for structured
// data — fall back to the social image. Real photos (Phase 9) are served as normal URLs and pass through.
export const imageUrl = (image) => {
  const src = typeof image === 'object' && image !== null ? image.src : image
  if (!src || src.startsWith('data:')) return absoluteUrl('/og-image.png')
  return /^https?:/.test(src) ? src : absoluteUrl(src)
}

export const organizationLd = () => ({
  '@type': 'Organization',
  '@id': absoluteUrl('/#organization'),
  name: site.name,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/icon-512.png'),
  email: site.contactEmail,
  sameAs: Object.values(site.social),
})

export const websiteLd = () => ({
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: site.name,
  url: absoluteUrl('/'),
  inLanguage: site.locale,
  publisher: { '@id': absoluteUrl('/#organization') },
})

export const siteGraph = () => ({ '@context': 'https://schema.org', '@graph': [organizationLd(), websiteLd()] })

export const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: absoluteUrl(path),
  })),
})

export const productLd = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  sku: product.slug,
  category: product.categoryLabel,
  image: product.images.map(imageUrl),
  brand: { '@type': 'Brand', name: site.name },
  url: absoluteUrl(`/product/${product.slug}`),
  offers: {
    '@type': 'Offer',
    url: absoluteUrl(`/product/${product.slug}`),
    availability: 'https://schema.org/InStock',
    ...(site.showPrices ? { price: product.price.toFixed(2), priceCurrency: site.currency } : {}),
  },
})

export const articleLd = (journal) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: journal.title,
  description: journal.excerpt,
  datePublished: journal.date,
  articleSection: journal.tag,
  image: imageUrl(journal.image),
  mainEntityOfPage: absoluteUrl(`/journals/${journal.slug}`),
  author: { '@type': 'Organization', name: `${site.name} Editorial` },
  publisher: { '@id': absoluteUrl('/#organization') },
})
