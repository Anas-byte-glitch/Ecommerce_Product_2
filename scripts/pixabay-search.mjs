// Phase 9B: search Pixabay for candidates, cached 24 h in .cache/pixabay (git-ignored).
// Usage: node scripts/pixabay-search.mjs   -> writes .cache/pool.json
// Key comes from .env.local (PIXABAY_API_KEY); never printed. Search only, nothing is downloaded.
import fs from 'node:fs'
import crypto from 'node:crypto'

const env = Object.fromEntries(fs.readFileSync('.env.local', 'utf8').split('\n').filter(Boolean).map((l) => l.split(/=(.*)/s).slice(0, 2)))
const KEY = env.PIXABAY_API_KEY
const CACHE = '.cache/pixabay'
const TTL = 24 * 3600 * 1000
const DELAY = 1500

const groups = {
  hero: ['jewelry still life', 'jewelry flat lay', 'jewelry linen', 'jewellery set neutral background', 'jewelry collection', 'jewelry stone background', 'jewelry display beige', 'gold jewelry silk', 'pearl necklace gold jewelry silk'],
  menhero: ['men jewelry', 'men jewelry dark', 'chain ring bracelet dark', 'silver chain black background', 'jewelry slate'],
  necklace: ['necklace', 'gold necklace pendant', 'silver necklace', 'pearl necklace', 'necklace flat lay', 'heart necklace', 'crystal necklace'],
  chainw: ['chain necklace jewelry', 'gold chain', 'silver chain jewelry', 'rope chain gold'],
  ring: ['ring jewelry', 'gold ring', 'diamond ring', 'silver ring', 'ring close up', 'signet ring', 'twist ring'],
  bracelet: ['bracelet jewelry', 'gold bracelet', 'silver bracelet', 'tennis bracelet', 'charm bracelet'],
  earring: ['earrings jewelry', 'gold earrings', 'silver earrings', 'hoop earrings', 'pearl earrings', 'drop earrings'],
  menchain: ['men chain necklace', 'cuban chain', 'silver chain', 'black chain necklace', 'figaro chain'],
  menring: ['men ring', 'signet ring', 'black ring', 'silver ring dark', 'ring dark background'],
  menbracelet: ['leather bracelet', 'men bracelet', 'steel bracelet', 'black bracelet', 'chain bracelet silver'],
  menearring: ['stud earrings', 'black earrings', 'men earring', 'hoop earrings silver', 'earrings dark'],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function search(q) {
  const params = new URLSearchParams({ q, image_type: 'photo', per_page: '50', safesearch: 'true', min_width: '1500' })
  const id = crypto.createHash('md5').update(params.toString()).digest('hex')
  const f = `${CACHE}/${id}.json`
  if (fs.existsSync(f)) {
    const c = JSON.parse(fs.readFileSync(f, 'utf8'))
    if (Date.now() - c.t < TTL) return c.hits
  }
  await sleep(DELAY)
  params.set('key', KEY)
  const res = await fetch(`https://pixabay.com/api/?${params}`)
  if (res.status === 429) { console.error('rate limited, wait 65s'); await sleep(65000); return search(q) }
  if (!res.ok) throw new Error(`HTTP ${res.status} for "${q}"`)
  const left = Number(res.headers.get('x-ratelimit-remaining'))
  const hits = (await res.json()).hits
  fs.writeFileSync(f, JSON.stringify({ t: Date.now(), q, hits }))
  if (left < 5) await sleep(Number(res.headers.get('x-ratelimit-reset') || 60) * 1000 + 1000)
  return hits
}

const pool = {}
for (const [g, qs] of Object.entries(groups)) {
  const m = new Map()
  for (const q of qs) for (const h of await search(q)) m.set(h.id, { ...h, key: undefined })
  pool[g] = [...m.values()].map((h) => ({ id: h.id, pageURL: h.pageURL, tags: h.tags, previewURL: h.previewURL, webformatURL: h.webformatURL, imageWidth: h.imageWidth, imageHeight: h.imageHeight, user: h.user, user_id: h.user_id, likes: h.likes, downloads: h.downloads }))
  console.log(g, pool[g].length)
}
fs.writeFileSync('.cache/pool.json', JSON.stringify(pool))
