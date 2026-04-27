import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import FixGuidePage from '@/components/fixes/FixGuidePage'
import { FIX_GUIDES, getFixGuideBySlug, getRelatedFixGuides } from '@/lib/fixes-data'
import { SITE_URL } from '@/lib/site-url'

type FixGuidePageProps = {
  params: Promise<{ slug: string }>
}

function buildFixStructuredData(baseUrl: string, slug: string) {
  const guide = getFixGuideBySlug(slug)
  if (!guide) return null

  const pageUrl = `${baseUrl}/fixes/${guide.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Fixes',
            item: `${baseUrl}/fixes`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: guide.clusterTitle,
            item: pageUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: guide.title,
        description: guide.metaDescription,
        url: pageUrl,
        totalTime: 'PT10M',
        step: guide.steps.map(step => ({
          '@type': 'HowToStep',
          name: step.title,
          text: step.detail,
          position: step.step,
          url: `${pageUrl}#step-${step.step}`,
        })),
      },
    ],
  }
}

export function generateStaticParams() {
  return FIX_GUIDES.map(guide => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: FixGuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getFixGuideBySlug(slug)

  if (!guide) {
    return {
      title: 'Fixes Universe',
    }
  }

  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    keywords: Array.from(new Set([guide.clusterTitle, guide.platformLabel, ...guide.tags])),
    openGraph: {
      title: guide.seoTitle,
      description: guide.metaDescription,
      url: `/fixes/${guide.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
      description: guide.metaDescription,
    },
  }
}

export default async function FixSlugPage({ params }: FixGuidePageProps) {
  const { slug } = await params
  const guide = getFixGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const relatedGuides = getRelatedFixGuides(slug, 4)
  const jsonLd = buildFixStructuredData(SITE_URL, slug)

  return (
    <PublicLayout>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <UniverseTopBar items={[{ label: 'Fixes', href: '/fixes' }, { label: guide.clusterTitle, href: `/fixes?cluster=${guide.cluster}` }, { label: guide.title }]} actionName={guide.title} actionSlug={guide.slug} />
      <FixGuidePage guide={guide} relatedGuides={relatedGuides} />
    </PublicLayout>
  )
}


