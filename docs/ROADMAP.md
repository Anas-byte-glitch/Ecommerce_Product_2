# Roadmap

Internal file (excluded from the release Zips). Keep it updated as parts are finished.

## Done
- **1** Foundation: Navbar, Footer, routing, tokens, data
- **2** Home + shared sections (Continue Your Journey, Featured Customers, Newsletter)
- **3** /shop, /women-category, /men-category, 14 collection pages
- **4** Product page (25 products), /favourite, wishlist + cart stores
- **5A** Cart drawer + /cart
- **5B-1** Demo checkout + success page
- **5B-2 + 6** Search, Buy Now, About page, Contact page with FAQ (branch `phase-5b2-6`)
- **7** Journals list + 4 article pages, legal pages, 404, shared newsletter form (UI only), navbar fade-in (branch `phase-7`). Moved to Phase 8: reference footer has no entrance fade-in (nothing to build); `vercel.json` rewrite exists, `public/_redirects` and `.htaccess` still to do.

- **8A** Polish: settings in site.js, fonts (Switzer → Hanken Grotesk, OFL), motion review, responsive QA, accessibility (axe: 0 violations) (branch `phase-8a`)

- **8B** Performance (lazy routes, Image component, LazyMotion), SEO (per-route meta, JSON-LD, icons, manifest, generated sitemap/robots), deploy files (branch `phase-8b`)

- **9A** Brand (Orvelle, order prefix ORV), original copy, leftover scan (branch `phase-9a`)

## Remaining
- **9B-1** (done) image/video inventory: `docs/IMAGE_SLOTS.md` (144 slots), `docs/IMAGE_SHOPPING_LIST.md` (sources unreachable from the build environment → manual download into `assets-incoming/`).
- **9B-2** processing script, wiring, `images.json`/`CREDITS.md`, video.
- **9B** Real images (Unsplash/Pexels/Pixabay, licences checked, `images.json` + `CREDITS.md`, WebP/srcset via the `Image`
  component and the `placeholders` map), licensed home video or still.
- **9C** Optional prerender step, buyer documentation, `npm run package` (source + built Zips from an allowlist),
  `npm run check:release`.
- **9** (original plan, remaining parts):
  - invent a new short brand name (4–8 letters, similar wordmark width) and replace "Glintura";
  - rewrite ALL template texts (About, FAQ, product descriptions/materials/care, reviews, customer
    names, journal articles, legal pages) in original wording with about the same lengths; scan for
    leftover phrases;
  - real images only from Unsplash / Pexels / Pixabay with commercial-use licences (checked one by
    one, `images.json` + `CREDITS.md`, a download script producing optimised WebP + srcset, SVG
    placeholders kept as fallback); replace the home video with a licensed video or a still;
  - buyer documentation (README start-here + docs/ guides: quick start, store settings, products,
    design tokens, pages and content, deploy to Vercel/Netlify/cPanel, next steps for real
    payments/forms/order storage, troubleshooting; CHANGELOG, LICENSE placeholder);
  - `npm run package` → source Zip + built Zip from an allowlist, EXCLUDING CLAUDE.md,
    docs/DESIGN_NOTES.md, docs/SITE_MAP.md, docs/ROADMAP.md, reference/, measuring scripts;
  - `npm run check:release` fails if the Zips contain "glintura", "framer", "framerusercontent", the
    template author's data, original-text phrases or excluded files; test both Zips from a clean folder.

## Deploy (draft for the buyer docs — full guides come in Phase 9)
Build: `npm run build` → `dist/` (also writes `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and a copy of
`vercel.json` from `src/config/site.js` + the data files). Before building set `siteUrl`, `name`, `description`
in `src/config/site.js`. Upload the **contents** of `dist/` (or let the host run the build).
- **Vercel:** import the repo (framework Vite, build `npm run build`, output `dist`). `vercel.json` already has
  the SPA rewrite, long cache for `/assets/*` and security headers.
- **Netlify:** build `npm run build`, publish `dist`. `_redirects` (SPA fallback) and `_headers` ship inside `dist`.
- **Apache / cPanel:** upload everything inside `dist/`, **including the hidden `.htaccess`** (enable "show hidden
  files" in the file manager / FTP client). Needs mod_rewrite; compression, caching and headers use optional modules.
  Uncomment the HTTPS redirect (and HSTS) once the certificate works. The site must be served from the domain
  root. Not tested on a real server in the build environment — see DESIGN_NOTES §27.
- **Replace placeholders:** `public/og-image.png` (1200×630, social preview), `public/icon.svg`
  + PNGs (`favicon-16/32`, `apple-touch-icon` 180, `icon-192/512` — export from your logo with any tool), then
  rebuild. `index.html` and the manifest read brand, description and URL from `site.js`.
- **Images:** every image goes through `src/components/ui/Image.jsx`. Put real photos in `src/assets/…`, and change an
  entry of `placeholders` (`src/assets/placeholders/index.js`) to `{ src, srcSet, webp, width, height }`.
- **SEO texts:** meta descriptions are in `src/data/seo.js`, titles on the routes in `src/App.jsx`.

## Phase 9A rewrite log (counts only)
- `src/data/productDetails.js`: 25 products × 5 texts (description, details, materials, dimensions, care) rewritten; 25 products renamed
  (names/slugs/matchWith updated in products, collections, customers, texts; mapping in DESIGN_NOTES §28).
- `src/data/testimonials.js`: 75 reviews (25 × 3), all reviewer names new.
- `src/data/journals.js`: 4 articles (titles, slugs, excerpts, 33 headings/paragraphs, 1 list), same structure.
- `src/data/legal.js`: 3 pages (terms 13 sections, privacy 13, refund 8) rewritten, same section structure.
- `src/data/about.js` (4 beliefs, 3 materials, 4 reasons, stats, founder), `src/data/faqs.js` (6 Q&A), `src/data/customers.js` (6),
  `src/data/categories.js` (2 audiences), `src/data/seo.js` (new in 8B, original), `src/config/site.js` (tagline, description, hours).
- JSX copy: Home (hero eyebrow/title/text/button/second title, best sellers, new arrivals, about block, ticker 5 phrases, for-everyone),
  Shop, Favourites, About, Contact, Journals, shared sections (journey, customers, newsletter), empty/success messages.
- Generic functional strings (Add to Cart, Search, Checkout, Submit, form errors, FAQ/Frequently Asked Questions, nav labels) kept.
