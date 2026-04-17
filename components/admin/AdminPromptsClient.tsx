'use client'

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Download, Eye, Plus, RefreshCw, RotateCcw, Save, Search, Upload } from 'lucide-react'
import PromptPreviewImage from '@/components/prompts/PromptPreviewImage'
import { parsePromptImportPayload, type PromptImportSummary } from '@/lib/prompt-import'
import type { PromptCategory, PromptCategoryId, PromptEntry, PromptModelId } from '@/lib/prompt-library-data'
import { cn, downloadBlob, readFileAsText, slugify } from '@/lib/utils'

type FeedbackTone = 'success' | 'error' | 'info'

const ADMIN_PROMPTS_PAGE_SIZE = 18

function createBlankPrompt(categories: PromptCategory[], models: PromptModelId[]): PromptEntry {
  const category = categories[0]
  const today = new Date().toISOString().slice(0, 10)

  return {
    id: `prompt-draft-${Date.now()}`,
    slug: '',
    title: '',
    seoTitle: '',
    metaDescription: '',
    summary: '',
    description: '',
    category: (category?.id || 'writing') as PromptCategoryId,
    categoryTitle: category?.title || 'Writing Prompts',
    subcategory: '',
    models: models.slice(0, 1) as PromptModelId[],
    tags: [],
    audience: '',
    visualStyle: '',
    previewImage: '',
    previewAlt: '',
    featured: false,
    prompt: '',
    variables: [],
    bestFor: [],
    workflow: [],
    tips: [],
    examples: [],
    relatedSlugs: [],
    updatedAt: today,
  }
}

