'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
import { UsageHintBanner } from '@/components/auth/LoginGateModal'
import type { Tool } from '@/lib/tools-data'
import type { DownloadState, VideoInfo } from '@/components/tools/downloader/types'

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
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
}

export default function VideoDownloaderClient({ tool }: { tool?: Tool }) {
  const [url, setUrl] = useState('')
  const [info, setInfo] = useState<VideoInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadState, setDownloadState] = useState<DownloadState | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

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
      abortControllerRef.current?.abort()
    }
  }, [])

  async function fetchInfo() {
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setInfo(null)

    try {
      const res = await fetch(`/api/download/info?url=${encodeURIComponent(url)}`)
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
      setError(`Failed: ${(requestError as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  function clearDownloadState() {
    abortControllerRef.current = null
    setDownloadState(null)
  }

  function triggerLink(href: string, direct = false) {
    if (direct) {
      const opened = window.open(href, '_blank', 'noopener,noreferrer')
      if (opened) return
    }
    window.location.assign(href)
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
    abortControllerRef.current = controller

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
      if (option.delivery === 'direct') {
        if (!option.cdnUrl) {
          setError('Download link unavailable. Refresh the result and try again.')
          return
        }

        setDownloadState({ id: option.id, phase: 'opening', progress: null })
        triggerLink(option.cdnUrl, true)
        window.setTimeout(clearDownloadState, 1000)
        return
      }

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
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-6 md:pt-10">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <ToolBreadcrumb
            className="mb-0"
            items={[
              { label: 'All Tools', href: '/tools' },
              { label: 'Video Tools', href: '/tools/video' },
              { label: tool?.name || 'Video Downloader' },
            ]}
          />
          {tool ? <ToolActions slug={tool.slug} name={tool.name} className="mb-0 w-full justify-start lg:w-auto lg:justify-end" /> : null}
        </div>
        <UsageHintBanner />
      </div>

      <DownloaderHero
        url={url}
        loading={loading}
        hasResult={Boolean(info)}
        onUrlChange={setUrl}
        onAnalyze={fetchInfo}
      />

      {error ? (
        <div className="mx-auto -mt-4 max-w-5xl px-4 lg:px-6">
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

      <DownloaderHowToSection />
      <DownloaderFeaturesSection />
      <DownloaderFaqSection />
    </PremiumPage>
  )
}
