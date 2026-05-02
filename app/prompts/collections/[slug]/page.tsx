import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import UniverseTopBar from '@/components/public/UniverseTopBar'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import {
  getPromptCollection,
  getPromptCollectionHref,
  getPromptsForCollection,
  PROMPT_COLLECTIONS,
} from '@/lib/prompt-collections'
import { getPromptLibraryData } from '@/lib/prompt-db'
import type { PromptEntry } from '@/lib/prompt-library-data'
import { absoluteUrl, SITE_URL } from '@/lib/site-url'

type PromptCollectionPageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

const COLLECTION_VISIBLE_LIMIT = 96

export function generateStaticParams() {
  return PROMPT_COLLECTIONS.map(collection => ({
    slug: collection.slug,
  }))
}

export async function generateMetadata({ params }: PromptCollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getPromptCollection(slug)

  if (!collection) {
    return {
      title: 'Free AI Prompt Collections',
    }
  }

  return {
    title: `${collection.title} - Copy Free AI Prompts`,
    description: collection.metaDescription,
    keywords: collection.keywords,
    openGraph: {
      title: `${collection.title} | mtverse`,
      description: collection.metaDescription,
      url: absoluteUrl(getPromptCollectionHref(collection.slug)),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.title,
      description: collection.metaDescription,
    },
    alternates: {
      canonical: absoluteUrl(getPromptCollectionHref(collection.slug)),
    },
  }
}

function CollectionPromptCard({ prompt, priority }: { prompt: PromptEntry; priority?: boolean }) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      prefetch={false}
      className="group overflow-hidden rounded-2xl bg-slate-950 text-white ring-1 ring-slate-200/70 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-300 dark:bg-slate-900 dark:ring-slate-800 sm:bg-white sm:text-slate-950 dark:sm:bg-slate-900 dark:sm:text-white"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white dark:bg-slate-950">
        <PromptPreviewImage
          src={prompt.previewImage}
          alt={prompt.previewAlt}
          category={prompt.category}
          imageFit="cover"
          priority={priority}
          imgClassName="transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>
      <div className="space-y-2 p-3 sm:p-4">
        <p className="line-clamp-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-slate-400 dark:sm:text-slate-500">
          {prompt.subcategory || prompt.categoryTitle}
        </p>
        <h2 className="line-clamp-2 text-sm font-bold leading-tight tracking-[-0.02em] text-white sm:text-base sm:text-slate-950 dark:sm:text-white">
          {prompt.title}
        </h2>
        <p className="line-clamp-2 text-xs leading-5 text-white/60 sm:text-slate-500 dark:sm:text-slate-400">
          {prompt.summary}
        </p>
      </div>
    </Link>
  )
}

export default async function PromptCollectionPage({ params }: PromptCollectionPageProps) {
  const { slug } = await params
  const collection = getPromptCollection(slug)

  if (!collection) {
    notFound()
  }

  const library = await getPromptLibraryData()
  const prompts = getPromptsForCollection(library.prompts, collection)
  const visiblePrompts = prompts.slice(0, COLLECTION_VISIBLE_LIMIT)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Prompts', item: `${SITE_URL}/prompts` },
          {
            '@type': 'ListItem',
            position: 2,
            name: collection.title,
            item: absoluteUrl(getPromptCollectionHref(collection.slug)),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: collection.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'CollectionPage',
        name: collection.title,
        description: collection.metaDescription,
        url: absoluteUrl(getPromptCollectionHref(collection.slug)),
      },
    ],
  }

  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UniverseTopBar
        items={[
          { label: 'Prompts', href: '/prompts' },
          { label: 'Collections', href: '/prompts' },
          { label: collection.shortTitle },
        ]}
        actionName={collection.title}
        actionSlug={collection.slug}
      />

      <main className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-7xl px-4 pb-7 pt-4 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_340px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <Sparkles className="h-3.5 w-3.5" />
                {prompts.length.toLocaleString()} free prompts
              </div>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl">
                {collection.h1}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-8">
                {collection.description}
              </p>
            </div>

            <form
              action="/prompts"
              method="get"
              className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              <Search className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="search"
                name="q"
                defaultValue={collection.terms[0]}
                className="h-10 min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                placeholder="Search prompts"
              />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROMPT_COLLECTIONS.map(item => (
              <Link
                key={item.slug}
                href={getPromptCollectionHref(item.slug)}
                prefetch={false}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ring-1 transition ${
                  item.slug === collection.slug
                    ? 'bg-slate-950 text-white ring-slate-950 dark:bg-white dark:text-slate-950 dark:ring-white'
                    : 'bg-white text-slate-600 ring-slate-200 hover:text-slate-950 dark:bg-slate-950 dark:text-slate-400 dark:ring-slate-800 dark:hover:text-white'
                }`}
              >
                {item.shortTitle}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1880px] px-3 pb-10 sm:px-5 lg:px-6">
          {visiblePrompts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {visiblePrompts.map((prompt, index) => (
                <CollectionPromptCard key={prompt.slug} prompt={prompt} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="text-lg font-bold">No prompts found</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try the full prompt library instead.</p>
              <Link
                href="/prompts"
                className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
              >
                Browse all prompts
              </Link>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:p-6">
            <h2 className="text-xl font-bold tracking-tight">How to use these free AI prompts</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {collection.howTo.map((step, index) => (
                <li key={step} className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:ring-slate-800">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    Step {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {collection.faq.map(item => (
              <details
                key={item.question}
                className="group rounded-2xl bg-white p-4 ring-1 ring-slate-200 open:bg-slate-50 dark:bg-slate-950 dark:ring-slate-800 dark:open:bg-slate-900"
              >
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-950 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>

          <Link
            href="/prompts"
            prefetch={false}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            View all free AI prompts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </PublicLayout>
  )
}
