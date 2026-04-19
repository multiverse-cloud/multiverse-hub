import Image from 'next/image'
import {
  Clapperboard,
  Copy,
  ExternalLink,
  Eye,
  Headphones,
  Heart,
  ImageIcon,
  Play,
  Sparkles,
} from 'lucide-react'
import type { DownloadOption } from '@/lib/video-downloader'
import { PremiumContainer } from '@/components/platform/premium/Surface'
import { cn } from '@/lib/utils'
import type { DownloadState, VideoInfo } from './types'
import DownloadActionButton from './DownloadActionButton'
import { formatDuration, formatUploadDate, formatViews } from './helpers'

interface Props {
  info: VideoInfo
  mp4Options: DownloadOption[]
  webmOptions: DownloadOption[]
  audioOptions: DownloadOption[]
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
  onCopyLink: () => void
}

type GroupTone = 'indigo' | 'emerald' | 'slate'

const GROUP_STYLES: Record<
  GroupTone,
  {
    dot: string
    icon: string
    badge: string
  }
> = {
  indigo: {
    dot: 'bg-indigo-500',
    icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300',
    badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  },
  emerald: {
    dot: 'bg-emerald-500',
    icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  },
  slate: {
    dot: 'bg-slate-400',
    icon: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  },
}

function CompactDownloadRow({
  option,
  tone,
  downloadState,
  onDownload,
  getButtonLabel,
}: {
  option: DownloadOption
  tone: GroupTone
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
}) {
  const isBusy = downloadState?.id === option.id
  const isDisabled = downloadState !== null && !isBusy

  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-slate-200/80 bg-white/80 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-black uppercase tracking-[0.08em]',
          GROUP_STYLES[tone].badge
        )}
      >
        {option.qualityLabel.replace(/[^0-9A-Za-z]/g, '').slice(0, 3) || option.ext.toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[15px] font-extrabold text-slate-950 dark:text-slate-50">
          {option.qualityLabel}
        </p>
        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          {option.filesizeMB ? `${option.filesizeMB} MB` : 'Ready to download'}
        </p>
      </div>

      <DownloadActionButton
        optionId={option.id}
        label={getButtonLabel(option)}
        busy={isBusy}
        disabled={isDisabled}
        onClick={() => onDownload(option)}
        tone={tone === 'indigo' ? 'primary' : 'secondary'}
        compact
      />
    </div>
  )
}

function DownloadGroup({
  title,
  description,
  options,
  tone,
  icon: Icon,
  downloadState,
  onDownload,
  getButtonLabel,
}: {
  title: string
  description: string
  options: DownloadOption[]
  tone: GroupTone
  icon: typeof Clapperboard
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
}) {
  return (
    <div className="rounded-[16px] border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60 sm:rounded-[20px] sm:p-3.5">
      <div className="mb-2.5 flex items-start gap-2.5 sm:mb-3 sm:gap-3">
        <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', GROUP_STYLES[tone].icon) + ' sm:h-11 sm:w-11 sm:rounded-2xl'}>
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn('h-1.5 w-1.5 rounded-full', GROUP_STYLES[tone].dot)} />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-[11px] sm:tracking-[0.24em]">
              {title}
            </p>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs">{description}</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-2.5">
        {options.map(option => (
          <CompactDownloadRow
            key={option.id}
            option={option}
            tone={tone}
            downloadState={downloadState}
            onDownload={onDownload}
            getButtonLabel={getButtonLabel}
          />
        ))}
      </div>
    </div>
  )
}

export default function DownloaderWorkspaceSection({
  info,
  mp4Options,
  webmOptions,
  audioOptions,
  downloadState,
  onDownload,
  getButtonLabel,
  onCopyLink,
}: Props) {
  const previewImage = info.thumbnailHQ || info.thumbnail
  const thumbnailTone: GroupTone = 'indigo'

  return (
    <section className="-mt-2 pb-14 pt-4 md:-mt-4 md:pb-16 md:pt-6">
      <PremiumContainer className="max-w-7xl">
        <div className="grid gap-4 md:gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          {/* Video Preview Card */}
          <div className="rounded-[20px] border border-slate-200/70 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-4">
            <div className="relative aspect-video overflow-hidden rounded-[16px] bg-slate-100 dark:bg-slate-950">
              <Image
                src={previewImage || ''}
                alt={info.title}
                fill
                sizes="(max-width: 1279px) 100vw, 520px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/40 via-transparent to-transparent">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-xl shadow-slate-900/15">
                  <Play className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 rounded-full bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
                {formatDuration(info.duration)}
              </div>
            </div>

            <div className="pt-4">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {info.platform}
                </span>
              </div>

              <h2 className="line-clamp-2 font-display text-xl font-extrabold leading-tight text-slate-950 dark:text-slate-50 sm:text-2xl lg:text-[28px]">
                {info.title}
              </h2>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 dark:bg-slate-950/70 sm:px-3 sm:py-2">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {formatViews(info.viewCount)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 dark:bg-slate-950/70 sm:px-3 sm:py-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {formatViews(info.likeCount)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1.5 dark:bg-slate-950/70 sm:px-3 sm:py-2">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {formatUploadDate(info.uploadDate) || '--'}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2.5 sm:mt-4 sm:gap-3">
                <a
                  href={info.webpage_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:bg-slate-950 sm:min-w-[168px] sm:px-5 sm:py-3 sm:text-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Open Original
                </a>
                <button
                  type="button"
                  onClick={onCopyLink}
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:h-[50px] sm:w-[50px]"
                  aria-label="Copy original link"
                >
                  <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="rounded-[20px] border border-slate-200/70 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-4">
            <div className="mb-3 sm:mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-[11px]">
                  Available Downloads
                </p>
                <h3 className="mt-0.5 font-display text-xl font-extrabold text-slate-950 dark:text-slate-50 sm:text-2xl">
                  Formats
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-3.5">
              <DownloadGroup
                title="Video Formats (MP4)"
                description="MP4 downloads"
                options={mp4Options}
                tone="indigo"
                icon={Clapperboard}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <DownloadGroup
                title="WEBM Video"
                description="WEBM downloads"
                options={webmOptions}
                tone="emerald"
                icon={Sparkles}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <DownloadGroup
                title="Audio Files"
                description="Audio downloads"
                options={audioOptions}
                tone="slate"
                icon={Headphones}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <div className="rounded-[16px] border border-slate-200/70 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60 sm:rounded-[20px] sm:p-3.5">
                <div className="mb-2.5 flex items-start gap-2.5 sm:mb-3 sm:gap-3">
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', GROUP_STYLES[thumbnailTone].icon) + ' sm:h-11 sm:w-11 sm:rounded-2xl'}>
                    <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-1.5 w-1.5 rounded-full', GROUP_STYLES[thumbnailTone].dot)} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-[11px] sm:tracking-[0.24em]">
                        Thumbnail Downloads
                      </p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs">Image downloads</p>
                  </div>
                </div>

                <div className="relative mb-2.5 aspect-[16/9] overflow-hidden rounded-[14px] bg-slate-100 dark:bg-slate-950 sm:mb-3 sm:rounded-[18px]">
                  <Image
                    src={previewImage || ''}
                    alt={`${info.title} thumbnail preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-2 sm:space-y-2.5">
                  {info.thumbnailDownloads.map(option => (
                    <CompactDownloadRow
                      key={option.id}
                      option={option}
                      tone={thumbnailTone}
                      downloadState={downloadState}
                      onDownload={onDownload}
                      getButtonLabel={getButtonLabel}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PremiumContainer>
    </section>
  )
}
