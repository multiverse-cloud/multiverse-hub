import { getEffectSlug, getUiCollectionLabel, uiEffects, type UiCatalogItem } from '@/lib/css-effects-library'
import { getPublishedTemplates } from '@/lib/template-db'
import type { TemplateEntry } from '@/lib/template-library-data'

export type LibraryKind = 'ui' | 'template'

export type LibraryHubItem = {
  id: string
  kind: LibraryKind
  slug: string
  href: string
  title: string
  category: string
  categoryLabel: string
  summary: string
  tags: string[]
  featured: boolean
  updatedAt?: string
  templateMeta?: {
    frameworkLabel: string
    platformLabel: string
    industry: string
  }
  previewUrl?: string
  previewImage?: string
}

function mapUiItem(item: UiCatalogItem): LibraryHubItem {
  const slug = getEffectSlug(item)

  return {
    id: item.id,
    kind: 'ui',
    slug,
    href: `/ui/${slug}`,
    title: item.title,
    category: item.category,
    categoryLabel: getUiCollectionLabel(item.category),
    summary: item.description,
    tags: item.tags.slice(0, 4),
    featured: Boolean(item.featured),
    updatedAt: item.publishedAt,
    previewUrl: `/ui/${slug}/preview`,
  }
}

function mapTemplateItem(template: TemplateEntry): LibraryHubItem {
  return {
    id: template.id,
    kind: 'template',
    slug: template.slug,
    href: `/templates/${template.slug}`,
    title: template.title,
    category: template.category,
    categoryLabel: template.categoryTitle,
    summary: template.summary,
    tags: template.tags.slice(0, 4),
    featured: Boolean(template.featured),
    updatedAt: template.updatedAt,
    templateMeta: {
      frameworkLabel: template.frameworkLabel,
      platformLabel: template.platformLabel,
      industry: template.industry,
    },
    previewUrl: `/templates/${template.slug}/preview`,
    previewImage: template.previewImage,
  }
}

export function getUiLibraryHubItems() {
  return uiEffects.map(mapUiItem)
}

export async function getTemplateLibraryHubItems() {
  const templates = await getPublishedTemplates()
  return templates.map(mapTemplateItem)
}

export async function getLibraryHubData() {
  const uiItems = getUiLibraryHubItems()
  const templateItems = await getTemplateLibraryHubItems()

  return {
    uiItems,
    templateItems,
    items: [...templateItems, ...uiItems],
  }
}
