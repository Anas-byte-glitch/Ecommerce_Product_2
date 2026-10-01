# Design Notes — Glintura reference

Measured on 2026-10-01 from https://glintura.framer.website with headless Chromium
(Playwright, `getComputedStyle` + `getBoundingClientRect`) at 1440, 1000 and 390 px wide
(900 px tall). All values below are **measured** unless marked _(estimate)_.

> Reference limits: the template loads its icons from `framer.com/m/phosphor-icons/*`,
> its product/collection commerce data from a Shopify Storefront API, a flag icon from
> `api.iconify.design` and Lenis CSS from `unpkg.com`. Those hosts were blocked in the
> research sandbox, so icon glyphs, prices, add-to-cart buttons and the collection-card
> labels on `/women-category` + `/men-category` could not be observed. Icon names are
> known from the URLs (Phosphor `MagnifyingGlass`, `Heart`, `ShoppingCart`, `User`).

---

## 1. Breakpoints (verified via Framer variant names)

| Variant | Width range | Tailwind (mobile-first) |
|---|---|---|
| Phone ("Mobile") | `<= 809px` | default (no prefix) |
| Tablet | `810px – 1199px` | `md:` → `--breakpoint-md: 810px` |
| Desktop | `>= 1200px` | `lg:` → `--breakpoint-lg: 1200px` |

Typography and spacing change **step-wise** at these breakpoints (no fluid `clamp`).
The default Tailwind `sm` / `xl` / `2xl` breakpoints are removed in `index.css`.

## 2. Fonts

| Family | Source | Weights used |
|---|---|---|
| **Switzer** (Fontshare, ITF Free Font License) | self-hosted woff2 in `src/assets/fonts/` | 400, 400 italic, 500, 600 |
| **Inter** (Google / OFL) | `@fontsource/inter` | 400, 700 |

Switzer = headings, nav, buttons, labels, wordmark. Inter = body copy / paragraphs.
Fallback: `"Switzer", "Inter", ui-sans-serif, system-ui, sans-serif`.

## 3. Color palette

| Token | Value | Usage |
|---|---|---|
| `ink` | `#222222` | primary text, dark button bg, wordmark (dark) |
| `ink-soft` | `#2B2B2B` | body paragraphs (Inter), badge text |
| `muted` | `#6D6A67` | footer / menu column headings, secondary text |
| `accent` | `#B9836A` | eyebrows ("/ Best Sellers /"), counter pills |
| `cream` | `#F8F6F3` | text on dark (wordmark on hero, button text on dark, counters) |
| `mist` | `#E8E8E8` | product image bg, eyebrow on dark hero, light borders |
| `smoke` | `#F0F0F0` | subtle fills |
| `white` | `#FFFFFF` | page bg, light button bg, badge bg, navbar (scrolled) |
| `overlay` | `rgba(33,33,33,0.5)` | image overlays |
| hover dark text | `rgba(51,51,51,0.85)` | dark link hover |
| hover light text | `#D9D9D9` | white link hover |

Rare: `#1C1C1A`, `#666666`, `#9A948E`, `#AA9D8D`, `#969696` (decorative only).

## 4. Radii

The design is **square**: buttons, badges, cards, images = `0`.
Only round elements: counter pills (`9999px`), card favourite button (`80px` → circle),
some toggles (`8px`, `10px`, `24px` — later phases).

## 5. Layout / container

- Container: `max-width: 1440px`, centred, horizontal padding **32 / 24 / 16 px**
  (desktop / tablet / phone). Content width at 1440 = 1376 px.
