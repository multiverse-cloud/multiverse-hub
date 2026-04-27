import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import UniverseTopBar from "@/components/public/UniverseTopBar";
import ToolsListing from "@/components/tools/ToolsListing";
import { TOOLS } from "@/lib/tools-data";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tools - Free Online Utilities | Multiverse",
  description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits. Fast, private tools that run in your browser.`,
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "Tools - Free Online Utilities | Multiverse",
    description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits.`,
    url: absoluteUrl("/tools"),
  },
};

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
    <PublicLayout>
      <UniverseTopBar
        items={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        actionName="Tools"
        actionSlug="tools"
      />
      <ToolsListing filters={filters} />
    </PublicLayout>
  );
}
