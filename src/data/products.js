import { placeholders } from '../assets/placeholders'
import { productDetails } from './productDetails'

// 25 products, order = /favourite grid on the reference (see docs/SITE_MAP.md).
// Prices are placeholders: the reference loads them from Shopify and shows none.
// Product page texts live in productDetails.js (read from the reference).
const rows = [
  // slug, name, category, audience, badge, price, compareAtPrice, createdAt, salesRank
  ['tessa-line-necklace', 'Tessa Line Necklace', 'necklace', 'women', 'Best Sellers', 89, null, '2025-09-02', 1],
  ['marlow-pearl-pendant', 'Marlow Pearl Pendant', 'necklace', 'women', null, 79, null, '2025-09-05', 9],
  ['corin-heart-necklace', 'Corin Heart Necklace', 'necklace', 'women', null, 59, 75, '2025-09-08', 12],
  ['dune-rope-chain', 'Dune Rope Chain', 'chains', 'unisex', null, 69, null, '2025-09-11', 6],
  ['brisa-silver-chain', 'Brisa Silver Chain', 'chains', 'unisex', null, 65, null, '2025-09-14', 14],
  ['elowen-signet-ring', 'Elowen Signet Ring', 'rings', 'women', null, 55, null, '2025-09-17', 10],
  ['isolde-diamond-band', 'Isolde Diamond Band', 'rings', 'women', null, 79, 99, '2025-09-20', 8],
  ['wren-open-ring', 'Wren Open Ring', 'rings', 'women', null, 45, null, '2025-09-23', 11],
  ['odette-tennis-bracelet', 'Odette Tennis Bracelet', 'bracelets', 'women', 'Best Sellers', 129, null, '2025-09-26', 2],
  ['pippa-charm-bracelet', 'Pippa Charm Bracelet', 'bracelets', 'women', null, 69, null, '2025-09-29', 13],
  ['vivian-drop-earrings', 'Vivian Drop Earrings', 'earrings', 'women', null, 59, null, '2025-10-02', 15],
  ['calla-hoop-earrings', 'Calla Hoop Earrings', 'earrings', 'women', null, 49, null, '2025-10-05', 7],
  ['halden-cuban-chain', 'Halden Cuban Chain', 'neck-chains', 'men', 'Best Sellers', 149, null, '2025-10-08', 3],
  ['sutter-box-chain', 'Sutter Box Chain', 'neck-chains', 'men', null, 99, null, '2025-10-11', 16],
  ['brandt-figaro-chain', 'Brandt Figaro Chain', 'neck-chains', 'men', null, 119, null, '2025-10-14', 17],
  ['corvin-signet-ring', 'Corvin Signet Ring', 'rings', 'men', null, 79, null, '2025-10-17', 5],
  ['anselm-brushed-ring', 'Anselm Brushed Ring', 'rings', 'men', null, 65, null, '2025-10-20', 18],
  ['teague-curb-bracelet', 'Teague Curb Bracelet', 'bracelets', 'men', 'Best Sellers', 109, null, '2025-10-23', 4],
  ['fenn-leather-bracelet', 'Fenn Leather Bracelet', 'bracelets', 'men', null, 59, null, '2025-10-26', 19],
  ['jasper-link-bracelet', 'Jasper Link Bracelet', 'bracelets', 'men', null, 89, null, '2025-10-29', 20],
  ['merrick-cross-hoop', 'Merrick Cross Hoop', 'earrings', 'men', null, 45, null, '2025-11-01', 21],
  ['linnea-crystal-necklace', 'Linnea Crystal Necklace', 'necklace', 'women', 'New Arrivals', 95, null, '2026-02-10', 22],
  ['maisie-twist-ring', 'Maisie Twist Ring', 'rings', 'women', 'New Arrivals', 59, null, '2026-02-14', 23],
  ['quill-rope-bracelet', 'Quill Rope Bracelet', 'bracelets', 'men', 'New Arrivals', 79, null, '2026-02-18', 24],
  ['beckett-black-stud', 'Beckett Black Stud', 'earrings', 'men', 'New Arrivals', 39, null, '2026-02-22', 25],
]

const categoryLabels = {
  necklace: 'Necklace',
  chains: 'Chains',
  'neck-chains': 'Neck Chains',
  rings: 'Rings',
  bracelets: 'Bracelets',
  earrings: 'Earrings',
}

export const products = rows.map(
  ([slug, name, category, audience, badge, price, compareAtPrice, createdAt, salesRank]) => ({
    slug,
    name,
    categoryLabel: categoryLabels[category],
    category,
    audience, // 'women' | 'men' | 'unisex'
    badge, // 'Best Sellers' | 'New Arrivals' | null
    price,
    compareAtPrice: compareAtPrice ?? undefined,
    onSale: compareAtPrice != null,
    images: [placeholders.product, placeholders.productAlt],
    // Product page gallery: 4 images, like the reference (Aurora's 2nd image is 4:5, the rest 1:1).
    gallery: [
      placeholders.product,
      slug === 'tessa-line-necklace' ? placeholders.galleryPortrait : placeholders.productAlt,
      placeholders.galleryWide,
      placeholders.galleryWideAlt,
    ],
    ...productDetails[slug], // description, details, materials, dimensions, care, matchWith
    createdAt,
    salesRank,
  }),
)

export const getProduct = (slug) => products.find((p) => p.slug === slug)

export const getProductsBySlugs = (slugs) => slugs.map(getProduct).filter(Boolean)

// Default "Continue Your Journey" strip (home page order on the reference).
export const journeyProducts = ['dune-rope-chain', 'wren-open-ring', 'pippa-charm-bracelet', 'brandt-figaro-chain']
