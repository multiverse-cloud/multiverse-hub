import sharp from 'sharp'
import mammoth from 'mammoth'
import { PDFDocument, StandardFonts, type PDFFont } from 'pdf-lib'
import zlib from 'zlib'

type UploadedBinary = {
  buffer: Buffer
  filename: string
  mimetype: string
}

type PdfPageSize = 'a4' | 'letter' | 'fit'
type PdfOrientation = 'auto' | 'portrait' | 'landscape'
type PdfMarginPreset = 'none' | 'small' | 'medium' | 'large'

function decodePdfEscapedText(input: string): string {
  let output = ''

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (char !== '\\') {
      output += char
      continue
    }

    const next = input[++i]
    if (!next) break

    if (/[0-7]/.test(next)) {
      const octal = (next + (input[i + 1] || '') + (input[i + 2] || '')).match(/^[0-7]{1,3}/)?.[0] || next
      output += String.fromCharCode(parseInt(octal, 8))
      i += octal.length - 1
      continue
    }

    const escaped: Record<string, string> = {
      n: '\n',
      r: '\r',
      t: '\t',
      b: '\b',
      f: '\f',
      '(': '(',
      ')': ')',
      '\\': '\\',
    }

    output += escaped[next] ?? next
  }

  return output
}

function decodeHexPdfString(hex: string): string {
  const clean = hex.replace(/\s+/g, '')
  const padded = clean.length % 2 === 0 ? clean : `${clean}0`
  const buffer = Buffer.from(padded, 'hex')

  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    let output = ''
    for (let i = 2; i < buffer.length; i += 2) {
      output += String.fromCharCode(buffer.readUInt16BE(i))
    }
    return output
  }

  return buffer.toString('latin1')
}

function normalizeExtractedText(text: string): string {
  return text
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[^\S\n]{2,}/g, ' ')
    .trim()
}

function extractTextFromContent(content: string): string[] {
  const chunks: string[] = []

  const directMatches = content.matchAll(/\(((?:\\.|[^\\()])*)\)\s*Tj/g)
  for (const match of directMatches) {
    chunks.push(decodePdfEscapedText(match[1]))
  }

  const arrayMatches = content.matchAll(/\[([\s\S]*?)\]\s*TJ/g)
  for (const match of arrayMatches) {
    const items = match[1].match(/\((?:\\.|[^\\()])*\)|<[0-9A-Fa-f\s]+>/g) || []
    const line = items
      .map(item =>
        item.startsWith('(')
          ? decodePdfEscapedText(item.slice(1, -1))
          : decodeHexPdfString(item.slice(1, -1))
      )
      .join('')
    if (line.trim()) chunks.push(line)
  }

  const hexMatches = content.matchAll(/<([0-9A-Fa-f\s]+)>\s*Tj/g)
  for (const match of hexMatches) {
    chunks.push(decodeHexPdfString(match[1]))
  }

  return chunks
}

export function extractPdfText(buffer: Buffer): string {
  const raw = buffer.toString('latin1')
  const streamRegex = /<<(?:[\s\S]*?)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/g
  const collected = new Set<string>()

  for (const match of raw.matchAll(streamRegex)) {
    const streamWrapper = match[0]
    const rawStream = match[1]
    let decoded = rawStream

    if (/\/FlateDecode\b/.test(streamWrapper)) {
      try {
        decoded = zlib.inflateSync(Buffer.from(rawStream, 'latin1')).toString('latin1')
      } catch {
        decoded = rawStream
      }
    }

    const lines = extractTextFromContent(decoded)
    if (lines.length > 0) {
      collected.add(lines.join('\n'))
    }
  }

  if (collected.size === 0) {
    for (const line of extractTextFromContent(raw)) {
      if (line.trim()) collected.add(line)
    }
  }

  return normalizeExtractedText(Array.from(collected).join('\n\n'))
}

export type WordExportMode = 'layout' | 'text' | 'editable'

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      current = candidate
      continue
    }

    if (current) lines.push(current)
    current = word
  }

  if (current) lines.push(current)
  return lines
}

async function createPdfFromText(text: string, title?: string): Promise<Buffer> {
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const pageWidth = 595.28
  const pageHeight = 841.89
  const margin = 50
  const fontSize = 12
  const lineHeight = 18
  const usableWidth = pageWidth - margin * 2

  let page = pdf.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  if (title) {
    page.drawText(title, { x: margin, y, size: 18, font })
    y -= 30
  }

  const paragraphs = text.split(/\n{2,}/).map(section => section.trim()).filter(Boolean)
  for (const paragraph of paragraphs) {
    const lines = wrapText(paragraph, font, fontSize, usableWidth)
    for (const line of lines) {
      if (y < margin + lineHeight) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }

      page.drawText(line, { x: margin, y, size: fontSize, font })
      y -= lineHeight
    }

    y -= lineHeight * 0.5
  }

  const bytes = await pdf.save()
  return Buffer.from(bytes)
}

