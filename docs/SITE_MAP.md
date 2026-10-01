# Site Map — Glintura reference

Source: https://glintura.framer.website/sitemap.xml (55 URLs) plus crawling every page
at 1440px on 2026-10-01. Our app uses the **same paths**.

## Routes

| Path | Page component | Navbar state at top | Notes |
|---|---|---|---|
| `/` | Home | light (over hero) | |
| `/shop` | Shop | light | eyebrow "Shop", h1 "Discover Your Signature Style" |
| `/women-category` | Category (women) | light | h1 "A Collection Curated Exclusively For Women" |
| `/men-category` | Category (men) | light | h1 "Refined Jewelry for Every Gentleman" |
| `/women-category/:collection` | Collection | dark | 7 collections, see below |
| `/men-category/:collection` | Collection | dark | 7 collections, see below |
| `/product/:slug` | ProductDetail | dark | 25 products |
| `/favourite` | Favourites | light | h1 "Your Loved Collection" |
| `/about` | About | light | |
| `/contact` | Contact | dark | form + support details + FAQ |
| `/journals` | Journals | dark | 4 articles |
| `/journals/:slug` | JournalArticle | light | |
| `/terms` | Legal | dark | "Terms & Conditions" |
| `/privacy-policy` | Legal | dark | |
| `/refund-policy` | Legal | dark | |
| `/404` | NotFound | dark | also used for unknown slugs and `*` |

Not built: the "Buy template" link (contra.com), "My Account" (myshopify.com).

## Collections

Each collection page shows: hero eyebrow "/ {eyebrow} /", h1 {title}, a product grid,
then the shared "Continue Your Journey" strip (harper-rope-chain, nova-open-ring,
luna-charm-bracelet) and "Featured Customers".

### Women (`/women-category/...`)

| Slug | Eyebrow | Title | Products (in reference order) |
|---|---|---|---|
| `women-necklace` | Necklaces | Women's Necklaces | aurora-bar-necklace, luna-pearl-pendant, nova-heart-necklace, elara-crystal-necklace |
| `women-ring` | Rings | Women's Rings | luna-signet-ring, celeste-diamond-band, nova-open-ring, ivy-twist-ring |
| `women-bracelet` | Bracelets | Women's Bracelets | stella-tennis-bracelet, luna-charm-bracelet |
| `women-earring` | Earrings | Women's Earrings | celeste-drop-earrings, aurora-hoop-earrings |
| `women-bestsellers` | Best Sellers | Women's Bestsellers | aurora-bar-necklace, stella-tennis-bracelet |
| `women-newarrivals` | New Arrivals | Women's New Arrivals | elara-crystal-necklace, ivy-twist-ring |
| `women-onsale` | On Sale | Women's Exclusive Sale | nova-heart-necklace, celeste-diamond-band |

### Men (`/men-category/...`)

| Slug | Eyebrow | Title | Products |
|---|---|---|---|
| `men-chain` | Chains | Men's Chains | atlas-cuban-chain, orion-box-chain, titan-figaro-chain |
| `men-ring` | Rings | Men's Rings | atlas-signet-ring, titan-brushed-ring |
| `men-bracelet` | Bracelets | Men's Bracelets | atlas-curb-bracelet, orion-leather-bracelet, titan-link-bracelet, knox-rope-bracelet |
| `men-earring` | Earrings | Men's Earrings | ryder-cross-hoop, ryder-black-stud |
| `men-bestsellers` | Best Sellers | Men's Bestsellers | atlas-cuban-chain, atlas-curb-bracelet |
| `men-newarrivals` | New Arrivals | Men's New Arrivals | knox-rope-bracelet, ryder-black-stud |
| `men-onsale` | On Sale | Men Exclusive Sale | _(empty → "This Collection Is Coming Soon" + "Explore Collections")_ |

On `/women-category` and `/men-category` the collections are shown as a 7-tile bento
grid after the header "/ Browse Women Collections /" (men: "/ Browse Men Collections /") +
h2 "Discover What You're Looking For". **Verified 2026-10-01** from the reference page
modules (each tile is a Framer component with a link + label prop) and the tile photos:
tiles are the 7 collections above **in sitemap order**.

| Row (desktop px) | Women tile → label | Men tile → label |
|---|---|---|
| 1: 960 + 400 (500 tall) | women-necklace "Necklace", women-ring "Rings" | men-chain "Chains", men-ring "Rings" |
| 2: 680 + 680 | women-bracelet "Bracelets", women-earring "Earrings" | men-bracelet "Bracelets", men-earring "Earrings" |
| 3 | 960 + 400: women-bestsellers "Best Sellers", women-newarrivals "New Arrivals" | **400 + 960** (mirrored): men-bestsellers "Best Sellers", men-newarrivals "New Arrivals" |
| 4: 1376 × 800 | women-onsale "On Sale" | men-onsale "On Sale" |

Labels are stored as `tileLabel` in `src/data/collections.js` (note "Necklace", singular,
while the collection eyebrow is "Necklaces"). The labels render through a sub-component
that stays empty in the sandbox, so the label *styling* is still unmeasured.

After the grid comes a cross-link section to the other audience: women page "Men's
recommendation" / "Discover Our Men's Collection" / "For Him" / button "Explor Men's
Collection" (sic) → `/men-category`; men page "Women's Recommendation" / "Discover Our
Women's Collection" / "For Her" / "Explor Women's Collection" → `/women-category`. Then
"/ Explore more products /" (harper-rope-chain, nova-open-ring, luna-charm-bracelet) and
"/ Featured Customers /".

