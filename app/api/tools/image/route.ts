import { NextRequest } from 'next/server'
import JSZip from 'jszip'
import sharp from 'sharp'
import { err, fileResponse, parseFormData } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

type Bounds = {
  left: number
  top: number
  width: number
  height: number
}

async function blobToBuffer(blob: Blob): Promise<Buffer> {
  return Buffer.from(await blob.arrayBuffer())
}

async function removeBackgroundWithApi(imageBuffer: Buffer, mimeType: string): Promise<Buffer> {
  const apiKey = process.env.REMOVEBG_API_KEY

  if (!apiKey) {
    throw new Error('Background removal is unavailable in the hosted demo right now.')
  }

  const formData = new FormData()
  formData.append('size', 'auto')
  formData.append('image_file', new Blob([Uint8Array.from(imageBuffer)], { type: mimeType }), 'upload.png')

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
    },
    body: formData,
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    throw new Error(details || 'Background removal failed.')
  }

  return Buffer.from(await response.arrayBuffer())
}

async function removeBackgroundWithLocalModel(imageBuffer: Buffer, mimeType: string): Promise<Buffer> {
  const loadModule = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<{
    removeBackground: (
      input: Blob,
      options: {
        model: string
        output: {
          format: string
          quality: number
        }
      }
    ) => Promise<Blob>
  }>
  const { removeBackground } = await loadModule('@imgly/background-removal-node')
  const result = await removeBackground(new Blob([Uint8Array.from(imageBuffer)], { type: mimeType }), {
    model: 'small',
    output: {
      format: 'image/png',
      quality: 1,
    },
  })

  return blobToBuffer(result)
}

async function removeBackgroundBuffer(imageBuffer: Buffer, mimeType = 'image/png'): Promise<Buffer> {
  if (process.env.REMOVEBG_API_KEY) {
    return removeBackgroundWithApi(imageBuffer, mimeType)
  }

  if (process.env.VERCEL) {
    throw new Error('Background removal is unavailable in the hosted demo right now. Add REMOVEBG_API_KEY to enable it.')
  }

  return removeBackgroundWithLocalModel(imageBuffer, mimeType)
}

async function getOpaqueBounds(imageBuffer: Buffer): Promise<Bounds | null> {
  const { data, info } = await sharp(imageBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const alphaIndex = info.channels - 1
  let minX = info.width
  let minY = info.height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const alpha = data[(y * info.width + x) * info.channels + alphaIndex]
      if (alpha < 12) continue

      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }

  if (maxX < minX || maxY < minY) return null

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  }
}

