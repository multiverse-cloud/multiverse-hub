import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react'
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
const COLLECTION_CARD_ASPECT_CLASSES = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/7]',
  'aspect-[1/1]',
  'aspect-[4/6]',
] as const

function getCollectionCardAspectClass(prompt: PromptEntry) {
  let hash = 0
  const input = prompt.slug || prompt.title
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return COLLECTION_CARD_ASPECT_CLASSES[hash % COLLECTION_CARD_ASPECT_CLASSES.length]
}

export function generateStaticParams() {
  return PROMPT_COLLECTIONS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PromptCollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getPromptCollection(slug)
  if (!collection) return { title: 'Free AI Prompt Collections' }

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
    alternates: { canonical: absoluteUrl(getPromptCollectionHref(collection.slug)) },
  }
}

function CollectionPromptCard({ prompt, priority }: { prompt: PromptEntry; priority?: boolean }) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      prefetch={false}
      className="group mb-2 inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:ring-slate-400 dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-slate-600 sm:mb-3"
    >
      <div className={`relative w-full overflow-hidden bg-slate-100 dark:bg-slate-900 ${getCollectionCardAspectClass(prompt)}`}>
        <PromptPreviewImage
          src={prompt.previewImage}
          alt={prompt.previewAlt}
          category={prompt.category}
          imageFit="cover"
          priority={priority}
          imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
      </div>
      <div className="px-2.5 py-2.5 sm:px-3 sm:py-3">
        <h2 className="line-clamp-2 text-[13px] font-semibold leading-4 text-slate-900 dark:text-white sm:text-sm sm:leading-5">{prompt.title}</h2>
      </div>
    </Link>
  )
}

export default async function PromptCollectionPage({ params }: PromptCollectionPageProps) {
  const { slug } = await params
  const collection = getPromptCollection(slug)
  if (!collection) notFound()

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
          { '@type': 'ListItem', position: 2, name: collection.title, item: absoluteUrl(getPromptCollectionHref(collection.slug)) },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: collection.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
        items={[{ label: 'Prompts', href: '/prompts' }, { label: collection.shortTitle }]}
        actionName={collection.title}
        actionSlug={collection.slug}
      />

      <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">

        {/* ── Header ── */}
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
            <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5" />
              {prompts.length.toLocaleString()} free prompts
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {collection.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              {collection.description}
            </p>

            {/* Search */}
            <form action="/prompts" method="get" className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 p-1.5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:max-w-md">
              <Search className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
              <input type="search" name="q" defaultValue={collection.terms[0]} className="h-9 min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400" placeholder="Search prompts" />
              <button type="submit" className="inline-flex h-9 shrink-0 items-center rounded-lg bg-slate-950 px-4 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                Search
              </button>
            </form>

            {/* Collection switcher */}
            <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {PROMPT_COLLECTIONS.map(item => (
                <Link
                  key={item.slug}
                  href={getPromptCollectionHref(item.slug)}
                  prefetch={false}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ring-1 transition ${
                    item.slug === collection.slug
                      ? 'bg-slate-950 text-white ring-slate-950 dark:bg-white dark:text-slate-950 dark:ring-white'
                      : 'bg-white text-slate-600 ring-slate-200 hover:text-slate-950 dark:bg-slate-950 dark:text-slate-400 dark:ring-slate-800 dark:hover:text-white'
                  }`}
                >
                  {item.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="mx-auto max-w-[1880px] px-2 py-5 sm:px-4 lg:px-5">
          {visiblePrompts.length > 0 ? (
            <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4 xl:columns-5 2xl:columns-6">
              {visiblePrompts.map((prompt, i) => (
                <CollectionPromptCard key={prompt.slug} prompt={prompt} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="text-base font-bold">No prompts found</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Try the full prompt library instead.</p>
              <Link href="/prompts" className="mt-5 inline-flex rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                Browse all prompts
              </Link>
            </div>
          )}
        </section>

        {/* ── How to use ── */}
        <section className="border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">How to use these free AI prompts</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {collection.howTo.map((step, i) => (
                <li key={step} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <span className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Step {i + 1}</span>
                  <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">{step}</span>
                </li>
              ))}
            </ol>

            {/* FAQ */}
            <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
              {collection.faq.map(item => (
                <details key={item.question} className="py-3">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 dark:text-white">{item.question}</summary>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.answer}</p>
                </details>
              ))}
            </div>

            <Link href="/prompts" prefetch={false} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 dark:hover:text-white">
              View all free AI prompts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </PublicLayout>
  )
}
