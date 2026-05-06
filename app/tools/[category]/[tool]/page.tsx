import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Wrench } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import ImageStudioPageFrame from "@/components/tools/ImageStudioPageFrame";
import PdfStudioPageFrame from "@/components/tools/PdfStudioPageFrame";
import VideoStudioPageFrame from "@/components/tools/VideoStudioPageFrame";
import WorkbenchStudioPageFrame from "@/components/tools/WorkbenchStudioPageFrame";
import ToolCard from "@/components/tools/ToolCard";
import RecentTracker from "@/components/tools/RecentTracker";
import SEOContent from "@/components/tools/SEOContent";
import ToolActions from "@/components/tools/ToolActions";
import ToolRuntimeBanner from "@/components/tools/ToolRuntimeBanner";
import ToolStudioSlot from "@/components/tools/ToolStudioSlot";
import VideoDownloaderPageSlot from "@/components/tools/VideoDownloaderPageSlot";
import { getLucideIcon } from "@/lib/icons";
import { CALCULATOR_STUDIO_SLUGS } from "@/lib/calculator-studio";
import { PDF_STUDIO_STATIC_CONTENT } from "@/lib/pdf-studio-content";
import { getToolRuntimeStatus } from "@/lib/tool-runtime-status";
import {
  getDownloaderPageName,
  getDownloaderRouteByToolSlug,
  getDownloaderTabs,
  getRelatedDownloaderRoutes,
} from "@/lib/downloader-route-data";
import { ACTIVE_CATEGORIES, resolveToolSlug, VIDEO_DOWNLOADER_TOOL_SLUGS, type Tool } from "@/lib/tools-data";
import { getTools, getToolBySlug } from "@/lib/db";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

