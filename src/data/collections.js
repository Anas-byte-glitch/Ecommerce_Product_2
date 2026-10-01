import { placeholders } from '../assets/placeholders'

// Sub-collections, URL: /{audience}-category/{slug}. Product lists match the reference.
export const collections = [
  {
    slug: 'women-necklace',
    audience: 'women',
    eyebrow: 'Necklaces',
    title: "Women's Necklaces",
    image: placeholders.collectionWide,
    products: ['aurora-bar-necklace', 'luna-pearl-pendant', 'nova-heart-necklace', 'elara-crystal-necklace'],
  },
  {
    slug: 'women-ring',
    audience: 'women',
    eyebrow: 'Rings',
    title: "Women's Rings",
    image: placeholders.collectionNarrow,
    products: ['luna-signet-ring', 'celeste-diamond-band', 'nova-open-ring', 'ivy-twist-ring'],
  },
  {
    slug: 'women-bracelet',
    audience: 'women',
    eyebrow: 'Bracelets',
    title: "Women's Bracelets",
    image: placeholders.collectionHalf,
    products: ['stella-tennis-bracelet', 'luna-charm-bracelet'],
  },
  {
    slug: 'women-earring',
    audience: 'women',
    eyebrow: 'Earrings',
    title: "Women's Earrings",
    image: placeholders.collectionHalf,
    products: ['celeste-drop-earrings', 'aurora-hoop-earrings'],
  },
  {
    slug: 'women-bestsellers',
    audience: 'women',
    eyebrow: 'Best Sellers',
    title: "Women's Bestsellers",
    image: placeholders.collectionWide,
    products: ['aurora-bar-necklace', 'stella-tennis-bracelet'],
  },
  {
    slug: 'women-newarrivals',
    audience: 'women',
    eyebrow: 'New Arrivals',
    title: "Women's New Arrivals",
    image: placeholders.collectionNarrow,
    products: ['elara-crystal-necklace', 'ivy-twist-ring'],
  },
  {
    slug: 'women-onsale',
    audience: 'women',
    eyebrow: 'On Sale',
    title: "Women's Exclusive Sale",
    image: placeholders.collectionFull,
    products: ['nova-heart-necklace', 'celeste-diamond-band'],
  },
  {
    slug: 'men-chain',
    audience: 'men',
    eyebrow: 'Chains',
    title: "Men's Chains",
    image: placeholders.collectionWide,
    products: ['atlas-cuban-chain', 'orion-box-chain', 'titan-figaro-chain'],
  },
  {
    slug: 'men-ring',
    audience: 'men',
    eyebrow: 'Rings',
    title: "Men's Rings",
    image: placeholders.collectionNarrow,
    products: ['atlas-signet-ring', 'titan-brushed-ring'],
  },
  {
    slug: 'men-bracelet',
    audience: 'men',
    eyebrow: 'Bracelets',
    title: "Men's Bracelets",
    image: placeholders.collectionHalf,
    products: ['atlas-curb-bracelet', 'orion-leather-bracelet', 'titan-link-bracelet', 'knox-rope-bracelet'],
  },
  {
    slug: 'men-earring',
    audience: 'men',
    eyebrow: 'Earrings',
    title: "Men's Earrings",
    image: placeholders.collectionHalf,
    products: ['ryder-cross-hoop', 'ryder-black-stud'],
  },
  {
    slug: 'men-bestsellers',
    audience: 'men',
    eyebrow: 'Best Sellers',
    title: "Men's Bestsellers",
    image: placeholders.collectionWide,
    products: ['atlas-cuban-chain', 'atlas-curb-bracelet'],
  },
  {
    slug: 'men-newarrivals',
    audience: 'men',
    eyebrow: 'New Arrivals',
    title: "Men's New Arrivals",
    image: placeholders.collectionNarrow,
    products: ['knox-rope-bracelet', 'ryder-black-stud'],
  },
  {
    slug: 'men-onsale',
    audience: 'men',
    eyebrow: 'On Sale',
    title: 'Men Exclusive Sale',
    image: placeholders.collectionFull,
    products: [], // reference shows "This Collection Is Coming Soon"
  },
]

export const getCollectionsByAudience = (audience) =>
  collections.filter((c) => c.audience === audience)

export const getCollection = (audience, slug) =>
  collections.find((c) => c.audience === audience && c.slug === slug)
