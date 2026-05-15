import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import VideoDownloaderPageSlot from "@/components/tools/VideoDownloaderPageSlot";
import {
  DOWNLOADER_ROUTES,
  getDownloaderPageName,
  getDownloaderRoute,
  getDownloaderTabs,
  getRelatedDownloaderRoutes,
  type DownloaderRouteEntry,
} from "@/lib/downloader-route-data";
import { getToolBySlug } from "@/lib/db";
import { createSeoLandingMetadata, getSeoLandingPage } from "@/lib/seo-landing-pages";
import type { Tool } from "@/lib/tools-data";
import { SITE_URL } from "@/lib/site-url";

type Props = {
  params: Promise<{ downloader: string }>;
};

const BASE_URL = SITE_URL;

export const revalidate = 3600;

function areDownloaderRoutesEnabled() {
  return (
    process.env.VIDEO_DOWNLOADERS_ENABLED === "true" ||
    process.env.NEXT_PUBLIC_VIDEO_DOWNLOADERS_ENABLED === "true"
  );
}

function buildDownloaderSchemas(route: DownloaderRouteEntry, tool: Tool) {
  const pageUrl = `${BASE_URL}/${route.routeSlug}`;
  const pageName = getDownloaderPageName(route);

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
      ...route.howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        name: `Step ${index + 1}`,
        text: step,
      })),
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [webApplicationSchema, breadcrumbSchema, howToSchema, faqSchema];
}

export function generateStaticParams() {
  if (!areDownloaderRoutesEnabled()) return [];

  return DOWNLOADER_ROUTES.map((route) => ({
    downloader: route.routeSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { downloader } = await params;
  const seoPage = getSeoLandingPage(downloader);
  if (seoPage) return createSeoLandingMetadata(seoPage.slug);

  const route = getDownloaderRoute(downloader);
  if (!route) return {};

  if (!areDownloaderRoutesEnabled()) {
    return {
      title: "Downloader unavailable | mtverse",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageUrl = `${BASE_URL}/${route.routeSlug}`;

  return {
    title: `${route.title} | mtverse`,
    description: route.description,
    keywords: [
      ...route.keywords,
      "free online downloader",
      "video downloader no watermark",
      "mp4 downloader",
      "mp3 downloader",
      "reels downloader",
      "short video downloader",
      "fast media downloader",
    ],
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
            alt: getDownloaderPageName(route),
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
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function DownloaderRootPage({ params }: Props) {
  const { downloader } = await params;
  const seoPage = getSeoLandingPage(downloader);
  if (seoPage) return <SeoLandingPage slug={seoPage.slug} />;

  if (!areDownloaderRoutesEnabled()) notFound();

  const route = getDownloaderRoute(downloader);
  if (!route) notFound();

  const tool = await getToolBySlug(route.toolSlug);
  if (!tool || tool.enabled === false) notFound();

  const routeTabs = getDownloaderTabs(route).map(tab => ({
    label: tab.label,
    href: `/${tab.routeSlug}`,
    active: tab.routeSlug === route.routeSlug,
  }));
  const relatedRoutes = getRelatedDownloaderRoutes(route).map(item => ({
    label: getDownloaderPageName(item),
    href: `/${item.routeSlug}`,
    description: item.description,
  }));

  return (
    <PublicLayout schemaMarkup={buildDownloaderSchemas(route, tool)}>
      <VideoDownloaderPageSlot tool={tool} route={route} routeTabs={routeTabs} relatedRoutes={relatedRoutes} />
    </PublicLayout>
  );
}
