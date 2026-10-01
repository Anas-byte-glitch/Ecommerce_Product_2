# CLAUDE.md — Glintura-style jewelry store

## Goal
A **frontend-only** jewelry e-commerce site (no backend, no user accounts) that replicates
the layout, typography, spacing, colours and interactions of the Framer template
**Glintura** — with placeholder images and a configurable brand name. Do **not** copy the
template's images, video, text assets, payment logos, author contact details, the
"Buy template" link or any myshopify.com link.

The build is split into 9 phases; each phase runs in a fresh session.
Phase 1: research, setup, design tokens, routing, Navbar, Footer, data.

> **Status:** Phase 1 (setup, Navbar, Footer, data) and **Phase 2 (Home page + shared sections)**
> are done and verified (2026-10-01). The home page matches the reference at 1440/1000/390
> (identical page heights, every text/link/button box within 0.6px; differences listed in
> `docs/DESIGN_NOTES.md` §17). **Phase 3 (Shop, audience pages, 14 collections)** is done too (DESIGN_NOTES §18). **Phase 4 (product page, cart store, Favourites)** too (§19). **Phase 5A (cart drawer + /cart)** and **5B-1 (demo checkout + success)** too (§20–21). Next: search. Start each session with `npm install`.

## ALWAYS before building a page
1. Read `docs/DESIGN_NOTES.md` (measured values: breakpoints, type scale, colours,
   navbar/footer specs, card specs, aspect ratios).
2. Read `docs/SITE_MAP.md` (routes, collections → products, journals, FAQ, section order).
3. Re-measure the reference page you are building (see "Research workflow").

## Stack
- Vite + React 19 (JavaScript / JSX, no TypeScript)
- Tailwind CSS v4 via `@tailwindcss/vite` — tokens in `src/index.css` (`@theme`)
- react-router-dom v7 (`createBrowserRouter` in `src/App.jsx`)
- motion (`motion/react`) for animation
- zustand (+ `persist`) for wishlist / cart
- lucide-react icons — reference uses Phosphor **bold**; use lucide `Search`, `Heart`,
  `ShoppingCart`, `Menu`, `X` with `strokeWidth={2.25}` (= Phosphor bold), see DESIGN_NOTES §9
- Fonts: Switzer (Fontshare ITF FFL) and Inter 4.000 (OFL, the reference's own build — not
  @fontsource, which renders ~1.6% wider), both self-hosted woff2 in `src/assets/fonts`,
  `font-display: swap`. Inter body text uses the reference's `cv03 cv04 cv09 cv11` features
  (built into `type-body` / `type-body-lg`).

Scripts: `npm run dev` · `npm run build` · `npm run lint` · `npm run preview`.
Lint = ESLint 9 flat config with `@eslint/js`, `eslint-plugin-react` (recommended +
jsx-runtime, `react/prop-types` off), `eslint-plugin-react-hooks` and
`eslint-plugin-react-refresh`; it runs with `--max-warnings 0`, so warnings fail it.

## Folder structure
```
src/
  config/site.js          brand name, wordmark split, tagline, instagram, payments, nav + footer links,
                          showPrices (card price row), homeVideoSrc (optional About-block video)
  data/                   products (+ productDetails: PDP texts, matchWith), categories, collections,
                          journals, faqs, testimonials (3 reviews per product), customers
  components/
    layout/               Navbar, MobileMenu, Footer, Layout, ScrollToTop
    ui/                   Container, Button, Badge, Eyebrow, Wordmark, PagePlaceholder,
                          Reveal, TextReveal, SectionHeader, Marquee, MediaBanner,
                          HoverTile (image tile with hover panel), EmptyState, Accordion
                          (multi-open, + → ×), Drawer (focus trap, Escape, scroll lock)
    product/              ProductCard, FavouriteButton, ProductGrid, ProductGallery,
                          QuantityStepper, AddToCart, HorizontalCard, ProductTestimonials
    cart/                 CartDrawer (mounted in Layout), CartLine, CartEmpty, FreeShippingNote
    checkout/             Field (labelled input + inline error), OrderSummary (cart summary or order)
    home/                 HomeHero, BestSellers, ForEveryone, FeaturesTicker, NewArrivals, AboutVideo
    shared/               ContinueJourney, FeaturedCustomers (+ CustomerCard), Newsletter,
                          SharedSections (all three, in order), ImageHero (fixed full-screen hero
                          for /shop + audience pages), CollectionBento, AudienceCta —
                          used above the footer on most pages (table in docs/SITE_MAP.md)
    journal/              JournalCard … (later)
  pages/                  Home, Shop, Category, Collection, ProductDetail, Favourites, Cart,
                          Checkout (demo, validation),
                          CheckoutSuccess,
                          About, Contact, Journals, JournalArticle, Legal, NotFound
  store/                  wishlistStore, cartStore, uiStore, orderStore (`lastOrder`, memory only)
  assets/placeholders/    neutral SVG placeholders (+ index.js exporting `placeholders`)
  assets/fonts/           Switzer woff2
  utils/                  formatPrice, cn, useNavOverHero, motion (appear/word-effect settings)
docs/                     SITE_MAP.md, DESIGN_NOTES.md
```

