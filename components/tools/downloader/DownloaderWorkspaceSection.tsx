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
    <div className="rounded-[20px] border border-slate-200/70 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mb-3 flex items-start gap-3">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', GROUP_STYLES[tone].icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn('h-2 w-2 rounded-full', GROUP_STYLES[tone].dot)} />
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              {title}
            </p>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>

      <div className="space-y-2.5">
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
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[26px] border border-slate-200/70 bg-white p-4 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-5">
            <div className="relative aspect-video overflow-hidden rounded-[20px] bg-slate-100 dark:bg-slate-950">
              <Image
                src={previewImage || ''}
                alt={info.title}
                fill
                sizes="(max-width: 1279px) 100vw, 520px"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/35 via-transparent to-transparent">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-indigo-600 shadow-xl shadow-slate-900/10">
                  <Play className="h-7 w-7 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-white backdrop-blur">
                {formatDuration(info.duration)}
              </div>
            </div>

            <div className="pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {info.platform}
                </span>
              </div>

              <h2 className="line-clamp-2 font-display text-[28px] font-extrabold leading-tight text-slate-950 dark:text-slate-50">
                {info.title}
              </h2>

              <div className="mt-4 grid grid-cols-3 gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/70">
                  <Eye className="h-4 w-4" />
                  {formatViews(info.viewCount)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/70">
                  <Heart className="h-4 w-4" />
                  {formatViews(info.likeCount)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950/70">
                  <Sparkles className="h-4 w-4" />
                  {formatUploadDate(info.uploadDate) || '--'}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={info.webpage_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-[168px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:hover:bg-slate-950"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Original
                </a>
                <button
                  type="button"
                  onClick={onCopyLink}
                  className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                  aria-label="Copy original link"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/70 bg-white p-4 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.24)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-5">
            <div className="mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Available Downloads
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-slate-950 dark:text-slate-50">
                  Formats
                </h3>
              </div>
            </div>

            <div className="grid gap-3.5 lg:grid-cols-2">
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

              <div className="rounded-[20px] border border-slate-200/70 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="mb-3 flex items-start gap-3">
                  <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl', GROUP_STYLES[thumbnailTone].icon)}>
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', GROUP_STYLES[thumbnailTone].dot)} />
                      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        Thumbnail Downloads
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Image downloads</p>
                  </div>
                </div>

                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-950">
                  <Image
                    src={previewImage || ''}
                    alt={`${info.title} thumbnail preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-2.5">
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
