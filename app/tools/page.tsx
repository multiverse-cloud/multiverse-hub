import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import UniverseTopBar from "@/components/public/UniverseTopBar";
import ToolsListing from "@/components/tools/ToolsListing";
import { TOOLS } from "@/lib/tools-data";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tools - Free Online Utilities | mtverse",
  description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits. Fast, private tools that run in your browser.`,
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "Tools - Free Online Utilities | mtverse",
    description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits.`,
    url: absoluteUrl("/tools"),
  },
};

const TOOLS_PAGE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CollectionPage"],
    name: "Free Online Tools",
    headline: "Free online tools for PDF, image, video, text, developer, and SEO workflows",
    description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows.`,
    url: absoluteUrl("/tools"),
    inLanguage: "en",
    keywords: [
      "free online tools",
      "PDF tools",
      "image tools",
      "developer tools",
      "SEO tools",
      "text tools",
    ].join(", "),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are mtverse tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Public tools on mtverse are free to use and do not require a public account.",
        },
      },
      {
        "@type": "Question",
        name: "What tools are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "mtverse includes PDF tools, image tools, text tools, developer tools, SEO tools, calculators, file utilities, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Do the tools work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Tool pages are responsive and designed for phones, tablets, and desktop browsers.",
        },
      },
    ],
  },
];

interface ToolsPageProps {
  searchParams?: Promise<{
    q?: string | string[];
    category?: string | string[];
    tag?: string | string[];
  }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = {
    q: Array.isArray(resolvedSearchParams?.q)
      ? resolvedSearchParams.q[0]
      : resolvedSearchParams?.q,
    category: Array.isArray(resolvedSearchParams?.category)
      ? resolvedSearchParams.category[0]
      : resolvedSearchParams?.category,
    tag: Array.isArray(resolvedSearchParams?.tag)
      ? resolvedSearchParams.tag[0]
      : resolvedSearchParams?.tag,
  };

  return (
    <PublicLayout schemaMarkup={TOOLS_PAGE_SCHEMA}>
      <UniverseTopBar
        items={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        actionName="Tools"
        actionSlug="tools"
      />
      <ToolsListing filters={filters} />
    </PublicLayout>
  );
}
