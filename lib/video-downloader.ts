import { spawn } from 'child_process'
import { YTDLP_PATH } from '@/lib/server-utils'

export type DownloadDelivery = 'direct' | 'server'
export type DownloadKind = 'video' | 'audio' | 'thumbnail'

export interface DownloadOption {
  id: string
  label: string
  ext: string
  kind: DownloadKind
  delivery: DownloadDelivery
  qualityLabel: string
  height: number | null
  filesize: number | null
  filesizeMB: string | null
  hasAudio: boolean
  note?: string
  formatId?: string
  cdnUrl?: string | null
  serverFormat?: string | null
  serverQuality?: string | null
}

export interface VideoInfoPayload {
  title: string
  safeTitle: string
  uploader: string
  duration: number
  thumbnail: string
  thumbnailHQ?: string
  viewCount: number
  likeCount: number
  uploadDate: string
  webpage_url: string
  platform: string
  quickDownloads: DownloadOption[]
  videoFormats: DownloadOption[]
  audioFormats: DownloadOption[]
  thumbnailDownloads: DownloadOption[]
}

interface RawThumbnail {
  url?: string
  width?: number
  height?: number
}

interface RawFormat {
  format_id?: string
  ext?: string
  acodec?: string
  vcodec?: string
  height?: number
  width?: number
  fps?: number
  filesize?: number
  filesize_approx?: number
  format_note?: string
  format?: string
  abr?: number
  tbr?: number
  protocol?: string
  url?: string
}

interface RawVideoInfo {
  title?: string
  uploader?: string
  duration?: number
  thumbnail?: string
  thumbnails?: RawThumbnail[]
  view_count?: number
  like_count?: number
  upload_date?: string
  webpage_url?: string
  extractor_key?: string
  formats?: RawFormat[]
}

interface VideoProfile {
  id: string
  ext: 'mp4' | 'webm'
  label: string
  qualityLabel: string
  targetHeight: number
  minDirectHeight: number
}

const SUPPORTED_VIDEO_PATTERNS = [
  /(?:youtube\.com\/(?:watch|shorts)|youtu\.be\/)/i,
  /(?:tiktok\.com|vm\.tiktok\.com)\//i,
  /instagram\.com\/(?:reel|p|tv|stories)\//i,
  /(?:twitter\.com|x\.com)\/.+\/status\//i,
  /vimeo\.com\//i,
  /(?:facebook\.com|fb\.watch)\//i,
  /dailymotion\.com\/video/i,
]

const DIRECT_PROTOCOL_BLOCKLIST = ['m3u8', 'dash', 'ism', 'f4m']

const VIDEO_PROFILES: VideoProfile[] = [
  { id: 'mp4-360', ext: 'mp4', label: 'MP4 360p', qualityLabel: '360p', targetHeight: 360, minDirectHeight: 300 },
  { id: 'mp4-480', ext: 'mp4', label: 'MP4 480p', qualityLabel: '480p', targetHeight: 480, minDirectHeight: 420 },
  { id: 'mp4-720', ext: 'mp4', label: 'MP4 720p', qualityLabel: '720p', targetHeight: 720, minDirectHeight: 600 },
  { id: 'mp4-1080', ext: 'mp4', label: 'MP4 1080p', qualityLabel: '1080p', targetHeight: 1080, minDirectHeight: 900 },
  { id: 'webm-2k', ext: 'webm', label: 'WEBM 2K', qualityLabel: '2K', targetHeight: 1440, minDirectHeight: 1200 },
  { id: 'webm-4k', ext: 'webm', label: 'WEBM 4K', qualityLabel: '4K', targetHeight: 2160, minDirectHeight: 1800 },
]

const VIDEO_INFO_CACHE_TTL_MS = Number(process.env.VIDEO_INFO_CACHE_TTL_MS || 5 * 60 * 1000)
const VIDEO_INFO_CACHE_MAX_ENTRIES = Number(process.env.VIDEO_INFO_CACHE_MAX_ENTRIES || 200)

