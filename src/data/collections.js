import { placeholders } from '../assets/placeholders'

// Sub-collections, URL: /{audience}-category/{slug}. Product lists match the reference.
// Array order = bento tile order on /women-category and /men-category (verified from the
// reference page modules); `tileLabel` is the tile caption, `image` the tile's bento shape.
export const collections = [
  {
    slug: 'women-necklace',
    audience: 'women',
    eyebrow: 'Necklaces',
    title: "Women's Necklaces",
    tileLabel: 'Necklace',
    image: placeholders.collectionWide,
    products: ['aurora-bar-necklace', 'luna-pearl-pendant', 'nova-heart-necklace', 'elara-crystal-necklace'],
  },
  {
    slug: 'women-ring',
    audience: 'women',
    eyebrow: 'Rings',
    title: "Women's Rings",
    tileLabel: 'Rings',
    image: placeholders.collectionNarrow,
    products: ['luna-signet-ring', 'celeste-diamond-band', 'nova-open-ring', 'ivy-twist-ring'],
  },
  {
    slug: 'women-bracelet',
    audience: 'women',
    eyebrow: 'Bracelets',
    title: "Women's Bracelets",
    tileLabel: 'Bracelets',
    image: placeholders.collectionHalf,
    products: ['stella-tennis-bracelet', 'luna-charm-bracelet'],
  },
  {
    slug: 'women-earring',
    audience: 'women',
    eyebrow: 'Earrings',
    title: "Women's Earrings",
    tileLabel: 'Earrings',
    image: placeholders.collectionHalf,
    products: ['celeste-drop-earrings', 'aurora-hoop-earrings'],
  },
  {
    slug: 'women-bestsellers',
    audience: 'women',
    eyebrow: 'Best Sellers',
    title: "Women's Bestsellers",
    tileLabel: 'Best Sellers',
    image: placeholders.collectionWide,
    products: ['aurora-bar-necklace', 'stella-tennis-bracelet'],
  },
  {
    slug: 'women-newarrivals',
    audience: 'women',
    eyebrow: 'New Arrivals',
    title: "Women's New Arrivals",
    tileLabel: 'New Arrivals',
    image: placeholders.collectionNarrow,
    products: ['elara-crystal-necklace', 'ivy-twist-ring'],
  },
  {
    slug: 'women-onsale',
    audience: 'women',
    eyebrow: 'On Sale',
    title: "Women's Exclusive Sale",
    tileLabel: 'On Sale',
    image: placeholders.collectionFull,
    products: ['nova-heart-necklace', 'celeste-diamond-band'],
  },
  {
    slug: 'men-chain',
    audience: 'men',
    eyebrow: 'Chains',
    title: "Men's Chains",
    tileLabel: 'Chains',
    image: placeholders.collectionWide,
    products: ['atlas-cuban-chain', 'orion-box-chain', 'titan-figaro-chain'],
  },
  {
    slug: 'men-ring',
    audience: 'men',
    eyebrow: 'Rings',
    title: "Men's Rings",
    tileLabel: 'Rings',
    image: placeholders.collectionNarrow,
    products: ['atlas-signet-ring', 'titan-brushed-ring'],
  },
  {
    slug: 'men-bracelet',
    audience: 'men',
    eyebrow: 'Bracelets',
    title: "Men's Bracelets",
    tileLabel: 'Bracelets',
    image: placeholders.collectionHalf,
    products: ['atlas-curb-bracelet', 'orion-leather-bracelet', 'titan-link-bracelet', 'knox-rope-bracelet'],
  },
  {
    slug: 'men-earring',
    audience: 'men',
    eyebrow: 'Earrings',
    title: "Men's Earrings",
    tileLabel: 'Earrings',
    image: placeholders.collectionHalf,
    products: ['ryder-cross-hoop', 'ryder-black-stud'],
  },
  {
    slug: 'men-bestsellers',
    audience: 'men',
    eyebrow: 'Best Sellers',
    title: "Men's Bestsellers",
    tileLabel: 'Best Sellers',
    image: placeholders.collectionNarrow,
    products: ['atlas-cuban-chain', 'atlas-curb-bracelet'],
  },
  {
    slug: 'men-newarrivals',
    audience: 'men',
    eyebrow: 'New Arrivals',
    title: "Men's New Arrivals",
    tileLabel: 'New Arrivals',
    image: placeholders.collectionWide,
    products: ['knox-rope-bracelet', 'ryder-black-stud'],
  },
  {
    slug: 'men-onsale',
    audience: 'men',
    eyebrow: 'On Sale',
    title: 'Men Exclusive Sale',
    tileLabel: 'On Sale',
    image: placeholders.collectionFull,
    products: [], // reference shows "This Collection Is Coming Soon"
  },
]

export const getCollectionsByAudience = (audience) =>
  collections.filter((c) => c.audience === audience)

export const getCollection = (audience, slug) =>
  collections.find((c) => c.audience === audience && c.slug === slug)
