function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map(value => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const image = new window.Image()
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('Unable to read image'))
      image.src = String(reader.result || '')
    }
    reader.onerror = () => reject(new Error('Unable to read image'))
    reader.readAsDataURL(file)
  })
}

export async function analyzeImagePalette(file: File, maxColors = 6) {
  const image = await loadImage(file)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser')

  const scale = Math.min(1, 180 / Math.max(image.width, image.height))
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>()
  let totalR = 0
  let totalG = 0
  let totalB = 0
  let visiblePixels = 0

  for (let index = 0; index < pixels.length; index += 16) {
    const alpha = pixels[index + 3]
    if (alpha < 128) continue

    const r = pixels[index]
    const g = pixels[index + 1]
    const b = pixels[index + 2]
    const key = `${Math.round(r / 24) * 24}-${Math.round(g / 24) * 24}-${Math.round(b / 24) * 24}`
    const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 }
    bucket.count += 1
    bucket.r += r
    bucket.g += g
    bucket.b += b
    buckets.set(key, bucket)

    totalR += r
    totalG += g
    totalB += b
    visiblePixels += 1
  }

  const colors = Array.from(buckets.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, maxColors)
    .map(bucket => rgbToHex(bucket.r / bucket.count, bucket.g / bucket.count, bucket.b / bucket.count))

  return {
    colors,
    average: visiblePixels > 0 ? rgbToHex(totalR / visiblePixels, totalG / visiblePixels, totalB / visiblePixels) : '#000000',
  }
}

export function generatePaletteFromSeed(seed: string, count = 5) {
  return Array.from({ length: count }, (_, index) => {
    const value = `${seed || 'multiverse'}-${index}`
    const hash = Array.from(value).reduce((sum, character) => sum + character.charCodeAt(0) * (index + 3), 0)
    const hue = hash % 360
    const saturation = 62 + (hash % 18)
    const lightness = 42 + (hash % 16)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  })
}

export function buildPaletteReport(colors: string[], average?: string) {
  const cssVariables = colors.map((color, index) => `--palette-${index + 1}: ${color};`).join('\n')
  const gradient = `linear-gradient(135deg, ${colors.join(', ')})`

  return [
    average ? `Average color: ${average}` : '',
    'Palette',
    ...colors.map((color, index) => `${index + 1}. ${color}`),
    '',
    'CSS Variables',
    cssVariables,
    '',
    'Gradient',
    `background: ${gradient};`,
  ]
    .filter(Boolean)
    .join('\n')
}
