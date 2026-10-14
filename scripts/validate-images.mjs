// Usage: node scripts/validate-images.mjs   (read-only; also run by build-images.mjs)
import { validate } from './images-lib.mjs'
const r = await validate()
for (const f of r.files) {
  const tag = f.ok ? 'OK  ' : 'FAIL'
  console.log(`${tag} ${f.file}${f.width ? ` ${f.width}×${f.height}` : ''}`)
  for (const p of f.problems) console.log(`       problem: ${p}`)
  for (const w of f.warnings) console.log(`       warning: ${w}`)
}
console.log(`\n${r.files.filter((f) => f.ok).length} valid, ${r.files.filter((f) => !f.ok).length} rejected, ${r.missing.length} slots without a valid file (placeholder kept)`)
if (r.csvOrphans.length) console.log('SOURCES.csv rows without a file:', r.csvOrphans.join(', '))
process.exitCode = r.files.some((f) => !f.ok) ? 1 : 0
