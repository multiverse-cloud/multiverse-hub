import { Clapperboard, Headphones, Sparkles } from 'lucide-react'
import type { DownloadOption } from '@/lib/video-downloader'
import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import DownloadOptionRow from './DownloadOptionRow'
import type { DownloadState, VideoInfo } from './types'

interface Props {
  info: VideoInfo | null
  mp4Options: DownloadOption[]
  webmOptions: DownloadOption[]
  audioOptions: DownloadOption[]
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
}

const PLACEHOLDER_GROUPS = {
  mp4: [
    { id: 'placeholder-mp4-1080', ext: 'MP4', title: '1080p', meta: '42.5 MB' },
    { id: 'placeholder-mp4-720', ext: 'MP4', title: '720p', meta: '28.1 MB' },
    { id: 'placeholder-mp4-480', ext: 'MP4', title: '480p', meta: '12.4 MB' },
    { id: 'placeholder-mp4-360', ext: 'MP4', title: '360p', meta: '8.8 MB' },
  ],
  webm: [
    { id: 'placeholder-webm-4k', ext: 'WEBM', title: '4K', meta: '215.8 MB' },
    { id: 'placeholder-webm-2k', ext: 'WEBM', title: '2K', meta: '108.4 MB' },
  ],
  audio: [
    { id: 'placeholder-mp3', ext: 'MP3', title: 'MP3', meta: '320 kbps' },
    { id: 'placeholder-m4a', ext: 'M4A', title: 'M4A', meta: 'High quality' },
  ],
}

function PlaceholderRow({
  ext,
  title,
  meta,
}: {
  ext: string
  title: string
  meta: string
}) {
  return (
    <div className="rounded-[18px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{ext}</p>
          <h4 className="font-display text-base font-extrabold text-slate-950 dark:text-slate-50">{title}</h4>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{meta}</span>
      </div>
    </div>
  )
}

function FormatGroup({
  icon: Icon,
  title,
  description,
  accentClass,
  options,
  placeholders,
  downloadState,
  onDownload,
  getButtonLabel,
  tone = 'indigo',
}: {
  icon: typeof Clapperboard
  title: string
  description: string
  accentClass: string
  options: DownloadOption[]
  placeholders: Array<{ id: string; ext: string; title: string; meta: string }>
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
  tone?: 'indigo' | 'emerald'
}) {
  const hasOptions = options.length > 0

  return (
    <PremiumCard className="overflow-hidden">
      <div className="border-b border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/70">
        <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl font-extrabold text-slate-950 dark:text-slate-50">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>

      <div className="space-y-3 p-4">
        {hasOptions
          ? options.map(option => (
              <DownloadOptionRow
                key={option.id}
                option={option}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
                tone={tone}
              />
            ))
          : placeholders.map(item => (
              <PlaceholderRow key={item.id} ext={item.ext} title={item.title} meta={item.meta} />
            ))}
      </div>
    </PremiumCard>
  )
}

export default function DownloaderFormatsSection({
  info,
  mp4Options,
  webmOptions,
  audioOptions,
  downloadState,
  onDownload,
  getButtonLabel,
}: Props) {
  return (
    <PremiumSection className="py-20">
      <PremiumContainer>
        <PremiumSectionHeader
          align="center"
          title="Available Download Formats"
          description="Choose the format and resolution that best fits the file you want to save."
          className="mb-12"
        />

        <div className="grid gap-8 xl:grid-cols-3">
          <FormatGroup
            icon={Clapperboard}
            title="MP4 Video"
            description="360p, 480p, 720p and 1080p with audio."
            accentClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"
            options={info ? mp4Options : []}
            placeholders={PLACEHOLDER_GROUPS.mp4}
            downloadState={downloadState}
            onDownload={onDownload}
            getButtonLabel={getButtonLabel}
          />

          <FormatGroup
            icon={Sparkles}
            title="WEBM Video"
            description="2K and 4K quality where available."
            accentClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
            options={info ? webmOptions : []}
            placeholders={PLACEHOLDER_GROUPS.webm}
            downloadState={downloadState}
            onDownload={onDownload}
            getButtonLabel={getButtonLabel}
            tone="emerald"
          />

          <FormatGroup
            icon={Headphones}
            title="Audio Files"
            description="MP3 and M4A output for music and speech."
            accentClass="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            options={info ? audioOptions : []}
            placeholders={PLACEHOLDER_GROUPS.audio}
            downloadState={downloadState}
            onDownload={onDownload}
            getButtonLabel={getButtonLabel}
          />
        </div>
      </PremiumContainer>
    </PremiumSection>
  )
}
