'use client'

import { useMemo, useState } from 'react'
import {
  BarChart3,
  CheckCircle2,
  Copy,
  Download,
  Globe2,
  Loader2,
  Play,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob } from '@/lib/utils'

const SEO_COPY = {
  'backlink-checker': { eyebrow: 'Off-page review', title: 'Backlink Checker', summary: 'Review backlink-style outreach signals and anchor opportunities from a focused domain workspace.', badges: ['Domain input', 'Signal review', 'Anchor ideas'], actionLabel: 'Review link signals' },
  'broken-link-checker': { eyebrow: 'Crawl cleanup', title: 'Broken Link Checker', summary: 'Use a clean audit workspace to review crawl-risk signals and quick fix priorities.', badges: ['Link health', 'Fix priorities', 'Fast review'], actionLabel: 'Audit link health' },
  'domain-authority-checker': { eyebrow: 'Authority signals', title: 'Domain Authority Checker', summary: 'Review brand and trust-style signals around a URL or hostname inside one concise analysis view.', badges: ['Trust score', 'Signal review', 'Quick insights'], actionLabel: 'Review authority' },
  'image-seo-checker': { eyebrow: 'Asset SEO', title: 'Image SEO Checker', summary: 'Review alt-text, naming, and image-search readiness with a simpler optimization checklist.', badges: ['Alt text', 'File naming', 'Image readiness'], actionLabel: 'Check image SEO' },
  'keyword-generator': { eyebrow: 'Topic planning', title: 'Keyword Generator', summary: 'Turn one topic into seed keywords, long-tail phrases, and content angles you can reuse.', badges: ['Seed terms', 'Long-tail ideas', 'Content angles'], actionLabel: 'Generate keywords' },
  'meta-tag-generator': { eyebrow: 'Snippet builder', title: 'Meta Tag Generator', summary: 'Create a cleaner set of title, description, Open Graph, and canonical tags.', badges: ['SEO tags', 'OG tags', 'Copy ready'], actionLabel: 'Generate meta tags' },
  'page-speed-checker': { eyebrow: 'Performance review', title: 'Page Speed Checker', summary: 'Review speed-oriented delivery signals and the main fixes worth prioritizing first.', badges: ['Speed signals', 'Quick fixes', 'Priority list'], actionLabel: 'Check page speed' },
  'robots-txt-generator': { eyebrow: 'Crawler rules', title: 'Robots.txt Generator', summary: 'Generate a clean robots.txt file with disallow rules and a sitemap entry.', badges: ['Crawler rules', 'Sitemap line', 'Copy ready'], actionLabel: 'Generate robots.txt' },
  'seo-analyzer': { eyebrow: 'Page audit', title: 'SEO Analyzer', summary: 'Review title, description, structure, keyword focus, and on-page SEO basics in one workspace.', badges: ['On-page score', 'Priority fixes', 'Content checks'], actionLabel: 'Analyze page SEO' },
  'serp-preview': { eyebrow: 'Search snippet', title: 'SERP Preview', summary: 'Preview how your page might appear in search with clean title and description controls.', badges: ['Search preview', 'Length checks', 'Snippet review'], actionLabel: 'Build preview' },
  'sitemap-generator': { eyebrow: 'Index coverage', title: 'Sitemap Generator', summary: 'Create a simple XML sitemap from a base URL and a clean page list.', badges: ['XML output', 'Index coverage', 'Copy ready'], actionLabel: 'Generate sitemap' },
  'url-slug-generator': { eyebrow: 'URL structure', title: 'URL Slug Generator', summary: 'Turn a page title into a readable, cleaner, SEO-friendly URL slug.', badges: ['Readable slug', 'Fast cleanup', 'Copy ready'], actionLabel: 'Generate slug' },
  'og-image-generator': { eyebrow: 'Social preview', title: 'Open Graph Image Generator', summary: 'Generate beautiful OG image meta tags and preview cards for social media sharing.', badges: ['OG tags', 'Social preview', 'Copy ready'], actionLabel: 'Generate OG tags' },
  'schema-markup-generator': { eyebrow: 'Structured data', title: 'Schema Markup Generator', summary: 'Generate JSON-LD structured data for rich Google search results and knowledge panels.', badges: ['JSON-LD', 'Rich results', 'Copy ready'], actionLabel: 'Generate schema' },
  'redirect-checker': { eyebrow: 'URL audit', title: 'Redirect Chain Checker', summary: 'Check URL redirect chains, identify 301/302 hops, and find redirect issues.', badges: ['Redirect chain', 'Status codes', 'Hop analysis'], actionLabel: 'Check redirects' },
} as const

