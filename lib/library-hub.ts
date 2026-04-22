import { buildPreviewDoc, getEffectSlug, getUiCollectionLabel, uiEffects, type UiCatalogItem } from '@/lib/css-effects-library'
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
  uiItem?: UiCatalogItem
  templateMeta?: {
    frameworkLabel: string
    platformLabel: string
    industry: string
  }
  previewDocument?: string
  previewImage?: string
}

function mapUiItem(item: UiCatalogItem): LibraryHubItem {
  return {
    id: item.id,
    kind: 'ui',
    slug: getEffectSlug(item),
    href: `/ui/${getEffectSlug(item)}`,
    title: item.title,
    category: item.category,
    categoryLabel: getUiCollectionLabel(item.category),
    summary: item.description,
    tags: item.tags,
    featured: Boolean(item.featured),
    updatedAt: item.publishedAt,
    uiItem: item,
    previewDocument: buildPreviewDoc(item),
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
    tags: template.tags,
    featured: Boolean(template.featured),
    updatedAt: template.updatedAt,
    templateMeta: {
      frameworkLabel: template.frameworkLabel,
      platformLabel: template.platformLabel,
      industry: template.industry,
    },
    previewDocument: template.previewHtml,
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
