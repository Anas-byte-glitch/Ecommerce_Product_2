# Design Notes — Glintura reference

Measured on 2026-10-01 from https://glintura.framer.website with headless Chromium
(Playwright, `getComputedStyle` + `getBoundingClientRect`) at 1440, 1000 and 390 px wide
(900 px tall). All values below are **measured** unless marked _(estimate)_.

> Reference limits: the template loads its icon glyphs from `framer.com/m/phosphor-icons/*`,
> its product commerce data from a Shopify Storefront API (`*.myshopify.com`), a flag icon
> from `api.iconify.design` and Lenis CSS from `unpkg.com`. Those hosts are blocked in the
> sandbox (still blocked on 2026-10-01, Phase 1 verification), so icon glyphs, prices and
> add-to-cart buttons cannot be *seen*. Component props can still be read from the page's
> own JS modules (framerusercontent.com, reachable): that is how the icon names/weights/colours
> (§9) and the collection-tile labels (SITE_MAP.md) were verified.
>
> **Phase 1 verification (2026-10-01):** Navbar, mobile menu and footer were compared
> element-by-element against the reference at 1440 / 1000 / 390 (same text-node walk with
> `getBoundingClientRect` + `getComputedStyle` on `/contact` for both sites). Results are
> in §14.

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
| **Inter** 4.000 (OFL) | self-hosted woff2 in `src/assets/fonts/` (the build the reference serves; latin + latin-ext) | 400, 700 |

Switzer = headings, nav, buttons, labels, wordmark. Inter = body copy / paragraphs.
Fallback: `"Switzer", "Inter", ui-sans-serif, system-ui, sans-serif`.

**Inter (Phase 2):** `@fontsource/inter` ships Inter 4.001, which sets text ~1.6% wider than the
4.000 build Framer serves (hero subheading on one line: 954.0 vs 939.0px). We now self-host the
reference's own latin / latin-ext 400 + 700 files. The reference's paragraph presets also enable
`font-feature-settings: "blwf", "cv03", "cv04", "cv09", "cv11"` (cv11 = single-storey *a*);
`type-body` / `type-body-lg` apply them via `--inter-features`. With both, Inter line widths match
the reference exactly (476.81 / 462.31px for the two hero subheading lines). Switzer has none of
these features, so the setting is a no-op there.

Our four Switzer woff2 files are **byte-identical** to the ones the reference serves
(Switzer 1.200, unhinted TrueType). The reference also loads 500 italic / 700 / 700 italic
(not needed so far).

**Text rendering:** body uses `-webkit-font-smoothing: antialiased` and default
`text-rendering` / `font-synthesis` (as the reference). The reference nav and page wrapper
have `will-change: transform`; in Chromium that puts the text on its own compositing layer
with subpixel glyph positioning. Without it our Switzer looked unevenly spaced at 16–20px
(same advance widths, different rasterization). Navbar `<header>` and `<footer>` therefore
carry `will-change-transform`; later sections get the same effect from their Reveal/motion
wrappers — check zoomed (DPR 3) crops against the reference when building them.

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

Tokens in `index.css` use these exact values (18.08 / 23.504, 22.08 / 28.704, 46.08 / 52.992 …),
not rounded — verified to match the reference footer to the sub-pixel.

Extra: `type-menu-heading` = Inter 400 20/24 (mobile-menu "Pages" / "Others" headings).

## 7. Buttons (measured on home)

All buttons: square corners, `padding: 12px 32px`, height 50px, label Switzer 500
20/26 −0.4 (18px on tablet/phone), centred, `gap: 10px`.

| Variant | Framer name | Background | Text |
|---|---|---|---|
| `dark` | "Dark" | `#222222` | `#F8F6F3` |
| `light` | "Light" | `#FFFFFF` | `#222222` |

Hover: not fully measurable (pill shapes unchanged); use a subtle opacity/colour shift
(`opacity: .85`, 300 ms) _(estimate)_. Hero CTA "Shop New Arrivals" is 460px wide
(desktop, `max-width`); "Show All" is a **fixed 160px** wide (label 73.8 + padding would be 137.8).

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
The reference `<nav>` has `will-change: transform` (see §2).

### Desktop (>= 1200)
Three flex children with `justify-between` — the wordmark is **not** mathematically centred:
Left (272px) · Wordmark (113×38.4) · Right (196px). At 1440: Left x=32, wordmark x=701.5,
Right x=1212.
- **Left**: links Collections (`/shop`), About, Journal (`/journals`), Contact.
  Switzer 400 16/19.2 −0.2, gap 16px, each link box 19.2px tall (x = 32 / 123.8 / 181.8 / 247.4).
- **Centre**: wordmark "Glin" + italic "tura", Switzer 400 32/38.4 (p 113px wide).
- **Right** (gap 24px, icons 20×20, y=25.2): Search 1212, **Heart** (`/favourite`) 1256 with
  counter, **Cart** 1300 with counter, User 1344 (myshopify — omitted), Country flag 1388
  (20×15, Shopify locale picker — omitted).
- Heart counter: 20×20 circle bg `accent`, digit Switzer 400 12/12 `cream`, offset
  `+11px x / −8px y` from the icon's top-left.
