'use client'

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  Download,
  Eye,
  Github,
  Link2,
  Plus,
  RefreshCw,
  Rocket,
  RotateCcw,
  Save,
  Search,
  Upload,
} from 'lucide-react'
import { parseTemplateImportPayload, type TemplateImportSummary } from '@/lib/template-import'
import type { TemplateCategoryId, TemplateEntry, TemplatePlatformId } from '@/lib/template-library-data'
import { cn, downloadBlob, readFileAsText, slugify } from '@/lib/utils'

type FeedbackTone = 'success' | 'error' | 'info'

type CategoryOption = {
  id: TemplateCategoryId
  title: string
  description: string
  count: number
  href: string
}

type PlatformOption = {
  id: TemplatePlatformId
  title: string
  count: number
  href: string
}

const ADMIN_TEMPLATES_PAGE_SIZE = 14

function createBlankTemplate(categories: CategoryOption[], platforms: PlatformOption[]): TemplateEntry {
  const category = categories[0]
  const platform = platforms.find(entry => entry.id === 'responsive') || platforms[0]
  const today = new Date().toISOString().slice(0, 10)

  return {
    id: `template-draft-${Date.now()}`,
    slug: '',
    title: '',
    seoTitle: '',
    metaDescription: '',
    summary: '',
    description: '',
    category: category?.id || 'landing',
    categoryTitle: category?.title || 'Landing Pages',
    platform: platform?.id || 'responsive',
    platformLabel: platform?.title || 'Responsive',
    framework: 'next-tailwind',
    frameworkLabel: 'Next.js + Tailwind',
    templateType: 'template',
    industry: '',
    style: '',
    audience: '',
    tags: [],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    prompt: '',
    sections: [],
    layoutNotes: [],
    responsiveNotes: [],
    bestFor: [],
    files: [
      {
        path: 'app/layout.tsx',
        language: 'tsx',
        summary: 'Shared Next.js layout wrapper.',
        content: "export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  )\n}",
      },
      {
        path: 'app/page.tsx',
        language: 'tsx',
        summary: 'Primary landing surface for the template.',
        content: "export default function Page() {\n  return (\n    <main className=\"min-h-screen bg-[#0e0e0e] px-6 py-16 text-white\">\n      <section className=\"mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center\">\n        <div className=\"max-w-2xl space-y-6\">\n          <p className=\"text-xs font-semibold uppercase tracking-[0.2em] text-white/60\">Premium UI template</p>\n          <h1 className=\"text-5xl font-black tracking-tight lg:text-7xl\">Starter screen ready for your product.</h1>\n          <p className=\"max-w-xl text-base leading-8 text-white/70\">Swap the copy, refine the sections, and connect your product logic without rebuilding the layout from zero.</p>\n        </div>\n        <div className=\"flex-1 rounded-[28px] border border-white/10 bg-white/5 p-6\">\n          <div className=\"aspect-[16/10] rounded-[24px] bg-black/30\" />\n        </div>\n      </section>\n    </main>\n  )\n}",
        primary: true,
      },
      {
        path: 'app/globals.css',
        language: 'css',
        summary: 'Tailwind-ready global style tokens.',
        content: "@import 'tailwindcss';\n\n:root {\n  color-scheme: dark;\n}\n\nbody {\n  font-family: Inter, system-ui, sans-serif;\n}",
      },
    ],
    featured: false,
    updatedAt: today,
    license: 'Free download',
    priceLabel: 'Free',
  }
}

function createLinkedTemplate(categories: CategoryOption[], platforms: PlatformOption[]): TemplateEntry {
  const category = categories[0]
  const platform = platforms.find(entry => entry.id === 'responsive') || platforms[0]
  const today = new Date().toISOString().slice(0, 10)

  return {
    id: `template-link-${Date.now()}`,
    slug: '',
    title: '',
    seoTitle: '',
    metaDescription: '',
    summary: '',
    description: '',
    category: category?.id || 'landing',
    categoryTitle: category?.title || 'Landing Pages',
    platform: platform?.id || 'responsive',
    platformLabel: platform?.title || 'Responsive',
    framework: 'html-tailwind',
    frameworkLabel: 'HTML + Tailwind CSS',
    templateType: 'template',
    industry: '',
    style: '',
    audience: '',
    tags: [],
    techStack: ['HTML', 'Tailwind CSS'],
    prompt: '',
    sections: [],
    layoutNotes: [],
    responsiveNotes: [],
    bestFor: [],
    files: [],
    previewImage: '',
    liveUrl: '',
    githubUrl: '',
    downloadUrl: '',
    featured: false,
    updatedAt: today,
    license: 'Free download',
    priceLabel: 'Free',
  }
}

