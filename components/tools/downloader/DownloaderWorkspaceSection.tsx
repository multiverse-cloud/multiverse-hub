import Image from "next/image";
import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  Copy,
  ExternalLink,
  Eye,
  FileAudio2,
  FileVideo2,
  ImageDown,
  Layers3,
} from "lucide-react";
import type { DownloadOption } from "@/lib/video-downloader";
import { PremiumContainer } from "@/components/platform/premium/Surface";
import { cn } from "@/lib/utils";
import type { DownloadState, VideoInfo } from "./types";
import DownloadActionButton from "./DownloadActionButton";
import { formatDuration, formatUploadDate, formatViews } from "./helpers";

interface Props {
  info: VideoInfo;
  mp4Options: DownloadOption[];
  webmOptions: DownloadOption[];
  audioOptions: DownloadOption[];
  downloadState: DownloadState | null;
  onDownload: (option: DownloadOption) => Promise<boolean>;
  getButtonLabel: (option: DownloadOption) => string;
  onCopyLink: () => void;
}

type Tone = "video" | "audio" | "image" | "web";

const TONE_STYLES: Record<Tone, { icon: string; pill: string; button: "primary" | "secondary" }> = {
  video: {
    icon: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    pill: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    button: "primary",
  },
  audio: {
    icon: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    button: "secondary",
  },
  image: {
    icon: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    pill: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    button: "secondary",
  },
  web: {
    icon: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    pill: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    button: "secondary",
  },
};

function MetaItem({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
      <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      {label}
    </span>
  );
}

function EmptyFormatState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3.5 py-4 text-sm font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
      {label}
    </div>
  );
}

function FormatRow({
  option,
  tone,
  icon: Icon,
  downloadState,
  onDownload,
  getButtonLabel,
}: {
  option: DownloadOption;
  tone: Tone;
  icon: LucideIcon;
  downloadState: DownloadState | null;
  onDownload: (option: DownloadOption) => void;
  getButtonLabel: (option: DownloadOption) => string;
}) {
  const isBusy = downloadState?.id === option.id;
  const isDisabled = downloadState !== null && !isBusy;
  const styles = TONE_STYLES[tone];

  return (
    <div className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200/80 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-24px_rgba(15,23,42,0.42)] motion-reduce:hover:translate-y-0 motion-reduce:transition-none dark:bg-slate-950/70 dark:ring-slate-800 sm:p-3.5">
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", styles.icon)}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-bold text-slate-950 dark:text-slate-50">
            {option.label || option.qualityLabel}
          </p>
          <span className={cn("hidden rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] sm:inline-flex", styles.pill)}>
            {option.ext}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
          {option.filesizeMB ? `${option.filesizeMB} MB` : `${option.qualityLabel} ready`}
        </p>
      </div>

      <DownloadActionButton
        optionId={option.id}
        label={getButtonLabel(option)}
        busy={isBusy}
        disabled={isDisabled}
        onClick={() => onDownload(option)}
        tone={styles.button}
        compact
      />
    </div>
  );
}

