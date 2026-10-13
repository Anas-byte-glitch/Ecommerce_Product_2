import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { withSource } from './scripts/loadSource.mjs'

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

// Everything site-specific in index.html and the web manifest comes from src/config/site.js:
//   %SITE_NAME% %SITE_DESCRIPTION% %SITE_URL% %SITE_LANG% %SITE_LD% (Organization + WebSite JSON-LD)
function sitePlugin() {
  let values
  const load = () =>
    (values ??= withSource(async (load) => {
      const { site } = await load('/src/config/site.js')
      const { siteGraph } = await load('/src/seo/jsonLd.js')
      const manifest = {
        name: site.name,
        short_name: site.name,
        description: site.description,
        lang: site.locale,
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f6f3',
        theme_color: '#222222',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      }
      return { site, ld: escapeJson(siteGraph()), manifest: JSON.stringify(manifest, null, 2) }
    }))
  return {
    name: 'site-config',
    async transformIndexHtml(html) {
      const { site, ld } = await load()
      return html
        .replaceAll('%SITE_NAME%', site.name)
        .replaceAll('%SITE_DESCRIPTION%', site.description)
        .replaceAll('%SITE_URL%', site.siteUrl.replace(/\/$/, ''))
        .replaceAll('%SITE_LANG%', site.locale)
        .replaceAll('%SITE_LD%', ld)
    },
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'manifest.webmanifest', source: (await load()).manifest })
    },
    configureServer(server) {
      server.middlewares.use('/manifest.webmanifest', async (_req, res) => {
        res.setHeader('Content-Type', 'application/manifest+json')
        res.end((await load()).manifest)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitePlugin()],
})
