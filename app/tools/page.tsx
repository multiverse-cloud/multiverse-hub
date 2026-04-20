import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import ToolsListing from "@/components/tools/ToolsListing";
import { TOOLS } from "@/lib/tools-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tools – 150+ Free Online Tools | Multiverse",
  description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits — just fast, private tools that run in your browser.`,
  alternates: {
    canonical: "https://multiverse-tools.vercel.app/tools",
  },
  openGraph: {
    title: "Tools – 150+ Free Online Tools | Multiverse",
    description: `Explore ${TOOLS.length}+ free online tools for PDF, image, video, audio, text, and developer workflows. No sign-up, no watermarks, no limits.`,
    url: "https://multiverse-tools.vercel.app/tools",
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
      <ToolsListing filters={filters} />
    </PublicLayout>
  );
}
