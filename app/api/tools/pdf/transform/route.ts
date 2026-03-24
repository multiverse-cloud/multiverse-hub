import { NextRequest } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'
import JSZip from 'jszip'
import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib'
import {
  TMP_DIR,
  cleanupFiles,
  cleanupFilesByPrefix,
  err,
  filePathResponse,
  fileResponse,
  parseFormData,
  randomId,
  tmpPath,
} from '@/lib/server-utils'
import {
  extractPdfText,
  imagesToPdf,
  type WordExportMode,
  textToWordDocument,
  wordDocumentToPdf,
} from '@/lib/pdf-utils'
import { buildXlsxWorkbook, extractSpreadsheetSheetsFromText } from '@/lib/spreadsheet-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

const QPDF_PATH = process.env.QPDF_PATH || 'qpdf'
const PDFTOPPM_PATH = process.env.PDFTOPPM_PATH || 'pdftoppm'

function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''

    proc.stderr.on('data', chunk => {
      stderr += chunk.toString()
    })

    proc.on('error', error => {
      reject(error)
    })

    proc.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(stderr.trim() || `${command} exited with code ${code}`))
    })
  })
}

function binaryHint(error: unknown, missingMessage: string): string {
  const message = error instanceof Error ? error.message : String(error)
  const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: unknown }).code) : ''
  return /ENOENT/i.test(message) || code === 'ENOENT' ? missingMessage : message
}

