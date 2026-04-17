import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DiscoverDetailPage from '@/components/discover/DiscoverDetailPage'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import { getDiscoverListBySlug, getPublishedDiscoverLists } from '@/lib/discover-db'
import type { DiscoverList } from '@/lib/discover-data'

type DiscoverPageProps = {
  params: Promise<{ slug: string }>
}

function buildDiscoverStructuredData(baseUrl: string, list: DiscoverList) {
  const pageUrl = `${baseUrl}/discover/${list.slug}`

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Discover',
        item: `${baseUrl}/discover`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: list.category,
        item: pageUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: list.title,
        item: pageUrl,
      },
    ],
  }

  const faq =
    list.faq.length > 0
      ? {
          '@type': 'FAQPage',
          mainEntity: list.faq.map(entry => ({
            '@type': 'Question',
            name: entry.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: entry.answer,
            },
          })),
        }
      : null

  if (list.type === 'guide') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'HowTo',
          name: list.title,
          description: list.metaDescription,
          totalTime: `PT${Math.max(10, list.steps.length * 3)}M`,
          url: pageUrl,
          step: list.steps.map(step => ({
            '@type': 'HowToStep',
            name: step.title,
            text: step.description,
            position: step.step,
            url: `${pageUrl}#step-${step.step}`,
          })),
        },
        ...(faq ? [faq] : []),
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb,
      {
        '@type': 'ItemList',
        name: list.title,
        description: list.metaDescription,
        numberOfItems: list.items.length,
        url: pageUrl,
        itemListElement: list.items.map(item => ({
          '@type': 'ListItem',
          position: item.rank,
          name: item.name,
          description: item.summary,
          url: `${pageUrl}#item-${item.rank}`,
        })),
      },
      ...(faq ? [faq] : []),
    ],
  }
}

export async function generateMetadata({ params }: DiscoverPageProps): Promise<Metadata> {
  const { slug } = await params
  const list = await getDiscoverListBySlug(slug)

  if (!list) {
    return {
      title: 'Discover',
    }
  }

  return {
    title: list.seoTitle,
    description: list.metaDescription,
    keywords: Array.from(
      new Set([list.category, list.subcategory, list.scope, ...list.tags].filter((value): value is string => Boolean(value)))
    ),
    openGraph: {
      title: list.seoTitle,
      description: list.metaDescription,
      type: 'article',
      url: `/discover/${list.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: list.seoTitle,
      description: list.metaDescription,
    },
  }
}

export default async function DiscoverSlugPage({ params }: DiscoverPageProps) {
  const { slug } = await params
  const list = await getDiscoverListBySlug(slug)

  if (!list || !list.published) {
    notFound()
  }

  const allLists = await getPublishedDiscoverLists()
  const relatedLists = allLists.filter(candidate => list.relatedSlugs.includes(candidate.slug))
  const baseUrl = 'https://multiverse-tools.vercel.app'
  const jsonLd = buildDiscoverStructuredData(baseUrl, list)

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UniverseTopBar items={[{ label: 'Discover', href: '/discover' }, { label: list.category, href: `/discover?category=${encodeURIComponent(list.category)}` }, { label: list.title }]} actionName={list.title} actionSlug={list.slug} />
      <DiscoverDetailPage list={list} relatedLists={relatedLists} />
    </PublicLayout>
  )
}


