// Audience landing pages (/women-category, /men-category).
export const audiences = [
  {
    slug: 'women-category',
    audience: 'women',
    label: "Women's Collection",
    eyebrow: 'Only For Her',
    title: 'A Collection Curated Exclusively For Women',
    browseLabel: 'Browse Women Collections',
    browseTitle: "Discover What You're Looking For",
    // Bottom promo block linking to the other audience (the reference label says "Explor").
    cross: { label: 'For Him', title: "Discover Our Men's Collection", cta: "Explore Men's Collection", to: '/men-category' },
  },
  {
    slug: 'men-category',
    audience: 'men',
    label: "Men's Collection",
    eyebrow: 'Only For Him',
    title: 'Refined Jewelry for Every Gentleman',
    browseLabel: 'Browse Men Collections',
    browseTitle: "Discover What You're Looking For",
    cross: { label: 'For Her', title: "Discover Our Women's Collection", cta: "Explore Women's Collection", to: '/women-category' },
  },
]

// Product types. `label` is the category text shown on product cards.
export const productCategories = [
  { slug: 'necklace', label: 'Necklace' },
  { slug: 'chains', label: 'Chains' },
  { slug: 'neck-chains', label: 'Neck Chains' },
  { slug: 'rings', label: 'Rings' },
  { slug: 'bracelets', label: 'Bracelets' },
  { slug: 'earrings', label: 'Earrings' },
]

export const getAudience = (audience) => audiences.find((a) => a.audience === audience)
