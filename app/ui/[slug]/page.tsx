import type { Metadata } from 'next'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'
import EffectDetailClient from '@/components/effects/EffectDetailClient'
import SourceHubChrome from '@/components/source-hub/SourceHubChrome'
import {
  getEffectBySlug,
  getEffectSlug,
  getUiCollectionMeta,
  uiEffects,
  type UiCatalogItem,
} from '@/lib/css-effects-library'

type UiSlugPageProps = {
  params: Promise<{ slug: string }>
}

function buildStructuredData(baseUrl: string, slug: string) {
  const effect = getEffectBySlug(slug)
  if (!effect) return null

  const pageUrl = `${baseUrl}/ui/${slug}`
  const collectionMeta = getUiCollectionMeta(effect.category)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'UI Universe', item: `${baseUrl}/ui` },
          { '@type': 'ListItem', position: 2, name: collectionMeta.sectionLabel, item: `${baseUrl}/ui?section=${collectionMeta.sectionId}` },
          { '@type': 'ListItem', position: 3, name: collectionMeta.label, item: `${baseUrl}/ui?section=${collectionMeta.sectionId}&category=${effect.category}` },
          { '@type': 'ListItem', position: 4, name: effect.title, item: pageUrl },
        ],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: effect.title,
        description: effect.description,
        url: pageUrl,
        programmingLanguage: ['HTML', 'CSS'],
        runtimePlatform: 'Web Browser',
        keywords: [collectionMeta.sectionLabel, collectionMeta.label, ...effect.tags],
        isAccessibleForFree: true,
      },
    ],
  }
}

function getRelatedEffects(effect: UiCatalogItem): UiCatalogItem[] {
  const effectTags = new Set(effect.tags)

  return uiEffects
    .filter(candidate => candidate.id !== effect.id)
    .map(candidate => {
      let score = 0
      if (candidate.category === effect.category) score += 4
      for (const tag of candidate.tags) {
        if (effectTags.has(tag)) score += 1
      }
      return { candidate, score }
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title))
    .slice(0, 4)
    .map(item => item.candidate)
}

export async function generateStaticParams() {
  return uiEffects.map(effect => ({
    slug: getEffectSlug(effect),
  }))
}

export async function generateMetadata({ params }: UiSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const effect = getEffectBySlug(slug)

  if (!effect) {
    return {
      title: 'UI Universe',
    }
  }

  const collectionMeta = getUiCollectionMeta(effect.category)
  const title = `${effect.title} - ${collectionMeta.label} UI with Preview, React and Tailwind Starter | Multiverse`
  const description = `${effect.description} View the live preview, copy the original HTML and CSS, and start faster with React and Tailwind-friendly code.`

  return {
    title,
    description,
    keywords: Array.from(
      new Set([
        effect.title,
        collectionMeta.label,
        collectionMeta.sectionLabel,
        'ui component',
        'ui pattern',
        'react starter',
        'tailwind starter',
        ...effect.tags,
      ])
    ),
    openGraph: {
      title,
      description,
      url: `/ui/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function UiSlugPage({ params }: UiSlugPageProps) {
  const { slug } = await params
  const rawEffect = getEffectBySlug(slug)

  if (!rawEffect) {
    notFound()
  }

  const effect: UiCatalogItem =
    rawEffect.kind === 'source' && rawEffect.sourcePath
      ? {
          ...rawEffect,
          reactCode: await readFile(path.join(process.cwd(), rawEffect.sourcePath), 'utf8'),
        }
      : rawEffect

  const jsonLd = buildStructuredData('https://multiverse-tools.vercel.app', slug)
  const relatedEffects = getRelatedEffects(effect)

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <SourceHubChrome />
      <EffectDetailClient effect={effect} relatedEffects={relatedEffects} />
    </>
  )
}
