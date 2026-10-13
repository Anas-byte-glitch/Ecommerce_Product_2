// Audience landing pages (/women-category, /men-category).
export const audiences = [
  {
    slug: 'women-category',
    audience: 'women',
    label: "Women's Collection",
    eyebrow: 'Made For Her',
    title: 'Jewelry Designed Around Women, Start to Finish',
    browseLabel: "Shop Women's Collections",
    browseTitle: 'Find The Piece You Have In Mind',
    // Bottom promo block linking to the other audience.
    cross: { label: 'For Him', title: "Take a Look at Our Men's Range", cta: "Browse the Men's Range", to: '/men-category' },
  },
  {
    slug: 'men-category',
    audience: 'men',
    label: "Men's Collection",
    eyebrow: 'Made For Him',
    title: 'Clean, Sturdy Pieces for Every Day',
    browseLabel: "Shop Men's Collections",
    browseTitle: 'Find The Piece You Have In Mind',
    cross: { label: 'For Her', title: "Take a Look at Our Women's Range", cta: "Browse the Women's Range", to: '/women-category' },
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