interface Props {
  params: Promise<{ category: string; tool: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

const PDF_STUDIO_SLUGS = new Set(Object.keys(PDF_STUDIO_STATIC_CONTENT));

const IMAGE_STUDIO_SLUGS = new Set([
  "compress-image",
  "resize-image",
  "convert-image",
  "crop-image",
  "remove-background",
  "blur-background",
  "passport-photo-maker",
  "image-to-text",
  "image-upscaler",
  "color-palette-generator",
  "qr-code-generator",
  "image-to-pdf",
  "favicon-generator",
  "instagram-grid-maker",
  "svg-to-png",
  "meme-generator",
  "flip-rotate-image",
  "blur-image",
  "pixelate-image",
  "add-watermark-image",
]);

const FILE_STUDIO_SLUGS = new Set([
  "csv-viewer",
  "json-file-viewer",
  "zip-extractor",
]);

const VIDEO_STUDIO_SLUGS = new Set([
  "compress-video",
  "trim-video",
  "merge-video",
  "video-to-gif",
  "video-to-mp3",
  "youtube-thumbnail-downloader",
  "change-video-speed",
  "rotate-video",
  "add-subtitles",
  "screen-recorder",
  "gif-maker",
  "mute-video",
]);

const AUDIO_STUDIO_SLUGS = new Set([
  "compress-audio",
  "audio-recorder",
  "bpm-detector",
  "convert-audio",
  "trim-audio",
  "audio-equalizer",
  "audio-metadata-editor",
  "speech-to-text",
  "change-audio-speed",
  "merge-audio",
  "remove-vocals",
  "audio-text-to-speech",
  "trim-silence",
  "volume-booster",
]);

const TEXT_STUDIO_SLUGS = new Set([
  "ai-text-generator",
  "text-case-converter",
  "remove-duplicate-lines",
  "text-reverser",
  "text-grammar-checker",
  "paraphrasing-tool",
  "plagiarism-checker",
  "text-speech-to-text",
  "text-diff-checker",
  "text-summarizer",
  "text-to-speech",
  "text-url-encoder-decoder",
  "word-counter",
  "password-generator",
  "lorem-ipsum-generator",
  "emoji-copy-paste",
  "fancy-text-generator",
  "random-name-picker",
  "markdown-to-html",
  "csv-to-json",
  "json-to-csv",
  "string-extractor",
  "readability-score",
  "keyword-density",
]);

const DEV_STUDIO_SLUGS = new Set([
  "api-tester",
  "base64-encoder-decoder",
  "code-formatter",
  "color-converter",
  "css-minifier",
  "cron-generator",
  "gradient-generator",
  "gitignore-generator",
  "hash-generator",
  "html-previewer",
  "json-formatter",
  "jwt-decoder",
  "js-minifier",
  "regex-tester",
  "sql-formatter",
  "url-encoder-decoder",
  "uuid-generator",
  "css-gradient-generator",
  "html-to-markdown",
  "json-to-csv-converter",
  "cron-expression-generator",
  "markdown-previewer",
  "yaml-to-json-converter",
  "xml-to-json-converter",
  "timestamp-converter",
]);

const SEO_STUDIO_SLUGS = new Set([
  "backlink-checker",
  "broken-link-checker",
  "domain-authority-checker",
  "image-seo-checker",
  "keyword-generator",
  "meta-tag-generator",
  "open-graph-generator",
  "page-speed-checker",
  "robots-txt-generator",
  "seo-analyzer",
  "serp-preview",
  "sitemap-generator",
  "url-slug-generator",
  "og-image-generator",
  "schema-markup-generator",
  "redirect-checker",
  "keyword-extractor",
  "social-media-preview",
]);

const CALCULATOR_STUDIO_SLUGS_SET = new Set(CALCULATOR_STUDIO_SLUGS);

function getRelatedToolsByCategory(
  tools: Tool[],
  categorySlug: string,
  currentSlug: string,
  limit: number,
) {
  return tools
    .filter(
      (item) => item.categorySlug === categorySlug && item.slug !== currentSlug,
    )
    .slice(0, limit);
}

export async function generateStaticParams() {
  const TOOLS = await getTools();
  const trendingSlugs = TOOLS.filter(
    (tool) => tool.popular || tool.tags.includes("trending"),
  ).map((tool) => tool.slug);

  const PRE_RENDERED_TOOL_SLUGS = new Set([
    "all-in-one-video-downloader",
    ...PDF_STUDIO_SLUGS,
    ...IMAGE_STUDIO_SLUGS,
    ...VIDEO_STUDIO_SLUGS,
    ...AUDIO_STUDIO_SLUGS,
    ...TEXT_STUDIO_SLUGS,
    ...DEV_STUDIO_SLUGS,
    ...SEO_STUDIO_SLUGS,
    ...CALCULATOR_STUDIO_SLUGS,
    ...FILE_STUDIO_SLUGS,
    ...trendingSlugs,
  ]);

  return TOOLS.filter((tool) => PRE_RENDERED_TOOL_SLUGS.has(tool.slug)).map(
    (tool) => ({
      category: tool.categorySlug,
      tool: tool.slug,
    }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug } = await params;
  const tool = await getToolBySlug(toolSlug);
  if (!tool) return {};

  if (VIDEO_DOWNLOADER_TOOL_SLUGS.has(tool.slug)) {
    const downloaderRoute = getDownloaderRouteByToolSlug(tool.slug);
    const url = downloaderRoute
      ? absoluteUrl(`/${downloaderRoute.routeSlug}`)
      : absoluteUrl(`/tools/${tool.categorySlug}/${tool.slug}`);
    return {
      title: `${tool.name} - Fast MP4, MP3 and HD downloads`,
      description:
        tool.description,
      keywords: [
        "video downloader",
        tool.name.toLowerCase(),
        "mp4 download",
        "mp3 converter",
        "instagram downloader",
        "tiktok downloader",
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: `${tool.name} - Fast public media downloader`,
        description: tool.description,
        type: "website",
        url,
        images: [
          {
            url: absoluteUrl("/og-tool.png"),
            width: 1200,
            height: 630,
            alt: tool.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tool.name} - Fast public media downloader`,
        description: tool.description,
        images: [absoluteUrl("/og-tool.png")],
      },
    };
  }

  const title = `${tool.name} - Free Online ${tool.category} | mtverse`;
  const description = `${tool.description} Free, fast, no login required. Use ${tool.name} online instantly.`;

  return {
    title,
    description,
    keywords: [
      tool.name.toLowerCase(),
      `${tool.name.toLowerCase()} online`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.category.toLowerCase()} tool`,
      ...tool.tags,
    ],
    alternates: {
      canonical: absoluteUrl(`/tools/${tool.categorySlug}/${tool.slug}`),
    },
    openGraph: {
      title: `${tool.name} - Free Online ${tool.category}`,
      description: tool.description,
      type: "website",
      url: absoluteUrl(`/tools/${tool.categorySlug}/${tool.slug}`),
      images: [
        {
          url: absoluteUrl("/og-tool.png"),
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} - Free Online ${tool.category}`,
      description: tool.description,
      images: [absoluteUrl("/og-tool.png")],
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { category, tool: toolSlug } = await params;
  const resolvedToolSlug = resolveToolSlug(toolSlug);
  const tools = await getTools();
  const tool = tools.find((item) => item.slug === resolvedToolSlug) || null;

  if (!tool && category === "video" && VIDEO_DOWNLOADER_TOOL_SLUGS.has(resolvedToolSlug)) {
    redirect("/tools/video");
  }

  if (!tool || tool.categorySlug !== category || tool.enabled === false) {
    notFound();
  }

  if (tool.slug !== toolSlug) {
    redirect(`/tools/${tool.categorySlug}/${tool.slug}`);
  }

  const runtimeStatus = getToolRuntimeStatus(tool);

  const pageUrl = absoluteUrl(`/tools/${tool.categorySlug}/${tool.slug}`);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "BrowserApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    url: pageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: absoluteUrl("/tools"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.category,
        item: absoluteUrl(`/tools/${tool.categorySlug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How do I use ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Simply upload your input, adjust settings if needed, and click the process button. Our tool handles everything in-browser for maximum speed and privacy.`,
        },
      },
      {
        "@type": "Question",
        name: `Is this ${tool.name} tool free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, all tools on mtverse are 100% free to use. No registration or credit card is required to access our professional utility features.`,
        },
      },
      {
        "@type": "Question",
        name: `Is my data secure while using ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. We use WASM-based client-side processing, meaning your files never leave your computer. Processing happens locally on your device for total privacy.`,
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.name}`,
    description: `Use ${tool.name} online in a few simple steps. No public account is required.`,
    totalTime: "PT1M",
    supply: tool.inputType === "file"
      ? [{ "@type": "HowToSupply", name: tool.acceptedFormats?.join(", ") || "Supported file" }]
      : undefined,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name:
          tool.inputType === "file"
            ? "Upload your file"
            : tool.inputType === "url"
              ? "Paste your URL"
              : "Add your input",
        text:
          tool.inputType === "file"
            ? `Upload a supported ${tool.acceptedFormats?.join(", ") || "file"} into the workspace.`
            : tool.inputType === "url"
              ? "Paste the public URL you want to process."
              : "Paste or type the content you want to process.",
        url: pageUrl,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust options",
        text: "Choose the available settings that match your output needs.",
        url: pageUrl,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Process and export",
        text:
          tool.outputType === "file"
            ? "Run the tool and download the finished file when it is ready."
            : "Run the tool and copy the finished result from the output panel.",
        url: pageUrl,
      },
    ],
  };

  const combinedSchema = [schemaMarkup, breadcrumbSchema, faqSchema, howToSchema];

  if (VIDEO_DOWNLOADER_TOOL_SLUGS.has(tool.slug)) {
    const downloaderRoute = getDownloaderRouteByToolSlug(tool.slug);
    const routeTabs = downloaderRoute
      ? getDownloaderTabs(downloaderRoute).map(tab => ({
          label: tab.label,
          href: `/${tab.routeSlug}`,
          active: tab.routeSlug === downloaderRoute.routeSlug,
        }))
      : [];
    const relatedRoutes = downloaderRoute
      ? getRelatedDownloaderRoutes(downloaderRoute).map(item => ({
          label: getDownloaderPageName(item),
          href: `/${item.routeSlug}`,
          description: item.description,
        }))
      : [];

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        {runtimeStatus ? (
          <div className="premium-shell" data-tool-shell="true">
            <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-6 md:pt-5">
              <ToolRuntimeBanner status={runtimeStatus} />
            </div>
          </div>
        ) : null}
        <VideoDownloaderPageSlot
          tool={tool}
          route={downloaderRoute || undefined}
          routeTabs={routeTabs}
          relatedRoutes={relatedRoutes}
        />
      </PublicLayout>
    );
  }

  const hasPdfStudio = PDF_STUDIO_SLUGS.has(tool.slug);
  const content =
    PDF_STUDIO_STATIC_CONTENT[
      tool.slug as keyof typeof PDF_STUDIO_STATIC_CONTENT
    ];

  if (hasPdfStudio && content) {
    const relatedTools = content.relatedSlugs
      .map((slug) => tools.find((item) => item.slug === slug) || null)
      .filter((item): item is Tool => Boolean(item));

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <PdfStudioPageFrame
          tool={tool}
          runtimeStatus={runtimeStatus}
          content={{
            ...content,
            relatedTools,
          }}
        >
          <ToolStudioSlot tool={tool} />
        </PdfStudioPageFrame>
      </PublicLayout>
    );
  }

  if (IMAGE_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(
      tools,
      "image",
      tool.slug,
      4,
    );

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <ImageStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </ImageStudioPageFrame>
      </PublicLayout>
    );
  }

  if (VIDEO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(
      tools,
      "video",
      tool.slug,
      4,
    );

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <VideoStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </VideoStudioPageFrame>
      </PublicLayout>
    );
  }

  if (AUDIO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(
      tools,
      "audio",
      tool.slug,
      4,
    );

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  if (TEXT_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(tools, "text", tool.slug, 4);

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  if (DEV_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(tools, "dev", tool.slug, 4);

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  if (SEO_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(tools, "seo", tool.slug, 4);

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  if (
    CALCULATOR_STUDIO_SLUGS_SET.has(
      tool.slug as (typeof CALCULATOR_STUDIO_SLUGS)[number],
    )
  ) {
    const relatedTools = getRelatedToolsByCategory(
      tools,
      "calculator",
      tool.slug,
      4,
    );

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  if (FILE_STUDIO_SLUGS.has(tool.slug)) {
    const relatedTools = getRelatedToolsByCategory(tools, "file", tool.slug, 4);

    return (
      <PublicLayout schemaMarkup={combinedSchema}>
        <RecentTracker slug={tool.slug} />
        <WorkbenchStudioPageFrame
          tool={tool}
          relatedTools={relatedTools}
          runtimeStatus={runtimeStatus}
        >
          <ToolStudioSlot tool={tool} />
        </WorkbenchStudioPageFrame>
      </PublicLayout>
    );
  }

  const categoryInfo = ACTIVE_CATEGORIES.find(
    (item) => item.slug === tool.categorySlug,
  );
  const related = tools
    .filter(
      (item) => item.categorySlug === tool.categorySlug && item.id !== tool.id,
    )
    .slice(0, 6);
  const CategoryIcon = getLucideIcon(categoryInfo?.icon, Wrench);

  return (
    <PublicLayout>
      <div className="premium-shell" data-tool-shell="true">
        <div className="tool-mobile-frame mx-auto w-full max-w-7xl px-4 pb-24 pt-3 sm:px-6 sm:py-8 lg:px-6 md:py-10">
          {/* Tool Hero */}
          <div className="tool-hero-glow mb-5 sm:mb-8">
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 shadow-sm dark:from-indigo-900/30 dark:to-indigo-950/30 dark:text-indigo-400 sm:h-14 sm:w-14">
                <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2.5">
                  <h1 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
                    {tool.name}
                  </h1>
                  {tool.tags.includes("beta") && (
                    <span className="tag-beta">Beta</span>
                  )}
                </div>
                <p className="text-sm leading-6 text-muted-foreground line-clamp-2 sm:line-clamp-none sm:text-base">
                  {tool.description}
                </p>
              </div>
            </div>
          </div>

          <ToolRuntimeBanner status={runtimeStatus} />

          <div className="premium-panel mb-5 overflow-hidden sm:mb-8">
            <ToolStudioSlot tool={tool} />
          </div>

          {/* How it works + Features */}
          <div className="mb-6 grid gap-4 md:grid-cols-2 sm:mb-8 sm:gap-6">
            <div className="premium-card p-4 sm:p-6">
              <h2 className="mb-5 font-display text-lg font-bold flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                How it works
              </h2>
              <ol className="relative space-y-4 pl-1">
                {/* Connecting line */}
                <div className="absolute left-[15px] top-[2rem] bottom-[1rem] w-px border-l-2 border-dashed border-indigo-100 dark:border-indigo-900/30" />

                {tool.inputType === "file" && (
                  <li className="relative flex items-start gap-3.5">
                    <span className="step-indicator">1</span>
                    <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                      Upload your {tool.acceptedFormats?.join(", ") || "file"}
                    </span>
                  </li>
                )}
                {tool.inputType === "text" && (
                  <li className="relative flex items-start gap-3.5">
                    <span className="step-indicator">1</span>
                    <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                      Enter or paste your text input
                    </span>
                  </li>
                )}
                {tool.inputType === "url" && (
                  <li className="relative flex items-start gap-3.5">
                    <span className="step-indicator">1</span>
                    <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                      Paste the source URL you want to process
                    </span>
                  </li>
                )}
                {tool.inputType === "both" && (
                  <li className="relative flex items-start gap-3.5">
                    <span className="step-indicator">1</span>
                    <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                      Upload a supported file or enter a prompt to generate your
                      result
                    </span>
                  </li>
                )}
                <li className="relative flex items-start gap-3.5">
                  <span className="step-indicator">2</span>
                  <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                    Configure options if needed
                  </span>
                </li>
                <li className="relative flex items-start gap-3.5">
                  <span className="step-indicator">3</span>
                  <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                    Click process and wait a few seconds
                  </span>
                </li>
                <li className="relative flex items-start gap-3.5">
                  <span className="step-indicator">4</span>
                  <span className="text-sm text-muted-foreground pt-1.5 leading-relaxed">
                    Download or copy your{" "}
                    {tool.outputType === "file" ? "file" : "result"}
                  </span>
                </li>
              </ol>
            </div>

            <div className="premium-card p-4 sm:p-6">
              <h2 className="mb-5 font-display text-lg font-bold flex items-center gap-2">
                <div className="h-1 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                Key features
              </h2>
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="feature-check">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  100% free, no account required
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="feature-check">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  Fast processing, results in seconds
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="feature-check">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  Your files are never stored
                </li>
                {(tool.inputType === "file" || tool.inputType === "both") && (
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="feature-check">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    Drag and drop support
                  </li>
                )}
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="feature-check">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  Works on desktop and mobile
                </li>
                {tool.outputType === "file" && (
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="feature-check">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    Instant download after processing
                  </li>
                )}
              </ul>
            </div>
          </div>

          <SEOContent tool={tool} />

          {related.length > 0 && (
            <section className="mt-2">
              <div className="mb-5">
                <p className="premium-kicker">
                  More {tool.category.toLowerCase()} workflows
                </p>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">
                  Related tools
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Continue with more {tool.category.toLowerCase()} tools built
                  in the same premium workspace.
                </p>
              </div>
              <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:overflow-visible sm:px-0">
                <div className="flex min-w-max gap-2.5 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
                {related.map((item) => (
                  <div key={item.id} className="w-[42vw] max-w-[12rem] shrink-0 sm:w-auto sm:max-w-none">
                    <ToolCard tool={item} />
                  </div>
                ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
