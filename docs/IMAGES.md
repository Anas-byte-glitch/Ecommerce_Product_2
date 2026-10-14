# Photos: how to add, replace or hold back a photo

Internal developer notes (excluded from the sold package). The slot list is `docs/IMAGE_SLOTS.md` (144 slots), what is in use is `docs/IMAGE_STATUS.md` (generated).

## Add or replace a photo
1. Save the original in `assets-source/` with the exact slot file name (e.g. `product-07-alt.jpg`, `hero-about.jpg`). Keep the original pixels; the pipeline never writes into this folder.
2. Add one **complete** row to `SOURCES.csv`: `filename,source_site,photo_page_url,author_name,author_profile_url,license_name,license_page_url,date_checked` (URLs start with `https://`). Read the license page of the site first.
3. Product and founder photos are content images: add an alt text that describes the real photo to `alts` in `scripts/images.config.json` (key = slot id, e.g. `"product-07-alt"`). Heroes, banners and tiles are decorative (`alt=""`).
4. `npm run images` (validate + WebP 480 to 2000 px, never upscaled, `images.json`, `CREDITS.md`, `docs/IMAGE_STATUS.md`). `npm run images:check` only validates. Commit the processed files in `src/assets/photos/` and the generated files.

A file with any problem is reported and **not used** (missing or wrong name, below the slot minimum after the slot's aspect-ratio crop, orientation, incomplete SOURCES row, round-2-only slot): its slot keeps the SVG placeholder.

## Settings (`scripts/images.config.json`)
| Key | Meaning |
|---|---|
| `widths`, `quality` | WebP widths and quality |
| `strictOrientation` | `false` (current): a photo whose orientation differs from the slot is a warning, rejected only when the slot crop keeps less than `minKeptAreaWhenOrientationDiffers` (0.3) of it. `true` rejects every mismatch |
| `excludeSlots` | Slot ids that may have a file in `assets-source/` but **keep their SVG placeholder** (weak or unsuitable photos). The file and its SOURCES.csv row stay; the slot is left out of the build, `images.json` and `CREDITS.md`. Remove the id to use the photo |
| `roundTwoOnly` | Slot id → part of the photo-page URL the SOURCES.csv row must contain; guards slots whose first photo was rejected |
| `alts` | Alt texts of content photos |

Currently excluded: `collection-men-bestsellers`, `product-24-main`, `product-18-main`, `product-25-main`, `product-06-main`.

## Rules the app follows
- `photoOr('<slot id>', placeholder)` returns the photo or the placeholder (`src/assets/photos/index.js`).
- A product with a real main photo only offers its real photos: the card hover image is the `-alt` photo if it exists, otherwise the original cross-fade runs with the same photo; the gallery shows the real photos only (no thumbnail row for a single photo). A product without a real photo keeps all its SVG placeholders.