type VideoInfoCacheEntry = {
  expiresAt: number
  value?: VideoInfoPayload
  promise?: Promise<VideoInfoPayload>
}

const videoInfoCache = new Map<string, VideoInfoCacheEntry>()

function pruneVideoInfoCache(now: number) {
  for (const [key, entry] of videoInfoCache.entries()) {
    if (entry.expiresAt <= now && !entry.promise) {
      videoInfoCache.delete(key)
    }
  }

  if (videoInfoCache.size <= VIDEO_INFO_CACHE_MAX_ENTRIES) return

  const oldestKeys = [...videoInfoCache.entries()]
    .sort((a, b) => a[1].expiresAt - b[1].expiresAt)
    .slice(0, videoInfoCache.size - VIDEO_INFO_CACHE_MAX_ENTRIES)
    .map(([key]) => key)

  oldestKeys.forEach(key => videoInfoCache.delete(key))
}

export function isSupportedVideoUrl(videoUrl: string): boolean {
  return SUPPORTED_VIDEO_PATTERNS.some(pattern => pattern.test(videoUrl))
}

export function detectVideoPlatform(videoUrl: string, extractorKey?: string): string {
  const value = `${extractorKey || ''} ${videoUrl}`.toLowerCase()

  if (value.includes('youtube') || value.includes('youtu.be')) return 'YouTube'
  if (value.includes('tiktok')) return 'TikTok'
  if (value.includes('instagram')) return 'Instagram'
  if (value.includes('twitter') || value.includes('x.com')) return 'Twitter/X'
  if (value.includes('facebook') || value.includes('fb.watch')) return 'Facebook'
  if (value.includes('vimeo')) return 'Vimeo'
  if (value.includes('dailymotion')) return 'Dailymotion'

  return 'Video'
}

export function sanitizeDownloadFilename(title: string, ext: string): string {
  const base =
    title
      .replace(/[^\w\d-]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 80) || 'download'

  return `${base}.${ext}`
}

export function runYtDlp(args: string[], timeoutMs = 45_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(YTDLP_PATH, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    let finished = false

    const timeout = setTimeout(() => {
      if (finished) return
      finished = true
      proc.kill()
      reject(new Error('yt-dlp timed out'))
    }, timeoutMs)

    proc.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
    })

    proc.stderr.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    proc.on('error', error => {
      if (finished) return
      finished = true
      clearTimeout(timeout)
      reject(error)
    })

    proc.on('close', code => {
      if (finished) return
      finished = true
      clearTimeout(timeout)

      if (code === 0) {
        resolve(stdout.trim())
        return
      }

      reject(new Error(stderr.trim() || 'yt-dlp failed'))
    })
  })
}

export function buildThumbnailDownloads(thumbnail: string, thumbnailHQ?: string): DownloadOption[] {
  const ext = getUrlExtension(thumbnailHQ || thumbnail || '') || 'jpg'
  const downloads: DownloadOption[] = []

  if (thumbnailHQ) {
    downloads.push(createThumbnailOption('thumbnail-hd', 'HD Thumbnail', ext, 'HD', 'hd'))
  }

  if (thumbnail && thumbnail !== thumbnailHQ) {
    downloads.push(createThumbnailOption('thumbnail-standard', 'Thumbnail', ext, 'Standard', 'standard'))
  }

  if (downloads.length === 0 && thumbnail) {
    downloads.push(createThumbnailOption('thumbnail-hd', 'HD Thumbnail', ext, 'HD', 'hd'))
  }

  return downloads
}

function isDirectHttpFormat(format: RawFormat): boolean {
  if (!format.url || !format.ext) return false

  const protocol = (format.protocol || '').toLowerCase()
  if (DIRECT_PROTOCOL_BLOCKLIST.some(blocked => protocol.includes(blocked))) return false

  return format.ext.toLowerCase() !== 'mhtml'
}

function formatFilesizeMB(bytes?: number): string | null {
  if (!bytes) return null
  return (bytes / 1024 / 1024).toFixed(1)
}

