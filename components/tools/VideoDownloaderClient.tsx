'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import type { DownloadOption } from '@/lib/video-downloader'
import { PremiumPage } from '@/components/platform/premium/Surface'
import DownloaderFaqSection from '@/components/tools/downloader/DownloaderFaqSection'
import DownloaderHero from '@/components/tools/downloader/DownloaderHero'
import DownloaderSeoSection from '@/components/tools/downloader/DownloaderSeoSection'
import DownloaderWorkspaceSection from '@/components/tools/downloader/DownloaderWorkspaceSection'
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import ToolActions from '@/components/tools/ToolActions'
import type { Tool } from '@/lib/tools-data'
import type { DownloaderRouteEntry } from '@/lib/downloader-route-data'
import type { DownloadState, VideoInfo } from '@/components/tools/downloader/types'

type DownloaderPageConfig = {
  title: string
  subtitle: string
  placeholder: string
  buttonLabel: string
  platforms: string[]
  contentTypes: string[]
  categoryLabel: string
}

type DownloaderRouteTab = {
  label: string
  href: string
  active?: boolean
}

type RelatedDownloaderRoute = {
  label: string
  href: string
  description: string
}

const SUPPORTED_VIDEO_PATTERNS = [
  /(?:youtube\.com\/(?:watch|shorts|playlist|live)|youtu\.be\/)/i,
  /(?:tiktok\.com|vm\.tiktok\.com)\//i,
  /instagram\.com\/(?:reel|p|tv|stories|stories\/highlights|[a-z0-9._]+)\//i,
  /(?:twitter\.com|x\.com)\/.+\/status\//i,
  /vimeo\.com\//i,
  /(?:facebook\.com|fb\.watch)\//i,
  /dailymotion\.com\/(?:video|playlist)/i,
  /(?:pinterest\.[a-z.]+\/pin\/|pin\.it\/)/i,
  /(?:reddit\.com\/r\/.+\/comments\/|redd\.it\/)/i,
  /snapchat\.com\/(?:spotlight|discover|story|add)\//i,
  /linkedin\.com\/(?:posts|feed\/update|video)\//i,
  /t\.me\/[a-z0-9_/-]+/i,
  /(?:twitch\.tv\/(?:videos|clips)|clips\.twitch\.tv)\//i,
  /(?:bilibili\.com\/video|b23\.tv\/)/i,
  /(?:likee\.video|likee\.com)\//i,
  /mxtakatak\.com\//i,
  /(?:sharechat\.com|mojapp\.in)\//i,
  /roposo\.com\//i,
  /triller\.co\//i,
]

function isSupportedVideoUrl(videoUrl: string) {
  return SUPPORTED_VIDEO_PATTERNS.some(pattern => pattern.test(videoUrl))
}

function getFilenameFromDisposition(disposition: string | null, fallback: string): string {
  if (!disposition) return fallback

  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (utfMatch?.[1]) return decodeURIComponent(utfMatch[1])

  const basicMatch = disposition.match(/filename="([^"]+)"/i) || disposition.match(/filename=([^;]+)/i)
  if (basicMatch?.[1]) return basicMatch[1].trim()

  return fallback
}

function downloadBlob(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = blobUrl
  anchor.download = filename
  anchor.rel = 'noopener'
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
}

