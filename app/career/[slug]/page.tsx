import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CareerDetailPage from '@/components/career/CareerDetailPage'
import { getCareerRelatedTemplates, getCareerTemplateBySlug, getCareerTemplates } from '@/lib/career-db'

type CareerSlugPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const templates = await getCareerTemplates()
  return templates.map(template => ({ slug: template.slug }))
}

function buildStructuredData(slug: string, title: string, description: string) {
  const pageUrl = `https://multiverse-tools.vercel.app/career/${slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://multiverse-tools.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: 'Career Universe', item: 'https://multiverse-tools.vercel.app/career' },
          { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: title,
        description,
        url: pageUrl,
      },
    ],
  }
}

export async function generateMetadata({ params }: CareerSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const template = await getCareerTemplateBySlug(slug)

  if (!template) {
    return { title: 'Career Universe' }
  }

  const pageUrl = `https://multiverse-tools.vercel.app/career/${template.slug}`

  return {
    title: template.seoTitle,
    description: template.metaDescription,
    keywords: Array.from(
      new Set([
        template.categoryTitle,
        template.theme,
        'resume template',
        'cv template',
        'ats friendly resume',
        ...template.tags,
      ])
    ),
    alternates: { canonical: pageUrl },
    openGraph: {
      title: template.seoTitle,
      description: template.metaDescription,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: `https://multiverse-tools.vercel.app${template.previewImage}`,
          width: 1200,
          height: 1600,
          alt: `${template.title} preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: template.seoTitle,
      description: template.metaDescription,
      images: [`https://multiverse-tools.vercel.app${template.previewImage}`],
    },
  }
}

export default async function CareerSlugPage({ params }: CareerSlugPageProps) {
  const { slug } = await params
  const template = await getCareerTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const relatedTemplates = await getCareerRelatedTemplates(slug, 3)
  const jsonLd = buildStructuredData(template.slug, template.title, template.metaDescription)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerDetailPage template={template} relatedTemplates={relatedTemplates} />
    </>
  )
}
