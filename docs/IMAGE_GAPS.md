# Image gaps audit (round 3, 2026-10-14)

Internal planning file (excluded from the sold package).

## How this was measured
- **Deployed site** (https://ecommerce-product-2.vercel.app/): **not reachable from the build environment**: the agent proxy refuses `*.vercel.app` (CONNECT 403, organization policy), so neither Playwright nor fetch could open it, and I cannot tell which commit Vercel serves. To audit the real site, allow `vercel.app` in the environment's network settings, or compare with the checks below.
- **Local build of `main` + round-3 branch** (`npm run build`, `vite preview`) crawled with Playwright (installed outside the project) at 1440 and 390 px: 61 routes each (home, shop, women/men category, all 14 collections, all 25 products, favourites, about, contact, journals + 4 articles, terms/privacy/refund, cart empty and filled, checkout, success, 404, unknown URL, unknown product). Every `<img>` was inspected (placeholder SVG or photo, size, position, loaded or not), plus HTTP errors and console errors.
- **Result:** 0 failed image requests, 0 HTTP 4xx/5xx, 0 console or page errors, no route renders blank. All gaps are neutral grey SVG placeholders.
- **Head values** (identical on every route; `site.siteUrl` is still the template default): canonical `https://example.com/…`, `og:url` `https://example.com/`, `og:image` and `twitter:image` `https://example.com/og-image.png`, sitemap and robots point at `https://example.com`. On the Vercel demo these will be wrong until `siteUrl` in `src/config/site.js` is set to the real address (a buyer setting, not an image task; not changed here).

## What looks broken or empty on the pages
- Flat mid-grey blocks with a faint line icon where a photo is missing: the two Home/Shop split tiles, the three About materials tiles, the tall About and Home banners, the Contact photo, the journal cards, the founder circle.
- Full-screen overlay sections (newsletter on every page, "Take a Look at Our Women's/Men's Range" CTA, Home "Made for How You Dress Now") are a dark gradient over flat grey: the cream text stays readable, but the sections look unfinished.
- The four journal article heroes (fixed, full screen) are flat dark grey.
- Product cards without a photo (7 products) show a pale grey box.
- No photo-less section has text that fails contrast (axe: 0 violations).

## Remaining placeholders, ranked (1440 px; the same slots appear at 390 px)
Tier A = must have before selling, B = nice to have, C = optional.

| Route | Slot | Shown now | Visibility | Tier |
|---|---|---|---|---|
| every page with shared sections (all but product-less pages) | `newsletter` | dark grey gradient block, 1440×900 | below fold, but on ~45 routes | A |
| `/about` | `hero-about` | flat dark grey full-screen hero | hero | A |
| `/journals/*` (4 articles) | `journal-*` as article hero | flat dark grey full-screen hero | hero | A |
| `/contact` | `contact-photo` | grey block 660×711 beside the form | above fold | A |
| `/journals` | `journal-featured` | grey card image 664×480 | above fold | A |
| `/journals` | `journal-keeping-your-jewelry-bright`, `journal-how-to-build-a-collection-that-lasts`, `journal-why-simple-shapes-stay-modern` | 3 grey card images 448×416 | below fold | A |
| `/` | `gender-women`, `gender-men` | two grey tiles 720×800 | below fold (y 2619) | A |
| `/shop` | `gender-women`, `gender-men` | same two tiles | below fold (y 1195) | A |
| `/` | `banner-newarrivals` | grey tall banner 644×966 | below fold | A |
| `/` | `about-block` (poster) | dark grey block 1440×900 | below fold | A |
| `/about` | `material-silver`, `material-gold`, `material-titanium` | 3 grey tiles 459×494 | below fold | A |
| `/about` | `why-us` | grey tall image 556×998 | below fold | A |
| `/about` | `founder` | grey circle 260 px (184 px at 390) | below fold | A |
| `/women-category` | `cta-to-men` | grey full-bleed CTA 1440×900 | below fold | A |
| `/men-category` | `cta-to-women` | grey full-bleed CTA 1440×900 | below fold | A |
| `/men-category` | `collection-men-bestsellers` tile | grey tile 400×500 (photo held back: knife and rope) | below fold | A |
| `/women-category/women-ring`, Home "Fresh from our workshop" etc. | `product-06-main` (Elowen Signet Ring) | grey card | above fold on its collection | A |
| `/men-category/men-chain` | `product-14-main` (Sutter Box Chain), `product-15-main` (Lyle Figaro Chain) | grey cards | above fold; 15 also in the mobile "See what else" row | A |
| `/men-category/men-bracelet`, Home Best Sellers, `/men-category/men-bestsellers` | `product-18-main` (Fenn Curb Bracelet, a Best Seller) | grey card | above fold on collections, Home below fold | A |
| `/men-category/men-earring`, `men-newarrivals`, Home | `product-21-main` (Jasper Cross Hoop), `product-25-main` (Beckett Black Stud) | grey cards | above fold on collections | A |
| `/men-category/men-bracelet`, `men-newarrivals`, Home | `product-24-main` (Soren Rope Bracelet) | grey card | above fold on collections | A |
| `/product/<slug>` of the 7 products above | gallery 1 to 4 | 4 grey images | above fold | A (main) / B (other 3) |
| `/product/<slug>` of the other 18 products | none (one real photo, no thumbnail row) | n/a | | done |
| every product | `product-NN-alt`, `-detail`, `-lifestyle` | not shown for products with a real photo (hover repeats the main photo); grey for the 7 products above | hover / gallery | B |
| `/cart`, `/checkout`, search drawer | thumbnails of the 7 products above | small grey squares | small | C |
| `/about` | `about-block-video` | no video; poster only | | C |
| all pages | customer strip | initials avatars now (no photo slot) | | done |
| `/404`, `/terms`, `/privacy-policy`, `/refund-policy`, `/checkout*` | none | | | none needed |

## Round-3 plan
- Tier A slots 1 to 19 (all non-product rows above) get picks in `docs/IMAGE_PICKS.md` ("round 3"). The 7 missing product mains were searched again and still have **no** acceptable photo.
- Tier B: not picked (hover already repeats the main photo; detail/lifestyle slots are only needed for products with a photo, and the gallery shows real photos only).
- **Stay placeholders on purpose:** product hover / detail / lifestyle slots (B), `about-block-video` (C), the 7 product mains without a photo until a real one is found (their cards and galleries keep the SVG), cart/checkout thumbnails of those products.