## Conventions
- Function components only; one component per file, default export.
- **Tailwind utilities only** — no inline `style` props, no CSS modules. Use the tokens:
  colours `ink, ink-soft, muted, accent, cream, mist, smoke, white, black, overlay,
  ink-hover, white-hover, error`; fonts `font-display` (Switzer), `font-body` (Inter);
  type utilities `type-display, type-h2 … type-h6, type-h6-lg, type-quote, type-ticker,
  type-stat, type-wordmark, type-wordmark-xl, type-link-lg, type-nav, type-menu-heading,
  type-eyebrow, type-badge, type-counter, type-body-lg, type-body` (each already
  responsive, exact measured values such as 18.08/23.504 — don't round them);
  spacing `h-nav`, `pt-section` (140px) / `pt-section-sm` (120px); `max-w-site` (1440px);
  `rounded-pill`.
- **Mobile-first**. Breakpoints are the reference's: default = phone (≤809),
  `md:` = tablet (≥810), `lg:` = desktop (≥1200). `sm/xl/2xl` do not exist.
- Wrap section content in `<Container>` (px 16/24/32, max-w 1440).
- Design is square: no rounded corners except pills/circles.
- Brand text always comes from `src/config/site.js` (`site.name`, `<Wordmark />`).
- Pages whose first section is a full-screen dark image hero must call
  `useNavOverHero()` so the navbar starts transparent/white-text (see DESIGN_NOTES §9).
- Unknown product / collection / journal slugs render `<NotFound />`.
- Cart API (`store/cartStore.js`): `useCartStore` → `items [{slug, quantity}]`, `isDrawerOpen`,
  `openDrawer()`, `closeDrawer()`, `addItem(slug, qty)` (merges same slug), `updateQuantity(slug, qty)`,
  `removeItem(slug)`, `clearCart()`; quantities clamped to `MIN_QUANTITY`/`MAX_QUANTITY` (1–10).
  `useCartCount()` = total quantity (navbar); `useCartSummary()` / `summarizeCart(items)` →
  `{ lines (with product, lineTotal), count, subtotal, shipping, total, freeShipping,
  remainingForFreeShipping }`; `getLineTotal(line)`. Only `items` is persisted; unknown slugs are
  dropped on load. Shipping uses `site.freeShippingThreshold` / `site.flatShipping`. The cart
  always shows prices, regardless of `site.showPrices`.
- Page titles: add `handle: { title: (params) => … }` to a route; `Layout` sets
  `"<title> - <brand>"`, otherwise just the brand.
- Wishlist: `useWishlistStore` (`toggle(slug)`, `has(slug)`, `items`), counter via
  `useWishlistCount()`. Cart: `useCartStore` (`items`, `addItem`, `removeItem`),
  counter via `useCartCount()`. Both persisted to localStorage.
- Prices are placeholders; format with `formatPrice()` (reference shows no prices).
- Links that the reference renders as a text block (nav, footer, menu) are `block w-fit`
  so their box is exactly one line-height tall, like the reference.
- Elements whose text must render like the reference in Chromium need a compositing layer
  (`will-change-transform` or a motion wrapper) — see DESIGN_NOTES §2.
- **Motion:** use `<Reveal>` for the reference's opacity appear (spring 1.5s, delay 0.2, at 50%
  visibility, once) and `<TextReveal text=… as=…>` for headings (per-word blur/fade/slide;
  `onMount` for heroes). Both render static content under `prefers-reduced-motion`; so does
  `<Marquee>` (speed / hoverSpeed in px/s, `inert` duplicate copies). Read timings from the
  reference page data, see DESIGN_NOTES §13/§15.
- Section headings: `<SectionHeader eyebrow title action? align?>` (display size, balanced
  wrapping, h2). Product lists: `<ProductGrid products columns?>` → `<ProductCard>`
  (fixed 440px / 200px image box, heart wired to the wishlist, price row = `site.showPrices`).
  Look products up with `getProductsBySlugs(slugs)`.
