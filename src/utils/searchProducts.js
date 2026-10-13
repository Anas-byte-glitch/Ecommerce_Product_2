// Instant client-side product search: every query word must be the start of a word in the
// product's name, category label or audience ("men" matches men's pieces, not "women").
const audienceWords = { women: ['women', "women's", 'womens', 'her'], men: ['men', "men's", 'mens', 'him'], unisex: ['unisex'] }

const words = (text) => text.toLowerCase().split(/[^a-z0-9']+/).filter(Boolean)

export function searchProducts(products, query) {
  const tokens = words(query)
  if (!tokens.length) return []
  return products.filter((product) => {
    const haystack = [...words(product.name), ...words(product.categoryLabel), ...(audienceWords[product.audience] ?? [])]
    return tokens.every((token) => haystack.some((word) => word.startsWith(token)))
  })
}
