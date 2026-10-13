// Loads project source modules (src/config, src/data, src/seo — they use extension-less imports and
// SVG assets) from Node scripts and from vite.config.js, via a throwaway Vite server in SSR mode.
import { createServer } from 'vite'

export async function withSource(callback) {
  const server = await createServer({
    configFile: false,
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
  })
  try {
    return await callback((path) => server.ssrLoadModule(path))
  } finally {
    await server.close()
  }
}
