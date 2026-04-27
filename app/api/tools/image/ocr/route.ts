import { NextRequest } from 'next/server'
import Tesseract from 'tesseract.js'
import { API_RATE_LIMITS, guardRateLimit } from '@/lib/api-protection'
import { err, getErrorStatus, parseFormData, withConcurrencyLimit } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 120

const OCR_PROCESS_CONCURRENCY_LIMIT = Number(process.env.OCR_PROCESS_CONCURRENCY_LIMIT || 2)
const OCR_UPLOAD_MAX_BYTES = Number(process.env.OCR_UPLOAD_MAX_BYTES || 15 * 1024 * 1024)

type OCRWorker = Awaited<ReturnType<typeof Tesseract.createWorker>>

const workerCache = new Map<string, Promise<OCRWorker>>()
const workerQueues = new Map<string, Promise<unknown>>()

async function getWorker(lang: string): Promise<OCRWorker> {
  const existing = workerCache.get(lang)
  if (existing) return existing

  const created = Tesseract.createWorker(lang, 1, {
    logger: () => {},
  }).catch(error => {
    workerCache.delete(lang)
    throw error
  })

  workerCache.set(lang, created)
  return created
}

async function recognizeQueued(lang: string, buffer: Buffer) {
  const previous = workerQueues.get(lang) || Promise.resolve()
  const current = previous
    .catch(() => undefined)
    .then(async () => {
      const worker = await getWorker(lang)
      return worker.recognize(buffer)
    })

  workerQueues.set(lang, current.catch(() => undefined))
  return current
}

export async function POST(req: NextRequest) {
  try {
    const limited = await guardRateLimit(req, 'tools:ocr', API_RATE_LIMITS.toolHeavy, 'Too many OCR jobs. Please retry in a moment.')
    if (limited) return limited

    return await withConcurrencyLimit(
      'ocr-processing',
      OCR_PROCESS_CONCURRENCY_LIMIT,
      async () => {
        const { files, fields } = await parseFormData(req, { maxBytes: OCR_UPLOAD_MAX_BYTES })
        const imgFile = files.find(f => f.fieldname === 'file')
        if (!imgFile) return err('No image file uploaded')

        const lang = fields.lang || 'eng'
        const { data } = await recognizeQueued(lang, imgFile.buffer)

        return Response.json({
          text: data.text.trim(),
          words: data.words?.length || 0,
          confidence: Math.round(data.confidence),
          lines: data.lines?.length || 0,
          language: lang,
          hocr: data.hocr,
        })
      },
      'OCR servers are busy right now. Please retry in a moment.'
    )
  } catch (e) {
    return err(`OCR failed: ${(e as Error).message}`, getErrorStatus(e, 500))
  }
}