function FormatSection({
  title,
  subtitle,
  icon,
  tone,
  options,
  emptyLabel,
  downloadState,
  onDownload,
  getButtonLabel,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone: Tone;
  options: DownloadOption[];
  emptyLabel: string;
  downloadState: DownloadState | null;
  onDownload: (option: DownloadOption) => void;
  getButtonLabel: (option: DownloadOption) => string;
}) {
  const HeaderIcon = icon;

  return (
    <section className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES[tone].icon)}>
          <HeaderIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold text-slate-950 dark:text-slate-50">{title}</h3>
          <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-2">
        {options.length > 0 ? (
          options.map((option) => (
            <FormatRow
              key={option.id}
              option={option}
              tone={tone}
              icon={icon}
              downloadState={downloadState}
              onDownload={onDownload}
              getButtonLabel={getButtonLabel}
            />
          ))
        ) : (
          <EmptyFormatState label={emptyLabel} />
        )}
      </div>
    </section>
  );
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
  const previewImage = info.thumbnailHQ || info.thumbnail;
  const primaryThumbnail = info.thumbnailDownloads[0] || null;
  const thumbnailBusy = primaryThumbnail ? downloadState?.id === primaryThumbnail.id : false;
  const stableMp4Options = useMemo(() => mp4Options, [mp4Options]);
  const stableWebmOptions = useMemo(() => webmOptions, [webmOptions]);
  const stableAudioOptions = useMemo(() => audioOptions, [audioOptions]);
  const formatCount = mp4Options.length + webmOptions.length + audioOptions.length;

  return (
    <section className="bg-white pb-10 pt-5 dark:bg-slate-950 sm:pb-14 sm:pt-6">
      <PremiumContainer className="max-w-6xl px-4 sm:px-6">
        <div className="space-y-5">
          <article className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70 dark:bg-slate-900/55 dark:ring-slate-800 sm:p-4">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center">
              <div className="min-w-0 space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 ring-1 ring-slate-200/80 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  {info.platform}
                </div>
                <div>
                  <h2 className="line-clamp-2 text-base font-black leading-snug tracking-tight text-slate-950 dark:text-white sm:text-xl">
                    {info.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <MetaItem icon={Clock3} label={formatDuration(info.duration)} />
                    <MetaItem icon={Eye} label={formatViews(info.viewCount)} />
                    <MetaItem icon={CalendarDays} label={formatUploadDate(info.uploadDate)} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onCopyLink}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white px-3 text-xs font-bold text-slate-800 ring-1 ring-slate-200/80 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 motion-reduce:transition-none dark:bg-slate-950 dark:text-slate-100 dark:ring-slate-800 dark:hover:bg-slate-900"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy link
                  </button>
                  <a
                    href={info.webpage_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-slate-950 px-3 text-xs font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/70 motion-reduce:transition-none dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    Original
                  </a>
                </div>
              </div>

              <div className="relative h-28 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-28">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={`${info.title} thumbnail`}
                    fill
                    sizes="(max-width: 640px) 100vw, 180px"
                    className="object-cover"
                    unoptimized
                  />
                ) : null}
              </div>
            </div>
          </article>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                    Select format
                  </p>
                  <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-slate-50">
                    Download options
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatCount} formats
                </span>
              </div>

              <FormatSection
                title="MP4 video"
                subtitle="Best compatibility, audio included"
                icon={FileVideo2}
                tone="video"
                options={stableMp4Options}
                emptyLabel="No MP4 formats were detected for this source."
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <FormatSection
                title="WEBM video"
                subtitle="High quality web-native exports"
                icon={FileVideo2}
                tone="web"
                options={stableWebmOptions}
                emptyLabel="No WEBM variants are available for this source."
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <FormatSection
                title="Audio"
                subtitle="Extract MP3 or M4A audio"
                icon={FileAudio2}
                tone="audio"
                options={stableAudioOptions}
                emptyLabel="Audio-only downloads are not available for this link."
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />
            </div>

            <aside className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/70 dark:bg-slate-900/55 dark:ring-slate-800">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.image.icon)}>
                    <ImageDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-950 dark:text-slate-50">Thumbnail</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">HD cover image</p>
                  </div>
                </div>
                {primaryThumbnail ? (
                  <DownloadActionButton
                    optionId={primaryThumbnail.id}
                    label={getButtonLabel(primaryThumbnail)}
                    busy={Boolean(thumbnailBusy)}
                    disabled={downloadState !== null && !thumbnailBusy}
                    onClick={() => onDownload(primaryThumbnail)}
                    tone="secondary"
                    compact
                  />
                ) : null}
              </div>

              <div className="relative mt-3 aspect-video overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={`${info.title} cover image`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 300px"
                    className="object-cover"
                    unoptimized
                  />
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </PremiumContainer>
    </section>
  );
}
