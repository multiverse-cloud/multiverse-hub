import { MetadataRoute } from 'next'
import { FIX_GUIDES } from '@/lib/fixes-data'
import { getPublishedPrompts } from '@/lib/prompt-db'
import { getPublishedTemplates } from '@/lib/template-db'
import { CATEGORIES, TOOLS } from '@/lib/tools-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://multiverse-tools.vercel.app'
  const now = new Date().toISOString()

  const [prompts, templates] = await Promise.all([getPublishedPrompts(), getPublishedTemplates()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/discover`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/prompts`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/templates`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/fixes`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/design`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/dev`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/daily`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ui`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const toolRoutes: MetadataRoute.Sitemap = TOOLS
    .filter(t => t.implemented && t.enabled !== false)
    .map(tool => ({
      url: `${baseUrl}/tools/${tool.categorySlug}/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const fixRoutes: MetadataRoute.Sitemap = FIX_GUIDES.map(guide => ({
    url: `${baseUrl}/fixes/${guide.slug}`,
    lastModified: new Date(guide.updatedAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const promptRoutes: MetadataRoute.Sitemap = prompts.map(prompt => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: new Date(prompt.updatedAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const templateRoutes: MetadataRoute.Sitemap = templates.map(template => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(template.updatedAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...toolRoutes,
    ...fixRoutes,
    ...promptRoutes,
    ...templateRoutes,
  ]
}
