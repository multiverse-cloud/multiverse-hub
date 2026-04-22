import type { Metadata } from 'next'
import PublicLayout from '@/components/layout/PublicLayout'
import CssEffectsLibraryClient from '@/components/dev/CssEffectsLibraryClient'
import {
  getEffectSlug,
  getUiCollectionLabel,
  getUiCollections,
  getUiSectionIdForCategory,
  getUiSections,
  uiEffects,
  type UiSectionId,
} from '@/lib/css-effects-library'

export const metadata: Metadata = {
  title: 'UI Universe - Premium Components, Effects, and Source-Backed UI',
  description:
    'Browse premium UI components and visual foundations with live previews, copy-ready code, source-backed React components, and product-grade detail pages.',
}

interface UiPageProps {
  searchParams?: Promise<{
    q?: string | string[]
    section?: string | string[]
    category?: string | string[]
  }>
}

export default async function UiPage({ searchParams }: UiPageProps) {
  const resolvedSearchParams = await searchParams
  const initialQuery = Array.isArray(resolvedSearchParams?.q) ? resolvedSearchParams?.q[0] : resolvedSearchParams?.q
  const initialSection = Array.isArray(resolvedSearchParams?.section)
    ? resolvedSearchParams?.section[0]
    : resolvedSearchParams?.section
  const initialCategory = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category

  const items = uiEffects.map(effect => ({
    id: effect.id,
    title: effect.title,
    category: effect.category,
    description: effect.description,
    tags: effect.tags,
    previewClass: effect.previewClass,
    kind: effect.kind,
    sourcePath: effect.sourcePath,
    previewKey: effect.previewKey,
    publishedAt: effect.publishedAt,
    featured: effect.featured,
    provider: effect.provider,
    frameworkLabel: effect.frameworkLabel,
    collection: effect.collection,
    collectionLabel: effect.collectionLabel,
    variantLabel: effect.variantLabel,
    darkVariant: effect.darkVariant,
    plugins: effect.plugins,
    license: effect.license,
    slug: getEffectSlug(effect),
    sectionId: getUiSectionIdForCategory(effect.category),
  }))
  const sections = getUiSections()
  const collectionsBySection: Record<UiSectionId, ReturnType<typeof getUiCollections>> = {
    all: getUiCollections('all'),
    components: getUiCollections('components'),
    foundations: getUiCollections('foundations'),
  }
  const collectionLabels = Object.fromEntries(
    getUiCollections('all').map(collection => [collection.id, getUiCollectionLabel(collection.id)])
  )

  return (
    <PublicLayout variant="source-hub">
      <CssEffectsLibraryClient
        initialQuery={initialQuery || ''}
        initialSection={(initialSection as 'all' | 'components' | 'foundations') || 'all'}
        initialCategory={initialCategory || 'all'}
        items={items}
        sections={sections}
        collectionsBySection={collectionsBySection}
        collectionLabels={collectionLabels}
      />
    </PublicLayout>
  )
}
