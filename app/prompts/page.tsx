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
    title: "Prompt Hub - Premium AI Prompts for ChatGPT & Claude | mtverse",
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
    sort?: string | string[];
    seed?: string | string[];
  }>;
}

function resolvePromptSort(value?: string): "featured" | "hot" | "new" | "top" | "shuffle" {
  if (value === "hot" || value === "new" || value === "top" || value === "shuffle") {
    return value;
  }

  return "featured";
}

function resolveShuffleSeed(value?: string) {
  const normalized = value?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
  return normalized || "mtverse";
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
  const sortMode = resolvePromptSort(
    normalizePromptSearchParam(resolvedSearchParams?.sort),
  );
  const shuffleSeed = resolveShuffleSeed(
    normalizePromptSearchParam(resolvedSearchParams?.seed),
  );
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
        sortMode={sortMode}
        shuffleSeed={shuffleSeed}
        totalResults={filteredPrompts.length}
        totalPrompts={library.stats.totalPrompts}
        imagePrompts={library.stats.imagePrompts}
      />
    </PublicLayout>
  );
}