function escapeRtf(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\u2022/g, "\\'95")
    .replace(/\n/g, '\\par\n')
}

function normalizeForWordMode(text: string, mode: WordExportMode) {
  const fallback = text || 'No readable text could be extracted from this PDF.'

  if (mode === 'text') {
    return fallback
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[^\S\n]{2,}/g, ' ')
      .trim()
  }

  if (mode === 'editable') {
    return fallback
      .replace(/\n{2,}/g, '\n\n')
      .replace(/[ \t]+\n/g, '\n')
      .trim()
  }

  return fallback.trim()
}

export function textToWordDocument(
  text: string,
  options: {
    title?: string
    mode?: WordExportMode
  } = {}
): Buffer {
  const mode = options.mode || 'layout'
  const normalized = normalizeForWordMode(text, mode)
  const title = options.title?.trim()
  const paragraphs = normalized.split(/\n{2,}/).map(part => part.trim()).filter(Boolean)
  const spacing = mode === 'layout' ? 220 : mode === 'editable' ? 180 : 120
  const body = paragraphs.length > 0
    ? paragraphs.map(paragraph => `{\\pard\\sa${spacing}\\sl276\\slmult1 ${escapeRtf(paragraph)}}`).join('\\par\n')
    : `{\\pard\\sa${spacing}\\sl276\\slmult1 ${escapeRtf(normalized)}}`
  const heading = title
    ? `{\\pard\\sa280\\fs34\\b ${escapeRtf(title)}\\b0\\par\\par}\n`
    : ''

  return Buffer.from(
    `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}{\\f1 Calibri;}}\\paperw12240\\paperh15840\\margl1080\\margr1080\\margt1080\\margb1080\\f1\\fs24 ${heading}${body}}`,
    'utf8'
  )
}

function getPdfPageDimensions(pageSize: PdfPageSize, orientation: Exclude<PdfOrientation, 'auto'>) {
  const portrait =
    pageSize === 'letter'
      ? { width: 612, height: 792 }
      : { width: 595.28, height: 841.89 }

  if (orientation === 'landscape') {
    return { width: portrait.height, height: portrait.width }
  }

  return portrait
}

function getMarginSize(margin: PdfMarginPreset) {
  if (margin === 'none') return 0
  if (margin === 'small') return 18
  if (margin === 'large') return 42
  return 28
}

export async function imagesToPdf(
  files: UploadedBinary[],
  options: {
    pageSize?: PdfPageSize
    orientation?: PdfOrientation
    margin?: PdfMarginPreset
  } = {}
): Promise<Buffer> {
  const pdf = await PDFDocument.create()
  const pageSize = options.pageSize || 'a4'
  const orientation = options.orientation || 'auto'
  const margin = getMarginSize(options.margin || 'medium')

  for (const file of files) {
    const isJpeg = file.mimetype.includes('jpeg') || file.mimetype.includes('jpg')
    const canUseOriginalPng = file.mimetype.includes('png')
    const imageBuffer =
      canUseOriginalPng || isJpeg ? file.buffer : await sharp(file.buffer).png().toBuffer()

    const image =
      canUseOriginalPng || !isJpeg
        ? await pdf.embedPng(imageBuffer)
        : await pdf.embedJpg(imageBuffer)

    const effectiveOrientation =
      pageSize === 'fit' && orientation === 'auto'
        ? image.width >= image.height
          ? 'landscape'
          : 'portrait'
        : orientation === 'auto'
          ? 'portrait'
          : orientation

    const dimensions =
      pageSize === 'fit'
        ? {
            width: effectiveOrientation === 'landscape' ? 842 : 595,
            height: effectiveOrientation === 'landscape' ? 595 : 842,
          }
        : getPdfPageDimensions(pageSize, effectiveOrientation)

    const page = pdf.addPage([dimensions.width, dimensions.height])
    const pageWidth = page.getWidth()
    const pageHeight = page.getHeight()
    const scale = Math.min(
      (pageWidth - margin * 2) / image.width,
      (pageHeight - margin * 2) / image.height
    )
    const width = image.width * scale
    const height = image.height * scale

    page.drawImage(image, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    })
  }

  const bytes = await pdf.save()
  return Buffer.from(bytes)
}

export async function wordDocumentToPdf(file: UploadedBinary): Promise<Buffer> {
  const ext = file.filename.toLowerCase().split('.').pop()
  if (ext !== 'docx') {
    throw new Error('Only .docx files are supported in the built-in converter')
  }

  const result = await mammoth.extractRawText({ buffer: file.buffer })
  return createPdfFromText(result.value || 'No readable text found in the document.', file.filename)
}