function hasLinkedTemplateAssets(template: TemplateEntry) {
  return Boolean(template.previewImage || template.cloudinaryPublicId || template.liveUrl || template.githubUrl || template.downloadUrl)
}

function normalizeForSave(template: TemplateEntry, categories: CategoryOption[], platforms: PlatformOption[]) {
  const category = categories.find(entry => entry.id === template.category)
  const platform = platforms.find(entry => entry.id === template.platform)
  const title = template.title.trim()
  const slug = slugify(template.slug || title)

  return {
    ...template,
    id: template.id || `template-${slug}`,
    title,
    slug,
    categoryTitle: category?.title || template.categoryTitle,
    platformLabel: platform?.title || template.platformLabel,
    frameworkLabel: template.frameworkLabel,
    seoTitle: template.seoTitle.trim() || `${title} - Downloadable Premium UI Template | mtverse`,
    metaDescription: template.metaDescription.trim() || template.summary.trim() || template.description.trim(),
    summary: template.summary.trim() || template.description.trim() || 'Downloadable premium UI template.',
    description: template.description.trim() || template.summary.trim() || 'Downloadable premium UI template.',
    updatedAt: new Date().toISOString().slice(0, 10),
  }
}

async function parseResponse(response: Response) {
  const text = await response.text()
  if (!text.trim()) return {}

  try {
    return JSON.parse(text) as {
      success?: boolean
      error?: string
      code?: string
      message?: string
      templates?: TemplateEntry[]
      summary?: TemplateImportSummary
      __rawText?: string
    }
  } catch {
    return { __rawText: text }
  }
}

function getFeedbackClass(tone: FeedbackTone) {
  return cn(
    'rounded-2xl border p-4',
    tone === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100',
    tone === 'error' && 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-100',
    tone === 'info' && 'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-100'
  )
}

