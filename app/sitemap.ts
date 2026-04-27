import { MetadataRoute } from "next";
import { FIX_GUIDES } from "@/lib/fixes-data";
import { getPublishedPrompts } from "@/lib/prompt-db";
import { getPublishedTemplates } from "@/lib/template-db";
import { DOWNLOADER_ROUTES } from "@/lib/downloader-route-data";
import { ACTIVE_CATEGORIES, TOOLS, VIDEO_DOWNLOADER_TOOL_SLUGS } from "@/lib/tools-data";
import { getEffectSlug, uiEffects } from "@/lib/css-effects-library";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://multiverse-tools.vercel.app";
  const staticDate = new Date("2025-01-01");
  const contentDate = new Date("2026-04-01");

  const [prompts, templates] = await Promise.all([
    getPublishedPrompts(),
    getPublishedTemplates(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fixes`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/design`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dev`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ui`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = ACTIVE_CATEGORIES.map(
    (cat) => ({
      url: `${baseUrl}/tools/${cat.slug}`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const toolRoutes: MetadataRoute.Sitemap = TOOLS.filter(
    (t) =>
      t.implemented &&
      t.enabled !== false &&
      !VIDEO_DOWNLOADER_TOOL_SLUGS.has(t.slug),
  ).map((tool) => ({
    url: `${baseUrl}/tools/${tool.categorySlug}/${tool.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: tool.tags.includes("trending") || tool.popular ? 0.8 : 0.6,
  }));

  const downloaderRoutes: MetadataRoute.Sitemap = DOWNLOADER_ROUTES.map(
    (route) => ({
      url: `${baseUrl}/${route.routeSlug}`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: route.routeSlug === "downloader" ? 0.9 : 0.82,
    }),
  );

  const fixRoutes: MetadataRoute.Sitemap = FIX_GUIDES.map((guide) => ({
    url: `${baseUrl}/fixes/${guide.slug}`,
    lastModified: new Date(guide.updatedAt).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: new Date(prompt.updatedAt).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const templateRoutes: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(template.updatedAt).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const uiRoutes: MetadataRoute.Sitemap = uiEffects.map((effect) => ({
    url: `${baseUrl}/ui/${getEffectSlug(effect)}`,
    lastModified: effect.publishedAt ? new Date(effect.publishedAt).toISOString() : contentDate,
    changeFrequency: "monthly",
    priority: effect.featured ? 0.72 : 0.55,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...downloaderRoutes,
    ...fixRoutes,
    ...promptRoutes,
    ...templateRoutes,
    ...uiRoutes,
  ];
}
