"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PremiumCard,
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from "@/components/platform/premium/Surface";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "./content";

export default function DownloaderFaqSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = FAQ_ITEMS.slice(0, compact ? 4 : FAQ_ITEMS.length);

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
    <PremiumSection id="faq" className={compact ? "py-10" : "py-20"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PremiumContainer className="max-w-4xl">
        <PremiumSectionHeader
          align="center"
          title="Frequently Asked Questions"
          description="Common questions about downloading videos, audio, and thumbnails from supported platforms."
          className={compact ? "mb-6" : "mb-12"}
        />

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <PremiumCard
                key={item.question}
                className={cn(
                  "overflow-hidden p-0 transition-all duration-300",
                  isOpen
                    ? "border-indigo-200/60 shadow-sm dark:border-indigo-800/30"
                    : "hover:border-slate-300 dark:hover:border-slate-700",
                )}
              >
                <button
                  id={`faq-btn-${i}`}
                  className={compact ? "flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-950 transition-colors hover:text-indigo-600 dark:text-slate-50 dark:hover:text-indigo-400" : "flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-slate-950 transition-colors hover:text-indigo-600 dark:text-slate-50 dark:hover:text-indigo-400"}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  {item.question}
                  <ChevronDown
                    className={cn(
                      "ml-4 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300",
                      isOpen && "rotate-180 text-indigo-500",
                    )}
                  />
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className={compact ? "border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-6 text-slate-500 dark:border-slate-800 dark:text-slate-400" : "border-t border-slate-100 px-6 pb-5 pt-4 text-sm leading-7 text-slate-500 dark:border-slate-800 dark:text-slate-400"}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            );
          })}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
