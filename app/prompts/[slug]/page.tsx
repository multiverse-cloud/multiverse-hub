import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import PromptDetailPage from '@/components/prompts/PromptDetailPage'
import { getPublishedPrompts } from '@/lib/prompt-db'
import type { PromptEntry } from '@/lib/prompt-library-data'
import { SITE_URL, absoluteUrl } from '@/lib/site-url'

type PromptSlugPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600;
export const dynamicParams = true;
const PROMPT_STATIC_PARAMS_LIMIT = 1200;

export async function generateStaticParams() {
  const prompts = await getPublishedPrompts()

  return prompts.slice(0, PROMPT_STATIC_PARAMS_LIMIT).map(prompt => ({
    slug: prompt.slug,
  }))
}

async function getPromptPageData(slug: string) {
  const prompts = await getPublishedPrompts()
  const prompt = prompts.find(entry => entry.slug === slug) || null

  if (!prompt) {
    return {
      prompt: null,
      relatedPrompts: [],
    }
  }

  const relatedPrompts = prompt.relatedSlugs
    .map(relatedSlug => prompts.find(entry => entry.slug === relatedSlug) || null)
    .filter((entry): entry is PromptEntry => Boolean(entry))
    .slice(0, 4)

  return {
    prompt,
    relatedPrompts,
  }
}

function buildPromptStructuredData(baseUrl: string, prompt: PromptEntry) {
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
        headline: `${prompt.seoTitle} | Free AI Prompt`,
        description: prompt.metaDescription.toLowerCase().includes('free')
          ? prompt.metaDescription
          : `Free AI prompt: ${prompt.metaDescription}`,
        url: pageUrl,
        dateModified: prompt.updatedAt,
        articleSection: prompt.categoryTitle,
        keywords: ['free AI prompt', 'free AI prompts', ...prompt.tags],
      },
    ],
  }
}

export async function generateMetadata({ params }: PromptSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const { prompt } = await getPromptPageData(slug)

  if (!prompt) {
    return {
      title: 'Prompt Hub',
    }
  }

  const seoTitle = `${prompt.seoTitle} | Free AI Prompt`
  const seoDescription = prompt.metaDescription.toLowerCase().includes('free')
    ? prompt.metaDescription
    : `Free AI prompt: ${prompt.metaDescription}`
  const seoKeywords = Array.from(
    new Set([
      'free AI prompt',
      'free AI prompts',
      'copy AI prompt',
      'AI image prompt',
      prompt.categoryTitle,
      prompt.subcategory,
      ...prompt.models,
      ...prompt.tags,
    ])
  )

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: absoluteUrl(`/prompts/${prompt.slug}`),
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
      title: seoTitle,
      description: seoDescription,
    },
    alternates: {
      canonical: absoluteUrl(`/prompts/${prompt.slug}`),
    },
  }
}

export default async function PromptSlugPage({ params }: PromptSlugPageProps) {
  const { slug } = await params
  const { prompt, relatedPrompts } = await getPromptPageData(slug)

  if (!prompt) {
    notFound()
  }

  const jsonLd = buildPromptStructuredData(SITE_URL, prompt)

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


