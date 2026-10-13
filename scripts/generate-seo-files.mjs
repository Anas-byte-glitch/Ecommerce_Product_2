// Writes dist/sitemap.xml and dist/robots.txt from the route list (src/seo/routes.js), the data files
// and siteUrl in src/config/site.js. Runs after `vite build` (see the "build" script in package.json).
import { writeFileSync, mkdirSync } from 'node:fs'
import { withSource } from './loadSource.mjs'

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')

await withSource(async (load) => {
  const { site } = await load('/src/config/site.js')
  const { getSitemapEntries, disallowedPaths } = await load('/src/seo/routes.js')
  const base = site.siteUrl.replace(/\/$/, '')

  const urls = getSitemapEntries()
    .map(
      ({ path, lastmod }) =>
        `  <url>\n    <loc>${escapeXml(base + path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`,
    )
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  const robots = `User-agent: *\nAllow: /\n${disallowedPaths.map((p) => `Disallow: ${p}`).join('\n')}\n\nSitemap: ${base}/sitemap.xml\n`

  mkdirSync('dist', { recursive: true })
  writeFileSync('dist/sitemap.xml', sitemap)
  writeFileSync('dist/robots.txt', robots)
  console.log(`sitemap.xml: ${getSitemapEntries().length} URLs · robots.txt written (${base})`)
})