function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/u, '').trim() || 'converted'
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'rotate'
  const id = randomId()

  try {
    const { files, fields } = await parseFormData(req)
    const primaryFile = files.find(f => f.fieldname === 'file') || files[0]

    if (action === 'images-to-pdf') {
      const imageFiles = files.filter(f => f.fieldname === 'files' || f.fieldname === 'file')
      if (imageFiles.length === 0) return err('No image files uploaded')
      const bytes = await imagesToPdf(imageFiles, {
        pageSize:
          fields.pageSize === 'letter' || fields.pageSize === 'fit' || fields.pageSize === 'a4'
            ? fields.pageSize
            : 'a4',
        orientation:
          fields.orientation === 'portrait' || fields.orientation === 'landscape' || fields.orientation === 'auto'
            ? fields.orientation
            : 'auto',
        margin:
          fields.margin === 'none' || fields.margin === 'small' || fields.margin === 'medium' || fields.margin === 'large'
            ? fields.margin
            : 'medium',
      })
      return fileResponse(bytes, 'images-to-pdf.pdf', 'application/pdf')
    }

    if (action === 'word-to-pdf') {
      if (!primaryFile) return err('No Word document uploaded')
      try {
        const bytes = await wordDocumentToPdf(primaryFile)
        return fileResponse(bytes, 'converted.pdf', 'application/pdf')
      } catch (error) {
        return err(error instanceof Error ? error.message : 'Word to PDF failed', 422)
      }
    }

    if (action === 'pdf-to-text') {
      if (!primaryFile) return err('No PDF file uploaded')

      const text = extractPdfText(primaryFile.buffer)
      if (!text) {
        return err('This PDF does not contain extractable text with the built-in parser', 422)
      }

      return Response.json({
        text,
        words: text.split(/\s+/).filter(Boolean).length,
        characters: text.length,
      })
    }

    if (action === 'pdf-to-word') {
      const mode: WordExportMode =
        fields.mode === 'text' || fields.mode === 'editable' || fields.mode === 'layout'
          ? fields.mode
          : 'layout'
      const useOcrFallback = fields.ocr === 'true'
      const providedOcrText = fields.ocrText?.trim()
      const extractedText = primaryFile ? extractPdfText(primaryFile.buffer) : ''
      const text = providedOcrText || extractedText

      if (!text) {
        return err(
          useOcrFallback
            ? 'Scanned PDF OCR is not available in the built-in converter yet. Try a text PDF or use OCR tools first.'
            : 'This PDF does not contain extractable text with the built-in parser',
          422
        )
      }

      let pageCount = Number.parseInt(fields.pageCount || '', 10)
      if (!Number.isFinite(pageCount) || pageCount < 0) pageCount = 0

      if (!pageCount && primaryFile) {
        try {
          const infoDoc = await PDFDocument.load(primaryFile.buffer, { ignoreEncryption: true })
          pageCount = infoDoc.getPageCount()
        } catch {}
      }

      const words = text.split(/\s+/).filter(Boolean).length
      const documentTitle = fields.title?.trim() || (primaryFile ? baseName(primaryFile.filename) : 'converted')
      const filename = `${documentTitle}.doc`
      const response = fileResponse(
        textToWordDocument(text, {
          title: documentTitle,
          mode,
        }),
        filename,
        'application/msword'
      )
      response.headers.set('X-Source-Pages', String(pageCount))
      response.headers.set('X-Word-Count', String(words))
      response.headers.set('X-Conversion-Mode', mode)
      response.headers.set('X-OCR-Requested', useOcrFallback ? 'true' : 'false')
      response.headers.set('X-Extraction-Source', providedOcrText ? 'ocr' : 'text-layer')
      return response
    }

    if (action === 'pdf-to-excel') {
      const mode =
        fields.mode === 'strict' || fields.mode === 'spreadsheet' || fields.mode === 'auto'
          ? fields.mode
          : 'auto'
      const providedOcrText = fields.ocrText?.trim()
      const text = providedOcrText || (primaryFile ? extractPdfText(primaryFile.buffer) : '')

      if (!text) {
        return err('No readable text or table data was found in this PDF', 422)
      }

      const sheets = extractSpreadsheetSheetsFromText(text, {
        mode,
        headerRow: fields.headerRow !== 'false',
      })

      if (fields.preview === 'true') {
        const preview = sheets.map(sheet => ({
          name: sheet.name,
          columns: Math.max(...sheet.rows.map(row => row.length), 0),
          rows: Math.max(sheet.rows.length - 1, 0),
          sample: sheet.rows.slice(0, 6),
        }))

        return Response.json({
          sheets: preview,
          detectedTables: preview.length,
          extractionSource: providedOcrText ? 'ocr' : 'text-layer',
        })
      }

      const workbook = await buildXlsxWorkbook(sheets)
      const title = fields.title?.trim() || (primaryFile ? baseName(primaryFile.filename) : 'pdf-tables')
      const totalRows = sheets.reduce((sum, sheet) => sum + sheet.rows.length, 0)
      const totalColumns = sheets.reduce(
        (sum, sheet) => sum + Math.max(...sheet.rows.map(row => row.length), 0),
        0
      )

      const response = fileResponse(
        workbook,
        `${title}.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      response.headers.set('X-Sheet-Count', String(sheets.length))
      response.headers.set('X-Total-Rows', String(totalRows))
      response.headers.set('X-Total-Columns', String(totalColumns))
      response.headers.set('X-Extraction-Source', providedOcrText ? 'ocr' : 'text-layer')
      return response
    }

    if (!primaryFile) return err('No PDF file uploaded')

    if (action === 'pdf-to-jpg') {
      const inputPath = tmpPath(`${id}-input.pdf`)
      const outPrefix = tmpPath(`${id}-page`)
      fs.writeFileSync(inputPath, primaryFile.buffer)

      try {
        await runCommand(PDFTOPPM_PATH, ['-jpeg', inputPath, outPrefix])
      } catch (error) {
        cleanupFiles(inputPath)
        return err(
          binaryHint(
            error,
            'PDF to JPG needs pdftoppm installed on the server (set PDFTOPPM_PATH if needed)'
          ),
          422
        )
      }

      cleanupFiles(inputPath)
      const pageFiles = fs
        .readdirSync(TMP_DIR)
        .filter(name => name.startsWith(`${id}-page-`) && name.endsWith('.jpg'))
        .map(name => tmpPath(name))

      if (pageFiles.length === 0) {
        cleanupFilesByPrefix(id)
        return err('No JPG pages were generated from the PDF', 500)
      }

      if (pageFiles.length === 1) {
        return filePathResponse(pageFiles[0], 'page-1.jpg', 'image/jpeg')
      }

      const zip = new JSZip()
      for (const filePath of pageFiles) {
        zip.file(filePath.split(/[/\\]/).pop() || 'page.jpg', fs.readFileSync(filePath))
      }
      cleanupFiles(...pageFiles)
      const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
      return fileResponse(buf, 'pdf-pages.zip', 'application/zip')
    }

    if (action === 'protect' || action === 'unlock') {
      const password = fields.password?.trim()
      if (!password) return err('Password is required')

      const inputPath = tmpPath(`${id}-input.pdf`)
      const outputPath = tmpPath(`${id}-output.pdf`)
      fs.writeFileSync(inputPath, primaryFile.buffer)

      const args =
        action === 'protect'
          ? ['--encrypt', password, password, '256', '--', inputPath, outputPath]
          : ['--password=' + password, '--decrypt', inputPath, outputPath]

      try {
        await runCommand(QPDF_PATH, args)
      } catch (error) {
        cleanupFiles(inputPath, outputPath)
        return err(
          binaryHint(
            error,
            `${action === 'protect' ? 'Protecting' : 'Unlocking'} PDFs needs qpdf installed on the server (set QPDF_PATH if needed)`
          ),
          422
        )
      }

      cleanupFiles(inputPath)
      return filePathResponse(
        outputPath,
        action === 'protect' ? 'protected.pdf' : 'unlocked.pdf',
        'application/pdf'
      )
    }

    const doc = await PDFDocument.load(primaryFile.buffer, { ignoreEncryption: true })

    if (action === 'rotate') {
      const angle = parseInt(fields.angle || '90')
      doc.getPages().forEach(page => {
        const current = page.getRotation().angle
        page.setRotation(degrees((current + angle) % 360))
      })
      const bytes = await doc.save()
      return fileResponse(Buffer.from(bytes), 'rotated.pdf', 'application/pdf')
    }

    if (action === 'watermark') {
      const text = fields.text || 'CONFIDENTIAL'
      const font = await doc.embedFont(StandardFonts.HelveticaBold)
      const opacity = parseFloat(fields.opacity || '0.3')
      const color = fields.color === 'red' ? rgb(0.8, 0, 0) : rgb(0.5, 0.5, 0.5)

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize()
        const fontSize = Math.min(width, height) * 0.08
        const textWidth = font.widthOfTextAtSize(text, fontSize)
        page.drawText(text, {
          x: (width - textWidth) / 2,
          y: (height - fontSize) / 2,
          size: fontSize,
          font,
          color,
          opacity,
          rotate: degrees(-45),
        })
      }

      const bytes = await doc.save()
      return fileResponse(Buffer.from(bytes), 'watermarked.pdf', 'application/pdf')
    }

    if (action === 'metadata') {
      return Response.json({
        pageCount: doc.getPageCount(),
        title: doc.getTitle() || '',
        author: doc.getAuthor() || '',
        subject: doc.getSubject() || '',
        creator: doc.getCreator() || '',
        producer: doc.getProducer() || '',
        creationDate: doc.getCreationDate()?.toISOString() || '',
        modificationDate: doc.getModificationDate()?.toISOString() || '',
        encrypted: primaryFile.buffer.includes(Buffer.from('/Encrypt')),
      })
    }

    return err('Unknown action')
  } catch (error) {
    cleanupFilesByPrefix(id)
    return err(`PDF ${action} failed: ${(error as Error).message}`, 500)
  }
}
