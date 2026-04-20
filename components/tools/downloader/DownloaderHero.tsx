import { CheckCircle2 } from "lucide-react";
import {
  PremiumContainer,
  PremiumSection,
} from "@/components/platform/premium/Surface";
import { HERO_TRUST_ITEMS } from "./content";
import DownloaderInputBar from "./DownloaderInputBar";
import { cn } from "@/lib/utils";

const SUPPORTED_PLATFORMS = [
  {
    name: "YouTube",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    emoji: "▶",
  },
  {
    name: "TikTok",
    color: "text-slate-900 dark:text-slate-100",
    bg: "bg-slate-100 dark:bg-slate-800",
    emoji: "♪",
  },
  {
    name: "Instagram",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    emoji: "◈",
  },
  {
    name: "Twitter / X",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    emoji: "✕",
  },
  {
    name: "Facebook",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    emoji: "f",
  },
  {
    name: "Vimeo",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    emoji: "▷",
  },
  {
    name: "+ 1000 More",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    emoji: "⚡",
  },
];

interface Props {
  url: string;
  loading: boolean;
  hasResult?: boolean;
  onUrlChange: (value: string) => void;
  onAnalyze: () => void;
}

export default function DownloaderHero({
  url,
  loading,
  hasResult = false,
  onUrlChange,
  onAnalyze,
}: Props) {
  return (
    <PremiumSection
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900",
        hasResult
          ? "py-4 md:py-5"
          : "pb-12 pt-10 sm:pb-16 sm:pt-14 md:pb-20 md:pt-16",
      )}
    >
      <PremiumContainer
        className={cn(
          "relative z-10 text-center",
          hasResult ? "max-w-4xl" : "max-w-5xl",
        )}
      >
        {/* ── FULL HERO (no result yet) ── */}
        {!hasResult && (
          <>
            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-6xl">
              Video Downloader
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-slate-500 dark:text-slate-400 sm:mt-4 sm:text-lg">
              Download videos from YouTube, TikTok, Instagram, Twitter, and more — free, fast, and secure
            </p>
          </>
        )}

        {/* Input bar — always visible */}
        <DownloaderInputBar
          url={url}
          loading={loading}
          onUrlChange={onUrlChange}
          onAnalyze={onAnalyze}
          className={cn(
            "mx-auto",
            hasResult ? "mt-0 max-w-3xl" : "mt-6 max-w-4xl sm:mt-8",
          )}
        />

        {/* Platform pills — always visible */}
        <div
          className={cn(
            "mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-1.5 sm:gap-2",
            hasResult ? "mt-3" : "mt-4 sm:mt-5",
          )}
        >
          {SUPPORTED_PLATFORMS.map((platform) => (
            <span
              key={platform.name}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-transform hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:px-4 sm:py-2 sm:text-sm",
              )}
            >
              <span className="text-sm font-bold leading-none">
                {platform.emoji}
              </span>
              {platform.name}
            </span>
          ))}
        </div>

        {/* Trust items — only in full hero */}
        {!hasResult && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 sm:mt-8 sm:gap-6 sm:text-sm">
            {HERO_TRUST_ITEMS.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                {item}
              </span>
            ))}
          </div>
        )}
      </PremiumContainer>
    </PremiumSection>
  );
}
