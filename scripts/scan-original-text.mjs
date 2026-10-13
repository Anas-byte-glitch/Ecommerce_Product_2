// Dev-only leftover scan (NOT shipped; see docs/ROADMAP.md). Usage:
//   node scripts/scan-original-text.mjs --fetch   one-time: save the reference site's texts to reference/original-texts.json
//   node scripts/scan-original-text.mjs           scan src/ and dist/ (run `npm run build` first)
// (a) forbidden strings (old brand, template host, template author, old product names, old founder …) in src/ and dist/;
// (b) any run of N or more consecutive words (default 6) that appears verbatim in the reference texts AND in our
//     data files / JSX strings. Phrases listed in scripts/scan-allowlist.json ("phrases") are ignored.
// reference/ is git-ignored and must never be shipped.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { createRequire } from 'node:module'
import { withSource } from './loadSource.mjs'

const ROOT = process.cwd()
const REF_FILE = 'reference/original-texts.json'
const RUN = Number(process.env.SCAN_RUN ?? 6)
const allow = existsSync('scripts/scan-allowlist.json') ? JSON.parse(readFileSync('scripts/scan-allowlist.json', 'utf8')) : { phrases: [], forbidden: [], ignoreFiles: [] }

// ---------- one-time fetch of the reference texts ----------
async function fetchReference() {
  const require = createRequire(import.meta.url)
  const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright')
  const routes = JSON.parse(readFileSync('reference/routes.json', 'utf8'))
  const launch = process.env.HTTPS_PROXY
    ? { proxy: { server: process.env.HTTPS_PROXY }, args: [`--ignore-certificate-errors-spki-list=${process.env.PROXY_SPKI ?? ''}`] }
    : {}
  const browser = await chromium.launch(launch)
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
  const out = {}
  for (const route of routes) {
    await page.goto(`https://glintura.framer.website${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((top) => scrollTo(0, top), y)
      await page.waitForTimeout(80)
    }
    out[route] = await page.evaluate(() => {
      const nodes = []
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent.replace(/\s+/g, ' ').trim()
        if (text && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(n.parentElement.tagName)) nodes.push(text)
      }
      const blocks = [...document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,a,button,label')]
        .map((e) => e.innerText.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
      return { nodes: [...new Set(nodes)], blocks: [...new Set(blocks)], title: document.title }
    })
    console.log('fetched', route)
  }
  mkdirSync('reference', { recursive: true })
  writeFileSync(REF_FILE, JSON.stringify(out))
  await browser.close()
}

// ---------- helpers ----------
const words = (text) => text.toLowerCase().replace(/[’‘]/g, "'").split(/[^a-z0-9']+/).filter(Boolean)
const walkFiles = (dir, exts, out = []) => {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walkFiles(path, exts, out)
    else if (exts.includes(extname(path))) out.push(path)
  }
  return out
}

if (process.argv.includes('--fetch')) {
  await fetchReference()
  process.exit(0)
}

let problems = 0
const report = (title, lines) => {
  console.log(`\n${lines.length ? '✗' : '✓'} ${title}${lines.length ? ` — ${lines.length}` : ''}`)
  for (const line of lines.slice(0, 60)) console.log('   ' + line)
  if (lines.length > 60) console.log(`   … ${lines.length - 60} more`)
  problems += lines.length
}

// ---------- (a) forbidden strings ----------
const renameMap = existsSync('reference/rename-map.json') ? JSON.parse(readFileSync('reference/rename-map.json', 'utf8')) : null
const forbidden = [
  ...allow.forbidden,
  ...(renameMap ? [...Object.keys(renameMap.old), ...Object.values(renameMap.old)] : []),
].map((s) => s.toLowerCase())
const textFiles = [...walkFiles('src', ['.js', '.jsx', '.css', '.html', '.json']), ...walkFiles('public', ['.svg', '.json', '.webmanifest', '.txt', '.xml']),
  ...walkFiles('dist', ['.js', '.css', '.html', '.json', '.webmanifest', '.txt', '.xml', '.svg']), 'index.html', 'package.json', 'vercel.json'].filter((f) => existsSync(f))
const hits = []
for (const file of textFiles) {
  if (allow.ignoreFiles.some((p) => file.includes(p))) continue
  const lower = readFileSync(file, 'utf8').toLowerCase()
  for (const needle of forbidden) {
    // whole-word match, so "framer" does not hit "keyframeResolver" in the animation library
    const pattern = new RegExp(`(?<![a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z0-9])`, 'g')
    for (const m of lower.matchAll(pattern)) {
      const around = lower.slice(Math.max(0, m.index - 30), m.index + needle.length + 30).replace(/\s+/g, ' ')
      if (!allow.forbiddenContext?.some((ctx) => around.includes(ctx))) hits.push(`${file}: "${needle}" …${around}…`)
      if (hits.length > 400) break
    }
  }
}
report('(a) forbidden strings in src/, public/, dist/', hits)

// ---------- (b) verbatim runs against the reference ----------
if (!existsSync(REF_FILE)) {
  console.log(`\n(b) skipped: ${REF_FILE} missing — run with --fetch first`)
} else {
  const reference = JSON.parse(readFileSync(REF_FILE, 'utf8'))
  const refTexts = []
  for (const page of Object.values(reference)) {
    if (page.error) continue
    refTexts.push(...page.nodes, ...page.blocks, page.title)
  }
  const grams = new Set()
  for (const text of refTexts) {
    const w = words(text)
    for (let i = 0; i + RUN <= w.length; i++) grams.add(w.slice(i, i + RUN).join(' '))
  }
  const allowed = allow.phrases.map((p) => words(p).join(' '))

  // our strings: every string inside the data modules (loaded for real, so template values are filled in) …
  const ours = []
  const collect = (value, file) => {
    if (typeof value === 'string') ours.push([file, value])
    else if (Array.isArray(value)) value.forEach((v) => collect(v, file))
    else if (value && typeof value === 'object') Object.values(value).forEach((v) => collect(v, file))
  }
  await withSource(async (load) => {
    for (const file of walkFiles('src/data', ['.js']).concat(['src/config/site.js'])) {
      const module = await load('/' + file.replaceAll('\\', '/'))
      for (const value of Object.values(module)) collect(typeof value === 'function' ? [] : value, file)
    }
  })
  // … plus string literals and JSX text in components / pages
  for (const file of walkFiles('src/components', ['.jsx']).concat(walkFiles('src/pages', ['.jsx']), walkFiles('src/seo', ['.js']))) {
    const source = readFileSync(file, 'utf8')
    for (const m of source.matchAll(/(["'`])((?:\\.|(?!\1)[^\\\n])+)\1/g)) ours.push([file, m[2]])
    for (const m of source.matchAll(/>([^<>{}]{12,})</g)) ours.push([file, m[1]])
    for (const m of source.matchAll(/^\s+([A-Z][^<>{}=\n]{20,})$/gm)) ours.push([file, m[1]])
  }
  const runs = new Map()
  for (const [file, text] of ours) {
    const w = words(text)
    const flags = w.map(() => false)
    for (let i = 0; i + RUN <= w.length; i++) if (grams.has(w.slice(i, i + RUN).join(' '))) for (let k = i; k < i + RUN; k++) flags[k] = true
    let start = -1
    for (let i = 0; i <= w.length; i++) {
      if (flags[i] && start === -1) start = i
      if (!flags[i] && start !== -1) {
        const run = w.slice(start, i).join(' ')
        if (!allowed.some((a) => a.includes(run))) runs.set(`${file}: "${run}"`, true)
        start = -1
      }
    }
  }
  report(`(b) runs of ${RUN}+ words identical to the reference texts (${grams.size} reference ${RUN}-grams, ${ours.length} of our strings checked)`, [...runs.keys()])
}

console.log(problems ? `\nRESULT: ${problems} finding(s)` : '\nRESULT: clean')
process.exit(problems ? 1 : 0)