export default function AdminTemplatesClient({
  templates,
  categories,
  platforms,
}: {
  templates: TemplateEntry[]
  categories: CategoryOption[]
  platforms: PlatformOption[]
}) {
  const [templatesState, setTemplatesState] = useState(templates)
  const [selectedId, setSelectedId] = useState(templates[0]?.id || '')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | TemplateCategoryId>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [feedback, setFeedback] = useState<{ tone: FeedbackTone; title: string; message: string } | null>(null)
  const [importJson, setImportJson] = useState('')
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [importSummary, setImportSummary] = useState<TemplateImportSummary | null>(null)
  const [jsonEditor, setJsonEditor] = useState('')
  const [busyAction, setBusyAction] = useState<null | 'save' | 'refresh' | 'import'>(null)
  const [isPending, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const selectedTemplate = useMemo(
    () => templatesState.find(template => template.id === selectedId) || null,
    [templatesState, selectedId]
  )

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    return templatesState.filter(template => {
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
      const matchesSearch =
        !normalizedSearch ||
        template.title.toLowerCase().includes(normalizedSearch) ||
        template.slug.toLowerCase().includes(normalizedSearch) ||
        template.industry.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [categoryFilter, deferredSearch, templatesState])

  const pageCount = Math.max(1, Math.ceil(filteredTemplates.length / ADMIN_TEMPLATES_PAGE_SIZE))
  const safePage = Math.min(currentPage, pageCount)
  const pageStart = (safePage - 1) * ADMIN_TEMPLATES_PAGE_SIZE
  const pageEnd = Math.min(pageStart + ADMIN_TEMPLATES_PAGE_SIZE, filteredTemplates.length)
  const paginatedTemplates = filteredTemplates.slice(pageStart, pageEnd)

  useEffect(() => {
    if (selectedTemplate) {
      setJsonEditor(JSON.stringify(selectedTemplate, null, 2))
    }
  }, [selectedTemplate])

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryFilter, deferredSearch])

  useEffect(() => {
    if (!selectedId && filteredTemplates[0]) {
      setSelectedId(filteredTemplates[0].id)
    }
  }, [filteredTemplates, selectedId])

  function createTemplateDraft() {
    const nextTemplate = createBlankTemplate(categories, platforms)
    setTemplatesState(previous => [nextTemplate, ...previous])
    setSelectedId(nextTemplate.id)
    setCurrentPage(1)
    setFeedback({ tone: 'info', title: 'New template draft', message: 'Edit the JSON on the right and save when the code bundle is ready.' })
  }

  function createLinkedTemplateDraft() {
    const nextTemplate = createLinkedTemplate(categories, platforms)
    setTemplatesState(previous => [nextTemplate, ...previous])
    setSelectedId(nextTemplate.id)
    setCurrentPage(1)
    setFeedback({
      tone: 'info',
      title: 'New linked template draft',
      message: 'Use this for Cloudinary preview + Vercel live preview + GitHub/download link templates without uploading full source JSON.',
    })
  }

  async function refreshTemplates() {
    setBusyAction('refresh')
    try {
      const response = await fetch('/api/admin/templates', { cache: 'no-store' })
      const result = await parseResponse(response)
      if (!response.ok) throw new Error(result.error || 'Failed to refresh templates.')
      if (result.templates) setTemplatesState(result.templates)
      setFeedback({ tone: 'info', title: 'Template library refreshed', message: 'Latest local template data has been loaded.' })
    } catch (error) {
      setFeedback({ tone: 'error', title: 'Refresh failed', message: error instanceof Error ? error.message : 'Failed to refresh templates.' })
    } finally {
      setBusyAction(null)
    }
  }

  function exportTemplates() {
    downloadBlob(
      new Blob([JSON.stringify({ templates: templatesState }, null, 2)], { type: 'application/json' }),
      'ui-template-library-export.json'
    )
    setFeedback({ tone: 'success', title: 'Template export ready', message: 'The current UI templates JSON has been downloaded.' })
  }

  function updateSelectedJsonField(field: keyof TemplateEntry, value: string) {
    try {
      const parsed = JSON.parse(jsonEditor || '{}') as TemplateEntry
      const nextValue = value.trim()
      const nextTemplate = {
        ...parsed,
        [field]: nextValue || undefined,
      }
      setJsonEditor(JSON.stringify(nextTemplate, null, 2))
      setTemplatesState(previous =>
        previous.map(template =>
          template.id === selectedId ? { ...template, [field]: nextValue || undefined } : template
        )
      )
    } catch {
      setFeedback({
        tone: 'error',
        title: 'Fix JSON first',
        message: 'The JSON editor has a syntax error, so quick publishing fields cannot be synced yet.',
      })
    }
  }

  function saveCurrentTemplate() {
    if (!selectedTemplate) return

    startTransition(async () => {
      setBusyAction('save')
      try {
        const parsed = JSON.parse(jsonEditor) as TemplateEntry
        const normalized = normalizeForSave(parsed, categories, platforms)
        if (!normalized.title) {
          throw new Error('Title is required before saving.')
        }

        if (normalized.files.length === 0 && !hasLinkedTemplateAssets(normalized)) {
          throw new Error('Add source files, or add Cloudinary/Vercel/GitHub/download links for a linked template.')
        }

        const response = await fetch('/api/admin/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template: normalized }),
        })
        const result = await parseResponse(response)
        if (!response.ok) throw new Error(result.error || 'Failed to save template.')
        if (result.templates) setTemplatesState(result.templates)
        setFeedback({ tone: 'success', title: 'Template saved', message: result.message || `Saved "${normalized.title}" successfully.` })
      } catch (error) {
        setFeedback({ tone: 'error', title: 'Save failed', message: error instanceof Error ? error.message : 'Failed to save template.' })
      } finally {
        setBusyAction(null)
      }
    })
  }

  function previewImport() {
    try {
      const payload = JSON.parse(importJson)
      const parsed = parseTemplateImportPayload(payload, templatesState, { replaceExisting })
      setImportSummary(parsed.summary)
      setFeedback({ tone: 'info', title: 'Import preview ready', message: `Prepared ${parsed.templates.length} templates from the current payload.` })
    } catch {
      setFeedback({ tone: 'error', title: 'Invalid JSON', message: 'The import payload could not be parsed.' })
    }
  }

  function importJsonData() {
    if (!importJson.trim()) {
      setFeedback({ tone: 'error', title: 'Nothing to import', message: 'Paste JSON or upload a file before importing.' })
      return
    }

    startTransition(async () => {
      setBusyAction('import')
      try {
        const response = await fetch('/api/admin/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'import-json',
            rawJson: importJson,
            replaceExisting,
          }),
        })
        const result = await parseResponse(response)
        if (!response.ok) throw new Error(result.error || 'Failed to import template JSON.')
        if (result.templates) setTemplatesState(result.templates)
        if (result.summary) setImportSummary(result.summary)
        setFeedback({ tone: 'success', title: 'Template import complete', message: result.message || 'UI template JSON imported successfully.' })
      } catch (error) {
        setFeedback({ tone: 'error', title: 'Import failed', message: error instanceof Error ? error.message : 'Failed to import JSON.' })
      } finally {
        setBusyAction(null)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="premium-kicker">UI Templates Admin</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Manage downloadable template packs
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Local JSON template CMS with code bundle import, export, preview, and download management.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={createTemplateDraft} className="btn-secondary gap-2 px-4 py-2 text-sm"><Plus className="h-4 w-4" />New JSON Template</button>
          <button type="button" onClick={createLinkedTemplateDraft} className="btn-secondary gap-2 px-4 py-2 text-sm"><Link2 className="h-4 w-4" />New Linked Template</button>
          <button type="button" onClick={refreshTemplates} className="btn-secondary gap-2 px-4 py-2 text-sm" disabled={busyAction === 'refresh'}><RefreshCw className={cn('h-4 w-4', busyAction === 'refresh' && 'animate-spin')} />Refresh</button>
          <button type="button" onClick={exportTemplates} className="btn-secondary gap-2 px-4 py-2 text-sm"><Download className="h-4 w-4" />Export JSON</button>
          <button type="button" onClick={saveCurrentTemplate} className="btn-primary gap-2 px-4 py-2 text-sm" disabled={!selectedTemplate || isPending || busyAction === 'save'}><Save className="h-4 w-4" />Save Template</button>
        </div>
      </div>

      {feedback ? (
        <div className={getFeedbackClass(feedback.tone)}>
          <p className="font-semibold">{feedback.title}</p>
          <p className="mt-1 text-sm leading-6">{feedback.message}</p>
        </div>
      ) : null}

      <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="font-bold">Bulk JSON import</h2>
            <p className="mt-1 text-sm text-muted-foreground">Import template packs that already include metadata and a files array for each template.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground">
              <Upload className="h-4 w-4" />
              Upload JSON
              <input type="file" accept="application/json,.json" className="hidden" onChange={async event => {
                const file = event.target.files?.[0]
                if (!file) return
                setImportJson(await readFileAsText(file))
              }} />
            </label>
            <button type="button" onClick={previewImport} className="btn-secondary gap-2 px-4 py-2 text-sm"><Eye className="h-4 w-4" />Preview</button>
            <button type="button" onClick={() => { setImportJson(''); setImportSummary(null) }} className="btn-secondary gap-2 px-4 py-2 text-sm"><RotateCcw className="h-4 w-4" />Reset</button>
            <button type="button" onClick={importJsonData} className="btn-primary gap-2 px-4 py-2 text-sm" disabled={isPending || busyAction === 'import'}><Upload className="h-4 w-4" />Import</button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <textarea value={importJson} onChange={event => setImportJson(event.target.value)} placeholder='{"templates":[...]}' className="h-52 w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-xs leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
            <label className="inline-flex items-center gap-2 font-semibold text-foreground"><input type="checkbox" checked={replaceExisting} onChange={event => setReplaceExisting(event.target.checked)} className="h-4 w-4 rounded border-border" />Replace existing matches</label>
            <p className="mt-3 text-xs leading-6">
              Full JSON imports can include files and previewHtml. Linked imports can skip files if they include a Cloudinary preview plus Vercel/GitHub/download links.
            </p>
            {importSummary ? (
              <div className="mt-4 space-y-2">
                <p>Received: <span className="font-semibold text-foreground">{importSummary.received}</span></p>
                <p>Prepared: <span className="font-semibold text-foreground">{importSummary.prepared}</span></p>
                <p>Skipped existing: <span className="font-semibold text-foreground">{importSummary.skippedExisting}</span></p>
                <p>Duplicates in file: <span className="font-semibold text-foreground">{importSummary.skippedIncomingDuplicates}</span></p>
                <p>Invalid: <span className="font-semibold text-foreground">{importSummary.invalid}</span></p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[24px] border border-border bg-card p-4 shadow-sm">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search templates" className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value as 'all' | TemplateCategoryId)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option value="all">All categories</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
            </select>
            <p className="text-xs text-muted-foreground">Showing {filteredTemplates.length > 0 ? pageStart + 1 : 0}-{pageEnd} of {filteredTemplates.length} templates / page {safePage} of {pageCount}</p>
          </div>

          <div className="mt-4 space-y-2">
            {paginatedTemplates.map(template => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedId(template.id)}
                className={cn(
                  'w-full rounded-2xl border p-3 text-left transition-colors',
                  selectedId === template.id
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-background text-foreground hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                <p className="text-sm font-semibold leading-6">{template.title}</p>
                <p className={cn('mt-1 text-xs leading-5', selectedId === template.id ? 'text-white/80 dark:text-slate-700' : 'text-muted-foreground')}>
                  {template.categoryTitle} • {template.files.length > 0 ? `${template.files.length} files` : 'linked template'}
                </p>
              </button>
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setCurrentPage(page => Math.max(1, page - 1))} disabled={safePage === 1} className="btn-secondary gap-2 px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-60"><ChevronLeft className="h-4 w-4" />Prev</button>
              <span className="text-xs text-muted-foreground">{safePage}/{pageCount}</span>
              <button type="button" onClick={() => setCurrentPage(page => Math.min(pageCount, page + 1))} disabled={safePage === pageCount} className="btn-secondary gap-2 px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-60">Next<ChevronRight className="h-4 w-4" /></button>
            </div>
          ) : null}
        </aside>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          {selectedTemplate ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="premium-kicker">Template editor</p>
                  <h2 className="mt-1 text-2xl font-bold text-foreground">{selectedTemplate.title || 'Untitled template draft'}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedTemplate.frameworkLabel} • {selectedTemplate.platformLabel} • {selectedTemplate.files.length > 0 ? `${selectedTemplate.files.length} files` : 'linked template'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.slug ? (
                    <>
                      <Link href={`/templates/${selectedTemplate.slug}`} target="_blank" className="btn-secondary gap-2 px-4 py-2 text-sm"><Eye className="h-4 w-4" />Open page</Link>
                      <Link href={`/templates/${selectedTemplate.slug}/preview`} target="_blank" className="btn-secondary gap-2 px-4 py-2 text-sm"><Eye className="h-4 w-4" />Live preview</Link>
                      <Link href={`/templates/${selectedTemplate.slug}/download`} className="btn-secondary gap-2 px-4 py-2 text-sm"><Download className="h-4 w-4" />Download zip</Link>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-4 text-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Files</p>
                  <p className="mt-2 text-2xl font-black text-foreground">{selectedTemplate.files.length}</p>
                  {selectedTemplate.files.length === 0 ? (
                    <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Link-only</p>
                  ) : null}
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 text-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Framework</p>
                  <p className="mt-2 font-semibold text-foreground">{selectedTemplate.frameworkLabel}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 text-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Category</p>
                  <p className="mt-2 font-semibold text-foreground">{selectedTemplate.categoryTitle}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">Publishing links</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Fast fields for card preview, Vercel live demo, and GitHub download routing. These sync into the JSON below.
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    <Cloud className="h-3 w-3" />
                    Cloud-ready
                  </span>
                </div>

                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {[
                    {
                      field: 'previewImage' as keyof TemplateEntry,
                      label: 'Cloudinary preview image',
                      placeholder: 'https://res.cloudinary.com/.../template-preview',
                      icon: Cloud,
                    },
                    {
                      field: 'cloudinaryPublicId' as keyof TemplateEntry,
                      label: 'Cloudinary public ID',
                      placeholder: 'multiverse/template-previews/template-slug',
                      icon: Cloud,
                    },
                    {
                      field: 'liveUrl' as keyof TemplateEntry,
                      label: 'Vercel live preview link',
                      placeholder: 'https://multiverse-templates.vercel.app/template-slug',
                      icon: Rocket,
                    },
                    {
                      field: 'vercelDeployUrl' as keyof TemplateEntry,
                      label: 'Vercel deploy/import link',
                      placeholder: 'https://vercel.com/new/clone?...',
                      icon: Rocket,
                    },
                    {
                      field: 'githubUrl' as keyof TemplateEntry,
                      label: 'GitHub source link',
                      placeholder: 'https://github.com/multiverse-cloud/multiverse-templates/tree/main/template',
                      icon: Github,
                    },
                    {
                      field: 'downloadUrl' as keyof TemplateEntry,
                      label: 'Direct download link',
                      placeholder: 'https://github.com/.../archive/refs/heads/main.zip',
                      icon: Link2,
                    },
                  ].map(item => {
                    const Icon = item.icon
                    const value = (selectedTemplate[item.field] as string | undefined) || ''

                    return (
                      <label key={item.field} className="block">
                        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          {item.label}
                        </span>
                        <input
                          value={value}
                          onChange={event => updateSelectedJsonField(item.field, event.target.value)}
                          placeholder={item.placeholder}
                          className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-400 dark:focus:border-slate-600"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>

              <textarea
                value={jsonEditor}
                onChange={event => setJsonEditor(event.target.value)}
                className="h-[720px] w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-xs leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
              <p className="text-base font-semibold text-foreground">Select a template to edit</p>
              <p className="mt-2 text-sm text-muted-foreground">Templates JSON with file bundles will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