function normalizeForSave(prompt: PromptEntry, categories: PromptCategory[]) {
  const category = categories.find(entry => entry.id === prompt.category)
  const title = prompt.title.trim()
  const slug = slugify(prompt.slug || title)

  return {
    ...prompt,
    id: prompt.id || `prompt-${slug}`,
    title,
    slug,
    categoryTitle: category?.title || prompt.categoryTitle,
    seoTitle: prompt.seoTitle.trim() || `${title} Prompt - ${prompt.models.join(', ')}`,
    metaDescription: prompt.metaDescription.trim() || prompt.description.trim() || prompt.summary.trim(),
    summary: prompt.summary.trim() || prompt.description.trim() || 'Premium prompt entry.',
    description: prompt.description.trim() || prompt.summary.trim() || 'Premium prompt entry.',
    previewAlt: prompt.previewAlt.trim() || title,
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
      prompts?: PromptEntry[]
      summary?: PromptImportSummary
      imageUrl?: string
      publicId?: string
      secureUrl?: string
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

export default function AdminPromptsClient({
  prompts,
  categories,
  models,
}: {
  prompts: PromptEntry[]
  categories: PromptCategory[]
  models: PromptModelId[]
}) {
  const [promptsState, setPromptsState] = useState(prompts)
  const [selectedId, setSelectedId] = useState(prompts[0]?.id || '')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | PromptCategoryId>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [feedback, setFeedback] = useState<{ tone: FeedbackTone; title: string; message: string } | null>(null)
  const [importJson, setImportJson] = useState('')
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [importSummary, setImportSummary] = useState<PromptImportSummary | null>(null)
  const [jsonEditor, setJsonEditor] = useState('')
  const [busyAction, setBusyAction] = useState<null | 'save' | 'refresh' | 'import' | 'upload-image'>(null)
  const [isPending, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const selectedPrompt = useMemo(
    () => promptsState.find(prompt => prompt.id === selectedId) || null,
    [promptsState, selectedId]
  )

  const filteredPrompts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    return promptsState.filter(prompt => {
      const matchesCategory = categoryFilter === 'all' || prompt.category === categoryFilter
      const matchesSearch =
        !normalizedSearch ||
        prompt.title.toLowerCase().includes(normalizedSearch) ||
        prompt.slug.toLowerCase().includes(normalizedSearch) ||
        prompt.subcategory.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [categoryFilter, deferredSearch, promptsState])

  const pageCount = Math.max(1, Math.ceil(filteredPrompts.length / ADMIN_PROMPTS_PAGE_SIZE))
  const safePage = Math.min(currentPage, pageCount)
  const pageStart = (safePage - 1) * ADMIN_PROMPTS_PAGE_SIZE
  const pageEnd = Math.min(pageStart + ADMIN_PROMPTS_PAGE_SIZE, filteredPrompts.length)
  const paginatedPrompts = filteredPrompts.slice(pageStart, pageEnd)

  useEffect(() => {
    if (selectedPrompt) {
      setJsonEditor(JSON.stringify(selectedPrompt, null, 2))
    }
  }, [selectedPrompt])

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryFilter, deferredSearch])

  useEffect(() => {
    if (!selectedId && filteredPrompts[0]) {
      setSelectedId(filteredPrompts[0].id)
    }
  }, [filteredPrompts, selectedId])

  useEffect(() => {
    if (!selectedId) return

    const selectedIndex = filteredPrompts.findIndex(prompt => prompt.id === selectedId)
    if (selectedIndex === -1) return

    const targetPage = Math.floor(selectedIndex / ADMIN_PROMPTS_PAGE_SIZE) + 1
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage)
    }
  }, [currentPage, filteredPrompts, selectedId])

  function updateSelectedPrompt(patch: Partial<PromptEntry>) {
    if (!selectedPrompt) return
    const nextPrompt = { ...selectedPrompt, ...patch }
    setPromptsState(previous => previous.map(prompt => (prompt.id === selectedPrompt.id ? nextPrompt : prompt)))
  }

  async function refreshPrompts() {
    setBusyAction('refresh')
    try {
      const response = await fetch('/api/admin/prompts', { cache: 'no-store' })
      const result = await parseResponse(response)
      if (!response.ok) throw new Error(result.error || 'Failed to refresh prompts.')
      if (result.prompts) setPromptsState(result.prompts)
      setFeedback({ tone: 'info', title: 'Prompt library refreshed', message: 'The latest local prompt data is loaded.' })
    } catch (error) {
      setFeedback({ tone: 'error', title: 'Refresh failed', message: error instanceof Error ? error.message : 'Failed to refresh prompts.' })
    } finally {
      setBusyAction(null)
    }
  }

  function createPromptDraft() {
    const nextPrompt = createBlankPrompt(categories, models)
    setPromptsState(previous => [nextPrompt, ...previous])
    setSelectedId(nextPrompt.id)
    setCurrentPage(1)
    setFeedback({ tone: 'info', title: 'New draft ready', message: 'Fill the core fields or paste full JSON in the advanced editor.' })
  }

  function exportPrompts() {
    downloadBlob(new Blob([JSON.stringify({ prompts: promptsState }, null, 2)], { type: 'application/json' }), 'prompt-library-export.json')
    setFeedback({ tone: 'success', title: 'Prompt export ready', message: 'The current prompt library JSON has been downloaded.' })
  }

  function saveCurrentPrompt() {
    if (!selectedPrompt) return

    startTransition(async () => {
      setBusyAction('save')
      try {
        const parsed = JSON.parse(jsonEditor) as PromptEntry
        const normalized = normalizeForSave(parsed, categories)
        if (!normalized.title || !normalized.prompt) {
          throw new Error('Title and main prompt are required before saving.')
        }

        const response = await fetch('/api/admin/prompts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: normalized }),
        })
        const result = await parseResponse(response)
        if (!response.ok) throw new Error(result.error || 'Failed to save prompt.')
        if (result.prompts) setPromptsState(result.prompts)
        setFeedback({ tone: 'success', title: 'Prompt saved', message: result.message || `Saved "${normalized.title}" successfully.` })
      } catch (error) {
        setFeedback({ tone: 'error', title: 'Save failed', message: error instanceof Error ? error.message : 'Failed to save prompt.' })
      } finally {
        setBusyAction(null)
      }
    })
  }

  function previewImport() {
    try {
      const payload = JSON.parse(importJson)
      const parsed = parsePromptImportPayload(payload, promptsState, { replaceExisting })
      setImportSummary(parsed.summary)
      setFeedback({ tone: 'info', title: 'Import preview ready', message: `Prepared ${parsed.prompts.length} prompts from the current payload.` })
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
        const response = await fetch('/api/admin/prompts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'import-json',
            rawJson: importJson,
            replaceExisting,
          }),
        })
        const result = await parseResponse(response)
        if (!response.ok) throw new Error(result.error || 'Failed to import prompt JSON.')
        if (result.prompts) setPromptsState(result.prompts)
        if (result.summary) setImportSummary(result.summary)
        setFeedback({ tone: 'success', title: 'Prompt import complete', message: result.message || 'Prompt JSON imported successfully.' })
      } catch (error) {
        setFeedback({ tone: 'error', title: 'Import failed', message: error instanceof Error ? error.message : 'Failed to import JSON.' })
      } finally {
        setBusyAction(null)
      }
    })
  }

  async function uploadPreviewImage(file: File) {
    if (!selectedPrompt) return

    if (!file.type.startsWith('image/')) {
      setFeedback({ tone: 'error', title: 'Invalid file', message: 'Choose an image file before uploading to Cloudinary.' })
      return
    }

    const uploadSlug = slugify(selectedPrompt.slug || selectedPrompt.title || `prompt-preview-${Date.now()}`)
    if (!uploadSlug) {
      setFeedback({ tone: 'error', title: 'Missing title', message: 'Add a title or slug before uploading the preview image.' })
      return
    }

    setBusyAction('upload-image')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('slug', uploadSlug)
      formData.append('title', selectedPrompt.title || uploadSlug)

      const response = await fetch('/api/admin/prompts/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await parseResponse(response)
      if (!response.ok) throw new Error(result.error || 'Failed to upload preview image.')
      if (!result.imageUrl) throw new Error('Cloudinary did not return a preview image URL.')

      updateSelectedPrompt({
        previewImage: result.imageUrl,
        previewAlt: selectedPrompt.previewAlt || selectedPrompt.title || uploadSlug,
      })

      setFeedback({
        tone: 'success',
        title: 'Preview image uploaded',
        message: `${result.message || 'Cloudinary upload complete.'} Click Save Prompt to persist this preview image.`,
      })
    } catch (error) {
      setFeedback({
        tone: 'error',
        title: 'Image upload failed',
        message: error instanceof Error ? error.message : 'Failed to upload preview image.',
      })
    } finally {
      setBusyAction(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="premium-kicker">Prompt Hub Admin</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            Manage prompt content and preview images
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Local JSON prompt CMS with import, export, editing, and real-image preview support.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={createPromptDraft} className="btn-secondary gap-2 px-4 py-2 text-sm"><Plus className="h-4 w-4" />New Prompt</button>
          <button type="button" onClick={refreshPrompts} className="btn-secondary gap-2 px-4 py-2 text-sm" disabled={busyAction === 'refresh'}><RefreshCw className={cn('h-4 w-4', busyAction === 'refresh' && 'animate-spin')} />Refresh</button>
          <button type="button" onClick={exportPrompts} className="btn-secondary gap-2 px-4 py-2 text-sm"><Download className="h-4 w-4" />Export JSON</button>
          <button type="button" onClick={saveCurrentPrompt} className="btn-primary gap-2 px-4 py-2 text-sm" disabled={!selectedPrompt || isPending || busyAction === 'save'}><Save className="h-4 w-4" />Save Prompt</button>
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
            <p className="mt-1 text-sm text-muted-foreground">Upload prompt batches, preview duplicates, and import them into the local prompt store.</p>
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
          <textarea value={importJson} onChange={event => setImportJson(event.target.value)} placeholder='{"prompts":[...]}' className="h-52 w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-xs leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
            <label className="inline-flex items-center gap-2 font-semibold text-foreground"><input type="checkbox" checked={replaceExisting} onChange={event => setReplaceExisting(event.target.checked)} className="h-4 w-4 rounded border-border" />Replace existing matches</label>
            {importSummary ? (
              <div className="mt-4 space-y-2">
                <p>Received: <span className="font-semibold text-foreground">{importSummary.received}</span></p>
                <p>Prepared: <span className="font-semibold text-foreground">{importSummary.prepared}</span></p>
                <p>Skipped existing: <span className="font-semibold text-foreground">{importSummary.skippedExisting}</span></p>
                <p>Duplicates in file: <span className="font-semibold text-foreground">{importSummary.skippedIncomingDuplicates}</span></p>
                <p>Invalid: <span className="font-semibold text-foreground">{importSummary.invalid}</span></p>
              </div>
            ) : (
              <p className="mt-4 leading-6">Preview first to see how many prompts will be imported and how many existing matches will be skipped.</p>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[24px] border border-border bg-card p-4 shadow-sm">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search prompts" className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <select value={categoryFilter} onChange={event => setCategoryFilter(event.target.value as 'all' | PromptCategoryId)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option value="all">All categories</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
            </select>
            <p className="text-xs text-muted-foreground">Showing {filteredPrompts.length > 0 ? pageStart + 1 : 0}-{pageEnd} of {filteredPrompts.length} prompts / page {safePage} of {pageCount}</p>
          </div>

          <div className="mt-4 space-y-2">
            {paginatedPrompts.map(prompt => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => setSelectedId(prompt.id)}
                className={cn(
                  'w-full rounded-2xl border p-3 text-left transition-colors',
                  selectedId === prompt.id
                    ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-500/50 dark:bg-indigo-950/20'
                    : 'border-border bg-background hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                <p className="line-clamp-2 text-sm font-semibold text-foreground">{prompt.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{prompt.categoryTitle} / {prompt.subcategory}</p>
              </button>
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-border bg-background p-2">
              <button
                type="button"
                onClick={() => setCurrentPage(previous => Math.max(1, previous - 1))}
                disabled={safePage === 1}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(previous => Math.min(pageCount, previous + 1))}
                disabled={safePage === pageCount}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </aside>

        <section className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
          {selectedPrompt ? (
            <div className="space-y-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-50">{selectedPrompt.title || 'Untitled prompt'}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedPrompt.slug || 'Slug will be generated from the title.'}</p>
                </div>
                {selectedPrompt.slug ? (
                  <Link href={`/prompts/${selectedPrompt.slug}`} target="_blank" className="btn-secondary gap-2 px-4 py-2 text-sm"><Eye className="h-4 w-4" />Open Live Page</Link>
                ) : null}
              </div>

              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm"><span className="font-semibold text-foreground">Title</span><input value={selectedPrompt.title} onChange={event => updateSelectedPrompt({ title: event.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></label>
                  <label className="space-y-2 text-sm"><span className="font-semibold text-foreground">Slug</span><input value={selectedPrompt.slug} onChange={event => updateSelectedPrompt({ slug: slugify(event.target.value) })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></label>
                  <label className="space-y-2 text-sm"><span className="font-semibold text-foreground">Category</span><select value={selectedPrompt.category} onChange={event => updateSelectedPrompt({ category: event.target.value as PromptCategoryId })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">{categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}</select></label>
                  <label className="space-y-2 text-sm"><span className="font-semibold text-foreground">Subcategory</span><input value={selectedPrompt.subcategory} onChange={event => updateSelectedPrompt({ subcategory: event.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></label>
                  <label className="space-y-2 text-sm md:col-span-2"><span className="font-semibold text-foreground">Preview image URL</span><input value={selectedPrompt.previewImage} onChange={event => updateSelectedPrompt({ previewImage: event.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></label>
                  <div className="space-y-2 text-sm md:col-span-2">
                    <span className="font-semibold text-foreground">Cloudinary upload</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground">
                        <Upload className="h-4 w-4" />
                        {busyAction === 'upload-image' ? 'Uploading...' : 'Upload preview image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async event => {
                            const file = event.target.files?.[0]
                            if (!file) return
                            await uploadPreviewImage(file)
                            event.currentTarget.value = ''
                          }}
                        />
                      </label>
                      <span className="text-xs leading-6 text-muted-foreground">
                        Uploads to Cloudinary and fills the preview URL automatically.
                      </span>
                    </div>
                  </div>
                  <label className="space-y-2 text-sm md:col-span-2"><span className="font-semibold text-foreground">Summary</span><textarea value={selectedPrompt.summary} onChange={event => updateSelectedPrompt({ summary: event.target.value })} className="h-24 w-full rounded-2xl border border-border bg-background px-3 py-2.5 leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></label>
                </div>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <div className="relative aspect-[4/3]">
                      <PromptPreviewImage src={selectedPrompt.previewImage} alt={selectedPrompt.previewAlt || selectedPrompt.title} category={selectedPrompt.category} />
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    Real image URLs are supported here. If the image fails to load, Prompt Hub falls back to the built-in category preview automatically.
                  </p>
                </div>
              </div>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-foreground">Main prompt</span>
                <textarea value={selectedPrompt.prompt} onChange={event => updateSelectedPrompt({ prompt: event.target.value })} className="h-72 w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-sm leading-7 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-foreground">Advanced JSON editor</span>
                <textarea value={jsonEditor} onChange={event => setJsonEditor(event.target.value)} className="h-[28rem] w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-xs leading-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
              </label>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Select a prompt from the left or create a new one to start editing.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}








