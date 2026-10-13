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

## Remaining
- **8B** Polish, part 2:
  - performance (lazy routes, image sizes and loading attributes, bundle report, Lighthouse);
  - SEO (meta per route, Open Graph, favicon set, robots.txt, sitemap generated from routes and slugs,
    `site.siteUrl` is already in site.js);
  - deploy files (`public/_redirects`, `public/.htaccess`; `vercel.json` exists);
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
