'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import type { DownloadOption } from '@/lib/video-downloader'
import { PremiumPage } from '@/components/platform/premium/Surface'
import DownloaderFaqSection from '@/components/tools/downloader/DownloaderFaqSection'
import DownloaderFeaturesSection from '@/components/tools/downloader/DownloaderFeaturesSection'
import DownloaderHero from '@/components/tools/downloader/DownloaderHero'
import DownloaderHowToSection from '@/components/tools/downloader/DownloaderHowToSection'
import DownloaderWorkspaceSection from '@/components/tools/downloader/DownloaderWorkspaceSection'
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb'
import ToolActions from '@/components/tools/ToolActions'
import type { Tool } from '@/lib/tools-data'
import type { DownloadState, VideoInfo } from '@/components/tools/downloader/types'

type DownloaderPageConfig = {
  title: string
  subtitle: string
  placeholder: string
  buttonLabel: string
  platforms: string[]
  categoryLabel: string
}

const SUPPORTED_VIDEO_PATTERNS = [
  /(?:youtube\.com\/(?:watch|shorts|playlist|live)|youtu\.be\/)/i,
  /(?:tiktok\.com|vm\.tiktok\.com)\//i,
  /instagram\.com\/(?:reel|p|tv|stories|stories\/highlights)\//i,
  /(?:twitter\.com|x\.com)\/.+\/status\//i,
  /vimeo\.com\//i,
  /(?:facebook\.com|fb\.watch)\//i,
  /dailymotion\.com\/video/i,
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

function getDownloaderPageConfig(tool?: Tool): DownloaderPageConfig {
  switch (tool?.slug) {
    case 'instagram-video-downloader':
      return {
        title: 'Instagram Video Downloader',
        subtitle: 'Paste an Instagram reel, post, story, or highlight link and download it in a compact mobile-friendly flow.',
        placeholder: 'Paste Instagram reel, story, post, or highlight URL',
        buttonLabel: 'Fetch Instagram',
        platforms: ['Instagram'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-story-downloader':
      return {
        title: 'Instagram Story Downloader',
        subtitle: 'Quick story and highlight downloads with simple paste-and-save UX.',
        placeholder: 'Paste Instagram story or highlight URL',
        buttonLabel: 'Fetch Story',
        platforms: ['Instagram'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-post-downloader':
      return {
        title: 'Instagram Post Downloader',
        subtitle: 'Save public Instagram posts, videos, carousel media, and image pins with a simple paste-first workflow.',
        placeholder: 'Paste Instagram post URL',
        buttonLabel: 'Fetch Post',
        platforms: ['Instagram'],
        categoryLabel: 'Instagram Tools',
      }
    case 'instagram-reels-downloader':
      return {
        title: 'Instagram Reels Downloader',
        subtitle: 'Download Instagram reels, posts, and short video links without a cluttered workflow.',
        placeholder: 'Paste Instagram reel URL',
        buttonLabel: 'Fetch Reel',
        platforms: ['Instagram'],
        categoryLabel: 'Instagram Tools',
      }
    case 'tiktok-video-downloader':
      return {
        title: 'TikTok Video Downloader',
        subtitle: 'Paste a TikTok link and save video, audio, or thumbnail downloads in one place.',
        placeholder: 'Paste TikTok video URL',
        buttonLabel: 'Fetch TikTok',
        platforms: ['TikTok'],
        categoryLabel: 'TikTok Tools',
      }
    case 'youtube-shorts-downloader':
      return {
        title: 'YouTube Shorts Downloader',
        subtitle: 'Fast shorts downloads with MP4, MP3, and thumbnail options that work well on mobile.',
        placeholder: 'Paste YouTube Shorts URL',
        buttonLabel: 'Fetch Short',
        platforms: ['YouTube'],
        categoryLabel: 'YouTube Tools',
      }
    case 'youtube-playlist-downloader':
      return {
        title: 'YouTube Playlist Downloader',
        subtitle: 'Analyze public playlist links and fetch available media when the source supports it.',
        placeholder: 'Paste YouTube playlist URL',
        buttonLabel: 'Fetch Playlist',
        platforms: ['YouTube'],
        categoryLabel: 'YouTube Tools',
      }
    case 'youtube-video-downloader':
      return {
        title: 'YouTube Video Downloader',
        subtitle: 'Use one paste bar to grab YouTube video, audio, and thumbnail files with direct downloads.',
        placeholder: 'Paste YouTube video URL',
        buttonLabel: 'Fetch YouTube',
        platforms: ['YouTube'],
        categoryLabel: 'YouTube Tools',
      }
    case 'facebook-video-downloader':
      return {
        title: 'Facebook Video Downloader',
        subtitle: 'Download Facebook videos and reels with a cleaner compact layout and attachment downloads.',
        placeholder: 'Paste Facebook video or reel URL',
        buttonLabel: 'Fetch Facebook',
        platforms: ['Facebook'],
        categoryLabel: 'Facebook Tools',
      }
    case 'facebook-reels-downloader':
      return {
        title: 'Facebook Reels Downloader',
        subtitle: 'Download public Facebook reels and accessible short-form video links with a compact save flow.',
        placeholder: 'Paste Facebook reel URL',
        buttonLabel: 'Fetch Reel',
        platforms: ['Facebook'],
        categoryLabel: 'Facebook Tools',
      }
    case 'twitter-video-downloader':
      return {
        title: 'Twitter Video Downloader',
        subtitle: 'Save Twitter and X videos with a simple paste, fetch, and download flow.',
        placeholder: 'Paste Twitter or X post URL',
        buttonLabel: 'Fetch Tweet',
        platforms: ['Twitter / X'],
        categoryLabel: 'Twitter Tools',
      }
    case 'pinterest-video-downloader':
      return {
        title: 'Pinterest Video Downloader',
        subtitle: 'Save public video pins, idea pins, and image pins without a busy downloader layout.',
        placeholder: 'Paste Pinterest pin URL',
        buttonLabel: 'Fetch Pin',
        platforms: ['Pinterest'],
        categoryLabel: 'Pinterest Tools',
      }
    case 'reddit-video-downloader':
      return {
        title: 'Reddit Video Downloader',
        subtitle: 'Download public Reddit hosted videos, GIF posts, and supported embedded media.',
        placeholder: 'Paste Reddit post URL',
        buttonLabel: 'Fetch Reddit',
        platforms: ['Reddit'],
        categoryLabel: 'Reddit Tools',
      }
    case 'vimeo-video-downloader':
      return {
        title: 'Vimeo Video Downloader',
        subtitle: 'Download Vimeo video, audio, and thumbnail files with a compact professional UI.',
        placeholder: 'Paste Vimeo video URL',
        buttonLabel: 'Fetch Vimeo',
        platforms: ['Vimeo'],
        categoryLabel: 'Vimeo Tools',
      }
    case 'dailymotion-video-downloader':
      return {
        title: 'Dailymotion Video Downloader',
        subtitle: 'A neat downloader for Dailymotion links with quick format choices and clean mobile spacing.',
        placeholder: 'Paste Dailymotion video URL',
        buttonLabel: 'Fetch Video',
        platforms: ['Dailymotion'],
        categoryLabel: 'Dailymotion Tools',
      }
    case 'snapchat-downloader':
      return {
        title: 'Snapchat Downloader',
        subtitle: 'Fetch public Spotlight and story media when the content is accessible without login.',
        placeholder: 'Paste Snapchat public URL',
        buttonLabel: 'Fetch Snap',
        platforms: ['Snapchat'],
        categoryLabel: 'Snapchat Tools',
      }
    case 'linkedin-video-downloader':
      return {
        title: 'LinkedIn Video Downloader',
        subtitle: 'Save public LinkedIn video posts and accessible recordings with a developer-clean workflow.',
        placeholder: 'Paste LinkedIn video post URL',
        buttonLabel: 'Fetch LinkedIn',
        platforms: ['LinkedIn'],
        categoryLabel: 'LinkedIn Tools',
      }
    case 'telegram-video-downloader':
      return {
        title: 'Telegram Video Downloader',
        subtitle: 'Download public channel videos and media posts when the link is openly accessible.',
        placeholder: 'Paste Telegram public post URL',
        buttonLabel: 'Fetch Telegram',
        platforms: ['Telegram'],
        categoryLabel: 'Telegram Tools',
      }
    case 'twitch-clip-downloader':
      return {
        title: 'Twitch Clip Downloader',
        subtitle: 'Fetch public Twitch clips, VOD links, and accessible stream media from one compact page.',
        placeholder: 'Paste Twitch clip or VOD URL',
        buttonLabel: 'Fetch Twitch',
        platforms: ['Twitch'],
        categoryLabel: 'Twitch Tools',
      }
    case 'bilibili-downloader':
      return {
        title: 'Bilibili Downloader',
        subtitle: 'Download public Bilibili videos and supported stream media with quick format choices.',
        placeholder: 'Paste Bilibili video URL',
        buttonLabel: 'Fetch Bilibili',
        platforms: ['Bilibili'],
        categoryLabel: 'Bilibili Tools',
      }
    case 'likee-video-downloader':
      return {
        title: 'Likee Video Downloader',
        subtitle: 'Save public Likee short videos with automatic URL detection and clean direct actions.',
        placeholder: 'Paste Likee video URL',
        buttonLabel: 'Fetch Likee',
        platforms: ['Likee'],
        categoryLabel: 'Likee Tools',
      }
    case 'mxtakatak-downloader':
      return {
        title: 'MX TakaTak Downloader',
        subtitle: 'Download public MX TakaTak short videos when source media is available.',
        placeholder: 'Paste MX TakaTak video URL',
        buttonLabel: 'Fetch MX TakaTak',
        platforms: ['MX TakaTak'],
        categoryLabel: 'MX TakaTak Tools',
      }
    case 'sharechat-video-downloader':
      return {
        title: 'ShareChat Video Downloader',
        subtitle: 'Save public ShareChat and Moj short videos in a lightweight mobile-first downloader.',
        placeholder: 'Paste ShareChat or Moj video URL',
        buttonLabel: 'Fetch Media',
        platforms: ['ShareChat'],
        categoryLabel: 'ShareChat Tools',
      }
    case 'roposo-video-downloader':
      return {
        title: 'Roposo Video Downloader',
        subtitle: 'Download public Roposo short videos with a simple paste, preview, and save flow.',
        placeholder: 'Paste Roposo video URL',
        buttonLabel: 'Fetch Roposo',
        platforms: ['Roposo'],
        categoryLabel: 'Roposo Tools',
      }
    case 'triller-video-downloader':
      return {
        title: 'Triller Video Downloader',
        subtitle: 'Save public Triller short videos using a clean stateless downloader workspace.',
        placeholder: 'Paste Triller video URL',
        buttonLabel: 'Fetch Triller',
        platforms: ['Triller'],
        categoryLabel: 'Triller Tools',
      }
    case 'all-in-one-video-downloader':
    default:
      return {
        title: 'All-in-One Video Downloader',
        subtitle: 'Download public videos from YouTube, TikTok, Instagram, X, Facebook, Pinterest, Reddit, Vimeo, and more in one common downloader.',
        placeholder: 'Paste any supported video URL',
        buttonLabel: 'Fetch Video',
        platforms: ['YouTube', 'TikTok', 'Instagram', 'Twitter / X', 'Facebook', 'Pinterest', 'Reddit'],
        categoryLabel: 'Video Tools',
      }
  }
}

export default function VideoDownloaderClient({ tool }: { tool?: Tool }) {
  const config = useMemo(() => getDownloaderPageConfig(tool), [tool])
  const [url, setUrl] = useState('')
  const [info, setInfo] = useState<VideoInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null)
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

  async function startDownload(option: DownloadOption) {
    setError('')

    try {
      await downloadFromServer(option)
      setDownloadState({ id: option.id, phase: 'downloading', progress: 100 })
      toast.success('Download ready')
      window.setTimeout(clearDownloadState, 500)
    } catch (downloadError) {
      setError((downloadError as Error).message)
      clearDownloadState()
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
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-6 md:pt-8">
        <div className="mb-4 flex items-start justify-between gap-3">
          <ToolBreadcrumb
            className="mb-0 flex-1"
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
        placeholder={config.placeholder}
        buttonLabel={config.buttonLabel}
        onUrlChange={setUrl}
        onAnalyze={() => void fetchInfo()}
      />

      {error ? (
        <div className="mx-auto -mt-2 max-w-5xl px-4 lg:px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">
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

      <DownloaderHowToSection compact />
      <DownloaderFeaturesSection compact />
      <DownloaderFaqSection compact />
    </PremiumPage>
  )
}
