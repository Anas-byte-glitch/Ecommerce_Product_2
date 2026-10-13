import { placeholders } from '../assets/placeholders'

// Sub-collections, URL: /{audience}-category/{slug}. Product lists match the reference.
// Array order = bento tile order on /women-category and /men-category (verified from the
// reference page modules); `tileLabel` is the tile caption, `image` the tile's bento shape.
// `label` = small "/ label /" above the page heading, `title` = the page heading (read from the reference).
export const collections = [
  {
    slug: 'women-necklace',
    audience: 'women',
    label: 'Necklaces',
    title: "Women's Necklaces",
    tileLabel: 'Necklace',
    image: placeholders.collectionWide,
    products: ['tessa-line-necklace', 'marlow-pearl-pendant', 'corin-heart-necklace', 'linnea-crystal-necklace'],
  },
  {
    slug: 'women-ring',
    audience: 'women',
    label: 'Rings',
    title: "Women's Rings",
    tileLabel: 'Rings',
    image: placeholders.collectionNarrow,
    products: ['elowen-signet-ring', 'isolde-diamond-band', 'wren-open-ring', 'maisie-twist-ring'],
  },
  {
    slug: 'women-bracelet',
    audience: 'women',
    label: 'Bracelets',
    title: "Women's Bracelets",
    tileLabel: 'Bracelets',
    image: placeholders.collectionHalf,
    products: ['odette-tennis-bracelet', 'pippa-charm-bracelet'],
  },
  {
    slug: 'women-earring',
    audience: 'women',
    label: 'Earrings',
    title: "Women's Earrings",
    tileLabel: 'Earrings',
    image: placeholders.collectionHalf,
    products: ['vivian-drop-earrings', 'calla-hoop-earrings'],
  },
  {
    slug: 'women-bestsellers',
    audience: 'women',
    label: 'Best Sellers',
    title: "Women's Bestsellers",
    tileLabel: 'Best Sellers',
    image: placeholders.collectionWide,
    products: ['tessa-line-necklace', 'odette-tennis-bracelet'],
  },
  {
    slug: 'women-newarrivals',
    audience: 'women',
    label: 'New Arrivals',
    title: "Women's New Arrivals",
    tileLabel: 'New Arrivals',
    image: placeholders.collectionNarrow,
    products: ['linnea-crystal-necklace', 'maisie-twist-ring'],
  },
  {
    slug: 'women-onsale',
    audience: 'women',
    label: 'On Sale',
    title: "Women's Exclusive Sale",
    tileLabel: 'On Sale',
    image: placeholders.collectionFull,
    products: ['corin-heart-necklace', 'isolde-diamond-band'],
  },
  {
    slug: 'men-chain',
    audience: 'men',
    label: 'Chains',
    title: "Men's Chains",
    tileLabel: 'Chains',
    image: placeholders.collectionWide,
    products: ['halden-cuban-chain', 'sutter-box-chain', 'brandt-figaro-chain'],
  },
  {
    slug: 'men-ring',
    audience: 'men',
    label: 'Rings',
    title: "Men's Rings",
    tileLabel: 'Rings',
    image: placeholders.collectionNarrow,
    products: ['corvin-signet-ring', 'anselm-brushed-ring'],
  },
  {
    slug: 'men-bracelet',
    audience: 'men',
    label: 'Bracelets',
    title: "Men's Bracelets",
    tileLabel: 'Bracelets',
    image: placeholders.collectionHalf,
    products: ['teague-curb-bracelet', 'fenn-leather-bracelet', 'jasper-link-bracelet', 'quill-rope-bracelet'],
  },
  {
    slug: 'men-earring',
    audience: 'men',
    label: 'Earrings',
    title: "Men's Earrings",
    tileLabel: 'Earrings',
    image: placeholders.collectionHalf,
    products: ['merrick-cross-hoop', 'beckett-black-stud'],
  },
  {
    slug: 'men-bestsellers',
    audience: 'men',
    label: 'Best Sellers',
    title: "Men's Bestsellers",
    tileLabel: 'Best Sellers',
    image: placeholders.collectionNarrow,
    products: ['halden-cuban-chain', 'teague-curb-bracelet'],
  },
  {
    slug: 'men-newarrivals',
    audience: 'men',
    label: 'New Arrivals',
    title: "Men's New Arrivals",
    tileLabel: 'New Arrivals',
    image: placeholders.collectionWide,
    products: ['quill-rope-bracelet', 'beckett-black-stud'],
  },
  {
    slug: 'men-onsale',
    audience: 'men',
    label: 'On Sale',
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
