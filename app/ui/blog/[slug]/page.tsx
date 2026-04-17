import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PublicLayout from '@/components/layout/PublicLayout'
import { getEffectBySlug, getEffectSlug, getUiCollectionLabel } from '@/lib/css-effects-library'
import { getUiBlogPosts } from '@/lib/ui-discovery'

type UiBlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getUiBlogPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: UiBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getUiBlogPosts().find(item => item.slug === slug)
  if (!post) {
    return { title: 'UI Universe Blog' }
  }

  return {
    title: `${post.title} | UI Universe`,
    description: post.excerpt,
  }
}

export default async function UiBlogPostPage({ params }: UiBlogPostPageProps) {
  const { slug } = await params
  const post = getUiBlogPosts().find(item => item.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedItems = post.relatedSlugs
    .map(itemSlug => getEffectBySlug(itemSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <PublicLayout>
      <div className="page-frame py-10">
        <div className="mx-auto max-w-3xl">
          <div className="premium-kicker">Article</div>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{post.excerpt}</p>

          <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <p>
              Premium UI usually wins through restraint. Strong hierarchy, good spacing, and one clear interaction beat a page full of loud effects almost every time.
            </p>
            <p>
              The best library items are the ones you can drop into a product quickly, tune a little, and still ship with confidence. That is why the UI Universe leans on source-backed components, small discovery paths, and code that stays easy to adapt.
            </p>
            <p>
              If you are using motion, shadows, or hover polish, keep it purposeful. The goal is not to show off that something can animate. The goal is to make the product feel more responsive, more considered, and easier to trust.
            </p>
          </div>

          {relatedItems.length > 0 ? (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
                Related UI
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {relatedItems.map(item => (
                  <Link
                    key={item.id}
                    href={`/ui/${getEffectSlug(item)}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {getUiCollectionLabel(item.category)}
                    </div>
                    <div className="mt-2 font-display text-lg font-bold tracking-tight text-slate-950 dark:text-slate-50">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PublicLayout>
  )
}
