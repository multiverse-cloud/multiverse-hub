import { MetadataRoute } from 'next'
import { CATEGORIES, TOOLS } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://multiverse-tools.vercel.app'

  // Static routes
  const staticRoutes = [
    '',
    '/tools',
    '/dashboard',
    '/design',
    '/learn',
    '/dev',
    '/discover',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Category routes
  const categoryRoutes = CATEGORIES.map(cat => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Tool detail routes
  const toolRoutes = TOOLS.filter(t => t.implemented && t.enabled !== false).map(tool => ({
    url: `${baseUrl}/tools/${tool.categorySlug}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes]
}
