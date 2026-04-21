import { CheckCircle2 } from "lucide-react";
import {
  PremiumContainer,
  PremiumSection,
} from "@/components/platform/premium/Surface";
import { HERO_TRUST_ITEMS } from "./content";
import DownloaderInputBar from "./DownloaderInputBar";
import { cn } from "@/lib/utils";

const SUPPORTED_PLATFORMS = [
  { name: "YouTube", emoji: "YT" },
  { name: "TikTok", emoji: "TT" },
  { name: "Instagram", emoji: "IG" },
  { name: "Twitter / X", emoji: "X" },
  { name: "Facebook", emoji: "FB" },
  { name: "Pinterest", emoji: "PI" },
  { name: "Reddit", emoji: "RD" },
  { name: "Vimeo", emoji: "VI" },
  { name: "Dailymotion", emoji: "DM" },
  { name: "Snapchat", emoji: "SC" },
  { name: "LinkedIn", emoji: "IN" },
  { name: "Telegram", emoji: "TG" },
  { name: "Twitch", emoji: "TW" },
  { name: "Bilibili", emoji: "BI" },
  { name: "Likee", emoji: "LK" },
  { name: "MX TakaTak", emoji: "MX" },
  { name: "ShareChat", emoji: "SH" },
  { name: "Roposo", emoji: "RO" },
  { name: "Triller", emoji: "TR" },
  { name: "+ 1000 More", emoji: "++" },
];

interface Props {
  url: string;
  loading: boolean;
  hasResult?: boolean;
  title?: string;
  subtitle?: string;
  platforms?: string[];
  placeholder?: string;
  buttonLabel?: string;
  onUrlChange: (value: string) => void;
  onAnalyze: () => void;
}

export default function DownloaderHero({
  url,
  loading,
  hasResult = false,
  title = "Video Downloader",
  subtitle = "Download videos from YouTube, TikTok, Instagram, Twitter, and more - free, fast, and secure",
  platforms,
  placeholder,
  buttonLabel,
  onUrlChange,
  onAnalyze,
}: Props) {
  const platformList = (platforms?.length
    ? platforms
    : SUPPORTED_PLATFORMS.map((platform) => platform.name)
  ).slice(0, 7);

  return (
    <PremiumSection
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900",
        hasResult
          ? "py-3 md:py-4"
          : "pb-8 pt-8 sm:pb-12 sm:pt-12 md:pb-14 md:pt-14",
      )}
    >
      <PremiumContainer
        className={cn(
          "relative z-10 text-center",
          hasResult ? "max-w-4xl" : "max-w-5xl",
        )}
      >
        {!hasResult ? (
          <>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400 sm:mt-4 sm:text-lg">
              {subtitle}
            </p>
          </>
        ) : null}

        <DownloaderInputBar
          url={url}
          loading={loading}
          onUrlChange={onUrlChange}
          onAnalyze={onAnalyze}
          placeholder={placeholder}
          buttonLabel={buttonLabel}
          className={cn(
            "mx-auto",
            hasResult ? "mt-0 max-w-3xl" : "mt-6 max-w-4xl sm:mt-8",
          )}
        />

        <div
          className={cn(
            "mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-1.5 sm:gap-2",
            hasResult ? "mt-3" : "mt-4 sm:mt-5",
          )}
        >
          {SUPPORTED_PLATFORMS.filter((platform) =>
            platformList.includes(platform.name),
          ).map((platform) => (
            <span
              key={platform.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-transform hover:scale-105 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="text-[11px] font-black leading-none text-slate-700 dark:text-slate-200">
                {platform.emoji}
              </span>
              {platform.name}
            </span>
          ))}
        </div>

        {!hasResult ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 sm:mt-8 sm:gap-6 sm:text-sm">
            {HERO_TRUST_ITEMS.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </PremiumContainer>
    </PremiumSection>
  );
}
