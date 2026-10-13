# Roadmap

Internal file (excluded from the release Zips). Keep it updated as parts are finished.

## Done
- **1** Foundation: Navbar, Footer, routing, tokens, data
- **2** Home + shared sections (Continue Your Journey, Featured Customers, Newsletter)
- **3** /shop, /women-category, /men-category, 14 collection pages
- **4** Product page (25 products), /favourite, wishlist + cart stores
- **5A** Cart drawer + /cart
- **5B-1** Demo checkout + success page
- **5B-2 + 6** Search, Buy Now, About page, Contact page with FAQ — _in progress on branch `phase-5b2-6`_

## Remaining
- **7** Journals list + 4 article pages (`/journals`, `/journals/:slug`), legal pages (`/terms`,
  `/privacy-policy`, `/refund-policy`), the 404 page matching the reference, newsletter form
  validation + success state (shared section and footer, UI only), footer/navbar fade-ins if the
  reference has them.
- **8** Polish:
  - all store settings only in `src/config/site.js` (brand name, email, phone, address, currency and
    formatting, shipping, return window, siteUrl, order prefix);
  - self-hosted fonts (check the Switzer licence for redistribution inside a sold Zip; if not clearly
    allowed, propose an open-licence replacement);
  - motion and `prefers-reduced-motion` review;
  - responsive QA at 360, 390, 600, 810, 900, 1000, 1200, 1440, 1600, 1920;
  - accessibility (axe-core on every route, skip link, one h1 per page, alt texts, contrast,
    aria-live for counters and form messages, keyboard-only purchase flow);
  - performance (lazy routes, image sizes and loading attributes, bundle report, Lighthouse);
  - SEO (meta, Open Graph, favicon, robots.txt, sitemap from routes and slugs);
  - deploy files (`vercel.json`, `public/_redirects`, `public/.htaccess`);
  - re-check items DESIGN_NOTES lists as "could not verify".
- **9** Release:
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