function getDownloaderPageConfig(tool?: Tool, route?: DownloaderRouteEntry): DownloaderPageConfig {
  if (route) {
    const isAll = route.platform === 'All Platforms'
    return {
      title: route.title.split(' - ')[0] || route.title,
      subtitle: route.description,
      placeholder: route.placeholder,
      buttonLabel: 'Download',
      platforms: isAll
        ? ['YouTube', 'TikTok', 'Instagram', 'Twitter / X', 'Facebook', 'Pinterest', 'Reddit']
        : [route.platform],
      contentTypes: route.contentTypes,
      categoryLabel: isAll ? 'Video Tools' : `${route.platform} Tools`,
    }
  }

  switch (tool?.slug) {
    case 'instagram-video-downloader':
      return {
        title: 'Download Instagram Videos and Photos',
        subtitle: 'Save Instagram videos, photos, reels, posts, stories, and highlights from public links.',
        placeholder: 'Paste Instagram reel, story, post, or highlight URL',
        buttonLabel: 'Download',
        platforms: ['Instagram'],
        contentTypes: ['Videos', 'Photos', 'Reels', 'Posts', 'Stories', 'Highlights'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-story-downloader':
      return {
        title: 'Instagram Story Downloader',
        subtitle: 'Quick story and highlight downloads with simple paste-and-save UX.',
        placeholder: 'Paste Instagram story or highlight URL',
        buttonLabel: 'Download',
        platforms: ['Instagram'],
        contentTypes: ['Stories', 'Highlights', 'Videos', 'Photos'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-post-downloader':
      return {
        title: 'Instagram Post Downloader',
        subtitle: 'Save public Instagram posts, videos, carousel media, and image pins with a simple paste-first workflow.',
        placeholder: 'Paste Instagram post URL',
        buttonLabel: 'Download',
        platforms: ['Instagram'],
        contentTypes: ['Posts', 'Photos', 'Videos', 'Carousels'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-reels-downloader':
      return {
        title: 'Instagram Reels Downloader',
        subtitle: 'Download Instagram reels, posts, and short video links without a cluttered workflow.',
        placeholder: 'Paste Instagram reel URL',
        buttonLabel: 'Download',
        platforms: ['Instagram'],
        contentTypes: ['Reels', 'Videos', 'Posts', 'Audio'],
        categoryLabel: 'Instagram Tools',
      }
    case 'tiktok-video-downloader':
      return {
        title: 'TikTok Video Downloader',
        subtitle: 'Paste a TikTok link and save video, audio, or thumbnail downloads in one place.',
        placeholder: 'Paste TikTok video URL',
        buttonLabel: 'Download',
        platforms: ['TikTok'],
        contentTypes: ['Videos', 'Shorts', 'Audio', 'Thumbnails'],
        categoryLabel: 'TikTok Tools',
      }
    case 'youtube-shorts-downloader':
      return {
        title: 'YouTube Shorts Downloader',
        subtitle: 'Fast shorts downloads with MP4, MP3, and thumbnail options that work well on mobile.',
        placeholder: 'Paste YouTube Shorts URL',
        buttonLabel: 'Download',
        platforms: ['YouTube'],
        contentTypes: ['Shorts', 'Videos', 'Audio', 'Thumbnails'],
        categoryLabel: 'YouTube Tools',
      }
    case 'youtube-playlist-downloader':
      return {
        title: 'YouTube Playlist Downloader',
        subtitle: 'Open public playlist links and download available media when the source supports it.',
        placeholder: 'Paste YouTube playlist URL',
        buttonLabel: 'Download',
        platforms: ['YouTube'],
        contentTypes: ['Playlists', 'Videos', 'Audio', 'Thumbnails'],
        categoryLabel: 'YouTube Tools',
      }
    case 'youtube-video-downloader':
      return {
        title: 'YouTube Video Downloader',
        subtitle: 'Use one paste bar to grab YouTube video, audio, and thumbnail files with direct downloads.',
        placeholder: 'Paste YouTube video URL',
        buttonLabel: 'Download',
        platforms: ['YouTube'],
        contentTypes: ['Videos', 'Shorts', 'Live', 'Audio', 'Thumbnails'],
        categoryLabel: 'YouTube Tools',
      }
    case 'facebook-video-downloader':
      return {
        title: 'Facebook Video Downloader',
        subtitle: 'Download Facebook videos and reels with a cleaner compact layout and attachment downloads.',
        placeholder: 'Paste Facebook video or reel URL',
        buttonLabel: 'Download',
        platforms: ['Facebook'],
        contentTypes: ['Videos', 'Reels', 'Live', 'Posts'],
        categoryLabel: 'Facebook Tools',
      }
    case 'facebook-reels-downloader':
      return {
        title: 'Facebook Reels Downloader',
        subtitle: 'Download public Facebook reels and accessible short-form video links with a compact save flow.',
        placeholder: 'Paste Facebook reel URL',
        buttonLabel: 'Download',
        platforms: ['Facebook'],
        contentTypes: ['Reels', 'Videos', 'Posts'],
        categoryLabel: 'Facebook Tools',
      }
    case 'twitter-video-downloader':
      return {
        title: 'Twitter Video Downloader',
        subtitle: 'Save Twitter and X videos with a simple paste and download flow.',
        placeholder: 'Paste Twitter or X post URL',
        buttonLabel: 'Download',
        platforms: ['Twitter / X'],
        contentTypes: ['Videos', 'GIFs', 'Posts', 'Recordings'],
        categoryLabel: 'Twitter Tools',
      }
    case 'pinterest-video-downloader':
      return {
        title: 'Pinterest Video Downloader',
        subtitle: 'Save public video pins, idea pins, and image pins without a busy downloader layout.',
        placeholder: 'Paste Pinterest pin URL',
        buttonLabel: 'Download',
        platforms: ['Pinterest'],
        contentTypes: ['Video Pins', 'Idea Pins', 'Image Pins'],
        categoryLabel: 'Pinterest Tools',
      }
    case 'reddit-video-downloader':
      return {
        title: 'Reddit Video Downloader',
        subtitle: 'Download public Reddit hosted videos, GIF posts, and supported embedded media.',
        placeholder: 'Paste Reddit post URL',
        buttonLabel: 'Download',
        platforms: ['Reddit'],
        contentTypes: ['Videos', 'GIFs', 'Posts', 'Embedded media'],
        categoryLabel: 'Reddit Tools',
      }
    case 'vimeo-video-downloader':
      return {
        title: 'Vimeo Video Downloader',
        subtitle: 'Download Vimeo video, audio, and thumbnail files with a compact professional UI.',
        placeholder: 'Paste Vimeo video URL',
        buttonLabel: 'Download',
        platforms: ['Vimeo'],
        contentTypes: ['Videos', 'Audio', 'Thumbnails'],
        categoryLabel: 'Vimeo Tools',
      }
    case 'dailymotion-video-downloader':
      return {
        title: 'Dailymotion Video Downloader',
        subtitle: 'A neat downloader for Dailymotion links with quick format choices and clean mobile spacing.',
        placeholder: 'Paste Dailymotion video URL',
        buttonLabel: 'Download',
        platforms: ['Dailymotion'],
        contentTypes: ['Videos', 'Playlists', 'Audio'],
        categoryLabel: 'Dailymotion Tools',
      }
    case 'snapchat-downloader':
      return {
        title: 'Snapchat Downloader',
        subtitle: 'Download public Spotlight and story media when the content is accessible without login.',
        placeholder: 'Paste Snapchat public URL',
        buttonLabel: 'Download',
        platforms: ['Snapchat'],
        contentTypes: ['Spotlight', 'Public Stories', 'Videos'],
        categoryLabel: 'Snapchat Tools',
      }
    case 'linkedin-video-downloader':
      return {
        title: 'LinkedIn Video Downloader',
        subtitle: 'Save public LinkedIn video posts and accessible recordings with a developer-clean workflow.',
        placeholder: 'Paste LinkedIn video post URL',
        buttonLabel: 'Download',
        platforms: ['LinkedIn'],
        contentTypes: ['Video Posts', 'Live recordings', 'Public posts'],
        categoryLabel: 'LinkedIn Tools',
      }
    case 'telegram-video-downloader':
      return {
        title: 'Telegram Video Downloader',
        subtitle: 'Download public channel videos and media posts when the link is openly accessible.',
        placeholder: 'Paste Telegram public post URL',
        buttonLabel: 'Download',
        platforms: ['Telegram'],
        contentTypes: ['Channel videos', 'Public media', 'Posts'],
        categoryLabel: 'Telegram Tools',
      }
    case 'twitch-clip-downloader':
      return {
        title: 'Twitch Clip Downloader',
        subtitle: 'Download public Twitch clips, VOD links, and accessible stream media from one compact page.',
        placeholder: 'Paste Twitch clip or VOD URL',
        buttonLabel: 'Download',
        platforms: ['Twitch'],
        contentTypes: ['Clips', 'VODs', 'Streams'],
        categoryLabel: 'Twitch Tools',
      }
    case 'bilibili-downloader':
      return {
        title: 'Bilibili Downloader',
        subtitle: 'Download public Bilibili videos and supported stream media with quick format choices.',
        placeholder: 'Paste Bilibili video URL',
        buttonLabel: 'Download',
        platforms: ['Bilibili'],
        contentTypes: ['Videos', 'Streams', 'Clips'],
        categoryLabel: 'Bilibili Tools',
      }
    case 'likee-video-downloader':
      return {
        title: 'Likee Video Downloader',
        subtitle: 'Save public Likee short videos with automatic URL detection and clean direct actions.',
        placeholder: 'Paste Likee video URL',
        buttonLabel: 'Download',
        platforms: ['Likee'],
        contentTypes: ['Short videos', 'Audio', 'Thumbnails'],
        categoryLabel: 'Likee Tools',
      }
    case 'mxtakatak-downloader':
      return {
        title: 'MX TakaTak Downloader',
        subtitle: 'Download public MX TakaTak short videos when source media is available.',
        placeholder: 'Paste MX TakaTak video URL',
        buttonLabel: 'Download',
        platforms: ['MX TakaTak'],
        contentTypes: ['Short videos', 'Audio', 'Thumbnails'],
        categoryLabel: 'MX TakaTak Tools',
      }
    case 'sharechat-video-downloader':
      return {
        title: 'ShareChat Video Downloader',
        subtitle: 'Save public ShareChat and Moj short videos in a lightweight mobile-first downloader.',
        placeholder: 'Paste ShareChat or Moj video URL',
        buttonLabel: 'Download',
        platforms: ['ShareChat'],
        contentTypes: ['Videos', 'Moj shorts', 'Public posts'],
        categoryLabel: 'ShareChat Tools',
      }
    case 'roposo-video-downloader':
      return {
        title: 'Roposo Video Downloader',
        subtitle: 'Download public Roposo short videos with a simple paste, preview, and save flow.',
        placeholder: 'Paste Roposo video URL',
        buttonLabel: 'Download',
        platforms: ['Roposo'],
        contentTypes: ['Short videos', 'Posts', 'Audio'],
        categoryLabel: 'Roposo Tools',
      }
    case 'triller-video-downloader':
      return {
        title: 'Triller Video Downloader',
        subtitle: 'Save public Triller short videos using a clean stateless downloader workspace.',
        placeholder: 'Paste Triller video URL',
        buttonLabel: 'Download',
        platforms: ['Triller'],
        contentTypes: ['Short videos', 'Music clips', 'Posts'],
        categoryLabel: 'Triller Tools',
      }
    case 'all-in-one-video-downloader':
    default:
      return {
        title: 'All-in-One Video Downloader',
        subtitle: 'Download public videos from YouTube, TikTok, Instagram, X, Facebook, Pinterest, Reddit, Vimeo, and more in one common downloader.',
        placeholder: 'Paste any supported video URL',
        buttonLabel: 'Download',
        platforms: ['YouTube', 'TikTok', 'Instagram', 'Twitter / X', 'Facebook', 'Pinterest', 'Reddit'],
        contentTypes: ['Videos', 'Photos', 'Reels', 'Shorts', 'Pins', 'GIFs', 'Audio'],
        categoryLabel: 'Video Tools',
      }
  }
}

export default function VideoDownloaderClient({
  tool,
  route,
  routeTabs = [],
  relatedRoutes = [],
}: {
  tool?: Tool
  route?: DownloaderRouteEntry
  routeTabs?: DownloaderRouteTab[]
  relatedRoutes?: RelatedDownloaderRoute[]
}) {
  const config = useMemo(() => getDownloaderPageConfig(tool, route), [route, tool])
  const [url, setUrl] = useState('')
  const [info, setInfo] = useState<VideoInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null)
  const [mounted, setMounted] = useState(false)
  const downloadAbortControllerRef = useRef<AbortController | null>(null)
  const infoAbortControllerRef = useRef<AbortController | null>(null)
  const lastAutoRequestedUrlRef = useRef('')

  const mp4Options = useMemo(
    () => info?.videoFormats.filter(option => option.ext === 'mp4') || [],
    [info]
  )
  const webmOptions = useMemo(
    () => info?.videoFormats.filter(option => option.ext === 'webm') || [],
    [info]
  )
  const screenReaderStatus = useMemo(() => {
    if (error) return `Error: ${error}`
    if (loading) return 'Analyzing link and loading available formats.'
    if (downloadState?.phase === 'preparing') return 'Preparing your download.'
    if (downloadState?.phase === 'downloading' && typeof downloadState.progress === 'number') {
      return `Download in progress: ${downloadState.progress} percent.`
    }
    if (downloadState?.phase === 'downloading') return 'Download in progress.'
    if (info) return 'Download options are ready.'
    return 'Paste a link to analyze available download formats.'
  }, [downloadState, error, info, loading])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      downloadAbortControllerRef.current?.abort()
      infoAbortControllerRef.current?.abort()
    }
  }, [])

  const fetchInfo = useCallback(async (nextUrl?: string) => {
    const targetUrl = (nextUrl ?? url).trim()
    if (!targetUrl) return

    infoAbortControllerRef.current?.abort()
    const controller = new AbortController()
    infoAbortControllerRef.current = controller

    setLoading(true)
    setError('')
    setInfo(null)
    lastAutoRequestedUrlRef.current = targetUrl

    try {
      const res = await fetch(`/api/download/info?url=${encodeURIComponent(targetUrl)}`, {
        signal: controller.signal,
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to fetch download options')
        return
      }

      setInfo(data as VideoInfo)
      if ((data as VideoInfo).error) {
        toast.error((data as VideoInfo).error as string)
      }
    } catch (requestError) {
      if ((requestError as Error).name === 'AbortError') return
      setError(`Failed: ${(requestError as Error).message}`)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      setInfo(null)
      setError('')
      lastAutoRequestedUrlRef.current = ''
      return
    }

    if (!isSupportedVideoUrl(trimmedUrl)) {
      lastAutoRequestedUrlRef.current = ''
      return
    }

    if (loading || trimmedUrl === lastAutoRequestedUrlRef.current) return

    const timer = window.setTimeout(() => {
      void fetchInfo(trimmedUrl)
    }, 420)

    return () => window.clearTimeout(timer)
  }, [fetchInfo, loading, url])

  function clearDownloadState() {
    downloadAbortControllerRef.current = null
    setDownloadState(null)
  }

  function getServerDownloadUrl(option: DownloadOption): string {
    const params = new URLSearchParams({
      url,
      title: info?.safeTitle || info?.title || 'download',
      format: option.serverFormat || option.ext,
      quality: option.serverQuality || option.qualityLabel,
    })

    return `/api/download?${params.toString()}`
  }

  async function downloadFromServer(option: DownloadOption) {
    const controller = new AbortController()
    downloadAbortControllerRef.current = controller

    setDownloadState({ id: option.id, phase: 'preparing', progress: null })

    const response = await fetch(getServerDownloadUrl(option), {
      method: 'GET',
      signal: controller.signal,
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      throw new Error(data?.error || 'Download failed')
    }

    const total = Number(response.headers.get('content-length') || 0)
    const fallbackFilename = `${info?.safeTitle || 'download'}.${option.ext}`
    const filename = getFilenameFromDisposition(response.headers.get('content-disposition'), fallbackFilename)

    if (!response.body) {
      const blob = await response.blob()
      downloadBlob(blob, filename)
      return
    }

    const reader = response.body.getReader()
    const chunks: ArrayBuffer[] = []
    let loaded = 0

    setDownloadState({
      id: option.id,
      phase: 'downloading',
      progress: total > 0 ? 0 : null,
    })

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue

      chunks.push(Uint8Array.from(value).buffer)
      loaded += value.length

      if (total > 0) {
        setDownloadState({
          id: option.id,
          phase: 'downloading',
          progress: Math.min(100, Math.round((loaded / total) * 100)),
        })
      }
    }

    const blob = new Blob(chunks, {
      type: response.headers.get('content-type') || 'application/octet-stream',
    })

    downloadBlob(blob, filename)
  }

  async function startDownload(option: DownloadOption): Promise<boolean> {
    setError('')

    try {
      await downloadFromServer(option)
      setDownloadState({ id: option.id, phase: 'downloading', progress: 100 })
      toast.success('Download ready')
      window.setTimeout(clearDownloadState, 500)
      return true
    } catch (downloadError) {
      setError((downloadError as Error).message)
      clearDownloadState()
      return false
    }
  }

  async function copyOriginalLink() {
    if (!info?.webpage_url) return

    try {
      await navigator.clipboard.writeText(info.webpage_url)
      toast.success('Original link copied')
    } catch {
      toast.error('Unable to copy link')
    }
  }

  function getButtonLabel(option: DownloadOption): string {
    if (downloadState?.id !== option.id) return 'Download'
    if (downloadState.phase === 'opening') return 'Opening...'
    if (downloadState.phase === 'preparing') return 'Preparing...'
    if (typeof downloadState.progress === 'number') return `Downloading ${downloadState.progress}%`
    return 'Downloading...'
  }

  return (
    <PremiumPage>
      {mounted ? (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {screenReaderStatus}
        </p>
      ) : null}
      <div className="mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6 lg:px-6 md:pt-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <ToolBreadcrumb
            className="mb-0 min-w-0 flex-1"
            items={[
              { label: 'All Tools', href: '/tools' },
              { label: config.categoryLabel, href: '/tools/video' },
              { label: tool?.name || config.title },
            ]}
          />
          {tool ? <ToolActions slug={tool.slug} name={tool.name} className="mb-0 shrink-0" /> : null}
        </div>
      </div>

      <DownloaderHero
        url={url}
        loading={loading}
        hasResult={Boolean(info)}
        title={config.title}
        subtitle={config.subtitle}
        platforms={config.platforms}
        contentTypes={config.contentTypes}
        placeholder={config.placeholder}
        buttonLabel={config.buttonLabel}
        tabs={routeTabs}
        onUrlChange={setUrl}
        onAnalyze={() => void fetchInfo()}
      />

      {error ? (
        <div className="mx-auto mt-2 max-w-5xl px-4 lg:px-6">
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
          >
            {error}
          </div>
        </div>
      ) : null}

      {info ? (
        <DownloaderWorkspaceSection
          info={info}
          mp4Options={mp4Options}
          webmOptions={webmOptions}
          audioOptions={info.audioFormats || []}
          downloadState={downloadState}
          onDownload={startDownload}
          getButtonLabel={getButtonLabel}
          onCopyLink={copyOriginalLink}
        />
      ) : null}

      <DownloaderSeoSection route={route} relatedRoutes={relatedRoutes} />
      <DownloaderFaqSection compact toolName={config.title} platforms={config.platforms} contentTypes={config.contentTypes} items={route?.faq} />
    </PremiumPage>
  )
}
