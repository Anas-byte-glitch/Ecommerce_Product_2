// Phase 9B: second, deeper search pass (latest order, colour filters, more pages). Cached 24 h. Search only.
import fs from 'node:fs'
import crypto from 'node:crypto'
const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split('\n').filter(Boolean).map((l) => l.split(/=(.*)/s).slice(0, 2)))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function call(extra) {
  const params = new URLSearchParams({ image_type: 'photo', per_page: '100', safesearch: 'true', min_width: '2000', ...extra })
  const f = `.cache/pixabay/${crypto.createHash('md5').update(params.toString()).digest('hex')}.json`
  if (fs.existsSync(f)) { const c = JSON.parse(fs.readFileSync(f, 'utf8')); if (Date.now() - c.t < 864e5) return c.hits }
  await sleep(1800)
  params.set('key', env.PIXABAY_API_KEY)
  const res = await fetch(`https://pixabay.com/api/?${params}`)
  if (res.status === 429) { await sleep(65000); return call(extra) }
  if (!res.ok) { console.error('HTTP', res.status, extra.q); return [] }
  const hits = (await res.json()).hits
  fs.writeFileSync(f, JSON.stringify({ t: Date.now(), hits }))
  return hits
}
const qs = ['necklace', 'ring jewelry', 'bracelet', 'earrings', 'jewelry', 'jewellery flat lay', 'gold chain', 'signet ring', 'pearl jewelry', 'silver jewelry', 'men jewelry', 'jewelry minimal']
const m = new Map()
for (const q of qs) for (const order of ['latest', 'popular']) for (const page of [1, 2]) {
  for (const h of await call({ q, order, page: String(page), colors: 'white,gray,brown,black' })) m.set(h.id, h)
}
const keep = [...m.values()].map((h) => ({ id: h.id, pageURL: h.pageURL, tags: h.tags, previewURL: h.previewURL, webformatURL: h.webformatURL, imageWidth: h.imageWidth, imageHeight: h.imageHeight, user: h.user, user_id: h.user_id, likes: h.likes }))
fs.writeFileSync('.cache/deep.json', JSON.stringify(keep))
console.log(keep.length)
