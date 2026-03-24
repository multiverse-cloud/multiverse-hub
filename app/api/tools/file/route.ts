import { NextRequest } from 'next/server'
import JSZip from 'jszip'
import crypto from 'crypto'
import { parseFormData, err, fileResponse } from '@/lib/server-utils'
import path from 'path'

export const runtime = 'nodejs'
export const maxDuration = 60

function sanitizeArchiveName(name: string): string {
  return name
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function sanitizeZipEntryName(filename: string, fallbackIndex: number): string {
  const normalized = path.basename(filename || `file-${fallbackIndex}`)
  const safe = normalized
    .replace(/[\u0000-\u001F]+/g, '')
    .replace(/[<>:"\\|?*]+/g, '-')
    .trim()

  return safe || `file-${fallbackIndex}`
}

function ensureUniqueFilename(filename: string, used: Map<string, number>): string {
  const ext = path.extname(filename)
  const base = ext ? filename.slice(0, -ext.length) : filename
  const count = used.get(filename) || 0

  if (count === 0) {
    used.set(filename, 1)
    return filename
  }

  const nextName = `${base} (${count + 1})${ext}`
  used.set(filename, count + 1)
  return ensureUniqueFilename(nextName, used)
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'zip'

  try {
    const { files, fields } = await parseFormData(req)

    // ── Create ZIP ──────────────────────────────────────────
    if (action === 'zip') {
      if (files.length === 0) return err('No files uploaded')
      const zip = new JSZip()
      const archiveLabel = sanitizeArchiveName(fields.archiveName || fields.folder || '')
      const folder = archiveLabel ? zip.folder(archiveLabel) || zip : zip
      const usedNames = new Map<string, number>()
      let addedFiles = 0

      for (const [index, file] of files.entries()) {
        const safeName = sanitizeZipEntryName(file.filename || '', index + 1)
        const uniqueName = ensureUniqueFilename(safeName, usedNames)
        folder.file(uniqueName, file.buffer)
        addedFiles += 1
      }

      if (addedFiles === 0) return err('No valid files were added to the archive')

      const buf = await zip.generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
        comment: 'Created by Multiverse Tools',
      })
      const archiveFilename = `${archiveLabel || `archive-${Date.now()}`}.zip`
      return fileResponse(buf, archiveFilename, 'application/zip')
    }

    // ── Extract ZIP info ────────────────────────────────────
    if (action === 'zip-info') {
      const file = files.find(f => f.fieldname === 'file')
      if (!file) return err('No ZIP file uploaded')
      const zip = await JSZip.loadAsync(file.buffer)
      const zipComment = (zip as JSZip & { comment?: string }).comment ?? null
      const entries: Array<{ name: string; size: number; compressed: number; isDir: boolean }> = []
      zip.forEach((relativePath, zipEntry) => {
        entries.push({
          name: relativePath,
          size: (zipEntry as { _data?: { uncompressedSize?: number } })._data?.uncompressedSize || 0,
          compressed: (zipEntry as { _data?: { compressedSize?: number } })._data?.compressedSize || 0,
          isDir: zipEntry.dir,
        })
      })
      return Response.json({
        files: entries.length,
        totalSize: entries.reduce((s, e) => s + e.size, 0),
        entries: entries.slice(0, 100),
        comment: zipComment,
      })
    }

    // ── File hash checker ───────────────────────────────────
    if (action === 'hash') {
      const file = files.find(f => f.fieldname === 'file')
      if (!file) return err('No file uploaded')
      const algorithms = ['md5', 'sha1', 'sha256', 'sha512']
      const hashes: Record<string, string> = {}
      for (const alg of algorithms) {
        hashes[alg] = crypto.createHash(alg).update(file.buffer).digest('hex')
      }
      return Response.json({
        filename: file.filename,
        size: file.buffer.length,
        sizeKB: (file.buffer.length / 1024).toFixed(2),
        sizeMB: (file.buffer.length / 1024 / 1024).toFixed(4),
        mimeType: file.mimetype,
        hashes,
        verify: fields.expected
          ? { expected: fields.expected, match: Object.values(hashes).includes(fields.expected.toLowerCase()) }
          : null,
      })
    }

    // ── File metadata ───────────────────────────────────────
    if (action === 'metadata') {
      const file = files.find(f => f.fieldname === 'file')
      if (!file) return err('No file uploaded')
      const ext = path.extname(file.filename || '').toLowerCase()
      const magic = file.buffer.slice(0, 8).toString('hex')

      // Detect file type from magic bytes
      const detectedType =
        magic.startsWith('ffd8ff') ? 'JPEG Image' :
        magic.startsWith('89504e47') ? 'PNG Image' :
        magic.startsWith('47494638') ? 'GIF Image' :
        magic.startsWith('52494646') ? 'RIFF (WebP/WAV)' :
        magic.startsWith('25504446') ? 'PDF Document' :
        magic.startsWith('504b0304') ? 'ZIP Archive' :
        magic.startsWith('1f8b') ? 'GZIP Archive' :
        magic.startsWith('000000') && magic.includes('6674797') ? 'MP4 Video' :
        magic.startsWith('494433') ? 'MP3 Audio' :
        magic.startsWith('664c6143') ? 'FLAC Audio' :
        file.mimetype || 'Unknown'

      return Response.json({
        filename: file.filename,
        extension: ext,
        detectedType,
        mimeType: file.mimetype,
        size: file.buffer.length,
        sizeKB: (file.buffer.length / 1024).toFixed(2),
        sizeMB: (file.buffer.length / 1024 / 1024).toFixed(4),
        magicBytes: magic.toUpperCase(),
        createdAt: new Date().toISOString(),
        md5: crypto.createHash('md5').update(file.buffer).digest('hex'),
      })
    }

    // ── CSV to JSON ─────────────────────────────────────────
    if (action === 'csv-to-json') {
      const file = files.find(f => f.fieldname === 'file')
      const csvText = file ? file.buffer.toString('utf8') : fields.text || ''
      if (!csvText) return err('No CSV data provided')

      const delimiter = fields.delimiter || ','
      const lines = csvText.trim().split('\n').filter(Boolean)
      const headers = lines[0].split(delimiter).map((h: string) => h.trim().replace(/^"|"$/g, ''))
      const rows = lines.slice(1).map((line: string) => {
        const vals = line.split(delimiter)
        return headers.reduce((obj: Record<string, string>, h: string, i: number) => {
          obj[h] = (vals[i] || '').trim().replace(/^"|"$/g, '')
          return obj
        }, {})
      })
      const json = JSON.stringify(rows, null, 2)
      return Response.json({ json, rows: rows.length, columns: headers.length, headers })
    }

    // ── JSON to CSV ─────────────────────────────────────────
    if (action === 'json-to-csv') {
      const json = fields.text || ''
      if (!json) return err('No JSON data provided')
      const data = JSON.parse(json) as Array<Record<string, unknown>>
      if (!Array.isArray(data)) return err('JSON must be an array of objects')
      const headers = Object.keys(data[0] || {})
      const delimiter = fields.delimiter || ','
      const rows = [
        headers.join(delimiter),
        ...data.map((row: Record<string, unknown>) =>
          headers.map(h => {
            const val = String(row[h] ?? '')
            return val.includes(delimiter) || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val
          }).join(delimiter)
        )
      ]
      return Response.json({ csv: rows.join('\n'), rows: data.length, columns: headers.length })
    }

    return err(`Unknown file action: ${action}`)
  } catch (e) {
    return err(`File operation failed: ${(e as Error).message}`, 500)
  }
}