- Cart counter: 20×20 circle bg `accent`, digit Switzer 500 12/12 `cream`, offset
  `+10px x / −10px y`.
- Counters are always visible (they show "0").

**Ours:** the right cluster is `lg:w-[196px] justify-end` holding Search, Heart, Cart, so the
wordmark lands exactly at x=701.5; the three icons sit at 1300 / 1344 / 1388 (reference:
1212 / 1256 / 1300) because User and Country are not built.

### Tablet (810–1199) / Phone (<= 809)
- Left: wordmark only (x = 24 / 16). Right: Search, Cart (+counter), Country, Menu button
  (24×24). Gap 24px (tablet) / 16px (phone). **No heart icon** — Favourites is in the menu.
- Reference x at 1000: Search 820, Cart 864, Country 908, Menu 952; at 390: 242 / 278 / 314 / 350.
  **Ours** (no Country): Search 864, Cart 908, Menu 952 at 1000; 278 / 314 / 350 at 390.

### Icons (verified from the reference page modules)
Framer Phosphor component, **weight `bold`** for every navbar icon:
`MagnifyingGlass`, `Heart`, `ShoppingCart`, `User`, `List` (menu, switches to `X` when open).
Colour: light variant `#FFFFFF`, dark variant `#222222`.
Phosphor bold stroke = 24/256 of the icon size → lucide `strokeWidth={2.25}` at any size.
Closest lucide glyphs (overlay-compared with `@phosphor-icons/core` bold SVGs):

| Phosphor | lucide | Notes |
|---|---|---|
| MagnifyingGlass | `Search` | near-identical; Phosphor lens ~1px larger |
| Heart | `Heart` | near-identical |
| ShoppingCart | `ShoppingCart` | same silhouette; Phosphor wheels are rings, lucide dots |
| List | `Menu` | lines 4→20 (Phosphor 3.75→20.25); `AlignJustify` (3→21) is further off |
| X | `X` | lucide arms slightly shorter (6→18 vs 4.8→19.2) |
| User | `User` | not used (omitted) |

### Colour states ("light" over hero vs "dark")
- `light`: transparent bg, links `#FFFFFF`, icons `#FFFFFF`, wordmark + counter digits
  `#F8F6F3`. Used while `scrollY < 100vh` on pages with a full-screen image hero:
  `/`, `/shop`, `/women-category`, `/men-category`, `/favourite`, `/about`,
  `/journals/:slug`.
- `dark`: bg `#FFFFFF`, text/icons/wordmark `#222222`. Used always on
  `/women-category/:c`, `/men-category/:c`, `/product/:slug`, `/contact`, `/journals`,
  `/terms`, `/privacy-policy`, `/refund-policy`, `/404`, and on hero pages once
  `scrollY >= 100vh` (threshold measured: exactly the viewport height; ours verified:
  transparent at 899px, white at 900px with a 900px viewport).
- No backdrop blur, no shadow, no border.

### Scroll behaviour (measured with wheel events)
- Scrolling **down** (even 100px): navbar slides up `translateY(-85px)` (hidden).
- Scrolling **up**: navbar slides back to `translateY(0)`.
- At the top it is always shown. Transition ≈ 300–400 ms ease _(estimate)_.
- Ours verified: −85px after 100px down, 0 after 50px up, shown at the top, stays shown
  while the menu is open.

### Hover
- Light links: `#FFFFFF → #D9D9D9`. Dark links: `#222222 → rgba(51,51,51,.85)`.
- Wordmark and icons: no change.

### Search / cart (later phases)
Search icon opens a right-hand drawer (452px wide at 1440, 24px inset, white, "Search..."
input with magnifier, X close, page dimmed). Cart opens the same drawer shape: "Your cart is
empty" header, "Feed Me Something / Have a look to our beautiful products", buttons "Men's
Collection" (dark) and "Women's Collection" (light grey). Both buttons are inert in Phase 1.

### Mobile menu (tablet + phone)
- Menu button toggles Open ↔ Close icon (Phosphor List / X bold, 24×24).
- The navbar itself **expands in height** to full viewport (`100vh`), bg `#FFFFFF`,
  text dark; content fades in while the height animates (~300 ms, observed clipping
  at 100 ms). Top bar stays identical (wordmark + icons).
- Open, the nav is a column: bar (38.4) + **10px gap** (not the 16px bottom padding) → menu
  block at y=64.4 with `padding: 64px 0; gap: 32px` → first heading at **y=128.4**
  (ours: `pt-[58px]` under the 70.4px bar). Three groups (each `gap: 16px`):
  - **Navigation**: Women's Collection, Men's Collection, Favourites, My Account → ours
    "Collections" (`/shop`) in the 4th slot
  - **Pages**: Home, About, Journals, Contact
  - **Others**: Terms, Privacy Policy, Refund Policy, Instagram, 404
- Group headings, `muted`: "Navigation" = Switzer 500 18.08/23.504; "Pages" and "Others" =
  **Inter 400 20/24** (template inconsistency, replicated with `type-menu-heading`).
- Items: Switzer 400 16/19.2 −0.2 `#222`, `gap: 8px`, 19.2px tall.
  Verified positions (both sites, 390 & 1000): headings y 128.4 / 300.7 / 473.5; items
  167.9 → 249.5, 340.7 → 422.3, 513.5 → 622.3 (27.2px steps).
