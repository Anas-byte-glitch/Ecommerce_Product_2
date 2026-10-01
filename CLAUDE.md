# CLAUDE.md — Glintura-style jewelry store

## Goal
A **frontend-only** jewelry e-commerce site (no backend, no user accounts) that replicates
the layout, typography, spacing, colours and interactions of the Framer template
**Glintura** — with placeholder images and a configurable brand name. Do **not** copy the
template's images, video, text assets, payment logos, author contact details, the
"Buy template" link or any myshopify.com link.

The build is split into 9 phases; each phase runs in a fresh session.
Phase 1: research, setup, design tokens, routing, Navbar, Footer, data.

> **Status:** Phase 1 code was written while the npm registry was blocked in the
> session sandbox, so there is **no `package-lock.json` yet** and `npm install`,
> `npm run build` and `npm run lint` have **not been run**. First step of the next
> session: `npm install`, then build + lint, fix anything that fails, compare the
> Navbar/Footer against the reference at 1440/1000/390, and commit the lockfile.

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
- lucide-react icons (reference uses Phosphor: MagnifyingGlass, Heart, ShoppingCart, List/X)
- Fonts: Switzer (self-hosted woff2 in `src/assets/fonts`, Fontshare ITF FFL) and
  Inter (`@fontsource/inter` 400/700), `font-display: swap`

Scripts: `npm run dev` · `npm run build` · `npm run lint` · `npm run preview`.

## Folder structure
```
src/
  config/site.js          brand name, wordmark split, tagline, instagram, payments, nav + footer links
  data/                   products, categories, collections, journals, faqs, testimonials, customers
  components/
    layout/               Navbar, MobileMenu, Footer, Layout, ScrollToTop
    ui/                   Container, Button, Badge, Eyebrow, Wordmark, PagePlaceholder
                          (to add: Accordion, Reveal, Drawer, SectionHeader)
    product/              ProductCard, ProductGrid, ProductSlider (later phases)
    home/                 home page sections (later)
    journal/              JournalCard … (later)
  pages/                  Home, Shop, Category, Collection, ProductDetail, Favourites,
                          About, Contact, Journals, JournalArticle, Legal, NotFound
  store/                  wishlistStore, cartStore, uiStore
  assets/placeholders/    neutral SVG placeholders (+ index.js exporting `placeholders`)
  assets/fonts/           Switzer woff2
  utils/                  formatPrice, cn, useNavOverHero
docs/                     SITE_MAP.md, DESIGN_NOTES.md
```

## Conventions
- Function components only; one component per file, default export.
- **Tailwind utilities only** — no inline `style` props, no CSS modules. Use the tokens:
  colours `ink, ink-soft, muted, accent, cream, mist, smoke, white, black, overlay,
  ink-hover, white-hover`; fonts `font-display` (Switzer), `font-body` (Inter);
  type utilities `type-display, type-h2 … type-h6, type-h6-lg, type-quote, type-ticker,
  type-stat, type-wordmark, type-wordmark-xl, type-link-lg, type-nav, type-eyebrow,
  type-badge, type-counter, type-body-lg, type-body` (each already responsive);
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
- Wishlist: `useWishlistStore` (`toggle(slug)`, `has(slug)`, `items`), counter via
  `useWishlistCount()`. Cart: `useCartStore` (`items`, `addItem`, `removeItem`),
  counter via `useCartCount()`. Both persisted to localStorage.
- Prices are placeholders; format with `formatPrice()` (reference shows no prices).
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
Framer renders only the active breakpoint variant (nav `data-framer-name` =
`Desktop-*`, `Tablet-*`, `Mobile-*`). Blocked hosts in this sandbox: framer.com (icons),
the Shopify Storefront API (prices, add-to-cart, collection tile labels), unpkg, iconify.

## Known gaps / decisions (Phase 1)
- Navbar omits Search, User (My Account) and Country flag icons from the reference.
- Mobile-menu group headings all use Switzer 500 18px (reference mixes in Inter 20px).
- Footer omits "Buy template"; Navigation column has 3 links (no My Account).
- Payment badges are neutral 22px SVG text pills (reference: ~15px brand logos).