- Image overlays: `bg-fade-up` (the template's eased black-from-bottom gradient), `bg-hero-fade`,
  `bg-card-fade`. Image placeholders live in `placeholders` (`heroWide`, `bannerWide`,
  `promoTall`, `genderWomen/Men`, `portrait`, …).
- Page content that should rasterize text like the reference sits in a wrapper with
  `will-change-transform` (Home does this below its fixed hero; don't put it on an ancestor
  of a `position: fixed` element).
- Shared sections go directly above the footer in the order ContinueJourney →
  FeaturedCustomers → Newsletter (they carry their own `bg-white`/padding; ContinueJourney has
  no top padding by design).
- Pages with a full-screen hero: `<ImageHero label title fade wide?>` first, then everything else in
  `<div className="relative bg-white will-change-transform">` ending with `<SharedSections />`.
  Pages without a hero start with `pt-[180px]`. `document.title` is the brand name everywhere.
- Collection data uses `label` / `title` (page header); `tileLabel` is the mosaic caption.
- Compare against the reference with `site.showPrices = false` (the reference shows no prices).
- Commit in small, meaningful steps; keep `npm run build` and `npm run lint` clean.

## Reference URLs
- Home https://glintura.framer.website/
- Shop https://glintura.framer.website/shop
- Women / Men https://glintura.framer.website/women-category · /men-category
- Collection e.g. https://glintura.framer.website/women-category/women-necklace
  (all 14 in docs/SITE_MAP.md)
- Product e.g. https://glintura.framer.website/product/aurora-bar-necklace
- https://glintura.framer.website/favourite · /about · /contact · /journals
- Article e.g. https://glintura.framer.website/journals/the-art-of-everyday-elegance
- /terms · /privacy-policy · /refund-policy · /404 · /sitemap.xml

## Research workflow (headless browser)
Playwright + Chromium are preinstalled (`/opt/node22/lib/node_modules/playwright`).
The session proxy re-signs TLS; launch Chromium with the proxy and pin its CA:
```js
// SPKI: openssl x509 -in /root/.ccr/agent-proxy-ca.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64
chromium.launch({ proxy: { server: process.env.HTTPS_PROXY },
  args: ['--ignore-certificate-errors-spki-list=' + SPKI] })
```
Measure with `getComputedStyle` / `getBoundingClientRect` at 1440, 1000 and 390 px.
Launch the local dev server's browser **without** the proxy (it can't reach localhost).
Framer renders only the active breakpoint variant (nav `data-framer-name` =
`Desktop-*`, `Tablet-*`, `Mobile-*`). Blocked hosts in this sandbox: framer.com (icon
glyphs), `*.myshopify.com` (prices, add-to-cart), unpkg, iconify, api.fontshare.com.
When something doesn't render, read the component props from the page's JS modules
(capture `.mjs` responses from framerusercontent.com and grep them — e.g. icon
`iconSelection`/`weight`, tile labels, `webPageId` link targets mapped through the route
table in `script_main.*.mjs`). For text-quality checks screenshot at `deviceScaleFactor: 3`.

## Known gaps / decisions (Phase 1, verified)
- Navbar omits the User (My Account → myshopify) and Country flag icons. Desktop right
  cluster keeps the reference width (196px) so the wordmark stays at x=701.5; the icons
  themselves sit 88px (desktop) / 44px (tablet) / 36px (phone) right of the reference.
- Search and Cart icons are buttons without drawers yet (drawers in a later phase).
- "My Account" slot (footer + menu Navigation column) → "Collections" (`/shop`).
- Footer "Buy template" button → "Shop Now" (`/shop`), from `site.footerCta`.
- Payment badges are neutral SVG text pills with the reference logos' widths, 15.2px tall.
- Mobile-menu headings replicate the reference: "Navigation" Switzer 500, "Pages"/"Others"
  Inter 400 20/24 (`type-menu-heading`).

## Known gaps / decisions (Phase 2, verified)
- Home hero is `position: fixed` with a 100vh spacer; the rest of Home is a positioned white
  wrapper that scrolls over it (as on the reference).
- Gender cards: whole card links (reference ≥810 links only its "Shop Now" button).
- Tickers are not draggable (reference: draggable) and pause while focused.
- Product card price row (`site.showPrices`, default true) is a deliberate addition.
- The home navbar fade-in (reference: 1s, delay 0.8) is not built.