## Products (25)

`audience` derived from collection membership. `harper-rope-chain` and `siena-gold-chain`
belong to **no** gendered collection (they only appear on `/favourite` and in "Continue
Your Journey") → audience `unisex`. Badges: card text "Best Sellers"/"New Arrivals"; the
PDP shows "Best Seller" only. "On Sale" comes from the on-sale collections (no badge).

| # | Slug | Name | Category label | Badge | Audience | On sale |
|---|---|---|---|---|---|---|
| 1 | aurora-bar-necklace | Aurora Bar Necklace | Necklace | Best Sellers | women | |
| 2 | luna-pearl-pendant | Luna Pearl Pendant | Necklace | — | women | |
| 3 | nova-heart-necklace | Nova Heart Necklace | Necklace | — | women | yes |
| 4 | harper-rope-chain | Harper Rope Chain | Chains | — | unisex | |
| 5 | siena-gold-chain | Siena Silver Chain | Chains | — | unisex | |
| 6 | luna-signet-ring | Luna Signet Ring | Rings | — | women | |
| 7 | celeste-diamond-band | Celeste Diamond Band | Rings | — | women | yes |
| 8 | nova-open-ring | Nova Open Ring | Rings | — | women | |
| 9 | stella-tennis-bracelet | Stella Tennis Bracelet | Bracelets | Best Sellers | women | |
| 10 | luna-charm-bracelet | Luna Charm Bracelet | Bracelets | — | women | |
| 11 | celeste-drop-earrings | Celeste Drop Earrings | Earrings | — | women | |
| 12 | aurora-hoop-earrings | Aurora Hoop Earrings | Earrings | — | women | |
| 13 | atlas-cuban-chain | Atlas Cuban Chain | Neck Chains | Best Sellers | men | |
| 14 | orion-box-chain | Orion Box Chain | Neck Chains | — | men | |
| 15 | titan-figaro-chain | Titan Figaro Chain | Neck Chains | — | men | |
| 16 | atlas-signet-ring | Atlas Signet Ring | Rings | — | men | |
| 17 | titan-brushed-ring | Titan Brushed Ring | Rings | — | men | |
| 18 | atlas-curb-bracelet | Atlas Curb Bracelet | Bracelets | Best Sellers | men | |
| 19 | orion-leather-bracelet | Orion Leather Bracelet | Bracelets | — | men | |
| 20 | titan-link-bracelet | Titan Link Bracelet | Bracelets | — | men | |
| 21 | ryder-cross-hoop | Ryder Cross Hoop | Earrings | — | men | |
| 22 | elara-crystal-necklace | Elara Crystal Necklace | Necklace | New Arrivals | women | |
| 23 | ivy-twist-ring | Ivy Twist Ring | Rings | New Arrivals | women | |
| 24 | knox-rope-bracelet | Knox Rope Bracelet | Bracelets | New Arrivals | men | |
| 25 | ryder-black-stud | Ryder Black Stud | Earrings | New Arrivals | men | |

Order = the `/favourite` grid order (also the sitemap order, except 22–25 which are last
in both). Prices are **not visible** on the reference (served by Shopify) → placeholders.
Every PDP has: main image + gallery (4 thumbs), category eyebrow, title, short
description, quantity, two buttons, 4 accordions ("Description", "Materials / Composition",
"Dimensions & Fit", "Care"), "Perfect match with", reviews, "Continue Your Journey".

## Home sections (order, for later phases)

Hero ("/ Exclusive Collection /", "Beyond Ordinary Elegance", "Crafted For Legacy",
CTA "Shop New Arrivals" → /shop) · Best Sellers ("Our Most Loved Designs", Show All) ·
Category ("/ For Everyone /", "Style knows no gender") · Ticker (Waterproof · Skin
Friendly · Everyday Wear) · New Arrivals · About us (video — replace with image) ·
More Products · Featured customer + CTA ("You Could Be Our Next Feature" / "The Next
Spotlight Could Be Yours") · Footer.

## Journals (4)

| Slug | Tag | Date | Read time | Title |
|---|---|---|---|---|
| the-art-of-everyday-elegance | Styling | Mar 12, 2026 | 6 min | The Art of Everyday Elegance (featured) |
| caring-for-jewelry-that-lasts | Care Guide | Apr 4, 2026 | 5 min | Caring for Jewelry That Lasts |
| building-a-timeless-jewelry-collection | Guide | May 18, 2026 | 8 min | Building a Timeless Jewelry Collection |
| why-timeless-design-never-fades | Editorial | Jun 9, 2026 | 7 min | Why Timeless Design Never Fades |

## FAQ (Contact page) — 6 questions

1. How long does shipping take?
2. Do you ship internationally?
3. Can I return or exchange my order?
4. How can I track my order?
5. What payment methods do you accept?
6. Will my jewelry tarnish?

## Featured customers (shared section)

Ethan Parker (Titan Link Bracelet), Noah Bennett (Atlas Signet Ring), Emma Carter
(Aurora Bar Necklace), Olivia Brooks (Aurora Bar Necklace), Sophia Mitchell ("Luna Hoop
Earrings" — not a real product slug), Charlotte Hayes ("Nova Signet Ring" — not a real
product slug). Each links to Instagram.

## Do-not-copy list

"Buy template" button + contra.com payment link · any myshopify.com link ("My Account",
navbar User icon) · template author's email / phone / address (Contact page) ·
all framerusercontent images and the mp4 video · payment-brand logos · the Framer /
Framer Commerce badges.
