"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FAQS = [
  {
    q: "Is Multiverse completely free to use?",
    a: "Yes. Every tool in the library is free to use — no premium paywalls, no credit card required. The full public experience is completely free.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Public tools, templates, prompts, discover pages, and fix guides are open without sign-up. Only the private admin area requires authentication.",
  },
  {
    q: "Are my files stored on your servers?",
    a: "No. Most tools process files directly in your browser. For tools that require server processing, files are removed from temporary storage immediately after processing completes.",
  },
  {
    q: "How many tools are available?",
    a: "Over 150 tools across ten categories: PDF, image, video, audio, text, developer, SEO, calculators, file utilities, and more. New tools are added every week.",
  },
  {
    q: "What can I use on Multiverse?",
    a: "You can use online tools, browse UI components, copy templates, explore AI prompts, read discover guides, and follow practical fix guides.",
  },
  {
    q: "Does Multiverse work on mobile?",
    a: "Absolutely. Every tool is responsive and built to work on phones, tablets, and desktops. The experience adapts to your screen size.",
  },
  {
    q: "What kind of tools are included?",
    a: "Everything from PDF merging and image compression to video downloading, JSON formatting, QR code generation, BMI calculators, and more. If you need a tool for daily work, we probably have it.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-slate-50 dark:bg-slate-900/40">
      <div
        className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.012]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">
            Quick answers to common questions about Multiverse.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={faq.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                  isOpen
                    ? "border-indigo-200/60 shadow-sm dark:border-indigo-800/30"
                    : "border-border hover:border-slate-300 dark:hover:border-slate-700",
                )}
              >
                <button
                  id={`faq-btn-${i}`}
                  className="flex w-full items-center justify-between px-4 py-4 sm:px-5 text-left text-sm font-semibold transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  {faq.q}
                  <ChevronDown
                    className={cn(
                      "ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
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
                    <div
                      aria-hidden={!isOpen}
                      className="border-t border-border px-4 pb-4 pt-3 sm:px-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-indigo-100 bg-white px-6 py-8 text-center shadow-sm dark:border-indigo-900/30 dark:bg-slate-900/60">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950/40">
            <MessageCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold">Still have questions?</h3>
            <p className="text-sm text-muted-foreground">
              Search our full library of tools or browse by category to find
              what you need.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Search className="h-4 w-4" />
              Browse all tools
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:text-indigo-300"
            >
              Explore universes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
