import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp, type RateLimitConfig } from '@/lib/rate-limit'
import { err, RouteError } from '@/lib/server-utils'

export const API_RATE_LIMITS = {
  toolJson: { max: Number(process.env.TOOL_JSON_RATE_LIMIT_MAX || 90), windowMs: 60_000 },
  toolFile: { max: Number(process.env.TOOL_FILE_RATE_LIMIT_MAX || 24), windowMs: 60_000 },
  toolHeavy: { max: Number(process.env.TOOL_HEAVY_RATE_LIMIT_MAX || 10), windowMs: 60_000 },
} satisfies Record<string, RateLimitConfig>

export const API_BODY_LIMITS = {
  jsonSmall: Number(process.env.API_JSON_SMALL_MAX_BYTES || 256 * 1024),
  jsonLarge: Number(process.env.API_JSON_LARGE_MAX_BYTES || 1024 * 1024),
  imageUpload: Number(process.env.IMAGE_UPLOAD_MAX_BYTES || 25 * 1024 * 1024),
  fileUpload: Number(process.env.FILE_UPLOAD_MAX_BYTES || 50 * 1024 * 1024),
  pdfUpload: Number(process.env.PDF_UPLOAD_MAX_BYTES || 100 * 1024 * 1024),
  audioUpload: Number(process.env.AUDIO_UPLOAD_MAX_BYTES || 100 * 1024 * 1024),
  videoUpload: Number(process.env.VIDEO_UPLOAD_MAX_BYTES || 150 * 1024 * 1024),
}

function formatBytes(bytes: number) {
  if (bytes >= 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`
  return `${bytes} bytes`
}

export async function guardRateLimit(
  req: NextRequest,
  scope: string,
  config: RateLimitConfig,
  message = 'Too many requests. Please retry in a moment.'
): Promise<NextResponse | null> {
  const ip = getClientIp(req.headers)
  const limit = await checkRateLimit(`${scope}:${ip}`, config)

  if (limit.allowed) return null

  const response = err(message, 429)
  response.headers.set('Retry-After', String(Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))))
  response.headers.set('X-RateLimit-Limit', String(config.max))
  response.headers.set('X-RateLimit-Remaining', String(limit.remaining))
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(limit.resetAt / 1000)))
  return response
}

export async function readJsonBody<T>(req: NextRequest, maxBytes: number): Promise<T> {
  const contentLength = Number(req.headers.get('content-length') || '')

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RouteError(`Request body exceeds the ${formatBytes(maxBytes)} limit.`, 413)
  }

  const raw = await req.text()
  if (Buffer.byteLength(raw, 'utf8') > maxBytes) {
    throw new RouteError(`Request body exceeds the ${formatBytes(maxBytes)} limit.`, 413)
  }

  try {
    return JSON.parse(raw || '{}') as T
  } catch {
    throw new RouteError('Invalid JSON body.', 400)
  }
}
