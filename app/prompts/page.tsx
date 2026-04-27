import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import UniverseTopBar from "@/components/public/UniverseTopBar";
import PromptHubPage from "@/components/prompts/PromptHubPage";
import { getPromptLibraryData } from "@/lib/prompt-db";
import {
  filterPrompts,
  normalizePromptQuery,
  normalizePromptSearchParam,
  resolvePromptCategory,
  resolvePromptModel,
} from "@/lib/prompt-query";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title:
    "Prompt Hub - Premium AI Prompts for ChatGPT, Claude, Images, and Editing",
  description:
    "Browse premium prompts for ChatGPT, Claude, coding, work, study, image generation, and image editing workflows.",
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "prompt templates",
    "AI writing prompts",
  ],
  openGraph: {
    title: "Prompt Hub - Premium AI Prompts for ChatGPT & Claude | Multiverse",
    description:
      "Browse premium prompts for ChatGPT, Claude, coding, work, study, image generation, and image editing workflows.",
    type: "website",
    url: absoluteUrl("/prompts"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Hub - Premium AI Prompts for ChatGPT & Claude",
    description:
      "Browse premium prompts for ChatGPT, Claude, coding, work, study, image generation, and image editing workflows.",
  },
  alternates: { canonical: absoluteUrl("/prompts") },
};

export const revalidate = 3600;

interface PromptsPageProps {
  searchParams?: Promise<{
    page?: string | string[];
    category?: string | string[];
    model?: string | string[];
    q?: string | string[];
  }>;
}

export default async function PromptsPage({ searchParams }: PromptsPageProps) {
  const resolvedSearchParams = await searchParams;
  const library = await getPromptLibraryData();
  const activeCategory = resolvePromptCategory(
    normalizePromptSearchParam(resolvedSearchParams?.category),
  );
  const activeModel = resolvePromptModel(
    normalizePromptSearchParam(resolvedSearchParams?.model),
  );
  const searchQuery = normalizePromptQuery(resolvedSearchParams?.q);
  const filteredPrompts = filterPrompts(library.prompts, {
    category: activeCategory,
    model: activeModel,
    query: searchQuery,
  });

  return (
    <PublicLayout>
      <UniverseTopBar
        items={[{ label: "Home", href: "/" }, { label: "Prompts" }]}
        actionName="Prompt Hub"
        actionSlug="prompts"
      />
      <PromptHubPage
        categories={library.categories}
        models={library.models}
        featuredPrompts={library.featuredPrompts}
        filteredPrompts={filteredPrompts}
        activeCategory={activeCategory}
        activeModel={activeModel}
        searchQuery={searchQuery}
        totalResults={filteredPrompts.length}
        totalPrompts={library.stats.totalPrompts}
        imagePrompts={library.stats.imagePrompts}
      />
    </PublicLayout>
  );
}
