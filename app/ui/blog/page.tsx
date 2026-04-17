import type { Metadata } from 'next'
import Link from 'next/link'
import PublicLayout from '@/components/layout/PublicLayout'
import { getUiBlogPosts } from '@/lib/ui-discovery'

export const metadata: Metadata = {
  title: 'UI Universe Blog - CSS Effects, UI Patterns, and Product Design Notes',
  description: 'Short practical articles about premium UI effects, animations, and reusable frontend building blocks.',
}

export default function UiBlogIndexPage() {
  const posts = getUiBlogPosts()

  return (
    <PublicLayout>
      <div className="page-frame py-10">
        <div className="mx-auto max-w-3xl">
          <div className="premium-kicker">UI Universe Blog</div>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Practical UI notes for premium web products.
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Short reads around effects, UI motion, and clean component decisions that still feel product-grade.
          </p>

          <div className="mt-8 space-y-4">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/ui/blog/${post.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              >
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
