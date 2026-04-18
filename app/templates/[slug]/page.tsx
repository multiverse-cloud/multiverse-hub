import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TemplateDetailPage from '@/components/templates/TemplateDetailPage'
import { getRelatedTemplates, getTemplateBySlug } from '@/lib/template-db'

type TemplateSlugPageProps = {
  params: Promise<{ slug: string }>
}

function getFrameworkLabel(value: string) {
  return value
}

async function buildTemplateStructuredData(baseUrl: string, slug: string) {
  const template = await getTemplateBySlug(slug)
  if (!template) return null

  const pageUrl = `${baseUrl}/templates/${template.slug}`
  const downloadUrl = `${pageUrl}/download`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'UI Templates',
            item: `${baseUrl}/templates`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: template.categoryTitle,
            item: pageUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: template.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'SoftwareSourceCode',
        name: template.title,
        description: template.metaDescription,
        url: pageUrl,
        downloadUrl,
        runtimePlatform: template.platformLabel,
        programmingLanguage: getFrameworkLabel(template.frameworkLabel),
        isAccessibleForFree: true,
        keywords: [...template.tags, ...template.techStack],
        license: template.license,
      },
    ],
  }
}

export async function generateMetadata({ params }: TemplateSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    return {
      title: 'UI Templates',
    }
  }

  const seoTitle = `${template.title} - Free ${template.categoryTitle} UI Template | Multiverse`
  const seoDescription = `${template.summary} Download this free ${template.categoryTitle.toLowerCase()} built for ${template.industry.toLowerCase()} and modern ${getFrameworkLabel(template.frameworkLabel).toLowerCase()} workflows.`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: Array.from(
      new Set([
        template.categoryTitle,
        template.platformLabel,
        template.industry,
        getFrameworkLabel(template.frameworkLabel),
        'free ui template',
        'premium ui template',
        ...template.tags,
      ])
    ),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/templates/${template.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
  }
}

export default async function TemplateSlugPage({ params }: TemplateSlugPageProps) {
  const { slug } = await params
  const template = await getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const relatedTemplates = await getRelatedTemplates(slug, 3)
  const jsonLd = await buildTemplateStructuredData('https://multiverse-tools.vercel.app', slug)

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <TemplateDetailPage template={template} relatedTemplates={relatedTemplates} />
    </>
  )
}





