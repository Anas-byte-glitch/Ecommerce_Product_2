import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

// Fills %SITE_NAME% / %SITE_DESCRIPTION% in index.html from src/config/site.js (the single settings file).
function siteHtml() {
  return {
    name: 'site-html',
    async transformIndexHtml(html) {
      const url = pathToFileURL(resolve('src/config/site.js')).href + `?t=${Date.now()}`
      const { site } = await import(url)
      return html.replaceAll('%SITE_NAME%', site.name).replaceAll('%SITE_DESCRIPTION%', site.description)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteHtml()],
})
