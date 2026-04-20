import type { Metadata } from "next";
import { Suspense } from "react";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import HeroStatsSection from "@/components/home/HeroStatsSection";
import NewToolsSection from "@/components/home/NewToolsSection";
import TrendingToolsSection from "@/components/home/TrendingToolsSection";
import UniversesSection from "@/components/home/UniversesSection";
import WhyMultiverse from "@/components/home/WhyMultiverse";
import PublicLayout from "@/components/layout/PublicLayout";
import { getTools } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Multiverse — 150+ Free Online Tools for PDF, Image, Video & More",
  description:
    "One platform, 150+ free tools. Compress PDFs, resize images, download videos, format JSON, and more — all free, private, and instant. No login required.",
  alternates: {
    canonical: "https://multiverse-tools.vercel.app",
  },
};

const WEB_SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Multiverse Tools",
  url: "https://multiverse-tools.vercel.app",
  description:
    "One platform with 150+ free online tools for PDF, image, video, text, developer, and daily workflows.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://multiverse-tools.vercel.app/tools?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Multiverse Tools",
  url: "https://multiverse-tools.vercel.app",
  logo: "https://multiverse-tools.vercel.app/icon.png",
  sameAs: ["https://multiverse-tools.vercel.app"],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Multiverse completely free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every tool in the library is free to use — no premium paywalls, no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not for most tools. You can use any tool instantly without signing up. Creating an account unlocks extras like saving favourites.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files stored on your servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Most tools process files directly in your browser. Server-processed files are removed immediately after processing.",
      },
    },
    {
      "@type": "Question",
      name: "How many tools are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Over 150 tools across ten categories including PDF, image, video, audio, text, developer, SEO, calculators, and file utilities.",
      },
    },
    {
      "@type": "Question",
      name: "Does Multiverse work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Every tool is responsive and works on phones, tablets, and desktops.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save my favourite tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sign in to save favourites and access them from your personal library across devices.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of tools are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything from PDF merging and image compression to video downloading, JSON formatting, QR code generation, BMI calculators, and more — 150+ tools across 10 categories.",
      },
    },
  ],
};

const HOMEPAGE_SCHEMA = [WEB_SITE_SCHEMA, ORGANIZATION_SCHEMA, FAQ_SCHEMA];

function ToolGridSkeleton() {
  return (
    <div className="py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mb-3 h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const tools = await getTools().catch(() => []);

  return (
    <PublicLayout
      schemaMarkup={HOMEPAGE_SCHEMA as unknown as Record<string, any>}
    >
      <HeroSection />
      <HeroStatsSection />
      <UniversesSection />
      <Suspense fallback={<ToolGridSkeleton />}>
        <TrendingToolsSection tools={tools} />
      </Suspense>
      <Suspense fallback={<ToolGridSkeleton />}>
        <NewToolsSection />
      </Suspense>
      <WhyMultiverse />
      <FAQSection />
    </PublicLayout>
  );
}
