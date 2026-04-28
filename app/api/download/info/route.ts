import { NextRequest } from 'next/server'
import { err, isCommandAvailable, withConcurrencyLimit, YTDLP_PATH } from '@/lib/server-utils'
import {
  fetchVideoInfo,
  isSupportedVideoUrl,
} from '@/lib/video-downloader'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 30
const DOWNLOAD_INFO_RATE_LIMIT = { max: 30, windowMs: 60_000 }
const DOWNLOAD_INFO_CONCURRENCY_LIMIT = Number(process.env.DOWNLOAD_INFO_CONCURRENCY_LIMIT || 8)
const MAX_DOWNLOAD_INFO_URL_LENGTH = Number(process.env.DOWNLOAD_MAX_URL_LENGTH || 2000)
const INFO_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=900',
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = await checkRateLimit(`download-info:${ip}`, DOWNLOAD_INFO_RATE_LIMIT)
  if (!limit.allowed) return err('Rate limit exceeded. Max 30 info checks/minute.', 429)

  const url = new URL(req.url)
  const videoUrl = url.searchParams.get('url')

  if (!videoUrl) return err('Missing ?url= parameter')
  if (videoUrl.length > MAX_DOWNLOAD_INFO_URL_LENGTH) {
    return err('URL is too long for this downloader info route.', 413)
  }
  if (!isSupportedVideoUrl(videoUrl)) {
    return err('URL not supported. Try a public Instagram, TikTok, Facebook, X, Pinterest, Reddit, Vimeo, Dailymotion, Twitch, Telegram, or similar supported media link.')
  }

  const ytDlpAvailable = isCommandAvailable(YTDLP_PATH)

  if (!ytDlpAvailable) {
    return err('Advanced video format detection is temporarily unavailable on this server. Try another link or use thumbnail mode.', 503)
  }

  try {
    const info = await withConcurrencyLimit(
      'video-download-info',
      DOWNLOAD_INFO_CONCURRENCY_LIMIT,
      () => fetchVideoInfo(videoUrl),
      'Downloader info servers are busy right now. Please retry in a moment.'
    )
    return Response.json(info, { headers: INFO_CACHE_HEADERS })
  } catch (error) {
    return err('This content is private, protected, or unsupported.', 422)
  }
}
