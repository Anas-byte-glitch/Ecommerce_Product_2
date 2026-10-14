// Shared helpers for scripts/build-images.mjs: read the slot list (docs/IMAGE_SLOTS.md), SOURCES.csv and
// assets-source/, and validate every file. Nothing here writes files.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

export const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
export const config = JSON.parse(fs.readFileSync(path.join(root, 'scripts/images.config.json'), 'utf8'))
const EXT = /\.(jpe?g|png|webp)$/i

// Slot table rows: | `id` | `file` | routes | aspect | 1440 | 390 | min source | fold | art |
export function readSlots() {
  const slots = {}
  for (const line of fs.readFileSync(path.join(root, 'docs/IMAGE_SLOTS.md'), 'utf8').split('\n')) {
    if (!/^\| `[a-z0-9-]+` \| `/.test(line)) continue
    const c = line.split('|').map((s) => s.trim())
    const id = c[1].replace(/`/g, '')
    const base = c[2].replace(/`/g, '').replace(EXT, '')
    const nums = [...c[7].matchAll(/(\d+)×(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])])
    if (!nums.length) continue
    const [prefW, prefH] = nums[0]
    const [minW, minH] = /\(min/.test(c[7]) && nums[1] ? nums[1] : nums[0]
    slots[base] = { id, base, prefW, prefH, minW, minH, aspect: prefW / prefH }
  }
  return slots
}

export function readSources() {
  const rows = {}
  const lines = fs.readFileSync(path.join(root, 'SOURCES.csv'), 'utf8').split('\n').filter(Boolean)
  const head = lines.shift().split(',')
  for (const l of lines) {
    const v = l.split(',')
    const row = Object.fromEntries(head.map((h, i) => [h, (v[i] ?? '').trim()]))
    rows[row.filename] = row
  }
  return rows
}

const kind = (ratio) => (ratio > 1.1 ? 'landscape' : ratio < 0.9 ? 'portrait' : 'square')

// Returns { files: [{file, slot, ok, problems[], warnings[], width, height, source}], missing: [slot ids] }
export async function validate({ dir = 'assets-source' } = {}) {
  const slots = readSlots()
  const sources = readSources()
  const abs = path.join(root, dir)
  const names = fs.existsSync(abs) ? fs.readdirSync(abs).filter((f) => EXT.test(f)).sort() : []
  const files = []
  for (const file of names) {
    const base = file.replace(EXT, '')
    const slot = slots[base]
    const res = { file, slot: base, ok: true, problems: [], warnings: [] }
    files.push(res)
    if ((config.excludeSlots ?? []).includes(base)) {
      // config.excludeSlots: the file stays in assets-source/ but the slot keeps its SVG placeholder
      res.ok = false
      res.excluded = true
      continue
    }
    if (!slot) {
      res.ok = false
      res.problems.push('wrong name: no slot with this file name')
      continue
    }
    const meta = await sharp(path.join(abs, file)).metadata()
    const swap = (meta.orientation ?? 1) >= 5
    res.width = swap ? meta.height : meta.width
    res.height = swap ? meta.width : meta.height
    const ratio = res.width / res.height
    const cw = Math.min(res.width, res.height * slot.aspect)
    const ch = cw / slot.aspect
    res.crop = `${Math.round(cw)}×${Math.round(ch)}`
    if (cw < slot.minW || ch < slot.minH) res.problems.push(`below minimum: crop ${res.crop} < ${slot.minW}×${slot.minH}`)
    else if (cw < slot.prefW || ch < slot.prefH) res.warnings.push(`below preferred ${slot.prefW}×${slot.prefH} (crop ${res.crop}), above the minimum`)
    const fk = kind(ratio)
    const sk = kind(slot.aspect)
    if ((fk === 'landscape' && sk === 'portrait') || (fk === 'portrait' && sk === 'landscape')) {
      const kept = (cw * ch) / (res.width * res.height)
      const msg = `orientation differs (${fk} file, ${sk} slot; the slot crop keeps ${Math.round(kept * 100)}% of the photo)`
      if (config.strictOrientation || kept < config.minKeptAreaWhenOrientationDiffers) res.problems.push('wrong ' + msg)
      else res.warnings.push(msg)
    }
    const row = sources[file]
    if (!row) res.problems.push('no SOURCES.csv row')
    else {
      const need = ['source_site', 'photo_page_url', 'author_name', 'author_profile_url', 'license_name', 'license_page_url', 'date_checked']
      const empty = need.filter((k) => !row[k])
      if (empty.length) res.problems.push(`incomplete SOURCES.csv row (empty: ${empty.join(', ')})`)
      else if (!/^https:\/\//.test(row.photo_page_url) || !/^https:\/\//.test(row.license_page_url) || !/^https:\/\//.test(row.author_profile_url))
        res.problems.push('SOURCES.csv URLs must start with https://')
      res.source = row
    }
    const needR2 = config.roundTwoOnly[base]
    if (needR2 && !(row && needR2.some((k) => row.photo_page_url.includes(k)))) res.problems.push('blocked slot: only the round 2 photo may be used here (readable text / duplicate in round 1)')
    res.ok = res.problems.length === 0
  }
  const have = new Set(files.filter((f) => f.ok).map((f) => f.slot))
  const missing = Object.values(slots).filter((s) => !have.has(s.base)).map((s) => s.id)
  const csvOrphans = Object.keys(sources).filter((f) => !names.includes(f))
  return { slots, files, missing, csvOrphans }
}
