import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { Readable } from 'stream'
import busboy from 'busboy'

// ── Temp directory ──────────────────────────────────────────────────────────
export const TMP_DIR = path.join(os.tmpdir(), 'toolverse')
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })

export function tmpPath(filename: string): string {
  return path.join(TMP_DIR, filename)
}

export function cleanupFiles(...paths: string[]) {
  for (const p of paths) {
    try { if (fs.existsSync(p)) fs.unlinkSync(p) } catch {}
  }
}

export function cleanupFilesByPrefix(prefix: string) {
  try {
    const matches = fs.readdirSync(TMP_DIR).filter(file => file.startsWith(prefix))
    matches.forEach(file => cleanupFiles(path.join(TMP_DIR, file)))
  } catch {}
}

export function randomId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 16)
}

export class RouteError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'RouteError'
    this.status = status
  }
}

export function getErrorStatus(error: unknown, fallback = 500): number {
  return error instanceof RouteError ? error.status : fallback
}

function formatBytesLimit(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`
  return `${bytes} bytes`
}

const activeJobs = new Map<string, number>()

export async function withConcurrencyLimit<T>(
  key: string,
  limit: number,
  task: () => Promise<T>,
  message = 'Server is busy handling similar requests. Please retry in a moment.'
): Promise<T> {
  const active = activeJobs.get(key) || 0

  if (limit > 0 && active >= limit) {
    throw new RouteError(message, 503)
  }

  if (limit > 0) {
    activeJobs.set(key, active + 1)
  }

  try {
    return await task()
  } finally {
    if (limit > 0) {
      const next = (activeJobs.get(key) || 1) - 1
      if (next <= 0) activeJobs.delete(key)
      else activeJobs.set(key, next)
    }
  }
}

// ── Parse multipart form data ───────────────────────────────────────────────
export async function parseFormData(
  req: NextRequest,
  options: { maxBytes?: number } = {}
): Promise<{
  fields: Record<string, string>
  files: Array<{ fieldname: string; filename: string; buffer: Buffer; mimetype: string }>
}> {
  const { maxBytes } = options
  const contentLength = Number(req.headers.get('content-length') || '')
  const contentType = req.headers.get('content-type') || ''

  if (maxBytes && Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RouteError(`Upload exceeds the ${formatBytesLimit(maxBytes)} limit.`, 413)
  }

  if (contentType.toLowerCase().includes('multipart/form-data')) {
    if (!req.body) {
      throw new RouteError('Upload body is empty.', 400)
    }

    const headers = Object.fromEntries(req.headers.entries())

    return await new Promise((resolve, reject) => {
      const fields: Record<string, string> = {}
      const files: Array<{ fieldname: string; filename: string; buffer: Buffer; mimetype: string }> = []
      let totalFileBytes = 0
      let settled = false

      const finishWithError = (error: unknown) => {
        if (settled) return
        settled = true
        reject(error)
      }

      const bb = busboy({
        headers,
        limits: maxBytes ? { fileSize: maxBytes } : undefined,
      })

      bb.on('field', (name, value) => {
        fields[name] = value
      })

      bb.on('file', (fieldname, file, info) => {
        const chunks: Buffer[] = []
        let fileBytes = 0
        let fileLimitHit = false

        file.on('limit', () => {
          fileLimitHit = true
        })

        file.on('data', chunk => {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
          fileBytes += buffer.length
          totalFileBytes += buffer.length

          if (maxBytes && totalFileBytes > maxBytes) {
            file.resume()
            finishWithError(new RouteError(`Upload exceeds the ${formatBytesLimit(maxBytes)} limit.`, 413))
            return
          }

          chunks.push(buffer)
        })

        file.on('error', finishWithError)

        file.on('close', () => {
          if (settled) return
          if (fileLimitHit || (maxBytes && fileBytes > maxBytes)) {
            const limit = maxBytes || fileBytes
            finishWithError(new RouteError(`Upload exceeds the ${formatBytesLimit(limit)} limit.`, 413))
            return
          }

          files.push({
            fieldname,
            filename: info.filename,
            buffer: Buffer.concat(chunks),
            mimetype: info.mimeType,
          })
        })
      })

      bb.on('error', error => {
        finishWithError(
          error instanceof Error
            ? new RouteError(error.message || 'Failed to parse upload body.', 400)
            : new RouteError('Failed to parse upload body.', 400)
        )
      })

      bb.on('close', () => {
        if (settled) return
        settled = true
        resolve({ fields, files })
      })

      Readable.fromWeb(req.body as never).pipe(bb)
    })
  }

  const formData = await req.formData()
  const fields: Record<string, string> = {}
  const files: Array<{ fieldname: string; filename: string; buffer: Buffer; mimetype: string }> = []
  let totalFileBytes = 0

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      totalFileBytes += value.size
      if (maxBytes && totalFileBytes > maxBytes) {
        throw new RouteError(`Upload exceeds the ${formatBytesLimit(maxBytes)} limit.`, 413)
      }

      const buf = Buffer.from(await value.arrayBuffer())
      files.push({ fieldname: key, filename: value.name, buffer: buf, mimetype: value.type })
    } else {
      fields[key] = value as string
    }
  }

  return { fields, files }
}

// ── Standard JSON responses ─────────────────────────────────────────────────
export function ok(data: Record<string, unknown> | string, status = 200) {
  return NextResponse.json(typeof data === 'string' ? { result: data } : data, { status })
}

export function err(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

// ── Stream file as download ─────────────────────────────────────────────────
export function fileResponse(buffer: Buffer, filename: string, mime: string) {
  return new NextResponse(Uint8Array.from(buffer), {
    headers: {
      'Content-Type': mime,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length.toString(),
    },
  })
}

export function filePathResponse(
  filePath: string,
  filename: string,
  mime: string,
  extraHeaders: Record<string, string> = {}
) {
  const stats = fs.statSync(filePath)
  const stream = fs.createReadStream(filePath)
  const cleanup = () => cleanupFiles(filePath)

  stream.once('close', cleanup)
  stream.once('error', cleanup)

  return new NextResponse(Readable.toWeb(stream) as ReadableStream<Uint8Array>, {
    headers: {
      'Content-Type': mime,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': stats.size.toString(),
      ...extraHeaders,
    },
  })
}

// ── ffmpeg path ─────────────────────────────────────────────────────────────
export const FFMPEG_PATH = process.env.FFMPEG_PATH || 'ffmpeg'
export const YTDLP_PATH = process.env.YTDLP_PATH || 'yt-dlp'
