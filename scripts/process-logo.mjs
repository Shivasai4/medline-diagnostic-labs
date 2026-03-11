import sharp from "sharp"

const [input, output] = process.argv.slice(2)

if (!input || !output) {
  console.error('Usage: node scripts/process-logo.mjs "<input>" "<output>"')
  process.exit(1)
}

const BLACK_CUTOFF = 8
const FADE_TO = 24

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const a = data[i + 3]

  const m = Math.max(r, g, b)

  if (m <= BLACK_CUTOFF) {
    data[i + 3] = 0
    continue
  }

  if (m < FADE_TO) {
    const t = (m - BLACK_CUTOFF) / (FADE_TO - BLACK_CUTOFF)
    data[i + 3] = Math.round(a * t)
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(output)

console.log(`Wrote: ${output}`)
