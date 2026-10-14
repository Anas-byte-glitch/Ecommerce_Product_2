import { placeholders } from '../assets/placeholders'
import { photoOr } from '../assets/photos'

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
    image: photoOr('collection-women-necklace', placeholders.collectionWide),
    products: ['marlow-line-necklace', 'isla-pearl-pendant', 'corin-heart-necklace', 'linnea-crystal-necklace'],
  },
  {
    slug: 'women-ring',
    audience: 'women',
    label: 'Rings',
    title: "Women's Rings",
    tileLabel: 'Rings',
    image: photoOr('collection-women-ring', placeholders.collectionNarrow),
    products: ['elowen-signet-ring', 'odette-diamond-band', 'wren-open-ring', 'maisie-twist-ring'],
  },
  {
    slug: 'women-bracelet',
    audience: 'women',
    label: 'Bracelets',
    title: "Women's Bracelets",
    tileLabel: 'Bracelets',
    image: photoOr('collection-women-bracelet', placeholders.collectionHalf),
    products: ['tessa-scale-cuff', 'vivian-charm-bracelet'],
  },
  {
    slug: 'women-earring',
    audience: 'women',
    label: 'Earrings',
    title: "Women's Earrings",
    tileLabel: 'Earrings',
    image: photoOr('collection-women-earring', placeholders.collectionHalf),
    products: ['anselm-drop-earrings', 'corvin-hoop-earrings'],
  },
  {
    slug: 'women-bestsellers',
    audience: 'women',
    label: 'Best Sellers',
    title: "Women's Bestsellers",
    tileLabel: 'Best Sellers',
    image: photoOr('collection-women-bestsellers', placeholders.collectionWide),
    products: ['marlow-line-necklace', 'tessa-scale-cuff'],
  },
  {
    slug: 'women-newarrivals',
    audience: 'women',
    label: 'New Arrivals',
    title: "Women's New Arrivals",
    tileLabel: 'New Arrivals',
    image: photoOr('collection-women-newarrivals', placeholders.collectionNarrow),
    products: ['linnea-crystal-necklace', 'maisie-twist-ring'],
  },
  {
    slug: 'women-onsale',
    audience: 'women',
    label: 'On Sale',
    title: "Women's Exclusive Sale",
    tileLabel: 'On Sale',
    image: photoOr('collection-women-onsale', placeholders.collectionFull),
    products: ['corin-heart-necklace', 'odette-diamond-band'],
  },
  {
    slug: 'men-chain',
    audience: 'men',
    label: 'Chains',
    title: "Men's Chains",
    tileLabel: 'Chains',
    image: photoOr('collection-men-chain', placeholders.collectionWide),
    products: ['rhett-cuban-chain', 'sutter-box-chain', 'lyle-figaro-chain'],
  },
  {
    slug: 'men-ring',
    audience: 'men',
    label: 'Rings',
    title: "Men's Rings",
    tileLabel: 'Rings',
    image: photoOr('collection-men-ring', placeholders.collectionNarrow),
    products: ['pia-signet-ring', 'calla-brushed-ring'],
  },
  {
    slug: 'men-bracelet',
    audience: 'men',
    label: 'Bracelets',
    title: "Men's Bracelets",
    tileLabel: 'Bracelets',
    image: photoOr('collection-men-bracelet', placeholders.collectionHalf),
    products: ['fenn-curb-bracelet', 'teague-leather-bracelet', 'quill-link-bracelet', 'soren-rope-bracelet'],
  },
  {
    slug: 'men-earring',
    audience: 'men',
    label: 'Earrings',
    title: "Men's Earrings",
    tileLabel: 'Earrings',
    image: photoOr('collection-men-earring', placeholders.collectionHalf),
    products: ['jasper-cross-hoop', 'beckett-black-stud'],
  },
  {
    slug: 'men-bestsellers',
    audience: 'men',
    label: 'Best Sellers',
    title: "Men's Bestsellers",
    tileLabel: 'Best Sellers',
    image: photoOr('collection-men-bestsellers', placeholders.collectionNarrow),
    products: ['rhett-cuban-chain', 'fenn-curb-bracelet'],
  },
  {
    slug: 'men-newarrivals',
    audience: 'men',
    label: 'New Arrivals',
    title: "Men's New Arrivals",
    tileLabel: 'New Arrivals',
    image: photoOr('collection-men-newarrivals', placeholders.collectionWide),
    products: ['soren-rope-bracelet', 'beckett-black-stud'],
  },
  {
    slug: 'men-onsale',
    audience: 'men',
    label: 'On Sale',
    title: 'Men Exclusive Sale',
    tileLabel: 'On Sale',
    image: photoOr('collection-men-onsale', placeholders.collectionFull),
    products: [], // reference shows "This Collection Is Coming Soon"
  },
]

export const getCollectionsByAudience = (audience) =>
  collections.filter((c) => c.audience === audience)

export const getCollection = (audience, slug) =>
  collections.find((c) => c.audience === audience && c.slug === slug)
