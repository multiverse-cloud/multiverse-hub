import Image from 'next/image'
import { Clock3, Copy, ExternalLink, Eye, Heart, Play } from 'lucide-react'
import type { DownloadOption } from '@/lib/video-downloader'
import {
  PremiumContainer,
  PremiumPanel,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import type { DownloadState, VideoInfo } from './types'
import DownloadActionButton from './DownloadActionButton'
import { formatDuration, formatUploadDate, formatViews } from './helpers'

interface Props {
  info: VideoInfo | null
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
  onCopyLink: () => void
}

export default function DownloaderResultSection({
  info,
  downloadState,
  onDownload,
  getButtonLabel,
  onCopyLink,
}: Props) {
  const primaryThumbnailOption = info?.thumbnailDownloads[0]
  const thumbnailBusy = primaryThumbnailOption && downloadState?.id === primaryThumbnailOption.id

  return (
    <PremiumSection muted className="py-20">
      <PremiumContainer className="max-w-6xl">
        <PremiumSectionHeader
          title="Download Result Preview"
          description="Preview the source before saving formats, audio or thumbnails."
          className="mb-10"
        />

        <PremiumPanel className="overflow-hidden p-6 md:p-8 lg:p-10">
          {!info ? (
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-900">
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-300">
                    <Play className="h-8 w-8 fill-current" />
                  </div>
                  <p className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">Paste a link to load the preview</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Ready for video details
                </div>
                <div className="space-y-3">
                  <div className="h-5 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-1/3 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {['Views', 'Likes', 'Duration', 'Published'].map(item => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{item}</p>
                      <p className="mt-2 font-display text-lg font-extrabold text-slate-900 dark:text-slate-50">--</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500"
                  >
                    Open Original
                  </button>
                  <button
                    type="button"
                    disabled
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500"
                  >
                    Thumbnail
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="group relative">
                <div className="relative aspect-video overflow-hidden rounded-[18px] shadow-[0_20px_40px_-28px_rgba(15,23,42,0.28)]">
                  <Image
                    src={info.thumbnailHQ || info.thumbnail || ''}
                    alt={info.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
                      <Play className="h-8 w-8 fill-white text-white" />
                    </div>
                  </div>
                  {info.duration > 0 && (
                    <div className="absolute bottom-4 right-4 rounded-xl bg-black/80 px-3 py-1.5 font-mono text-xs text-white">
                      {formatDuration(info.duration)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                      {info.platform}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Source</span>
                  </div>

                  <h2 className="font-display text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl dark:text-slate-50">
                    {info.title}
                  </h2>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-display text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {info.uploader.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-slate-950 dark:text-slate-50">{info.uploader}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Publisher</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Views</p>
                      <p className="mt-2 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50">{formatViews(info.viewCount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Likes</p>
                      <p className="mt-2 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50">{formatViews(info.likeCount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Duration</p>
                      <p className="mt-2 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50">{formatDuration(info.duration)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Published</p>
                      <p className="mt-2 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50">{formatUploadDate(info.uploadDate) || '--'}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      {formatViews(info.viewCount)} views
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Heart className="h-4 w-4" />
                      {formatViews(info.likeCount)} likes
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {formatDuration(info.duration)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={info.webpage_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Original
                  </a>

                  {primaryThumbnailOption ? (
                    <DownloadActionButton
                      optionId={primaryThumbnailOption.id}
                      label={getButtonLabel(primaryThumbnailOption)}
                      busy={Boolean(thumbnailBusy)}
                      disabled={downloadState !== null && !thumbnailBusy}
                      onClick={() => onDownload(primaryThumbnailOption)}
                      compact
                    />
                  ) : null}

                  <button
                    type="button"
                    onClick={onCopyLink}
                    className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    aria-label="Copy original link"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </PremiumPanel>
      </PremiumContainer>
    </PremiumSection>
  )
}
