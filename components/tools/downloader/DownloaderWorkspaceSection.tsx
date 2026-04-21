import Image from "next/image";
import {
  CalendarDays,
  Clapperboard,
  Copy,
  ExternalLink,
  Eye,
  Headphones,
  Heart,
  ImageIcon,
  Play,
  Sparkles,
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
  onDownload: (option: DownloadOption) => void;
  getButtonLabel: (option: DownloadOption) => string;
  onCopyLink: () => void;
}

type GroupTone = "indigo" | "emerald" | "slate";

const GROUP_STYLES: Record<
  GroupTone,
  {
    dot: string;
    icon: string;
    badge: string;
    ring: string;
  }
> = {
  indigo: {
    dot: "bg-indigo-500",
    icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",
    badge:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
    ring: "ring-indigo-200/60 dark:ring-indigo-800/40",
  },
  emerald: {
    dot: "bg-emerald-500",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    ring: "ring-emerald-200/60 dark:ring-emerald-800/40",
  },
  slate: {
    dot: "bg-slate-400",
    icon: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    ring: "ring-slate-200/60 dark:ring-slate-700/40",
  },
};

function CompactDownloadRow({
  option,
  tone,
  downloadState,
  onDownload,
  getButtonLabel,
}: {
  option: DownloadOption;
  tone: GroupTone;
  downloadState: DownloadState | null;
  onDownload: (option: DownloadOption) => void;
  getButtonLabel: (option: DownloadOption) => string;
}) {
  const isBusy = downloadState?.id === option.id;
  const isDisabled = downloadState !== null && !isBusy;

  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950/70 sm:gap-3 sm:p-2.5">
      {/* Quality badge */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-[0.06em] sm:h-10 sm:w-10 sm:rounded-[14px] sm:text-[11px]",
          GROUP_STYLES[tone].badge,
        )}
      >
        {option.qualityLabel.replace(/[^0-9A-Za-z]/g, "").slice(0, 3) ||
          option.ext.toUpperCase()}
      </div>

      {/* Label + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-extrabold text-slate-950 dark:text-slate-50 sm:text-[14px]">
          {option.qualityLabel}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 sm:text-xs">
          {option.filesizeMB ? `${option.filesizeMB} MB` : "Ready to download"}
        </p>
      </div>

      <DownloadActionButton
        optionId={option.id}
        label={getButtonLabel(option)}
        busy={isBusy}
        disabled={isDisabled}
        onClick={() => onDownload(option)}
        tone={tone === "indigo" ? "primary" : "secondary"}
        compact
      />
    </div>
  );
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
  title: string;
  description: string;
  options: DownloadOption[];
  tone: GroupTone;
  icon: typeof Clapperboard;
  downloadState: DownloadState | null;
  onDownload: (option: DownloadOption) => void;
  getButtonLabel: (option: DownloadOption) => string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-slate-50/80 p-3 ring-1 dark:border-slate-800 dark:bg-slate-950/50 sm:rounded-[20px] sm:p-3.5",
        "border-slate-200/70",
        GROUP_STYLES[tone].ring,
      )}
    >
      {/* Group header */}
      <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3 sm:gap-3">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl",
            GROUP_STYLES[tone].icon,
          )}
        >
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full",
                GROUP_STYLES[tone].dot,
              )}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:text-[11px]">
              {title}
            </p>
          </div>
          <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">
            {description}
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-2 sm:space-y-2.5">
        {options.map((option) => (
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
  const thumbnailTone: GroupTone = "indigo";

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white pb-10 pt-2 dark:from-slate-900 dark:to-slate-950 md:pb-12 md:pt-3">
      <PremiumContainer className="max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-5">
          {/* ── LEFT: Video Preview Card ── */}
          <div className="flex flex-col rounded-[22px] border border-slate-200/70 bg-white p-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-4 lg:p-4">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-slate-100 dark:bg-slate-950 sm:rounded-[18px]">
              <Image
                src={previewImage || ""}
                alt={info.title}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
                unoptimized
              />
              {/* Gradient overlay + play button */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/50 via-transparent to-transparent">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-xl shadow-slate-900/20 sm:h-14 sm:w-14">
                  <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                </div>
              </div>
              {/* Duration pill */}
              <div className="absolute bottom-2.5 right-2.5 rounded-full bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:text-xs">
                {formatDuration(info.duration)}
              </div>
            </div>

            {/* Meta */}
            <div className="mt-3 flex-1 sm:mt-4">
              {/* Platform badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                <span className="h-1 w-1 rounded-full bg-indigo-500" />
                {info.platform}
              </span>

              {/* Title */}
              <h2 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-slate-950 dark:text-slate-50 sm:mt-2.5 sm:text-xl lg:text-2xl">
                {info.title}
              </h2>

              {/* Stats row */}
              <div className="mt-3 flex flex-wrap gap-2 sm:mt-3.5 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
                  <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden xs:inline">Views&nbsp;</span>
                  {formatViews(info.viewCount)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                  <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="hidden xs:inline">Likes&nbsp;</span>
                  {formatViews(info.likeCount)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                  <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  {formatUploadDate(info.uploadDate) || "--"}
                </span>
              </div>

              {/* Action buttons */}
              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-3.5 sm:gap-2.5">
                {/* Copy link — prominent */}
                <button
                  type="button"
                  onClick={onCopyLink}
                  className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-800/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70 sm:text-sm"
                >
                  <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Copy Link
                </button>

                {/* Open original */}
                <a
                  href={info.webpage_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:text-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Open Original
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Download Options Card ── */}
          <div className="rounded-[22px] border border-slate-200/70 bg-white p-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.16)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none sm:p-4 lg:p-4">
            {/* Card header */}
            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 sm:text-[11px]">
                Available Downloads
              </p>
              <h3 className="mt-0.5 text-lg font-extrabold text-slate-950 dark:text-slate-50 sm:text-xl">
                Choose Format
              </h3>
            </div>

            {/* Format groups: stack on mobile, 2-col on desktop */}
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-col lg:gap-3">
              <DownloadGroup
                title="Video (MP4)"
                description="Best compatibility, audio included"
                options={mp4Options}
                tone="indigo"
                icon={Clapperboard}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <DownloadGroup
                title="Video (WEBM)"
                description="High-quality web format"
                options={webmOptions}
                tone="emerald"
                icon={Sparkles}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              <DownloadGroup
                title="Audio Only"
                description="MP3 & M4A audio extracts"
                options={audioOptions}
                tone="slate"
                icon={Headphones}
                downloadState={downloadState}
                onDownload={onDownload}
                getButtonLabel={getButtonLabel}
              />

              {/* Thumbnail group — full-width, spans both sm cols */}
              <div
                className={cn(
                  "rounded-2xl border bg-slate-50/80 p-3 ring-1 dark:border-slate-800 dark:bg-slate-950/50 sm:col-span-2 sm:rounded-[20px] sm:p-3.5 lg:col-span-1",
                  "border-slate-200/70",
                  GROUP_STYLES[thumbnailTone].ring,
                )}
              >
                {/* Group header */}
                <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl",
                      GROUP_STYLES[thumbnailTone].icon,
                    )}
                  >
                    <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          GROUP_STYLES[thumbnailTone].dot,
                        )}
                      />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:text-[11px]">
                        Thumbnail Downloads
                      </p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">
                      HD image exports
                    </p>
                  </div>
                </div>

                {/* Thumbnail preview — full width */}
                <div
                  className="relative mb-2.5 w-full overflow-hidden rounded-[14px] bg-slate-100 dark:bg-slate-950 sm:mb-3 sm:rounded-[16px]"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={previewImage || ""}
                    alt={`${info.title} thumbnail preview`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Download rows */}
                <div className="space-y-2 sm:space-y-2.5">
                  {info.thumbnailDownloads.map((option) => (
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
  );
}