- Section padding-top: **140px** desktop, **120px** tablet & phone (section bottoms are 0;
  the next section's top padding provides rhythm). Section inner gap: 48px header→content,
  32px between rows.
- Hero sections are `100vh` with padding `140 32 56` / `120 24 48` / `120 16 32`.

## 6. Type scale (Desktop / Tablet / Phone) — `size/line-height letter-spacing`

| Level | Family/weight | Desktop | Tablet | Phone |
|---|---|---|---|---|
| Display (hero h1) | Switzer 400 | 80/88 −1.6 | 64/70.4 −1.28 | 40/44 −0.8 |
| H2 (section) | Switzer 400 | 64/73.6 −1.28 | 52/59.8 −1.04 | 36/41.4 −0.72 |
| H3 | Switzer 400 | 56/64.4 −0.84 | 46.08/52.99 −0.69 | 32/36.8 −0.48 |
| H4 | Switzer 400 | 48/57.6 −0.48 | 40/48 −0.4 | 28/33.6 −0.28 |
| H5 (PDP title) | Switzer 400 | 40/44 −0.2 | 34.08/37.49 −0.17 | 24/26.4 −1.2 |
| Quote | Switzer 400 | 32/35.2 −0.64 | 28/30.8 −0.56 | 22.08/26.5 |
| H6 large (footer tagline) | Switzer 400 | 24/31.2 | 22.08/28.7 | 20/26 |
| H6 (card title) | Switzer 400 | 20/26 | 20/26 | 17.6/22.88 |
| Ticker | Switzer 400 | 120/144 −3 | 94.08/112.9 −2.35 | 60/72 −1.5 |
| Stat number | Switzer 400 | 80/80 +2 | 64/64 +2 | 40/40 +2 |
| Footer wordmark | Switzer 400 | 238/190.4 −4.76 | 140/112 −2.8 | 94/75.2 −1.88 |
| Nav wordmark | Switzer 400 (+ "tura" italic) | 32/38.4 | 32/38.4 | 32/38.4 |
| Large link / button label | Switzer 500 | 20/26 −0.4 | 18.08/23.5 | 18.08/23.5 |
| Nav link / eyebrow | Switzer 400 (nav) / 500 (eyebrow) | 16/19.2 −0.2 | same | same |
| Badge / category label | Switzer 500 | 12/14.4 +0.24 | same | same |
| Counter digit | Switzer 400 (heart) / 500 (cart) | 12/12 | same | same |
| Body L | Inter 400 | 20/28 −0.1 | 18.08/25.3 −0.09 | 16/22.4 −0.08 |
| Body | Inter 400 | 16/22.4 −0.08 | 16/22.4 | 14.08/19.7 −0.07 |
| Body bold | Inter 700 | 16/22.4 | 16/22.4 | 14.08/19.7 |

Tokens in `index.css` round 18.08 → 18px, 22.08 → 22px, 46.08 → 46px, etc.

## 7. Buttons (measured on home)

All buttons: square corners, `padding: 12px 32px`, height 50px, label Switzer 500
20/26 −0.4 (18px on tablet/phone), centred, `gap: 10px`.

| Variant | Framer name | Background | Text |
|---|---|---|---|
| `dark` | "Dark" | `#222222` | `#F8F6F3` |
| `light` | "Light" | `#FFFFFF` | `#222222` |

Hover: not fully measurable (pill shapes unchanged); use a subtle opacity/colour shift
(`opacity: .85`, 300 ms) _(estimate)_. Hero CTA "Shop New Arrivals" is 460px wide
(desktop); "Show All" is content width (160px).

## 8. Badges

- **Card badge** (top-left of product image, 12px inset): bg `#FFFFFF`, padding `8px 16px`,
  Switzer 500 12/14.4 +0.24, colour `#2B2B2B`, radius 0. Text: "Best Sellers" / "New Arrivals".
- **PDP badge** (top-right of main image): bg `#222222`, colour `#F8F6F3`, same type;
  text singular "Best Seller". Shown only for Best Sellers on PDPs.
- **Category label** (card, right of title): no bg, Switzer 500 12/14.4 +0.24 `#2B2B2B`.
- **Eyebrow** "/ Label /": Switzer 500 16/19.2 −0.2, colour `accent` on light bg,
  `#E8E8E8` on dark/hero bg; slashes 6px wide with 8px gaps.

## 9. Navbar

Structure: `position: fixed; top:0; inset-x:0; height: 70.4px; padding: 16px 32px`
(tablet `16px 24px`, phone `16px`), inner row height 38.4px, `justify-between`, items centred.

### Desktop (>= 1200)
- **Left**: links Collections (`/shop`), About, Journal (`/journals`), Contact.
  Switzer 400 16/19.2 −0.2, gap 16px between links.
- **Centre**: wordmark "Glin" + italic "tura", Switzer 400 32/38.4, absolutely centred
  (x = 701.5 of 1440 → centred).
- **Right** (gap 24px, icons 20×20): Search, **Heart** (`/favourite`) with counter,
  **Cart** with counter, User (myshopify — omitted), Country flag (20×15 — omitted).
- Heart counter: 20×20 circle bg `accent`, digit Switzer 400 12px `cream`, offset
  `+11px x / −8px y` from the icon's top-left.
- Cart counter: 20×20 circle bg `accent`, digit Switzer 500 12px `cream`, offset
  `+10px x / −10px y`.
- Counters are always visible (they show "0").

### Tablet (810–1199) / Phone (<= 809)
- Left: wordmark only. Right: Search, Cart (+counter), Country, Menu button (24×24).
  Gap 24px (tablet) / 16px (phone). **No heart icon** — Favourites is in the menu.

### Colour states ("light" over hero vs "dark")
- `light`: transparent bg, text `#FFFFFF`, wordmark `#F8F6F3`. Used while
  `scrollY < 100vh` on pages with a full-screen image hero:
  `/`, `/shop`, `/women-category`, `/men-category`, `/favourite`, `/about`,
  `/journals/:slug`.
- `dark`: bg `#FFFFFF`, text/wordmark `#222222`. Used always on
  `/women-category/:c`, `/men-category/:c`, `/product/:slug`, `/contact`, `/journals`,
  `/terms`, `/privacy-policy`, `/refund-policy`, `/404`, and on hero pages once
  `scrollY >= 100vh` (threshold measured: exactly the viewport height).
- No backdrop blur, no shadow, no border.

### Scroll behaviour (measured with wheel events)
- Scrolling **down** (even 100px): navbar slides up `translateY(-85px)` (hidden).
- Scrolling **up**: navbar slides back to `translateY(0)`.
- At the top it is always shown. Transition ≈ 300–400 ms ease _(estimate)_.

### Hover
- Light links: `#FFFFFF → #D9D9D9`. Dark links: `#222222 → rgba(51,51,51,.85)`.
- Wordmark and icons: no change.

### Mobile menu (tablet + phone)
- Menu button toggles Open ↔ Close icon (Phosphor-style list / X, 24×24).
- The navbar itself **expands in height** to full viewport (`100vh`), bg `#FFFFFF`,
  text dark; content fades in while the height animates (~300 ms, observed clipping
  at 100 ms). Top bar stays identical (wordmark + icons).
- Below the bar: `padding: 64px 0; gap: 32px`, three groups (each `gap: 16px`):
  - **Navigation**: Women's Collection, Men's Collection, Favourites (My Account omitted)
  - **Pages**: Home, About, Journals, Contact
  - **Others**: Terms, Privacy Policy, Refund Policy, Instagram, 404
- Group heading: `muted`, Switzer 500 18px/23.5 (reference uses Inter 400 20/24 for
  "Pages"/"Others" — an inconsistency in the template; we use Switzer 500 for all three).
- Items: Switzer 400 16/19.2 −0.2 `#222`, `gap: 8px`.
- Menu closes on navigation.

## 10. Footer

`<footer>` bg `#FFFFFF`. Inner column: padding `32px` (desktop), `24px 24px 32px` (tablet),
`24px 16px` (phone); `gap: 56px` between top row and brand row. No copyright line,
no top border.

### Desktop
- **Top row** (`justify-between`, height 200):
  - Left (412px wide): tagline h6 Switzer 400 24/31.2 `#222`
    "Discover timeless jewelry designed to become part of your everyday story";
    (reference has "Buy template" dark button below with 24px gap — **omitted**).
  - Right: three columns, `gap: 64px`. Each column: heading (`muted`, Switzer 500 20/26
    −0.4) then links (Switzer 500 20/26 −0.4 `#222`), heading→links 16px.
    Links box is 158px tall, items distributed (`justify-between`): Navigation and
    Pages = 4 items (18px gaps), Others = 5 items (7px gaps). We keep the 158px
    `justify-between` box; Navigation now has 3 items (My Account removed).
- **Brand row** (`justify-between`, items-end): left "Supported Payments" (h6 Switzer 400
  20/26) + payment row (gap 10px between title and row; badges 12px apart, ~15px tall);
  right huge wordmark "Glintura" Switzer 400 238/190.4 −4.76, right aligned, 806px wide.

### Tablet
- Same structure. Left 340px wide (tagline 22px/28.7). Right columns `gap: 40px`,
  headings/links 18px/23.5, links box 160.5px. Wordmark 140/112 −2.8 (473px wide).

### Phone
- Single column. Tagline 20/26.
- Link columns: 2-col grid, column gap 40px, row gap ~72px; Navigation + Pages in row 1,
  Others in row 2. Links gap 8px (not justify-between). Headings/links 18px.
- Brand row stacked: wordmark first (94/75.2 −1.88, left aligned), then Supported
  Payments (17.6/22.9) with `gap: 16px`.

### Payments
Reference shows brand logos (Apple Pay, Google Pay, PayPal, Amazon, Visa) as images —
**not copied**. We render five neutral SVG text pills with brand-free labels:
"Card", "Wallet", "Bank", "Pay Later", "Cash" (configured in `src/config/site.js`).

## 11. Product card (measured, for later phases)

- Link wraps card; `gap: 12px` image→info.
- Image box 448×440 at desktop (aspect **448 / 440 ≈ 1.018**), bg `#E8E8E8`,
  `object-fit: cover`, overflow clip; second image fades in on hover (opacity 0→1).
- Top overlay 12px inset: badge left, favourite button right (34×34 white circle,
  heart icon). Clicking increments the navbar heart counter (persisted in
  `localStorage.favorites`).
- Info row padding `0 8px`: title h6 Switzer 400 20/26 `#222` left; category label
  12px right. **No price displayed** (reference prices come from Shopify).

## 12. Image aspect ratios (placeholders)

| Use | Measured box | Ratio |
|---|---|---|
| Product card | 448×440 | 1.018 : 1 (`aspect-[448/440]`) |
| PDP main image | 676×640 | 1.056 : 1 |
| PDP thumbnails | 163×196 | 0.832 : 1 |
| Square thumbs ("Perfect match") | 160×160 | 1 : 1 |
| Journal featured card | 664×480 | 1.383 : 1 |
| Journal card | 448×416 | 1.077 : 1 |
| Collection tiles | 960×500, 400×500, 680×500, 1376×800 | mixed bento |
| Hero | full-bleed 100vw × 100vh | cover |

## 13. Motion / misc

- Smooth scrolling via Lenis on the reference (consider later; not required).
- Headings animate in word-by-word (opacity) — `Reveal` component in later phases.
- Product card hover: image cross-fade.