- Closes on Escape, on link click and on the toggle (verified).

## 10. Footer

`<footer>` bg `#FFFFFF`. Inner column: padding `32px` (desktop), `24px 24px 32px` (tablet),
`24px 16px` (phone); `gap: 56px` between top row and brand row. No copyright line,
no top border. Footer height: **510.4 / 424 / 848.8** at 1440 / 1000 / 390 (ours identical). The footer has
`overflow: clip` (the 238px wordmark's glyph box would otherwise extend the page by 19px).

### Desktop
- **Top row** (`justify-between`, `align-items: flex-start`, height 200):
  - Left (412px wide, column, gap 24px): tagline h6 Switzer 400 24/31.2 `#222`
    "Discover timeless jewelry designed to become part of your everyday story" (93.6 tall),
    then a Dark-Large button (50px tall) at y=149.6. Reference label "Buy template" →
    **ours "Shop Now" → `/shop`** (`site.footerCta`), same button style.
  - Right: three columns, `gap: 64px` (x = 907 / 1146.8 / 1286.6). Each column: heading
    (`muted`, Switzer 500 20/26 −0.4, width = text) then links (Switzer 500 20/26 −0.4
    `#222`, 26px tall, width = text), heading→links 16px.
    Links box is 158px tall with `justify-between`: Navigation and Pages = 4 items
    (y 74 / 118 / 162 / 206), Others = 5 items (74 / 107 / 140 / 173 / 206).
    Navigation's 4th item is "My Account" (Shopify) → **ours "Collections" (`/shop`)**.
- **Brand row** (`justify-between`, items-end, 190.4 tall): left "Supported Payments" block
  312px wide (h6 Switzer 400 20/26 at y=427.2, gap 10px, logo row 15.2 tall, items centred,
  gap 12px); right huge wordmark "Glintura" Switzer 400 238/190.4 −4.76, 806px wide.

### Tablet
- Same structure. Left 340px wide (tagline 22.08/28.704, button 47.5 tall). Right columns
  `gap: 40px` (x = 540 / 748 / 860), headings/links 18.08/23.504 (letter-spacing normal),
  links box 160.5px. Wordmark 140/112 −2.8 (473px wide). Payments title y=340.8.

### Phone
- Single column, `gap: 64px` between the Left block (tagline 20/26 + button) and the links.
- Link columns: CSS grid, 2 columns × 2 **equal (1fr) rows**, gap 40px; Navigation + Pages in
  row 1 (y=211.5), Others in row 2 (y=440.5). Links gap 8px (not justify-between),
  headings/links 18.08/23.504. Links never wrap ("Women's Collection" is 168px wide and
  overflows its 159px track).
- Brand row stacked (`gap: 16px`): wordmark first (94/75.2 −1.88, left aligned, y=685.5),
  then Supported Payments (17.6/22.88, y=776.7) with the logo row top-aligned (y=809.6).

### Payments
Reference shows five brand logos (Apple Pay 40×15.2, Google Pay 34×13.8, PayPal 53×14.1,
Amazon 39×12, Visa 37×12, gap 12) — **not copied**. Ours: five neutral SVG text pills with
the same widths, all 15.2px tall (Switzer 500 8.5px), labels "Card", "Bank", "Pay Later",
"Wallet", "Cash" (`site.payments`; the 3rd is the widest slot). Slot x-positions match the
reference exactly.

## 11. Product card (measured on home, Phase 2 — `ProductCard.jsx`)

Two Framer variants: **Desktop** (used at ≥810, also on tablet) and **Mobile** (≤809).

| | Desktop / Tablet | Phone |
|---|---|---|
| Card | link, column, gap 12 | same |
| Image box | **fixed height 440px**, width = column (448 @1440, 468 @1000, 350 in New Arrivals) | fixed **200px** tall (171 wide @390) |
| Top overlay | inset 12px, 34px row: badge left, heart right | heart only (badge hidden) |
| Info | row `justify-between`, padding 0 8; Meta column (max-w 220, gap 8): title h6 20/26 + price row (0px tall on the reference); category label 12px right-aligned, top-aligned | column, gap 4, padding 0 8: category label first, then title 17.6/22.88 (wraps at 155px) + price row |
| Height (no price) | 440 + 12 + 34 = **486** | 200 + 12 + 14.4 + 4 + title + 8 = 261.28 (1-line) / 284.16 (2-line) |

- Images: `object-fit: cover`, bg `#E8E8E8`. Hover: primary image fades out while the second
  fades in, **0.5s tween, ease `cubic-bezier(0, .28, .45, 1.01)`** (`ease-card`).
- Badge: see §8 (white, 8×16 padding → 104.9×30.4 for "Best Sellers").
- Favourite button: 34px white circle, 18px **Phosphor Heart regular** (stroke 16/256 → lucide
  `strokeWidth={1.5}`), colour ink. Hover → filled ink heart. Saved → filled **accent** heart
  (hover: ink). It sits inside the card link; clicking toggles the wishlist (reference stores
  `localStorage.favorites`; ours `useWishlistStore`) and does not navigate.
- **Deviation — price:** the reference shows no price (Shopify is blocked/empty: the price row is
  0px tall). Ours renders `formatPrice(price)` (+ struck compare-at price) in that row when
  `site.showPrices` is true (default). With `showPrices: false` the card is pixel-identical in
  size (an empty 0px row keeps the 8px gap). All height comparisons were done with it off.
- Cards fade in (opacity, see §13) when half visible.

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
| Hero | full-bleed 100vw × 100vh | cover (reference photo 16:9) |
| Icons banner (best sellers) | 912×439 / 952×398 / 358×460 | 16:9 photo, cover |
| Promo card (new arrivals) | 644×966 / 952×466 / 358×460 | 2:3 photo, cover |
| Gender cards | 720×800 / 1000×800 / 390×460 | 7:8 photo, cover |
| Customer cards | 250×300 | 5:6 |
| About video / newsletter | 100vw × 100vh | 16:9, cover |

## 13. Motion / misc

- Smooth scrolling via Lenis on the reference (not replicated).
- All appear effects are read from the page data (`__framer__appearAnimationsContent` and the
  page module's `__framer__*` / text `effect` props). Details in §15. All of ours honour
  `prefers-reduced-motion` (static content, no ticker movement).
- The footer has no appear effect on the reference's home page.

## 14. Phase 1 verification results (2026-10-01)

Compared on `/contact` (both sites) at 1440 / 1000 / 390 × 900, every text node + icon box
(x, y, w, h, font family/size/weight/style, line-height, letter-spacing, colour). Tolerance 0.6px.

**Matches exactly (all three widths):** navbar height (70.4), padding, link positions and
type, wordmark position (x=701.5 desktop, 24/16 tablet/phone) and type, counter offsets and
type, light/dark colours, scroll-hide (−85px) and 100vh switch; mobile menu (open height =
viewport, every heading/item position, fonts); footer height and every heading, link, tagline,
button, "Supported Payments" title, payment slot and wordmark position/size/type.

**Remaining differences (intentional, do-not-copy):**

| Where | Reference | Ours |
|---|---|---|
| Navbar right, desktop | Search 1212, Heart 1256, Cart 1300, User 1344, Country 1388 | Search 1300, Heart 1344, Cart 1388 (counters move with them) |
| Navbar right, tablet / phone | Search, Cart, Country, Menu | Search, Cart, Menu — Search/Cart 44px (tablet) / 36px (phone) further right |
| Footer + menu Navigation 4th link | My Account (myshopify) | Collections → `/shop` |
| Footer button | Buy template (contra.com) | Shop Now → `/shop` |
| Payments | brand logos (12–15.2px tall) | neutral text pills, 15.2px tall, same widths |
| Icon glyphs | Phosphor bold | lucide equivalents at stroke 2.25 (see §9 table) |

**Not verifiable here:** the reference icon glyphs as rendered (framer.com blocked — names,
weight and colours come from the page modules instead); hover transition timings; the search
and cart drawers' behaviour with real products (Shopify blocked).

## 15. Home page (Phase 2, measured 2026-10-01)

Page height **9102.2 / 10840 / 9520** at 1440 / 1000 / 390 (900 tall viewport) — ours identical.
Order: Hero (fixed) → Best Sellers (+ Icons banner) → For Everyone → Features ticker →
New Arrivals (+ promo) → About Us media block → Continue Your Journey → Featured Customers →
Newsletter → Footer. Section headings everywhere use the **display** size (80/88 · 64/70.4 ·
40/44, `type-display`) with `text-wrap: balance`; eyebrow → heading gap 16.

### Appear effects (page data)
| What | Effect |
|---|---|
| Hero image | opacity 0→1 + scale 1.1→1, delay 0.2, 1.2s, ease `[.22, 1, .36, 1]`, on load |
| Hero eyebrow / subheading / CTA | opacity 0→1, spring bounce 0 1.5s, delays **0.3 / 0.7 / 0.9**, on load |
| Hero headings (both) | per **word**: from `blur(10px)`, opacity 0, y 10 → rest; spring bounce 0 1.5s; start 0.5s, +0.05s per word; on load |
| Section headings | same word effect, start 0.2s, trigger in view (threshold 0), once |
| Eyebrows, Show All, cards, banners | opacity 0→1, spring bounce 0 1.5s, delay 0.2, when 50% visible, once (`Reveal`) |
| Navbar (home only) | opacity 0→1, 1s linear, delay 0.8 — **not built** (shared Layout) |

### Hero (`HomeHero.jsx`)
- `position: fixed; height: 100vh; z-index` low — the rest of the page (white, positioned)
  scrolls **over** it; a 100vh spacer keeps the flow (the reference's "Transparent Stack").
- Padding 140/32/56 · 120/24/48 · 120/16/32. Content column `justify-between`.
- Image overlay: `linear-gradient(180deg, #000 -30%, transparent 41%, #000 100%)` (`bg-hero-fade`).
- Top: eyebrow (mist) + h1 "Beyond Ordinary Elegance", max-w 640, gap 8.
- **"Crafted For Legacy"** is the hero's second display heading, not a separate band/marquee:
  desktop bottom-right (max-w 481, right-aligned, y=668 @1440), tablet right column (444 wide,
  right-aligned), phone **above** the subheading (left-aligned, y=669.3 @390).
- Bottom row: desktop `justify-between`; tablet two 444px columns with 64px gap; phone column,
  gap 24. Subheading block (max-w 540, gap 16): Inter body-L cream (balanced) + Light button
  **460px max** (fills 444 / 358 on tablet / phone).

### Best Sellers (`BestSellers.jsx`)
- Section `pt 140/120`, Container. Header row (`justify-between`, items end): header max-w 515
  + **Show All 160px fixed** (dark). Phone: header, 24px gap, button; header→grid gap **64**
  on phones, 32 otherwise.
- Grid: 3 cols (1fr) ≥1200, 2 cols below; gap 24 row / 16 column, items start.
  Order: 4 cards, then the **Icons banner as a 2-column grid cell** (next to card 4 on desktop,
  own row on tablet/phone). Banner heights **439 / 398 / 460** (fixed).

### Media banner (`MediaBanner.jsx`) — Icons banner + promo card
- Image cover + "SmoothGradient" overlay: black at the bottom eased to transparent
  (21 stops, `bg-fade-up`). Title h2 `type-h3` (56/64.4 · 46.08/52.99 · 32/36.8) cream, max-w 360.
  Light button.
- Variants: **Default** (≥810): padding 24, row, title bottom-left, button bottom-right.
  **Short** (phone): padding 16, column `justify-between` (title top, button bottom).
  **Long** (promo, desktop): padding 24, column, title top / button bottom.

### For Everyone (`ForEveryone.jsx`)
- Section `pt 140/120`, full-bleed. Header centred (padding 0 32/24/16), heading 1376 wide.
- Two cards: desktop row 720×800 each; tablet column 1000×800; phone column 390×460.
- Desktop/tablet hover ("Default-Hover"): a panel `rgba(33,33,33,.5)` + `backdrop-filter: blur(4px)`,
  radius 8, **102% × 105%**, left −1.27%, slides from top 102.4% to −2.4% (**0.6s tween, ease
  `[0, .4, .22, .99]`**); then the title (h2 size 64/73.6, cream) appears per word (from blur 4px,
  y 12; 1s tween ease `[.12,.23,.17,.98]`, 0.15s per word) and a Light "Shop Now" button
  (from y 40, spring stiffness 125 / damping 35 / mass 2). Title y = card+330.2, button +419.8
  (1440). Mouse leave: content disappears, panel slides back down.
- Phone ("Mobile"): whole card is a link; title 36/41.4 always visible, centred, over
  `linear-gradient(180deg, transparent 0%, #000 152%)` (`bg-card-fade`); no button.
- **Deviation:** on the reference only the "Shop Now" button links (desktop/tablet); ours makes the
  whole card the link (button is a visual span) — same targets.

### Features ticker (`FeaturesTicker.jsx`)
- Section `pt 140/120`, full-bleed. Words `type-ticker` (120/144 · 94.08/112.9 · 60/72) colour
  **muted #6D6A67**, separated by 12px muted dots, gap 40 between all items.
- Framer Ticker: **40 px/s to the left**, hover modifier 100% (no slow-down), draggable
  (drag not replicated). Section height 284 / 232.9 / 192.

### New Arrivals (`NewArrivals.jsx`)
- Header full width (no button). Header → content gap 32.
- Desktop: row gap 16 — column of 2 cards (max-w 350) · promo card flex-1 (644×966) · column of 2.
  Order: elara, ivy | promo | knox, ryder.
- Tablet/phone: column gap 16 — 2-col grid (elara, ivy) · promo (952×466 Default / 358×460 Short)
  · 2-col grid (knox, ryder).

### About Us media block (`AboutVideo.jsx`)
- Section padding **140/120 top and bottom**, full-bleed block **100vh**. Reference: autoplay muted
  looping video (not copied). Ours: poster placeholder; `<video muted loop playsInline autoPlay>`
  only when `site.homeVideoSrc` is set and the user doesn't prefer reduced motion.
- SmoothGradient overlay. Content: desktop at the bottom, padding 32, row `justify-between`
  items-end (heading block max-w 739: eyebrow + 8 + h1 display); tablet bottom, padding 24,
  column gap 32; phone fills the block, padding 16, heading top / button bottom.

## 16. Shared sections (Phase 2 — `src/components/shared/`)

Which routes use them: see SITE_MAP.md. On the reference, Featured Customers and the newsletter
form **one** section (`padding 140 0 140` desktop, `140 0 120` tablet/phone, gap 16).

### Continue Your Journey (`ContinueJourney.jsx`)
- `bg-white`, **no top padding** (the previous section's bottom padding provides 140/120).
- Header max-w 575 + Show All (160px). Static grid (no slider/marquee): **3 cards at ≥1200
  (the 4th is hidden)**, 2×2 below. Default products: harper-rope-chain, nova-open-ring,
  luna-charm-bracelet, titan-figaro-chain (`journeyProducts`); prop `products`.
- Height 729.2 / 1204 / 828.1.

### Featured Customers (`FeaturedCustomers.jsx`, `CustomerCard.jsx`)
- `pt 140` at **all** breakpoints. Column, gap 32, overflow hidden. Header centred, max-w 843,
  no side padding; the eyebrow's box is only **13px** tall (overflowing text) on the reference —
  replicated (header 205 / 99.4 / 117 tall).
- Ticker (custom code component): **60 px/s left, 40 px/s while hovered**, gap 16, items aligned
  to the bottom, draggable (not replicated). Cards 250×300: image cover + SmoothGradient; name
  `type-h6-lg` cream (24/31.2 · 22.08/28.7 · 20/26) and product 12px Switzer 500 `#E8E8E8`,
  gap 4, 16px from the left/bottom. Each links to `site.instagram`.

### Newsletter (`Newsletter.jsx`)
- 16px below the customers ticker; full-bleed **100vh** image + SmoothGradient; section bottom
  padding 140 / 120.
- Content: desktop/tablet at the bottom-left, padding 32 / 24, max-w 540, column gap 24:
  h2 "The Next Spotlight Could Be Yours" (`type-h2` 64/73.6 · 52/59.8 · 36/41.4, cream) + 8 +
  paragraph `type-body` mist (balanced), then the form. Phone: fills the block, padding 16,
  heading top / form bottom.
- Form: email input **481×53** (phone 358×53), white, no border/radius, padding 16 / right
  196 (phone 136), Switzer 400 16px/1, text ink, placeholder `your@email.com` muted; submit
  "Subscribe" inset 4px top/right/bottom, **180 wide** (phone 120), bg ink, Switzer 400 20px
  (phone 18px), cream. UI only (no submission yet).

## 17. Phase 2 verification results (2026-10-01)

Compared `/` on both sites at 1440 / 1000 / 390 × 900 with `site.showPrices = false`: every
heading, eyebrow, card title, category label, badge, banner title, paragraph (x, y, w, h,
font-size) and every link / button / heart / input box. Tolerance 0.6px.

**Matches exactly:** page heights (9102.2 / 10840 / 9520), all text boxes, all link/button boxes
(incl. Show All 160px, hero CTA 460px), heart buttons, form fields, gender-card hover geometry
and timing, ticker speeds (measured 40.0 and 59.9 → 40.0 px/s), no horizontal scroll at
320–1920px. With prices on, cards grow by one 22px price row (expected).

**Differences (intentional / not verifiable):**

| Where | Reference | Ours |
|---|---|---|
| Images, video | photos, mp4 | neutral SVG placeholders, poster (video only via `site.homeVideoSrc`) |
| Product prices | none (Shopify) | `formatPrice` row when `site.showPrices` |
| Gender cards ≥810 | only "Shop Now" links | whole card links |
| Tickers | draggable | not draggable; also pause while focused (a11y) |
| Ticker start offset | depends on load time | starts at 0 |
| Navbar on home | fades in (1s, delay 0.8) | no fade |
| Lenis smooth scroll | yes | native scroll |
| Framer / Framer Commerce badges | bottom-right | not copied |
| Card heart icon | Phosphor (blocked in the sandbox, not visible) | lucide Heart stroke 1.5 |

## 18. Shop, category and collection pages (Phase 3, measured 2026-10-01)

Page heights (ours identical): `/shop` 5108 / 5517 (1440 / 390); `/women-category` and
`/men-category` 7784 / 7951 / 8933 (1440 / 1000 / 390); `/women-category/women-necklace` 4552 /
4437 (1440 / 390); `/men-category/men-onsale` 3793 / 3977 / 3988 (1440 / 1000 / 390).
**Document title is just the brand name ("Glintura") on every page of the reference**, and so
is ours (`Layout`).

### Image hero (`ImageHero`) — /shop, /women-category, /men-category
Same fixed hero as Home (padding 140/32/56 · 120/24/48 · 120/16/32, image zoom-in 1.1→1 over
1.2s, per-word heading from 0.5s) but content is **bottom-aligned**: eyebrow (mist) + h1 `type-display`,
gap 8, bottom of the h1 at 844 (1440) / 868 (phone). Heading max-width **680** (shop, men) or
**878** (women). Overlay gradients per page: shop `#000 0% → 0 41% → #000 100%`; women
`#000 -28%, .73 -10%, 0 63%, #000 104%`; men `#000 -44% → 0 41% → #000 100%`.
Labels: "Shop" / "Only For Her" / "Only For Him".

### /shop
After the hero: the Home "For Everyone" block with eyebrow "Shop By Category", h2 "Choose your
category", the same two hover cards (Women's / Men's, 720×800 desktop) — **but 140/120px bottom
padding** (no ticker follows) — then the three shared sections.

### Audience pages — collection mosaic (`CollectionBento`, `HoverTile`)
- Section `pt 140/120`, header max-w 800 (padding 0 32/24/16 → heading 736 / 752 / 326 wide), h2
  display size; "/ Browse Women Collections /" / "/ Browse Men Collections /", heading
  "Discover What You're Looking For" (both). Header → mosaic gap 32; **rows gap 16, tiles gap 16**.
- Desktop rows (500 tall): **960 + 400**, **680 + 680**, **960 + 400** (men: **400 + 960**), then one
  **1376 × 800** tile. Tablet: rows of two equal 468px tiles (500 tall), last tile 952 × 800.
  Phone: one column, every tile **358 × 460** (gap 16).
- Tile hover = Home gender card (blurred panel 102% × 105% sliding up, per-word title, "Shop Now")
  with title size by tile: 500px tiles **h3** (56/64.4 · 46.08/53), 800px tile **h2** (64/73.6).
  Phone: label always shown at h2 (36/41.4) over `bg-card-fade`.
- The reference tile links only on its phone variant / "Shop Now" button; ours links the whole
  tile everywhere.

### Cross-audience block (`AudienceCta`)
Section `py 140/120` around a 100vh image block with `bg-fade-up` at 90% opacity. Content
column gap 32, box **645px wide, padding-left 32**, centred: eyebrow ("For Him" / "For Her") +
10px + h2 `type-h2` centred ("Discover Our Men's / Women's Collection") + Light button
("Explor…" typo on the reference → ours "Explore Men's / Women's Collection", 11px wider).
Phone, women's page: same box (ends at the right screen edge). Phone, **men's** page:
padding 16 all round, content fills the block — eyebrow + heading at the top (eyebrow left,
heading centred), button bottom-left.

### Collection pages (14)
- No image hero (navbar dark). Header section: `pt 180` at every breakpoint, padding 0 32/24/16,
  centred "/ Label /" + h1 `type-display` (title), 123.2 / 105.6 / 123.2 tall (1440 / 1000 / 390).
- Product section `py 140/120`, Container, `ProductGrid` (3 cols desktop at 448px; 2 cols tablet
  468px and phone 171px; same cards, badges and heights as Home).
- Empty state (`men-onsale`, products `[]`): box 1376 wide, padding 24, content max-w 514,
  gap 24: h4 `type-h4` "This Collection Is Coming Soon" (48/57.6 · 40/48 · 28/33.6) + dark button
  "Explore Collections" (→ the audience page). Card height 237.2 desktop.
- Texts (label / title) are stored in `src/data/collections.js` as `label` and `title`
  (e.g. "Necklaces" / "Women's Necklaces"; `men-onsale` = "On Sale" / "Men Exclusive Sale").
- A collection slug under the wrong audience (`/women-category/men-chain`) renders the 404 page.

### Phase 3 verification (1440 / 390, 1000 where the layout switches; showPrices off)
Matched within 0.6px: page heights above, all headings / labels / card titles / category labels /
badges, all card, tile and button boxes. Differences: the "Explore" button label (reference typo
"Explor"), placeholders for all images, whole-tile links, hover timings not re-measured beyond
the Home values (same component).

## 19. Product page and Favourites (Phase 4, measured 2026-10-01)

Page heights (ours identical, prices off): `/product/aurora-bar-necklace` 4957 / 5897 (1440 / 390);
`/favourite` with all 25 saved 8719 / 8332. **Document title on product pages: "Name - Glintura"**
(route `handle.title`, set in `Layout`); every other page: the brand name.

### Product page layout
- Section `pt 180`, padding 0 32/24/16. **Desktop: two columns, gap 24** — gallery (flex 1,
  `position: sticky; top: 24px`) and info (flex 1, `sticky; top: 0`). **Tablet / phone: one
  column, gap 32** (gallery first).
- Gallery (`ProductGallery`): main box **640px tall** (676 wide @1440, 952 @1000), **550** on phones,
  bg mist, image cover; dark "Best Seller" badge top-right (16px inset, best sellers only).
  10px below: 4 thumbnails in a row, gap 8, ratio **163 × 196.1** (83.5 × 100.4 on phones),
  `rgba(0,0,0,.25)` overlay. Clicking a thumb shows it in the main box (verified). Reference
  images: 4 per product, ratios 1:1, 1:1 (Aurora: 4:5), 16:9, 16:9 → placeholders `product`,
  `productAlt`/`galleryPortrait`, `galleryWide`, `galleryWideAlt`.
- Info column (gap 32 between blocks):
  - Header (gap 16): row 34px = eyebrow (category, accent) · 8 · stock slot 28×30 (4px dot
    `#969696`; Shopify stock, shows "Out" in the sandbox) · 8 · heart (`FavouriteButton`); phones add
    4px under this row. Title **h1 `type-h5`** (40/44 · 34.08/37.5 · 24/26.4), max-w 550.
    Description `type-body` ink-soft, max-w 550.
  - 16px → row 32px: price (left, `site.showPrices`; reference empty) + **quantity selector 165×32**
    (white, padding 0 8, −/+ hit areas 40×40, value Switzer 600 16/16; minus disabled at 1).
  - 16px → **two 40px full-width buttons, gap 8**: "Add to Cart" and "Buy Now" (labels from the page
    module; on the reference they stay in a grey "Loading" state because Shopify is blocked).
    Purchase-button variants in the module: dark (`#222` → hover `rgba(51,51,51,.85)`), light
    (`#E8E8E8` → hover `#D9D9D9`), label Switzer 500 16/19.2 −0.2. Ours: Add to Cart = dark,
    Buy Now = light _(variant per button not readable — estimate)_.
  - Accordion (`Accordion`): 4 white cards, gap 10: Description, Materials / Composition,
    Dimensions & Fit, Care. Title row padding 16, `type-h6-lg` (24/31.2 · 22.08/28.7 · 20/26),
    16px "+" icon on the right. **All closed by default; several can be open at once**; the icon
    rotates 45° (→ ×) and the body expands (spring bounce 0.2, 0.4s). Body `type-body`
    ink-soft, padding 0 16 16, ~515px wide. Closed card height 63.2 / 60.7 / 58.
  - "Perfect match with" `type-quote` ink-soft, 16px → 3 horizontal cards (`HorizontalCard`),
    gap 16: 160×160 image + info (padding 8, `justify-between`: category label top, title + price
    row bottom). Same 3 products on most pages (data in `productDetails.js`).
- Reviews (`ProductTestimonials`): section padding 140/120, content max-w 936 centred: name
  `type-h6-lg`, 5px, icon 24 + product name `type-body` (row 26px), 16px, quote **`type-h4`**
  (48/57.6 · 40/48 · 28/33.6); 32px → **3 progress bars**, 2px, track `#9A948E`, fill ink, gap 10,
  row 450 wide (full width on phones). **Auto-advances every ~7s** (fill animates linearly), 3
  reviews per product (`testimonials.js`). Ours: crossfade 0.4s, bars clickable, no auto-advance
  under reduced motion. The reference icon could not be identified (lucide `ShoppingBag` used).
- Then the shared sections: Continue Your Journey **does render its products** on product pages
  (harper / nova-open-ring / luna-charm; 4 below 1200px), Featured Customers, Newsletter.

### Cart (`cartStore`)
`items: [{ slug, quantity }]`, `addItem(slug, quantity)` merges lines with the same slug,
`removeItem(slug)`, `clear()`, persisted (`glintura-cart`); navbar counter = `useCartCount()` (sum
of quantities). No visible feedback could be measured on the reference (Shopify blocked) → the
clicked button reads **"Added" for 1.5s**. Buy Now also just adds to the cart (no checkout yet).

### Favourites (`/favourite`)
- Hero = `ImageHero` ("Favourites" / "Your Loved Collection", heading max-w 680, matches). Grid
  section padding 140/120, `ProductGrid` (3 / 2 / 2 columns), then the shared sections.
- **Reference behaviour:** it lists **all 25 products** whether or not anything is saved; clicking a
  card heart stores a Shopify product ID in `localStorage.favorites` and bumps the navbar counter,
  but the list does not change (its filter needs the blocked Shopify data). **Decision:** ours shows
  only saved products (catalogue order, hearts filled); empty state = "Nothing here yet" (`type-h4`)
  + short text + dark "Explore Collections" → `/shop`.

## 20. Cart drawer and /cart (Phase 5A — no reference, designed in the project's language)

The template's cart is a Shopify component (blocked in the sandbox), so this part has **no
visual reference**; it reuses the tokens, type utilities, square buttons and spacing above.

- **`Drawer`** (`ui/Drawer.jsx`): portal, `z-60`, backdrop `bg-overlay`; panel white, full width on
  phones, **452px with a 24px inset from 810px** (the reference search/cart drawer shape, §9).
  Header (title `type-h6-lg` + 20px X), scrolling body, pinned footer, `mist` 1px dividers.
  Slides in (spring, bounce 0, 0.5s; backdrop fades 0.3s); under reduced motion it only appears.
  Focus moves to the close button, Tab / Shift+Tab are trapped, Escape and backdrop click close it,
  focus returns to the trigger, page scroll is locked (`overflow-hidden` on `<html>`).
- **Cart drawer** (`cart/CartDrawer.jsx`, mounted once in `Layout`): title "Cart (count)"; lines
  (`CartLine`: 96px thumbnail, category `type-badge`, name `type-h6` linking to the product and
  closing the drawer, line total, `QuantityStepper` 1–10, "Remove"); footer: Subtotal, the
  free-shipping line, dark "Checkout" → `/checkout` (placeholder page) and muted (`bg-mist`)
  "View cart" → `/cart`. Empty: "Your cart is empty" + "Continue shopping" → `/shop`.
- **Opens from** the navbar cart icon and **after Add to Cart and Buy Now** on the product page.
  _Deliberate deviation:_ those buttons also keep their "Added" label for 1.5s (§19).
- **`/cart`** (`pages/Cart.jsx`, title "Cart - Glintura"): `pt-180` header (eyebrow "Your Cart",
  h1 display "Shopping Cart"), lines with 96px (phone) / 160px images; order summary in a
  `bg-smoke` box (Subtotal, Shipping "Free" or amount, Total `type-h6-lg`, free-shipping line,
  Checkout button, "Continue shopping" link). Desktop: two columns (summary 452px, `sticky top-24`);
  tablet/phone stacked. Same empty state. **No shared sections** on this page.
- **Prices always show in the cart**, even with `site.showPrices = false` (that flag only hides
  the decorative price rows on product cards / the product page).
- **Shipping:** `site.freeShippingThreshold` (150) and `site.flatShipping` (8), placeholders.
  Shipping = 0 for an empty cart or subtotal ≥ threshold, else the flat rate. Message:
  "Add $X more for free shipping" / "You've unlocked free shipping".
  Verified: $129 → shipping $8, total $137, "Add $21.00 more"; $149 → $8 / "Add $1.00 more";
  $208 (two lines) and $258 (qty 2) → Free; qty capped at 10 (plus disabled), minus disabled at 1.
- Saved lines whose product no longer exists are dropped (and quantities clamped) when the
  persisted cart loads.
