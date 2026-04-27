import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import PromptDetailPage from '@/components/prompts/PromptDetailPage'
import { getPromptBySlug, getPublishedPrompts, getRelatedPrompts } from '@/lib/prompt-db'
import { SITE_URL } from '@/lib/site-url'

type PromptSlugPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const prompts = await getPublishedPrompts()

  return prompts.map(prompt => ({
    slug: prompt.slug,
  }))
}

async function buildPromptStructuredData(baseUrl: string, slug: string) {
  const prompt = await getPromptBySlug(slug)
  if (!prompt) return null

  const pageUrl = `${baseUrl}/prompts/${prompt.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Prompt Hub',
            item: `${baseUrl}/prompts`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: prompt.categoryTitle,
            item: pageUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: prompt.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: prompt.seoTitle,
        description: prompt.metaDescription,
        url: pageUrl,
        dateModified: prompt.updatedAt,
        articleSection: prompt.categoryTitle,
        keywords: prompt.tags,
      },
    ],
  }
}

export async function generateMetadata({ params }: PromptSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const prompt = await getPromptBySlug(slug)

  if (!prompt) {
    return {
      title: 'Prompt Hub',
    }
  }

  return {
    title: prompt.seoTitle,
    description: prompt.metaDescription,
    keywords: Array.from(new Set([prompt.categoryTitle, prompt.subcategory, ...prompt.models, ...prompt.tags])),
    openGraph: {
      title: prompt.seoTitle,
      description: prompt.metaDescription,
      url: `/prompts/${prompt.slug}`,
      type: 'article',
      images: [
        {
          url: prompt.previewImage,
          alt: prompt.previewAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.seoTitle,
      description: prompt.metaDescription,
    },
  }
}

export default async function PromptSlugPage({ params }: PromptSlugPageProps) {
  const { slug } = await params
  const prompt = await getPromptBySlug(slug)

  if (!prompt) {
    notFound()
  }

  const relatedPrompts = await getRelatedPrompts(slug, 4)
  const jsonLd = await buildPromptStructuredData(SITE_URL, slug)

  return (
    <PublicLayout>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <UniverseTopBar items={[{ label: 'Prompts', href: '/prompts' }, { label: prompt.categoryTitle, href: `/prompts?category=${prompt.category}` }, { label: prompt.title }]} actionName={prompt.title} actionSlug={prompt.slug} />
      <PromptDetailPage prompt={prompt} relatedPrompts={relatedPrompts} />
    </PublicLayout>
  )
}


