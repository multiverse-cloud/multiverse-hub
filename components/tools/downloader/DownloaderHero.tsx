import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Clapperboard,
  Facebook,
  Ghost,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Music2,
  Pin,
  PlayCircle,
  Send,
  Share2,
  Twitch,
  Twitter,
  Video,
} from "lucide-react";
import {
  PremiumContainer,
  PremiumSection,
} from "@/components/platform/premium/Surface";
import DownloaderInputBar from "./DownloaderInputBar";
import { cn } from "@/lib/utils";

type PlatformItem = {
  name: string;
  label: string;
  icon: LucideIcon;
  tone: string;
};

const SUPPORTED_PLATFORMS: PlatformItem[] = [
  { name: "TikTok", label: "TikTok", icon: Music2, tone: "text-slate-950 dark:text-slate-100" },
  { name: "Instagram", label: "Instagram", icon: Instagram, tone: "text-pink-600 dark:text-pink-300" },
  { name: "Twitter / X", label: "X", icon: Twitter, tone: "text-sky-600 dark:text-sky-300" },
  { name: "Facebook", label: "Facebook", icon: Facebook, tone: "text-blue-700 dark:text-blue-300" },
  { name: "Pinterest", label: "Pinterest", icon: Pin, tone: "text-red-700 dark:text-red-300" },
  { name: "Reddit", label: "Reddit", icon: MessageCircle, tone: "text-orange-600 dark:text-orange-300" },
  { name: "Vimeo", label: "Vimeo", icon: PlayCircle, tone: "text-cyan-600 dark:text-cyan-300" },
  { name: "Dailymotion", label: "Dailymotion", icon: PlayCircle, tone: "text-blue-600 dark:text-blue-300" },
  { name: "Snapchat", label: "Snapchat", icon: Ghost, tone: "text-amber-700 dark:text-amber-300" },
  { name: "LinkedIn", label: "LinkedIn", icon: Linkedin, tone: "text-blue-700 dark:text-blue-300" },
  { name: "Telegram", label: "Telegram", icon: Send, tone: "text-sky-600 dark:text-sky-300" },
  { name: "Twitch", label: "Twitch", icon: Twitch, tone: "text-violet-600 dark:text-violet-300" },
  { name: "Bilibili", label: "Bilibili", icon: Video, tone: "text-cyan-600 dark:text-cyan-300" },
  { name: "Likee", label: "Likee", icon: Heart, tone: "text-rose-600 dark:text-rose-300" },
  { name: "MX TakaTak", label: "MX TakaTak", icon: Music2, tone: "text-indigo-600 dark:text-indigo-300" },
  { name: "ShareChat", label: "ShareChat", icon: Share2, tone: "text-emerald-600 dark:text-emerald-300" },
  { name: "Roposo", label: "Roposo", icon: PlayCircle, tone: "text-fuchsia-600 dark:text-fuchsia-300" },
  { name: "Triller", label: "Triller", icon: Clapperboard, tone: "text-slate-700 dark:text-slate-200" },
  { name: "+ 1000 More", label: "More", icon: Video, tone: "text-slate-600 dark:text-slate-200" },
];

interface Props {
  url: string;
  loading: boolean;
  hasResult?: boolean;
  title?: string;
  subtitle?: string;
  platforms?: string[];
  contentTypes?: string[];
  placeholder?: string;
  buttonLabel?: string;
  tabs?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  onUrlChange: (value: string) => void;
  onAnalyze: () => void;
}

export default function DownloaderHero({
  url,
  loading,
  hasResult = false,
  title = "Video Downloader",
  subtitle = "Paste a public media link and download available formats.",
  platforms,
  contentTypes = [],
  placeholder,
  buttonLabel = "Download",
  tabs = [],
  onUrlChange,
  onAnalyze,
}: Props) {
  const platformList = (platforms?.length
    ? platforms
    : SUPPORTED_PLATFORMS.map((platform) => platform.name)
  ).slice(0, hasResult ? 5 : 7);

  const visiblePlatforms = SUPPORTED_PLATFORMS.filter((platform) =>
    platformList.includes(platform.name),
  );

  return (
    <PremiumSection
      className={cn(
        "relative overflow-hidden bg-white dark:bg-slate-950",
        hasResult ? "py-5 sm:py-6" : "pb-9 pt-8 sm:pb-12 sm:pt-10 md:pb-14 md:pt-12",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_68%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_68%)]" />
      <PremiumContainer className={cn("relative z-10 text-center", hasResult ? "max-w-3xl" : "max-w-4xl")}>
        {!hasResult ? (
          <>
            <h1 className="mx-auto max-w-3xl text-[1.75rem] font-bold leading-[1.12] tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-2.5 max-w-xl text-sm font-normal leading-6 text-slate-500 dark:text-slate-400 sm:text-[15px]">
              {subtitle}
            </p>
            {contentTypes.length > 0 ? (
              <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-1">
                {contentTypes.slice(0, 7).map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            {tabs.length > 1 ? (
              <div className="mx-auto mt-4 flex max-w-3xl items-center justify-start gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 [scrollbar-width:none] dark:bg-slate-900 sm:justify-center [&::-webkit-scrollbar]:hidden">
                {tabs.map(tab => (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    data-no-loader="true"
                    className={cn(
                      "shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-950 dark:hover:text-slate-50",
                      tab.active && "bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50",
                    )}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            ) : null}
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
            hasResult ? "mt-0 max-w-2xl" : "mt-5 max-w-3xl sm:mt-7",
          )}
        />

        <div
          className={cn(
            "mx-auto flex max-w-3xl items-center justify-center gap-3 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            hasResult ? "mt-3" : "mt-4 sm:mt-5",
          )}
          role="list"
          aria-label="Supported platforms"
        >
          {visiblePlatforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <span
                key={platform.name}
                title={platform.label}
                aria-label={platform.label}
                role="listitem"
                className={cn(
                  "inline-flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:h-8 sm:w-8",
                  platform.tone,
                )}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
              </span>
            );
          })}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
