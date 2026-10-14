// Usage: node scripts/validate-images.mjs   (read-only; the same checks run inside build-images.mjs)
// Checks every file in assets-source/ against docs/IMAGE_SLOTS.md and SOURCES.csv. Settings: scripts/images.config.json
// (excludeSlots, roundTwoOnly, strictOrientation, widths, quality, alts); see docs/IMAGES.md.
import { validate } from './images-lib.mjs'
if (process.argv.includes('--help')) {
  console.log('node scripts/validate-images.mjs: read-only check of assets-source/. Options in scripts/images.config.json (see docs/IMAGES.md).')
  process.exit(0)
}
const r = await validate()
for (const f of r.files) {
  if (f.excluded) {
    console.log(`SKIP ${f.file} (excludeSlots in scripts/images.config.json: the slot keeps its placeholder)`)
    continue
  }
  const tag = f.ok ? 'OK  ' : 'FAIL'
  console.log(`${tag} ${f.file}${f.width ? ` ${f.width}×${f.height}` : ''}`)
  for (const p of f.problems) console.log(`       problem: ${p}`)
  for (const w of f.warnings) console.log(`       warning: ${w}`)
}
console.log(`\n${r.files.filter((f) => f.ok).length} valid, ${r.files.filter((f) => f.excluded).length} excluded by config, ${r.files.filter((f) => !f.ok && !f.excluded).length} rejected, ${r.missing.length} slots without a valid file (placeholder kept)`)
if (r.csvOrphans.length) console.log('SOURCES.csv rows without a file:', r.csvOrphans.join(', '))
process.exitCode = r.files.some((f) => !f.ok && !f.excluded) ? 1 : 0
