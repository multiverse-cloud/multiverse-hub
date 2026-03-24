import { NextRequest } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import { parseFormData, err, fileResponse } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

const SPLIT_UPLOAD_MAX_BYTES = 100 * 1024 * 1024

type SplitMode = 'range' | 'pages' | 'all'

type RangePart = {
  start: number
  end: number
  pages: number[]
}

function normalizeFilename(name: string) {
  return name.replace(/[^a-z0-9-_]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function baseName(filename: string) {
  return filename.replace(/\.pdf$/i, '').trim() || 'split'
}

function dedupe(values: number[]) {
  return Array.from(new Set(values))
}

function parseRangeInput(input: string, totalPages: number): RangePart[] {
  const parts = input
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  const ranges: RangePart[] = []

  for (const part of parts) {
    const [startText, endText] = part.split('-').map(value => value.trim())
    const start = Number.parseInt(startText, 10)
    const rawEnd = endText ? Number.parseInt(endText, 10) : start

    if (!Number.isFinite(start) || !Number.isFinite(rawEnd)) continue

    const from = Math.max(1, Math.min(start, rawEnd))
    const to = Math.min(totalPages, Math.max(start, rawEnd))

    if (from > totalPages || to < 1) continue

    ranges.push({
      start: from,
      end: to,
      pages: Array.from({ length: to - from + 1 }, (_, index) => from - 1 + index),
    })
  }

  return ranges
}

function buildPageSegments(totalPages: number, selectedPages?: number[]) {
  const pages = selectedPages?.length
    ? dedupe(selectedPages).filter(page => page >= 0 && page < totalPages)
    : Array.from({ length: totalPages }, (_, index) => index)

  return pages.map(pageIndex => ({
    label: `page-${pageIndex + 1}`,
    pageIndices: [pageIndex],
  }))
}

function buildRangeSegments(ranges: RangePart[]) {
  return ranges.map(range => ({
    label: range.start === range.end ? `page-${range.start}` : `pages-${range.start}-${range.end}`,
    pageIndices: range.pages,
  }))
}

export async function POST(req: NextRequest) {
  try {
    const { files, fields } = await parseFormData(req, { maxBytes: SPLIT_UPLOAD_MAX_BYTES })
    const pdf = files.find(f => f.fieldname === 'file')
    if (!pdf) return err('No PDF file uploaded')

    const source = await PDFDocument.load(pdf.buffer, { ignoreEncryption: true })
    const totalPages = source.getPageCount()
    const mode: SplitMode =
      fields.mode === 'pages' || fields.mode === 'all' || fields.mode === 'range'
        ? fields.mode
        : 'range'
    const rangeInput = (fields.range || '').trim()
    const ranges = parseRangeInput(rangeInput, totalPages)

    const segments =
      mode === 'range'
        ? buildRangeSegments(ranges)
        : mode === 'pages'
          ? buildPageSegments(totalPages, ranges.flatMap(range => range.pages))
          : buildPageSegments(totalPages)

    if (segments.length === 0) {
      return err(mode === 'range' ? 'Enter at least one valid page range' : 'No valid pages selected')
    }

    const zip = new JSZip()
    const rootName = normalizeFilename(baseName(pdf.filename))

    for (const [index, segment] of segments.entries()) {
      const single = await PDFDocument.create()
      const pages = await single.copyPages(source, segment.pageIndices)
      pages.forEach(page => single.addPage(page))
      single.setCreator('Multiverse Tools')
      single.setProducer('Multiverse Tools')
      single.setTitle(`${baseName(pdf.filename)} ${segment.label}`)

      const bytes = await single.save({
        useObjectStreams: true,
        addDefaultPage: false,
        updateFieldAppearances: false,
      })

      zip.file(`${rootName}-${String(index + 1).padStart(2, '0')}-${segment.label}.pdf`, bytes)
    }

    const zipBuf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
    const response = fileResponse(zipBuf, `${rootName}-split.zip`, 'application/zip')
    response.headers.set('X-Split-Mode', mode)
    response.headers.set('X-Split-Assets', String(segments.length))
    response.headers.set(
      'X-Split-Selected-Pages',
      String(dedupe(segments.flatMap(segment => segment.pageIndices)).length)
    )
    return response
  } catch (e) {
    return err(`PDF split failed: ${(e as Error).message}`, 500)
  }
}