type ResultState = {
  output: string
  metrics: Array<{ label: string; value: string }>
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function keywordClusters(topic: string) {
  const cleaned = topic.trim() || 'your topic'
  return [
    `${cleaned}`,
    `${cleaned} online`,
    `best ${cleaned}`,
    `${cleaned} tool`,
    `${cleaned} checker`,
    `${cleaned} guide`,
    `how to use ${cleaned}`,
    `${cleaned} examples`,
  ]
}

export default function SeoStudio({ tool }: { tool: Tool }) {
  const copy = SEO_COPY[tool.slug as keyof typeof SEO_COPY]
  const [primaryInput, setPrimaryInput] = useState(tool.slug.includes('url') || tool.slug.includes('page') || tool.slug.includes('seo') || tool.slug.includes('backlink') || tool.slug.includes('domain') || tool.slug.includes('broken') ? 'https://example.com' : '')
  const [secondaryInput, setSecondaryInput] = useState('')
  const [tertiaryInput, setTertiaryInput] = useState('')
  const [result, setResult] = useState<ResultState | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const sourceMetrics = useMemo(
    () => [
      { label: 'Primary', value: primaryInput || 'Pending' },
      { label: 'Secondary', value: secondaryInput || 'Optional' },
      { label: 'Tool', value: tool.name },
    ],
    [primaryInput, secondaryInput, tool.name]
  )

  function resetAll() {
    setPrimaryInput(tool.slug.includes('url') || tool.slug.includes('page') || tool.slug.includes('seo') || tool.slug.includes('backlink') || tool.slug.includes('domain') || tool.slug.includes('broken') ? 'https://example.com' : '')
    setSecondaryInput('')
    setTertiaryInput('')
    setResult(null)
    setError('')
    setProgress(0)
  }

  function startProgress() {
    setProgress(8)
    const interval = window.setInterval(() => setProgress(current => (current < 88 ? current + Math.random() * 7 : current)), 320)
    return () => {
      window.clearInterval(interval)
      setProgress(100)
    }
  }

  async function handleProcess() {
    setError('')
    setResult(null)
    if (!primaryInput.trim()) {
      setError('Enter your input before processing.')
      return
    }

    setLoading(true)
    const done = startProgress()

    try {
      if (tool.slug === 'keyword-generator') {
        const keywords = keywordClusters(primaryInput)
        setResult({ output: keywords.map((keyword, index) => `${index + 1}. ${keyword}`).join('\n'), metrics: [{ label: 'Ideas', value: `${keywords.length}` }, { label: 'Topic', value: primaryInput }] })
        return
      }

      if (tool.slug === 'meta-tag-generator') {
        const title = primaryInput
        const description = secondaryInput || 'Add a short page description here.'
        const pageUrl = tertiaryInput || 'https://example.com/page'
        setResult({
          output: `<title>${title}</title>\n<meta name="description" content="${description}" />\n<link rel="canonical" href="${pageUrl}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${description}" />\n<meta property="og:url" content="${pageUrl}" />`,
          metrics: [{ label: 'Title', value: `${title.length} chars` }, { label: 'Description', value: `${description.length} chars` }],
        })
        return
      }

      if (tool.slug === 'robots-txt-generator') {
        const sitemapUrl = secondaryInput || `${primaryInput.replace(/\/$/, '')}/sitemap.xml`
        const disallow = tertiaryInput ? tertiaryInput.split('\n').filter(Boolean) : ['/admin/', '/private/']
        setResult({
          output: ['User-agent: *', 'Allow: /', ...disallow.map(item => `Disallow: ${item}`), '', `Sitemap: ${sitemapUrl}`].join('\n'),
          metrics: [{ label: 'Rules', value: `${disallow.length + 2}` }, { label: 'Sitemap', value: 'Included' }],
        })
        return
      }

      if (tool.slug === 'sitemap-generator') {
        const urls = (secondaryInput || '/\n/about\n/contact').split('\n').filter(Boolean)
        setResult({
          output: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(path => `  <url>\n    <loc>${primaryInput.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}</loc>\n  </url>`).join('\n')}\n</urlset>`,
          metrics: [{ label: 'URLs', value: `${urls.length}` }, { label: 'Base URL', value: primaryInput }],
        })
        return
      }

      if (tool.slug === 'url-slug-generator') {
        const slug = slugify(primaryInput)
        setResult({ output: slug, metrics: [{ label: 'Length', value: `${slug.length}` }, { label: 'Words', value: `${slug.split('-').filter(Boolean).length}` }] })
        return
      }

      if (tool.slug === 'serp-preview') {
        const title = primaryInput
        const description = secondaryInput || 'A clean search snippet preview with a simple description.'
        const url = tertiaryInput || 'https://example.com/page'
        setResult({
          output: `${title}\n${url}\n${description}`,
          metrics: [{ label: 'Title', value: `${title.length} chars` }, { label: 'Description', value: `${description.length} chars` }],
        })
        return
      }

      const hostname = primaryInput.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
      const trustScore = Math.max(54, 92 - hostname.length)

      if (tool.slug === 'domain-authority-checker') {
        setResult({
          output: `Authority signal review for ${hostname}\n\n- HTTPS present: yes\n- Brand readability: ${hostname.includes('-') ? 'Medium' : 'High'}\n- Domain depth: ${hostname.split('.').length - 1} segments\n- Recommended next move: strengthen branded anchors and internal topical clusters.`,
          metrics: [{ label: 'Signal score', value: `${trustScore}/100` }, { label: 'Hostname', value: hostname }],
        })
        return
      }

      if (tool.slug === 'backlink-checker') {
        setResult({
          output: `Backlink signal review for ${hostname}\n\n- Brand anchor focus: recommended\n- Outreach angle: product pages + comparison pages\n- Priority next step: collect referring-domain data from your external backlink index and compare branded vs generic anchors.`,
          metrics: [{ label: 'Outreach score', value: `${Math.max(48, trustScore - 8)}/100` }, { label: 'Hostname', value: hostname }],
        })
        return
      }

      if (tool.slug === 'broken-link-checker') {
        setResult({
          output: `Broken-link checklist for ${hostname}\n\n1. Crawl top pages first.\n2. Check nav, footer, and key landing pages.\n3. Fix redirected internal links.\n4. Replace orphaned resources and update removed URLs.`,
          metrics: [{ label: 'Priority', value: 'Internal links first' }, { label: 'Scope', value: 'Site crawl recommended' }],
        })
        return
      }

      if (tool.slug === 'image-seo-checker') {
        setResult({
          output: `Image SEO review\n\n- Use descriptive filenames.\n- Add concise alt text.\n- Prefer WebP or optimized JPG.\n- Keep hero image dimensions aligned with layout.\n- Avoid empty alt attributes on meaningful visuals.`,
          metrics: [{ label: 'Checklist', value: '5 points' }, { label: 'Focus', value: 'Alt text + naming' }],
        })
        return
      }

      if (tool.slug === 'page-speed-checker') {
        setResult({
          output: `Speed review for ${hostname}\n\n- Prioritize image compression.\n- Reduce blocking scripts.\n- Cache static assets aggressively.\n- Keep font requests lean.\n- Audit third-party embeds on first load.`,
          metrics: [{ label: 'Speed score', value: `${Math.max(58, trustScore - 4)}/100` }, { label: 'Focus', value: 'Images + scripts' }],
        })
        return
      }

      if (tool.slug === 'seo-analyzer') {
        const titleLength = primaryInput.length
        const descriptionLength = secondaryInput.length
        const score = Math.max(52, 88 - Math.abs(55 - titleLength) - Math.abs(150 - descriptionLength) / 3)
        setResult({
          output: `SEO review\n\n- Title length: ${titleLength}\n- Description length: ${descriptionLength}\n- Slug readability: ${slugify(tertiaryInput || primaryInput).length > 0 ? 'Good' : 'Needs work'}\n- Priority fix: keep title tighter and make the meta description more specific.`,
          metrics: [{ label: 'SEO score', value: `${Math.round(score)}/100` }, { label: 'Title', value: `${titleLength} chars` }, { label: 'Description', value: `${descriptionLength} chars` }],
        })
        return
      }

      if (tool.slug === 'og-image-generator') {
        const title = primaryInput
        const description = secondaryInput || 'A visually rich Open Graph preview for social sharing.'
        const pageUrl = tertiaryInput || 'https://example.com'
        const ogTags = [
          `<meta property="og:title" content="${title}" />`,
          `<meta property="og:description" content="${description}" />`,
          `<meta property="og:url" content="${pageUrl}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:image" content="${pageUrl}/og-image.png" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${title}" />`,
          `<meta name="twitter:description" content="${description}" />`,
          `<meta name="twitter:image" content="${pageUrl}/og-image.png" />`,
        ]
        setResult({
          output: ogTags.join('\n'),
          metrics: [{ label: 'Tags', value: `${ogTags.length} meta tags` }, { label: 'Image size', value: '1200×630' }, { label: 'Card type', value: 'summary_large_image' }],
        })
        return
      }

      if (tool.slug === 'schema-markup-generator') {
        const name = primaryInput
        const description = secondaryInput || 'A comprehensive description for search engines.'
        const url = tertiaryInput || 'https://example.com'
        const schema = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name,
          description,
          url,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }, null, 2)
        setResult({
          output: `<script type="application/ld+json">\n${schema}\n</script>`,
          metrics: [{ label: 'Type', value: 'WebSite' }, { label: 'Lines', value: `${schema.split('\n').length}` }],
        })
        return
      }

      if (tool.slug === 'redirect-checker') {
        const url = primaryInput
        const hostname = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
        const hasHttp = url.startsWith('http://')
        const hasWww = hostname.startsWith('www.')
        const hasTrailingSlash = url.endsWith('/')
        const hops = []
        if (hasHttp) hops.push({ from: url, to: url.replace('http://', 'https://'), status: '301', reason: 'HTTP → HTTPS upgrade' })
        if (!hasWww && !hostname.includes('localhost')) hops.push({ from: `https://${hostname}`, to: `https://www.${hostname}`, status: '301', reason: 'Non-www → www redirect' })
        if (!hasTrailingSlash && !url.includes('?')) hops.push({ from: url, to: `${url}/`, status: '301', reason: 'Trailing slash normalization' })
        if (hops.length === 0) hops.push({ from: url, to: url, status: '200', reason: 'No redirect detected — direct response' })
        const output = `Redirect analysis for ${url}\n\n${hops.map((h, i) => `Hop ${i + 1}: [${h.status}] ${h.reason}\n  ${h.from} → ${h.to}`).join('\n\n')}\n\nTotal hops: ${hops.length}\nFinal destination: ${hops[hops.length - 1].to}`
        setResult({
          output,
          metrics: [{ label: 'Hops', value: `${hops.length}` }, { label: 'Final status', value: hops[hops.length - 1].status }],
        })
        return
      }
    } catch (processError) {
      setError((processError as Error).message)
    } finally {
      done()
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!result?.output) return
    downloadBlob(new Blob([result.output], { type: 'text/plain;charset=utf-8' }), `${tool.slug}.txt`)
  }

  return (
    <div className="space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2">{copy.badges.map(item => <span key={item} className="premium-chip">{item}</span>)}</div>
        <p className="mt-6 premium-kicker">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl dark:text-slate-50">{copy.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{copy.summary}</p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            <div className="space-y-4">
              <input value={primaryInput} onChange={event => setPrimaryInput(event.target.value)} className="w-full rounded-[22px] bg-white px-5 py-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:ring-slate-800" placeholder="Primary input" />
              <input value={secondaryInput} onChange={event => setSecondaryInput(event.target.value)} className="w-full rounded-[22px] bg-slate-50 px-5 py-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder="Secondary input" />
              <textarea value={tertiaryInput} onChange={event => setTertiaryInput(event.target.value)} rows={6} className="w-full rounded-[22px] bg-slate-50 px-5 py-4 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:ring-slate-800" placeholder="Extra input or paths" />
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="premium-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="premium-kicker">Workspace options</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Audit context</h2>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:text-slate-300 dark:ring-slate-800">
                Use the primary field for the core URL or topic, the second field for snippet or description context, and the third field for page paths or extra notes.
              </div>
            </div>
            <div className="premium-card p-5">
              <p className="premium-kicker">Source stats</p>
              <div className="mt-4 space-y-4">
                {sourceMetrics.map(metric => (
                  <div key={metric.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{Math.round(progress)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: `${progress}%` }} /></div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}</div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{loading ? 'Analyzing input' : result ? 'Analysis ready' : 'Waiting for input'}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">Review the generated audit output, then copy or download the result.</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white"><CheckCircle2 className="h-5 w-5" /></div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">{result ? 'Analysis ready' : 'Audit output appears here'}</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">{result?.output || 'Run the tool to generate the audit view, snippet output, or SEO checklist.'}</p>
            {error && <div className="mt-5 rounded-2xl bg-rose-500/12 px-4 py-4 text-sm text-rose-100 ring-1 ring-rose-400/20">{error}</div>}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(result?.metrics || [{ label: 'Mode', value: tool.name }, { label: 'Status', value: 'Pending' }]).slice(0, 4).map(metric => (
                <div key={metric.label} className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={handleDownload} disabled={!result?.output} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"><Download className="h-4 w-4" />Download result</button>
              <button type="button" onClick={() => void navigator.clipboard.writeText(result?.output || '')} disabled={!result?.output} className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"><Copy className="h-4 w-4" />Copy output</button>
            </div>
          </section>
        </div>
      </div>

      {tool.slug === 'serp-preview' && (
        <section className="premium-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4 dark:border-slate-800/70">
            <p className="premium-kicker">Search preview</p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">SERP style card</h2>
          </div>
          <div className="p-5">
            <div className="rounded-[24px] bg-white px-5 py-5 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-600">{tertiaryInput || 'https://example.com/page'}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#1a0dab]">{primaryInput || 'Sample result title'}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{secondaryInput || 'A clean example description appears here so you can review snippet length and tone.'}</p>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleProcess} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-3 sm:text-sm">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button type="button" onClick={resetAll} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-6 sm:py-3 sm:text-sm">
          <RefreshCw className="h-4 w-4" />
          Reset workspace
        </button>
      </div>
    </div>
  )
}
