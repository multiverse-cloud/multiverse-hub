import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import UniverseTopBar from "@/components/public/UniverseTopBar";
import PromptHubPage from "@/components/prompts/PromptHubPage";
import { getPromptLibraryData } from "@/lib/prompt-db";
import { sortPromptsForMode } from "@/lib/prompt-hub-ranking";
import {
  filterPrompts,
  normalizePromptQuery,
  normalizePromptSearchParam,
  resolvePromptCategory,
  resolvePromptModel,
} from "@/lib/prompt-query";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Free AI Prompts — ChatGPT, Midjourney, Nano Banana, Image & Editing",
  description:
    "Browse 1,000+ free copy-ready AI prompts for ChatGPT, Midjourney, Flux, Gemini, Nano Banana, photo editing, coding, writing, and creative workflows. No signup required.",
  keywords: [
    "free AI prompts",
    "AI prompts",
    "ChatGPT prompts",
    "free image prompts",
    "Nano Banana prompts",
    "Midjourney prompts",
    "Flux prompts",
    "AI photo editing prompts",
    "free prompt templates",
    "AI writing prompts",
    "viral AI prompts",
    "Gemini prompts",
  ],
  openGraph: {
    title: "Free AI Prompts — ChatGPT, Midjourney, Nano Banana | mtverse",
    description:
      "1,000+ free copy-ready AI prompts for ChatGPT, Midjourney, Flux, Gemini, Nano Banana, photo editing, coding, and creative workflows.",
    type: "website",
    url: absoluteUrl("/prompts"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Prompts — ChatGPT, Images & Editing | mtverse",
    description:
      "1,000+ free copy-ready AI prompts for ChatGPT, Midjourney, Nano Banana, and photo editing workflows.",
  },
  alternates: { canonical: absoluteUrl("/prompts") },
};

export const revalidate = 3600;
const DEFAULT_PROMPT_TAKE = 48;
const MAX_PROMPT_TAKE = 1200;

interface PromptsPageProps {
  searchParams?: Promise<{
    page?: string | string[];
    category?: string | string[];
    model?: string | string[];
    q?: string | string[];
    sort?: string | string[];
    seed?: string | string[];
    take?: string | string[];
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

function resolvePromptTake(value?: string) {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed)) return DEFAULT_PROMPT_TAKE;
  return Math.min(Math.max(parsed, DEFAULT_PROMPT_TAKE), MAX_PROMPT_TAKE);
}

function toPromptHubEntry(prompt: (Awaited<ReturnType<typeof getPromptLibraryData>>)["prompts"][number]) {
  return {
    slug: prompt.slug,
    title: prompt.title,
    previewImage: prompt.previewImage,
    previewAlt: prompt.previewAlt,
    category: prompt.category,
    subcategory: prompt.subcategory,
    visualStyle: prompt.visualStyle,
    tags: prompt.tags,
    bestFor: prompt.bestFor,
    models: prompt.models,
    featured: prompt.featured,
    updatedAt: prompt.updatedAt,
  };
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
  const visibleLimit = resolvePromptTake(
    normalizePromptSearchParam(resolvedSearchParams?.take),
  );
  const filteredPrompts = filterPrompts(library.prompts, {
    category: activeCategory,
    model: activeModel,
    query: searchQuery,
  });
  const promptHubEntries = sortPromptsForMode(
    filteredPrompts.map(toPromptHubEntry),
    sortMode,
    shuffleSeed,
  );
  const visiblePromptEntries = promptHubEntries.slice(0, visibleLimit);
  const nextTake =
    visiblePromptEntries.length < promptHubEntries.length
      ? Math.min(visibleLimit + DEFAULT_PROMPT_TAKE, MAX_PROMPT_TAKE, promptHubEntries.length)
      : null;
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": ["WebPage", "CollectionPage"],
      name: "Free AI Prompts",
      headline: "Free AI prompts for ChatGPT, image generation, editing, and creative workflows",
      description:
        "Browse free copy-ready AI prompts for ChatGPT, AI image generation, photo editing, Nano Banana trends, and creative workflows.",
      url: absoluteUrl("/prompts"),
      inLanguage: "en",
      keywords: [
        "free AI prompts",
        "ChatGPT prompts",
        "AI image prompts",
        "Nano Banana prompts",
        "AI editing prompts",
      ].join(", "),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: library.stats.totalPrompts,
        itemListElement: library.categories.slice(0, 12).map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.title,
          url: absoluteUrl(`/prompts?category=${category.id}`),
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are mtverse AI prompts free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Public prompts on mtverse are free to browse, copy, and adapt for your own workflows.",
          },
        },
        {
          "@type": "Question",
          name: "What prompt types are available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The prompt hub includes ChatGPT prompts, AI image prompts, photo editing prompts, Nano Banana-style trend prompts, writing prompts, product prompts, and creative workflows.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use prompts with different AI models?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Many prompts are written so they can be adapted across ChatGPT, Gemini, Midjourney, Flux, image editors, and other AI tools.",
          },
        },
      ],
    },
  ];

  return (
    <PublicLayout schemaMarkup={schemaMarkup}>
      <UniverseTopBar
        items={[{ label: "Home", href: "/" }, { label: "Prompts" }]}
        actionName="Prompt Hub"
        actionSlug="prompts"
      />
      <PromptHubPage
        categories={library.categories}
        models={library.models}
        filteredPrompts={visiblePromptEntries}
        activeCategory={activeCategory}
        activeModel={activeModel}
        searchQuery={searchQuery}
        sortMode={sortMode}
        shuffleSeed={shuffleSeed}
        totalResults={filteredPrompts.length}
        totalPrompts={library.stats.totalPrompts}
        imagePrompts={library.stats.imagePrompts}
        loadedResults={visiblePromptEntries.length}
        nextTake={nextTake}
      />
    </PublicLayout>
  );
}