function getLandscapeThumbnail(info: RawVideoInfo, quality: 'standard' | 'hd'): string | undefined {
  const thumbnails = [...(info.thumbnails || [])]
    .filter(item => item.url)
    .filter(item => !item.width || !item.height || item.width >= item.height)
    .sort((a, b) => ((b.width || 0) * (b.height || 0)) - ((a.width || 0) * (a.height || 0)))

  if (quality === 'hd') {
    return thumbnails[0]?.url || info.thumbnail
  }

  return thumbnails[thumbnails.length - 1]?.url || info.thumbnail || thumbnails[0]?.url
}

function getUrlExtension(url: string): string | null {
  try {
    const pathname = new URL(url).pathname.toLowerCase()
    const match = pathname.match(/\.([a-z0-9]+)$/i)
    return match?.[1] || null
  } catch {
    return null
  }
}

function getFormatFilesize(format: RawFormat): number | null {
  return format.filesize || format.filesize_approx || null
}

function findDirectVideoMatch(formats: RawFormat[], profile: VideoProfile): RawFormat | undefined {
  return formats
    .filter(format => isDirectHttpFormat(format))
    .filter(format => (format.ext || '').toLowerCase() === profile.ext)
    .filter(format => format.vcodec && format.vcodec !== 'none')
    .filter(format => format.acodec && format.acodec !== 'none')
    .filter(format => (format.height || 0) >= profile.minDirectHeight && (format.height || 0) <= profile.targetHeight)
    .sort((a, b) => {
      const delta = Math.abs((a.height || 0) - profile.targetHeight) - Math.abs((b.height || 0) - profile.targetHeight)
      if (delta !== 0) return delta
      return (getFormatFilesize(b) || 0) - (getFormatFilesize(a) || 0)
    })[0]
}

function findDirectAudioMatch(formats: RawFormat[], ext: string): RawFormat | undefined {
  return formats
    .filter(format => isDirectHttpFormat(format))
    .filter(format => (format.ext || '').toLowerCase() === ext)
    .filter(format => format.acodec && format.acodec !== 'none')
    .filter(format => !format.vcodec || format.vcodec === 'none')
    .sort((a, b) => (getFormatFilesize(b) || 0) - (getFormatFilesize(a) || 0))[0]
}

function createVideoDirectOption(format: RawFormat, profile: VideoProfile): DownloadOption {
  const size = getFormatFilesize(format)

  return {
    id: `video-${profile.id}-${format.format_id || profile.targetHeight}`,
    label: profile.label,
    ext: profile.ext,
    kind: 'video',
    delivery: 'direct',
    qualityLabel: profile.qualityLabel,
    height: format.height || profile.targetHeight,
    filesize: size,
    filesizeMB: formatFilesizeMB(size || undefined),
    hasAudio: true,
    formatId: format.format_id,
    cdnUrl: format.url || null,
    serverFormat: null,
    serverQuality: null,
  }
}

function createAudioDirectOption(format: RawFormat, ext: 'mp3' | 'm4a'): DownloadOption {
  const size = getFormatFilesize(format)

  return {
    id: `audio-${ext}-${format.format_id || ext}`,
    label: ext.toUpperCase(),
    ext,
    kind: 'audio',
    delivery: 'direct',
    qualityLabel: ext.toUpperCase(),
    height: null,
    filesize: size,
    filesizeMB: formatFilesizeMB(size || undefined),
    hasAudio: true,
    formatId: format.format_id,
    cdnUrl: format.url || null,
    serverFormat: null,
    serverQuality: null,
  }
}

function createServerOption(
  id: string,
  label: string,
  ext: string,
  qualityLabel: string,
  serverFormat: string,
  serverQuality: string,
  kind: DownloadKind
): DownloadOption {
  const numericHeight = /^\d+$/.test(serverQuality) ? Number(serverQuality) : null

  return {
    id,
    label,
    ext,
    kind,
    delivery: 'server',
    qualityLabel,
    height: kind === 'video' ? numericHeight : null,
    filesize: null,
    filesizeMB: null,
    hasAudio: kind !== 'thumbnail',
    cdnUrl: null,
    serverFormat,
    serverQuality,
  }
}

