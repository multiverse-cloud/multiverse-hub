import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import VideoDownloaderClient from "@/components/tools/VideoDownloaderClient";
import {
  DOWNLOADER_ROUTES,
  getDownloaderRoute,
  type DownloaderRouteEntry,
} from "@/lib/downloader-route-data";
import { getToolBySlug } from "@/lib/db";
import type { Tool } from "@/lib/tools-data";

type Props = {
  params: Promise<{ downloader: string }>;
};

const BASE_URL = "https://multiverse-tools.vercel.app";

export const revalidate = 3600;

function getPageName(route: DownloaderRouteEntry) {
  return route.title.split(" - ")[0] || route.title;
}

function buildDownloaderSchemas(route: DownloaderRouteEntry, tool: Tool) {
  const pageUrl = `${BASE_URL}/${route.routeSlug}`;
  const pageName = getPageName(route);

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: pageName,
    description: route.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Video Downloaders",
        item: `${BASE_URL}/downloader`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageName,
        item: pageUrl,
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${pageName}`,
    description: `Use ${pageName} to fetch public media metadata and download available formats without creating an account.`,
    step: [
      {
        "@type": "HowToStep",
        name: "Paste a public link",
        text: `Copy a public ${tool.name.replace(" Downloader", "").toLowerCase()} URL and paste it into the downloader input.`,
      },
      {
        "@type": "HowToStep",
        name: "Review available formats",
        text: "Check the detected platform, thumbnail, title, and supported video, audio, or thumbnail formats.",
      },
      {
        "@type": "HowToStep",
        name: "Download temporarily",
        text: "Choose a format and download the file directly. Multiverse does not save your history or keep user files permanently.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Can ${pageName} download private videos?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Multiverse supports public, accessible media only. Private, protected, deleted, restricted, login-only, or DRM-protected content is not supported.",
        },
      },
      {
        "@type": "Question",
        name: "Does Multiverse save download history?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The public downloader is stateless and does not create user accounts, save history, or store preferences.",
        },
      },
      {
        "@type": "Question",
        name: `What formats does ${pageName} support?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Available formats depend on the public source media. When supported, Multiverse can show MP4, WEBM, MP3, M4A, and thumbnail options.",
        },
      },
    ],
  };

  return [webApplicationSchema, breadcrumbSchema, howToSchema, faqSchema];
}

export function generateStaticParams() {
  return DOWNLOADER_ROUTES.map((route) => ({
    downloader: route.routeSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { downloader } = await params;
  const route = getDownloaderRoute(downloader);
  if (!route) return {};

  const pageUrl = `${BASE_URL}/${route.routeSlug}`;

  return {
    title: `${route.title} | Multiverse`,
    description: route.description,
    keywords: route.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: `${BASE_URL}/og-tool.png`,
          width: 1200,
          height: 630,
          alt: getPageName(route),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [`${BASE_URL}/og-tool.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DownloaderRootPage({ params }: Props) {
  const { downloader } = await params;
  const route = getDownloaderRoute(downloader);
  if (!route) notFound();

  const tool = await getToolBySlug(route.toolSlug);
  if (!tool || tool.enabled === false) notFound();

  return (
    <PublicLayout schemaMarkup={buildDownloaderSchemas(route, tool)}>
      <VideoDownloaderClient tool={tool} />
    </PublicLayout>
  );
}
