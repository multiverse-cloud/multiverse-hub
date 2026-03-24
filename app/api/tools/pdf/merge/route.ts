import { NextRequest } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { parseFormData, err, fileResponse } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

const MERGE_UPLOAD_MAX_BYTES = 100 * 1024 * 1024
const DEFAULT_PAGE_SIZE: [number, number] = [595.28, 841.89]

type SourcePdf = {
  filename: string
  document: PDFDocument
  pageCount: number
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback
  return value === 'true'
}

function baseName(filename: string) {
  return filename.replace(/\.pdf$/i, '').trim() || 'merged'
}

function formatTitle(filename: string) {
  return baseName(filename).replace(/[_-]+/g, ' ')
}

async function buildSourcePdfs(
  buffers: Array<{ filename: string; buffer: Buffer }>,
  flattenForms: boolean
): Promise<SourcePdf[]> {
  const sources: SourcePdf[] = []

  for (const file of buffers) {
    const document = await PDFDocument.load(file.buffer, { ignoreEncryption: true })

    if (flattenForms) {
      try {
        const form = document.getForm()
        if (form.getFields().length > 0) {
          form.flatten({ updateFieldAppearances: false })
        }
      } catch {}
    }

    sources.push({
      filename: file.filename,
      document,
      pageCount: document.getPageCount(),
    })
  }

  return sources
}

async function addContentsPages(
  merged: PDFDocument,
  entries: Array<{ name: string; start: number; end: number; pages: number }>,
  pageSize: [number, number]
) {
  const [width, height] = pageSize
  const titleFont = await merged.embedFont(StandardFonts.HelveticaBold)
  const textFont = await merged.embedFont(StandardFonts.Helvetica)
  const rowsPerPage = 24
  const pageCount = Math.max(1, Math.ceil(entries.length / rowsPerPage))

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const page = merged.addPage(pageSize)
    const pageEntries = entries.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)

    page.drawText('Contents', {
      x: 48,
      y: height - 64,
      size: 24,
      font: titleFont,
      color: rgb(0.08, 0.1, 0.2),
    })

    page.drawText('Merged files and page ranges', {
      x: 48,
      y: height - 88,
      size: 11,
      font: textFont,
      color: rgb(0.42, 0.45, 0.52),
    })

    let cursorY = height - 132

    pageEntries.forEach((entry, entryIndex) => {
      const label = `${pageIndex * rowsPerPage + entryIndex + 1}. ${entry.name}`
      const range = entry.start === entry.end ? `Page ${entry.start}` : `Pages ${entry.start}-${entry.end}`
      const meta = `${entry.pages} page${entry.pages === 1 ? '' : 's'}`

      page.drawText(label.slice(0, 70), {
        x: 48,
        y: cursorY,
        size: 12,
        font: titleFont,
        color: rgb(0.08, 0.1, 0.2),
      })

      page.drawText(`${range}  -  ${meta}`, {
        x: 48,
        y: cursorY - 16,
        size: 10,
        font: textFont,
        color: rgb(0.42, 0.45, 0.52),
      })

      cursorY -= 30
    })

    page.drawText(`Contents ${pageIndex + 1}/${pageCount}`, {
      x: width - 120,
      y: 32,
      size: 9,
      font: textFont,
      color: rgb(0.52, 0.55, 0.62),
    })
  }

  return pageCount
}

export async function POST(req: NextRequest) {
  try {
    const { files, fields } = await parseFormData(req, { maxBytes: MERGE_UPLOAD_MAX_BYTES })
    const pdfs = files.filter(f => f.fieldname === 'files' || f.fieldname === 'file')

    if (pdfs.length < 2) return err('Upload at least 2 PDF files')

    const includeContents = parseBoolean(fields.includeContents, true)
    const flattenForms = parseBoolean(fields.flattenForms, false)

    const sources = await buildSourcePdfs(
      pdfs.map(file => ({ filename: file.filename, buffer: file.buffer })),
      flattenForms
    )
    const merged = await PDFDocument.create()
    const pageSize =
      sources[0]?.document.getPage(0)?.getSize()
        ? [sources[0].document.getPage(0).getSize().width, sources[0].document.getPage(0).getSize().height] as [
            number,
            number,
          ]
        : DEFAULT_PAGE_SIZE

    const contentsPageCount = includeContents
      ? Math.max(1, Math.ceil(sources.length / 24))
      : 0

    let nextPageNumber = contentsPageCount + 1
    const contentsEntries = sources.map(source => {
      const start = nextPageNumber
      const end = start + source.pageCount - 1
      nextPageNumber = end + 1

      return {
        name: formatTitle(source.filename),
        start,
        end,
        pages: source.pageCount,
      }
    })

    if (includeContents) {
      await addContentsPages(merged, contentsEntries, pageSize)
    }

    for (const source of sources) {
      const pages = await merged.copyPages(source.document, source.document.getPageIndices())
      pages.forEach(page => merged.addPage(page))
    }

    const totalPages = sources.reduce((sum, source) => sum + source.pageCount, 0) + contentsPageCount
    const primaryName = baseName(sources[0]?.filename || 'merged')

    merged.setTitle(`${formatTitle(sources[0]?.filename || 'Merged PDF')} Merge`)
    merged.setSubject(`Merged ${sources.length} PDF files`)
    merged.setCreator('Multiverse Tools')
    merged.setProducer('Multiverse Tools')
    merged.setCreationDate(new Date())
    merged.setModificationDate(new Date())

    const bytes = await merged.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    })

    const response = fileResponse(Buffer.from(bytes), `${primaryName}-merged.pdf`, 'application/pdf')
    response.headers.set('X-Merged-Files', String(sources.length))
    response.headers.set('X-Total-Pages', String(totalPages))
    response.headers.set('X-Contents-Pages', String(contentsPageCount))
    response.headers.set('X-Flattened-Forms', flattenForms ? 'true' : 'false')
    return response
  } catch (e) {
    return err(`PDF merge failed: ${(e as Error).message}`, 500)
  }
}
