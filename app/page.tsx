import type { Metadata } from "next";
import { Suspense } from "react";
import FAQSection from "@/components/home/FAQSection";
import HeroSection from "@/components/home/HeroSection";
import HeroStatsSection from "@/components/home/HeroStatsSection";
import NewToolsSection from "@/components/home/NewToolsSection";
import NewContentSection from "@/components/home/NewContentSection";
import TrendingToolsSection from "@/components/home/TrendingToolsSection";
import UniversesSection from "@/components/home/UniversesSection";
import WhyMultiverse from "@/components/home/WhyMultiverse";
import PublicLayout from "@/components/layout/PublicLayout";
import { getTools } from "@/lib/db";
import { SITE_URL } from "@/lib/site-url";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Multiverse - Free Online Tools, UI Components, Templates, Prompts & Fixes",
  description:
    "Use 150+ free online tools, UI components, website templates, AI prompts, discover guides, and troubleshooting fixes in one fast public platform. No public login required.",
  keywords: [
    "free online tools",
    "video downloader",
    "PDF tools",
    "image tools",
    "UI components",
    "website templates",
    "AI prompts",
    "developer tools",
    "SEO tools",
    "troubleshooting fixes",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Multiverse - Free Online Tools, UI Components, Templates, Prompts & Fixes",
    description:
      "A fast public workspace for creators and developers: download media, process files, copy UI, launch templates, and find practical fixes without sign-in.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "Multiverse - Free Online Tools and Creative Universes",
    description:
      "Free tools, UI components, templates, prompts, and fixes in one fast public platform.",
  },
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
        text: "Yes. Every tool in the library is free to use with no premium paywalls and no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Public tools, templates, prompts, discover pages, and fix guides are open to visitors without sign-up. Only the private admin area requires authentication.",
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
      name: "What can I use on Multiverse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use online tools, browse UI components, copy templates, explore AI prompts, read discover guides, and follow practical fix guides.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of tools are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything from PDF merging and image compression to video downloading, JSON formatting, QR code generation, BMI calculators, and more across 10 categories.",
      },
    },
  ],
};

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
      schemaMarkup={FAQ_SCHEMA as unknown as Record<string, any>}
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
      <Suspense fallback={<ToolGridSkeleton />}>
        <NewContentSection />
      </Suspense>
      <WhyMultiverse />
      <FAQSection />
    </PublicLayout>
  );
}
