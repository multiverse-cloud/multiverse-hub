"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PremiumContainer,
  PremiumSection,
} from "@/components/platform/premium/Surface";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "./content";

type FaqItem = {
  question: string;
  answer: string;
};

function getPlatformFaqs(toolName?: string, platforms?: string[], contentTypes: string[] = []): FaqItem[] {
  const platform = platforms?.[0] || "supported platform";
  const name = toolName || `${platform} Downloader`;
  const isAllInOne = platform === "YouTube" ? false : platforms && platforms.length > 1;
  const supportedList = contentTypes.length ? contentTypes.join(", ") : "public videos, audio, and thumbnails";

  if (isAllInOne) {
    return [
      {
        question: "Which public links can I use?",
        answer:
          `Use public links for ${supportedList} from supported platforms. Login-only, private, deleted, geo-blocked, or DRM-protected content is not supported.`,
      },
      {
        question: "Does mtverse save my download history?",
        answer:
          "No. The downloader is stateless: no public accounts, no saved history, no favorites, and no persistent user data.",
      },
      {
        question: "Why are some quality options missing?",
        answer:
          "Available formats depend on the source upload and platform delivery. If the source only exposes a few variants, mtverse only shows those available options.",
      },
      {
        question: "Can I download audio or thumbnails?",
        answer:
          "When the source exposes them, mtverse shows video, audio, and thumbnail options in the same result screen.",
      },
    ];
  }

  return [
    {
      question: `Can ${name} download private ${platform} content?`,
      answer:
        "No. Only public, accessible content is supported. Private, protected, deleted, login-required, or restricted media will show a clear unsupported message.",
    },
      {
        question: `What can I download from ${platform}?`,
        answer:
        `This page is built for ${supportedList}. Available formats depend on the original source, so only public formats exposed by ${platform} will appear.`,
    },
    {
      question: `Why does ${platform} quality change by link?`,
      answer:
        "Platforms expose different quality variants per upload. mtverse shows the formats that are publicly available for that exact link.",
    },
    {
      question: `Is ${name} mobile friendly?`,
      answer:
        "Yes. The input, preview, and format buttons are designed for quick one-hand use on mobile screens.",
    },
  ];
}

export default function DownloaderFaqSection({
  compact = false,
  toolName,
  platforms,
  contentTypes = [],
  items: providedItems,
}: {
  compact?: boolean;
  toolName?: string;
  platforms?: string[];
  contentTypes?: string[];
  items?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = useMemo(() => {
    if (providedItems?.length) {
      return providedItems.slice(0, compact ? 4 : 6);
    }
    const contextualItems = getPlatformFaqs(toolName, platforms, contentTypes);
    return (contextualItems.length ? contextualItems : FAQ_ITEMS).slice(0, compact ? 4 : 6);
  }, [compact, contentTypes, platforms, providedItems, toolName]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PremiumSection id="faq" className={compact ? "py-8" : "py-16"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PremiumContainer className="max-w-3xl">
        <div className={compact ? "mb-4 text-center" : "mb-8 text-center"}>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
            FAQ
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">
            {platforms?.length === 1 ? `${platforms[0]} downloader questions` : "Downloader questions"}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={item.question}>
                <button
                  id={`faq-btn-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-50 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-inset motion-reduce:transition-none dark:text-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-300"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  {item.question}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
