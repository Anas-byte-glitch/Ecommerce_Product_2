import { placeholders } from '../assets/placeholders'

// 25 products, order = /favourite grid on the reference (see docs/SITE_MAP.md).
// Prices are placeholders: the reference loads them from Shopify and shows none.
// Descriptions/materials/dimensions/care are placeholders until the PDP phase.
const rows = [
  // slug, name, category, audience, badge, price, compareAtPrice, createdAt, salesRank
  ['aurora-bar-necklace', 'Aurora Bar Necklace', 'necklace', 'women', 'Best Sellers', 89, null, '2025-09-02', 1],
  ['luna-pearl-pendant', 'Luna Pearl Pendant', 'necklace', 'women', null, 79, null, '2025-09-05', 9],
  ['nova-heart-necklace', 'Nova Heart Necklace', 'necklace', 'women', null, 59, 75, '2025-09-08', 12],
  ['harper-rope-chain', 'Harper Rope Chain', 'chains', 'unisex', null, 69, null, '2025-09-11', 6],
  ['siena-gold-chain', 'Siena Silver Chain', 'chains', 'unisex', null, 65, null, '2025-09-14', 14],
  ['luna-signet-ring', 'Luna Signet Ring', 'rings', 'women', null, 55, null, '2025-09-17', 10],
  ['celeste-diamond-band', 'Celeste Diamond Band', 'rings', 'women', null, 79, 99, '2025-09-20', 8],
  ['nova-open-ring', 'Nova Open Ring', 'rings', 'women', null, 45, null, '2025-09-23', 11],
  ['stella-tennis-bracelet', 'Stella Tennis Bracelet', 'bracelets', 'women', 'Best Sellers', 129, null, '2025-09-26', 2],
  ['luna-charm-bracelet', 'Luna Charm Bracelet', 'bracelets', 'women', null, 69, null, '2025-09-29', 13],
  ['celeste-drop-earrings', 'Celeste Drop Earrings', 'earrings', 'women', null, 59, null, '2025-10-02', 15],
  ['aurora-hoop-earrings', 'Aurora Hoop Earrings', 'earrings', 'women', null, 49, null, '2025-10-05', 7],
  ['atlas-cuban-chain', 'Atlas Cuban Chain', 'neck-chains', 'men', 'Best Sellers', 149, null, '2025-10-08', 3],
  ['orion-box-chain', 'Orion Box Chain', 'neck-chains', 'men', null, 99, null, '2025-10-11', 16],
  ['titan-figaro-chain', 'Titan Figaro Chain', 'neck-chains', 'men', null, 119, null, '2025-10-14', 17],
  ['atlas-signet-ring', 'Atlas Signet Ring', 'rings', 'men', null, 79, null, '2025-10-17', 5],
  ['titan-brushed-ring', 'Titan Brushed Ring', 'rings', 'men', null, 65, null, '2025-10-20', 18],
  ['atlas-curb-bracelet', 'Atlas Curb Bracelet', 'bracelets', 'men', 'Best Sellers', 109, null, '2025-10-23', 4],
  ['orion-leather-bracelet', 'Orion Leather Bracelet', 'bracelets', 'men', null, 59, null, '2025-10-26', 19],
  ['titan-link-bracelet', 'Titan Link Bracelet', 'bracelets', 'men', null, 89, null, '2025-10-29', 20],
  ['ryder-cross-hoop', 'Ryder Cross Hoop', 'earrings', 'men', null, 45, null, '2025-11-01', 21],
  ['elara-crystal-necklace', 'Elara Crystal Necklace', 'necklace', 'women', 'New Arrivals', 95, null, '2026-02-10', 22],
  ['ivy-twist-ring', 'Ivy Twist Ring', 'rings', 'women', 'New Arrivals', 59, null, '2026-02-14', 23],
  ['knox-rope-bracelet', 'Knox Rope Bracelet', 'bracelets', 'men', 'New Arrivals', 79, null, '2026-02-18', 24],
  ['ryder-black-stud', 'Ryder Black Stud', 'earrings', 'men', 'New Arrivals', 39, null, '2026-02-22', 25],
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
    description: 'Placeholder description.',
    materials: 'Placeholder materials.',
    dimensions: 'Placeholder dimensions.',
    care: 'Placeholder care instructions.',
    createdAt,
    salesRank,
  }),
)

export const getProduct = (slug) => products.find((p) => p.slug === slug)

export const getProductsBySlugs = (slugs) => slugs.map(getProduct).filter(Boolean)