async function createPassportPhoto(foregroundBuffer: Buffer): Promise<Buffer> {
  const bounds = await getOpaqueBounds(foregroundBuffer)
  const subject = bounds ? sharp(foregroundBuffer).extract(bounds) : sharp(foregroundBuffer)
  const canvasWidth = 1050
  const canvasHeight = 1350

  const fitted = await subject
    .resize(Math.round(canvasWidth * 0.74), Math.round(canvasHeight * 0.82), {
      fit: 'inside',
      withoutEnlargement: false,
    })
    .png()
    .toBuffer()

  const fittedMeta = await sharp(fitted).metadata()
  const left = Math.max(0, Math.round((canvasWidth - (fittedMeta.width || 0)) / 2))
  const top = Math.max(24, Math.round(canvasHeight * 0.08))

  return sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: '#ffffff',
    },
  })
    .composite([{ input: fitted, left, top }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer()
}

function createIco(pngImages: Array<{ size: number; data: Buffer }>): Buffer {
  const count = pngImages.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const entries: Buffer[] = []
  const payloads: Buffer[] = []
  let offset = 6 + count * 16

  for (const image of pngImages) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 0)
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(image.data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += image.data.length
    entries.push(entry)
    payloads.push(image.data)
  }

  return Buffer.concat([header, ...entries, ...payloads])
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'compress'

  try {
    const { files, fields } = await parseFormData(req)
    const imgFile = files.find(file => file.fieldname === 'file')
    if (!imgFile) return err('No image file uploaded')

    let pipeline = sharp(imgFile.buffer)
    const meta = await pipeline.metadata()

    if (action === 'compress') {
      const quality = parseInt(fields.quality || '80')
      const format = (fields.format || meta.format || 'jpeg') as 'jpeg' | 'png' | 'webp'

      if (format === 'jpeg') pipeline = pipeline.jpeg({ quality, mozjpeg: true })
      else if (format === 'png') pipeline = pipeline.png({ quality, compressionLevel: 9 })
      else if (format === 'webp') pipeline = pipeline.webp({ quality })

      const buf = await pipeline.toBuffer()
      const mime = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp'
      const ext = format === 'jpeg' ? 'jpg' : format
      const res = fileResponse(buf, `compressed.${ext}`, mime)
      res.headers.set('X-Original-Size', imgFile.buffer.length.toString())
      res.headers.set('X-Output-Size', buf.length.toString())
      res.headers.set('X-Savings', Math.round((1 - buf.length / imgFile.buffer.length) * 100).toString())
      return res
    }

    if (action === 'resize') {
      const width = fields.width ? parseInt(fields.width) : undefined
      const height = fields.height ? parseInt(fields.height) : undefined
      const fit = (fields.fit || 'inside') as sharp.FitEnum[keyof sharp.FitEnum]
      const outputFormat = (meta.format || 'png') as keyof sharp.FormatEnum

      pipeline = pipeline.resize({ width, height, fit, withoutEnlargement: true })
      const buf = await pipeline.toFormat(outputFormat).toBuffer()
      const ext = meta.format || 'png'
      return fileResponse(buf, `resized.${ext}`, `image/${ext}`)
    }

    if (action === 'convert') {
      const to = (fields.to || 'webp') as 'jpeg' | 'png' | 'webp' | 'avif' | 'gif' | 'tiff'
      const quality = parseInt(fields.quality || '85')

      if (to === 'jpeg') pipeline = pipeline.jpeg({ quality })
      else if (to === 'png') pipeline = pipeline.png({ compressionLevel: 8 })
      else if (to === 'webp') pipeline = pipeline.webp({ quality })
      else if (to === 'avif') pipeline = pipeline.avif({ quality })
      else if (to === 'tiff') pipeline = pipeline.tiff({ quality })
      else if (to === 'gif') pipeline = pipeline.gif()

      const buf = await pipeline.toBuffer()
      const ext = to === 'jpeg' ? 'jpg' : to
      const mime = `image/${to === 'jpeg' ? 'jpeg' : to}`
      return fileResponse(buf, `converted.${ext}`, mime)
    }

    if (action === 'rotate') {
      const angle = parseInt(fields.angle || '90')
      const flipH = fields.flipH === 'true'
      const flipV = fields.flipV === 'true'

      if (flipH) pipeline = pipeline.flop()
      if (flipV) pipeline = pipeline.flip()
      if (angle) pipeline = pipeline.rotate(angle)

      const buf = await pipeline.toBuffer()
      return fileResponse(buf, `rotated.${meta.format || 'jpg'}`, `image/${meta.format || 'jpeg'}`)
    }

    if (action === 'crop') {
      const left = parseInt(fields.left || '0')
      const top = parseInt(fields.top || '0')
      const width = parseInt(fields.width || String(meta.width || 100))
      const height = parseInt(fields.height || String(meta.height || 100))

      pipeline = pipeline.extract({ left, top, width, height })
      const buf = await pipeline.toBuffer()
      return fileResponse(buf, `cropped.${meta.format || 'jpg'}`, `image/${meta.format || 'jpeg'}`)
    }

    if (action === 'remove-bg') {
      const buf = await removeBackgroundBuffer(imgFile.buffer, imgFile.mimetype || 'image/png')
      return fileResponse(buf, 'no-bg.png', 'image/png')
    }

    if (action === 'blur-background') {
      const blur = Math.min(48, Math.max(8, parseInt(fields.blur || '22')))
      const tint = fields.tint?.trim()
      const foreground = await removeBackgroundBuffer(imgFile.buffer, imgFile.mimetype || 'image/png')
      let backgroundPipeline = sharp(imgFile.buffer)
        .blur(blur)
        .modulate({ brightness: 0.98, saturation: 1.04 })
      if (tint) {
        backgroundPipeline = backgroundPipeline.tint(tint)
      }
      const blurredBackground = await backgroundPipeline.jpeg({ quality: 92, mozjpeg: true }).toBuffer()
      const buf = await sharp(blurredBackground)
        .composite([{ input: foreground, left: 0, top: 0 }])
        .jpeg({ quality: 92, mozjpeg: true })
        .toBuffer()
      return fileResponse(buf, 'blurred-background.jpg', 'image/jpeg')
    }

    if (action === 'passport-photo') {
      const foreground = await removeBackgroundBuffer(imgFile.buffer, imgFile.mimetype || 'image/png')
      const buf = await createPassportPhoto(foreground)
      return fileResponse(buf, 'passport-photo.jpg', 'image/jpeg')
    }

    if (action === 'upscale') {
      const factor = [2, 4].includes(parseInt(fields.factor || '2')) ? parseInt(fields.factor || '2') : 2
      const outputFormat = (meta.format || 'png') as keyof sharp.FormatEnum
      const targetWidth = Math.max(1, Math.round((meta.width || 1) * factor))
      const targetHeight = Math.max(1, Math.round((meta.height || 1) * factor))

      const buf = await sharp(imgFile.buffer)
        .resize(targetWidth, targetHeight, {
          fit: 'fill',
          kernel: sharp.kernel.lanczos3,
          withoutEnlargement: false,
        })
        .sharpen({ sigma: 1.4, m1: 0.8, m2: 1.5, x1: 2, y2: 10, y3: 20 })
        .toFormat(outputFormat)
        .toBuffer()

      const ext = meta.format || 'png'
      const res = fileResponse(buf, `upscaled-${factor}x.${ext}`, `image/${ext}`)
      res.headers.set('X-Upscale-Factor', String(factor))
      return res
    }

    if (action === 'watermark') {
      const text = fields.text || 'Multiverse'
      const opacity = parseFloat(fields.opacity || '0.4')
      const fontSize = parseInt(fields.fontSize || '48')

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}">
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
          font-family="Arial" font-size="${fontSize}" font-weight="bold"
          fill="white" opacity="${opacity}"
          transform="rotate(-45, ${(meta.width || 400) / 2}, ${(meta.height || 300) / 2})">${text}</text>
      </svg>`
      const svgBuf = Buffer.from(svg)

      const buf = await pipeline.composite([{ input: svgBuf, blend: 'over' }]).toBuffer()
      return fileResponse(buf, `watermarked.${meta.format || 'jpg'}`, `image/${meta.format || 'jpeg'}`)
    }

    if (action === 'metadata') {
      return Response.json({
        width: meta.width,
        height: meta.height,
        format: meta.format,
        channels: meta.channels,
        depth: meta.depth,
        density: meta.density,
        hasAlpha: meta.hasAlpha,
        fileSize: imgFile.buffer.length,
        fileSizeKB: Math.round(imgFile.buffer.length / 1024),
        megapixels: meta.width && meta.height ? ((meta.width * meta.height) / 1_000_000).toFixed(2) : null,
        orientation: meta.orientation,
        exif: meta.exif ? 'present' : 'none',
      })
    }

    if (action === 'thumbnail') {
      const size = parseInt(fields.size || '200')
      const buf = await sharp(imgFile.buffer)
        .resize(size, size, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer()
      return fileResponse(buf, 'thumbnail.jpg', 'image/jpeg')
    }

    if (action === 'favicon') {
      const base = sharp(imgFile.buffer)
      const iconSizes = [16, 32, 48, 64]
      const allPngSizes = [16, 32, 48, 64, 180, 192, 512]
      const zip = new JSZip()
      const pngs = await Promise.all(
        allPngSizes.map(async size => ({
          size,
          data: await base
            .clone()
            .resize(size, size, { fit: 'cover' })
            .png()
            .toBuffer(),
        }))
      )

      for (const png of pngs) {
        if (png.size === 180) zip.file('apple-touch-icon.png', png.data)
        else if (png.size === 192) zip.file('android-chrome-192x192.png', png.data)
        else if (png.size === 512) zip.file('android-chrome-512x512.png', png.data)
        else zip.file(`favicon-${png.size}x${png.size}.png`, png.data)
      }

      const ico = createIco(pngs.filter(png => iconSizes.includes(png.size)))
      zip.file('favicon.ico', ico)
      zip.file(
        'site.webmanifest',
        JSON.stringify(
          {
            name: fields.name || 'Multiverse App',
            short_name: fields.shortName || 'Multiverse',
            icons: [
              { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
              { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            ],
            theme_color: fields.themeColor || '#111827',
            background_color: fields.backgroundColor || '#ffffff',
            display: 'standalone',
          },
          null,
          2
        )
      )

      const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
      return fileResponse(buf, 'favicon-pack.zip', 'application/zip')
    }

    return err(`Unknown action: ${action}`)
  } catch (error) {
    return err(`Image processing failed: ${(error as Error).message}`, 500)
  }
}
