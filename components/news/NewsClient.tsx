'use client'

import { useEffect, useState } from 'react'
import { Clock, ExternalLink, Globe, Newspaper, RefreshCw, Search, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const GNEWS_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || ''

interface Article {
  title: string
  description: string
  url: string
  image?: string
  publishedAt: string
  source: { name: string; url: string }
}

const DEMO_ARTICLES: Article[] = [
  {
    title: 'OpenAI Releases GPT-4o with Vision and Voice Capabilities',
    description:
      'OpenAI has launched GPT-4o, a new multimodal model that can process text, audio, and images simultaneously with improved performance.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T09:00:00Z',
    source: { name: 'TechCrunch', url: '#' },
  },
  {
    title: 'Google Gemini 2.0 Sets New Benchmarks in AI Reasoning',
    description:
      "Google's latest Gemini model achieves strong performance across coding, math, and multimodal reasoning tasks.",
    url: '#',
    image: '',
    publishedAt: '2026-03-20T08:00:00Z',
    source: { name: 'The Verge', url: '#' },
  },
  {
    title: 'Meta Llama 3.3 Expands the Open Model Ecosystem',
    description:
      'Meta continues pushing open-weight AI forward with stronger reasoning, better coding quality, and broader developer adoption.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T07:00:00Z',
    source: { name: 'Wired', url: '#' },
  },
  {
    title: 'Apple Intelligence Rolls Out to More Regions',
    description:
      "Apple's writing, image, and assistant features continue expanding into more markets and device workflows.",
    url: '#',
    image: '',
    publishedAt: '2026-03-20T06:00:00Z',
    source: { name: 'MacRumors', url: '#' },
  },
  {
    title: 'Anthropic Raises Additional Funding for Claude and Research',
    description:
      'Anthropic secures more capital to expand Claude development, safety work, and enterprise product capabilities.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T05:00:00Z',
    source: { name: 'Bloomberg', url: '#' },
  },
  {
    title: 'Nvidia H200 Demand Surges as Training Costs Shift',
    description:
      'Nvidia sees strong demand for newer hardware as model builders seek faster training and more efficient inference.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T04:00:00Z',
    source: { name: 'Reuters', url: '#' },
  },
  {
    title: 'Microsoft Copilot Adds More Real-Time Workflows',
    description:
      'Microsoft expands Copilot experiences across meetings, writing, and search to support higher-volume workflows.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T03:00:00Z',
    source: { name: 'ZDNet', url: '#' },
  },
  {
    title: 'EU AI Act Enforcement Changes Product Planning',
    description:
      'The first broad AI regulatory framework is changing how product teams think about governance and deployment.',
    url: '#',
    image: '',
    publishedAt: '2026-03-20T02:00:00Z',
    source: { name: 'Ars Technica', url: '#' },
  },
]

const TOPICS = [
  { id: 'ai', label: 'AI & ML', query: 'artificial intelligence' },
  { id: 'tech', label: 'Technology', query: 'technology' },
  { id: 'startup', label: 'Startups', query: 'startup funding' },
  { id: 'crypto', label: 'Crypto', query: 'cryptocurrency bitcoin' },
  { id: 'science', label: 'Science', query: 'science research' },
  { id: 'world', label: 'World', query: 'world news' },
]

function formatPublishedDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}

function SourceBadge({ name }: { name: string }) {
  const label = name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
      {label}
    </div>
  )
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const publishedLabel = formatPublishedDate(article.publishedAt)

  if (featured) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="premium-card group flex h-full flex-col p-5 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
      >
        <div className="mb-4 flex items-start gap-3">
          <SourceBadge name={article.source.name} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {article.source.name}
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{publishedLabel}</span>
            </div>
          </div>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-300">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{article.description}</p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
          Read article
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </a>
    )
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="premium-card group flex items-start gap-3 p-4 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <SourceBadge name={article.source.name} />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-slate-950 transition-colors group-hover:text-indigo-600 dark:text-slate-50 dark:group-hover:text-indigo-300">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{article.description}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{article.source.name}</span>
          <span>&middot;</span>
          <span>{publishedLabel}</span>
        </div>
      </div>
    </a>
  )
}

export default function NewsClient() {
  const [articles, setArticles] = useState<Article[]>(DEMO_ARTICLES)
  const [topic, setTopic] = useState('ai')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  async function fetchNews(query: string) {
    if (!GNEWS_KEY) return

    setLoading(true)
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=12&apikey=${GNEWS_KEY}`
      )
      const data = await res.json()
      if (data.articles?.length) setArticles(data.articles)
    } catch {
      setArticles(DEMO_ARTICLES)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const selectedTopic = TOPICS.find(item => item.id === topic)
    if (selectedTopic) fetchNews(selectedTopic.query)
  }, [topic])

  const filtered = search
    ? articles.filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
    : articles

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Newspaper className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              News Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              Latest News
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Follow AI, technology, startups, science, crypto, and global updates in one clean reading surface.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search headlines"
                value={search}
                onChange={event => setSearch(event.target.value)}
                className="premium-field pl-11"
              />
            </div>
            <button
              onClick={() => {
                const selectedTopic = TOPICS.find(item => item.id === topic)
                if (selectedTopic) fetchNews(selectedTopic.query)
              }}
              className={cn('btn-secondary gap-2 px-4 py-3', loading && 'pointer-events-none')}
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              Refresh
            </button>
          </div>

          <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-2">
            {TOPICS.map(item => (
              <button
                key={item.id}
                onClick={() => setTopic(item.id)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  topic === item.id
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content">
        {!GNEWS_KEY && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
            Demo mode. Add <code className="rounded bg-amber-100 px-1 py-0.5 dark:bg-amber-900/40">NEXT_PUBLIC_GNEWS_API_KEY</code> for live headlines from GNews.
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.45fr]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">Featured</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {filtered.slice(0, 3).map((article, index) => (
                <ArticleCard key={`${article.title}-${index}`} article={article} featured />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              <h2 className="font-display text-xl font-bold text-slate-950 dark:text-slate-50">All Stories</h2>
            </div>
            <div className="space-y-3">
              {filtered.slice(3).map((article, index) => (
                <ArticleCard key={`${article.title}-${index}`} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
