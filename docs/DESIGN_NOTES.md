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
| **Inter** (Google / OFL) | `@fontsource/inter` | 400, 700 |

Switzer = headings, nav, buttons, labels, wordmark. Inter = body copy / paragraphs.
Fallback: `"Switzer", "Inter", ui-sans-serif, system-ui, sans-serif`.

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
no top border. Footer height: **510.4 / 424 / 848.8** at 1440 / 1000 / 390 (ours identical).

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
- The footer (and most sections) fade/slide in when scrolled into view (Framer appear
  effect, `animateOnce`, threshold 0.5) — not built yet; the footer is static in Phase 1.

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
