import fs from 'fs'
import { NextRequest } from 'next/server'
import {
  cleanupFilesByPrefix,
  err,
  filePathResponse,
  fileResponse,
  getErrorStatus,
  randomId,
  tmpPath,
  withConcurrencyLimit,
} from '@/lib/server-utils'
import {
  fetchVideoInfo,
  isSupportedVideoUrl,
  runYtDlp,
  sanitizeDownloadFilename,
} from '@/lib/video-downloader'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 300

const DOWNLOAD_CONCURRENCY_LIMIT = Number(process.env.DOWNLOAD_CONCURRENCY_LIMIT || 2)
const DOWNLOAD_RATE_LIMIT = { max: 10, windowMs: 60_000 }

function findDownloadedFile(id: string, preferredExt: string): string | undefined {
  const candidates = [
    tmpPath(`${id}.${preferredExt}`),
    tmpPath(`${id}.mp4`),
    tmpPath(`${id}.webm`),
    tmpPath(`${id}.mkv`),
    tmpPath(`${id}.mp3`),
    tmpPath(`${id}.m4a`),
    tmpPath(`${id}.jpg`),
    tmpPath(`${id}.jpeg`),
    tmpPath(`${id}.png`),
    tmpPath(`${id}.webp`),
  ]

  return candidates.find(candidate => fs.existsSync(candidate))
}

function buildVideoSelector(format: 'mp4' | 'webm', quality: string): string {
  const heightFilter = /^\d+$/.test(quality) ? `[height<=${quality}]` : ''

  if (format === 'webm') {
    return `bestvideo[ext=webm]${heightFilter}+bestaudio[ext=webm]/best[ext=webm]${heightFilter}/bestvideo[ext=webm]+bestaudio[ext=webm]/best`
  }

  if (heightFilter) {
    return `bestvideo[ext=mp4]${heightFilter}+bestaudio[ext=m4a]/best[ext=mp4]${heightFilter}/bestvideo${heightFilter}+bestaudio/best[ext=mp4]/best`
  }

  return 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
}

function getMimeType(ext: string): string {
  if (ext === 'mp3') return 'audio/mpeg'
  if (ext === 'm4a') return 'audio/mp4'
  if (ext === 'webm') return 'video/webm'
  if (ext === 'png') return 'image/png'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  return 'video/mp4'
}

function getUrlExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname.toLowerCase()
    const match = pathname.match(/\.([a-z0-9]+)$/i)
    return match?.[1] || 'jpg'
  } catch {
    return 'jpg'
  }
}

async function downloadThumbnail(videoUrl: string, title: string, quality: string) {
  const info = await fetchVideoInfo(videoUrl)
  const source = quality === 'standard' ? info.thumbnail : info.thumbnailHQ || info.thumbnail

  if (!source) {
    return err('Thumbnail not available for this video.')
  }

  const response = await fetch(source)
  if (!response.ok) {
    return err('Could not download thumbnail.', 500)
  }

  const arrayBuffer = await response.arrayBuffer()
  const ext = getUrlExtension(source)
  const mime = response.headers.get('content-type') || getMimeType(ext)
  const filename = sanitizeDownloadFilename(`${title}_thumbnail_${quality}`, ext)

  return fileResponse(Buffer.from(arrayBuffer), filename, mime)
}

export async function GET(req: NextRequest) {
  const ip = getClientIp(req.headers)
  const limit = checkRateLimit(`download:${ip}`, DOWNLOAD_RATE_LIMIT)
  if (!limit.allowed) return err('Rate limit exceeded. Max 10 downloads/minute.', 429)

  const requestUrl = new URL(req.url)
  const videoUrl = requestUrl.searchParams.get('url')
  const format = requestUrl.searchParams.get('format') || 'mp4'
  const quality = requestUrl.searchParams.get('quality') || 'best'
  const title = requestUrl.searchParams.get('title') || 'download'

  if (!videoUrl) return err('Missing ?url= parameter')
  if (!isSupportedVideoUrl(videoUrl)) {
    return err('URL not supported. Try YouTube, TikTok, Instagram, Twitter/X, Vimeo, Facebook or Dailymotion.')
  }

  if (format === 'thumbnail') {
    try {
      return await downloadThumbnail(videoUrl, title, quality)
    } catch (error) {
      return err(`Thumbnail download failed: ${(error as Error).message}`, 500)
    }
  }

  const id = randomId()
  const outputTemplate = tmpPath(`${id}.%(ext)s`)
  const args: string[] = [
    '--no-playlist',
    '--no-warnings',
    '--force-overwrites',
    '--concurrent-fragments',
    '8',
  ]

  try {
    return await withConcurrencyLimit(
      'video-downloads',
      DOWNLOAD_CONCURRENCY_LIMIT,
      async () => {
        if (format === 'mp3') {
          args.push(
            '-x',
            '--audio-format',
            'mp3',
            '--audio-quality',
            '192K',
            '-o',
            outputTemplate,
            videoUrl
          )
        } else if (format === 'm4a') {
          args.push(
            '-f',
            'bestaudio[ext=m4a]/bestaudio',
            '-o',
            outputTemplate,
            videoUrl
          )
        } else if (format === 'mp4' || format === 'webm') {
          args.push(
            '-f',
            buildVideoSelector(format, quality),
            '--merge-output-format',
            format,
            '-o',
            outputTemplate,
            videoUrl
          )
        } else {
          return err('Unsupported download format.', 400)
        }

        await runYtDlp(args, 240_000)

        const preferredExt = format
        const filePath = findDownloadedFile(id, preferredExt)

        if (!filePath) return err('Downloaded file not found')

        const ext = (filePath.split('.').pop() || preferredExt).toLowerCase()
        const filename = sanitizeDownloadFilename(title, ext)
        return filePathResponse(filePath, filename, getMimeType(ext))
      },
      'Download servers are busy right now. Please retry in a moment.'
    )
  } catch (error) {
    const message = (error as Error).message

    if (message.includes('yt-dlp') && message.includes('not found')) {
      return err('yt-dlp is not installed. Run: pip install yt-dlp', 503)
    }
    if (message.includes('ffmpeg') && message.includes('not found')) {
      return err('ffmpeg is required for video downloads with audio. Install ffmpeg on the server.', 503)
    }
    if (message.includes('Private video') || message.includes('members-only')) {
      return err('This video is private or members-only.')
    }
    if (message.includes('not available')) {
      return err('Video not available in your region or has been removed.')
    }

    cleanupFilesByPrefix(id)
    return err(`Download failed: ${message}`, getErrorStatus(error, 500))
  }
}