function createThumbnailOption(
  id: string,
  label: string,
  ext: string,
  qualityLabel: string,
  serverQuality: string
): DownloadOption {
  return createServerOption(id, label, ext, qualityLabel, 'thumbnail', serverQuality, 'thumbnail')
}

function buildVideoOptions(formats: RawFormat[]): DownloadOption[] {
  return VIDEO_PROFILES.map(profile => {
    const directMatch = findDirectVideoMatch(formats, profile)

    if (directMatch) {
      return createVideoDirectOption(directMatch, profile)
    }

    return createServerOption(
      `video-${profile.id}`,
      profile.label,
      profile.ext,
      profile.qualityLabel,
      profile.ext,
      String(profile.targetHeight),
      'video'
    )
  })
}

function buildAudioOptions(formats: RawFormat[]): DownloadOption[] {
  const mp3Direct = findDirectAudioMatch(formats, 'mp3')
  const m4aDirect = findDirectAudioMatch(formats, 'm4a')

  return [
    mp3Direct
      ? createAudioDirectOption(mp3Direct, 'mp3')
      : createServerOption('audio-mp3', 'MP3', 'mp3', 'MP3', 'mp3', 'best', 'audio'),
    m4aDirect
      ? createAudioDirectOption(m4aDirect, 'm4a')
      : createServerOption('audio-m4a', 'M4A', 'm4a', 'M4A', 'm4a', 'best', 'audio'),
  ]
}

export async function fetchVideoInfo(videoUrl: string): Promise<VideoInfoPayload> {
  const now = Date.now()
  const cached = videoInfoCache.get(videoUrl)

  if (cached && cached.expiresAt > now) {
    if (cached.value) return cached.value
    if (cached.promise) return cached.promise
  }

  pruneVideoInfoCache(now)

  const pending = (async () => {
    const raw = JSON.parse(
      await runYtDlp(['--dump-single-json', '--no-playlist', '--no-warnings', videoUrl], 45_000)
    ) as RawVideoInfo

    const thumbnailHD = getLandscapeThumbnail(raw, 'hd') || raw.thumbnail || ''
    const thumbnailStandard = getLandscapeThumbnail(raw, 'standard') || raw.thumbnail || thumbnailHD
    const videoFormats = buildVideoOptions(raw.formats || [])
    const audioFormats = buildAudioOptions(raw.formats || [])
    const thumbnailDownloads = buildThumbnailDownloads(thumbnailStandard, thumbnailHD)
    const quickDownloads = [
      videoFormats.find(option => option.id.includes('mp4-720')),
      videoFormats.find(option => option.id.includes('mp4-1080')),
      audioFormats.find(option => option.ext === 'mp3'),
      thumbnailDownloads[0],
    ].filter(Boolean) as DownloadOption[]

    const title = raw.title || 'Video download'

    return {
      title,
      safeTitle: sanitizeDownloadFilename(title, 'tmp').replace(/\.tmp$/, ''),
      uploader: raw.uploader || 'Unknown creator',
      duration: raw.duration || 0,
      thumbnail: thumbnailStandard,
      thumbnailHQ: thumbnailHD,
      viewCount: raw.view_count || 0,
      likeCount: raw.like_count || 0,
      uploadDate: raw.upload_date || '',
      webpage_url: raw.webpage_url || videoUrl,
      platform: detectVideoPlatform(videoUrl, raw.extractor_key),
      quickDownloads,
      videoFormats,
      audioFormats,
      thumbnailDownloads,
    }
  })()

  videoInfoCache.set(videoUrl, {
    expiresAt: now + VIDEO_INFO_CACHE_TTL_MS,
    promise: pending,
  })

  try {
    const info = await pending
    videoInfoCache.set(videoUrl, {
      expiresAt: Date.now() + VIDEO_INFO_CACHE_TTL_MS,
      value: info,
    })
    return info
  } catch (error) {
    videoInfoCache.delete(videoUrl)
    throw error
  }
}
