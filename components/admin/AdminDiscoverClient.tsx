'use client'

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  Download,
  Eye,
  Info,
  ListOrdered,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  TriangleAlert,
  Upload,
} from 'lucide-react'
import type { DiscoverFaq, DiscoverItem, DiscoverList, DiscoverStep } from '@/lib/discover-data'
import { parseDiscoverImportPayload } from '@/lib/discover-import'
import { DISCOVER_ADMIN_PAGE_SIZE, paginateDiscoverItems } from '@/lib/discover-query'
import { cn, downloadBlob, readFileAsText, slugify } from '@/lib/utils'

function createBlankRankingItem(rank: number): DiscoverItem {
  return {
    rank,
    name: '',
    logo: '',
    summary: '',
    bestFor: '',
    pricing: 'Editorial pick',
    badge: 'editorial',
    url: '',
    tags: [],
    rating: 4.5,
  }
}

function createBlankStep(step: number): DiscoverStep {
  return {
    step,
    title: '',
    description: '',
  }
}

function createBlankFaq(): DiscoverFaq {
  return {
    question: '',
    answer: '',
  }
}

function createBlankList(type: 'ranking' | 'guide'): DiscoverList {
  const timestamp = Date.now()

  return {
    id: `draft-${timestamp}`,
    slug: '',
    type,
    title: '',
    seoTitle: '',
    metaDescription: '',
    description: '',
    intro: '',
    category: type === 'guide' ? 'Watch Guides' : 'Movies',
    subcategory: '',
    icon: type === 'guide' ? 'ListChecks' : 'Film',
    itemCount: 1,
    updatedAt: new Date().toISOString().slice(0, 10),
    featured: false,
    published: true,
    tags: [],
    methodology: [''],
    items: type === 'ranking' ? [createBlankRankingItem(1)] : [],
    steps: type === 'guide' ? [createBlankStep(1)] : [],
    faq: [createBlankFaq()],
    relatedSlugs: [],
  }
}

function ensureSequentialItems(items: DiscoverItem[]) {
  return items.map((item, index) => ({ ...item, rank: index + 1 }))
}

function ensureSequentialSteps(steps: DiscoverStep[]) {
  return steps.map((step, index) => ({ ...step, step: index + 1 }))
}

type ImportSummary = {
  received: number
  prepared: number
  imported: number
  skippedExisting: number
  skippedIncomingDuplicates: number
  invalid: number
  replaceExisting: boolean
  publishImported: boolean
}

type FeedbackState = {
  tone: 'success' | 'error' | 'info'
  title: string
  message: string
  details?: string[]
  timestamp: string
}

type AdminDiscoverResponse = {
  success?: boolean
  error?: string
  code?: string
  details?: string
  message?: string
  lists?: DiscoverList[]
  list?: DiscoverList
  summary?: ImportSummary
  importedIds?: string[]
  count?: number
  __rawText?: string
}

type ImportPreviewState = {
  summary: ImportSummary
  previewLists: Pick<DiscoverList, 'title' | 'slug' | 'type' | 'category'>[]
}

const ADMIN_DISCOVER_PAGE_WINDOW = 5

function getTimestampLabel() {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())
}

function normalizeTopicKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

async function parseAdminResponse(response: Response): Promise<AdminDiscoverResponse> {
  const text = await response.text()

  if (!text.trim()) {
    return {}
  }

  try {
    return JSON.parse(text) as AdminDiscoverResponse
  } catch {
    return { __rawText: text }
  }
}

function buildAdminRequestError(
  response: Response,
  result: AdminDiscoverResponse,
  fallback: string
) {
  const rawText = result.__rawText || ''
  const looksLikeHtml = /<!doctype|<html/i.test(rawText)

  if (response.status === 401 || response.status === 403) {
    return new Error('Admin session expired. Sign in again and retry.')
  }

  if (response.status === 404) {
    return new Error(
      'Admin Discover API route was not found (404). Restart the dev server or redeploy so /api/admin/discover is available.'
    )
  }

  if (looksLikeHtml) {
    if (/admin authentication|admin sign in/i.test(rawText) || response.url.includes('/admin-login')) {
      return new Error('Your admin session expired and this request was redirected to the login page.')
    }

    return new Error('The admin API returned HTML instead of JSON. Restart the dev server and try again.')
  }

  return new Error(result.error || result.details || fallback)
}

export default function AdminDiscoverClient({
  lists,
  categories,
}: {
  lists: DiscoverList[]
  categories: readonly string[]
}) {
  const [listsState, setListsState] = useState<DiscoverList[]>(lists)
  const [selectedId, setSelectedId] = useState<string>(lists[0]?.id || '')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'ranking' | 'guide'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [importJson, setImportJson] = useState('')
  const [importFilename, setImportFilename] = useState('')
  const [publishImported, setPublishImported] = useState(true)
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null)
  const [importPreview, setImportPreview] = useState<ImportPreviewState | null>(null)
  const [busyAction, setBusyAction] = useState<null | 'save' | 'seed' | 'import' | 'refresh'>(null)
  const [isSaving, startSaving] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const selectedList = useMemo(
    () => listsState.find(list => list.id === selectedId) || null,
    [listsState, selectedId]
  )

  const filteredLists = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    return listsState.filter(list => {
      const matchesType = typeFilter === 'all' || list.type === typeFilter
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' ? list.published : !list.published)
      const matchesSearch =
        !normalizedSearch ||
        list.title.toLowerCase().includes(normalizedSearch) ||
        list.slug.toLowerCase().includes(normalizedSearch) ||
        list.category.toLowerCase().includes(normalizedSearch)

      return matchesType && matchesStatus && matchesSearch
    })
  }, [deferredSearch, listsState, statusFilter, typeFilter])

  const pagination = useMemo(
    () => paginateDiscoverItems(filteredLists, currentPage, DISCOVER_ADMIN_PAGE_SIZE),
    [currentPage, filteredLists]
  )

  const paginatedLists = pagination.items
  const visiblePageStart = filteredLists.length > 0 ? pagination.startIndex + 1 : 0
  const visiblePageEnd = filteredLists.length > 0 ? pagination.endIndex : 0
  const paginationPages = useMemo(() => {
    const pages = [1, pagination.page - 1, pagination.page, pagination.page + 1, pagination.totalPages]
      .filter(page => page >= 1 && page <= pagination.totalPages)
      .slice(0, ADMIN_DISCOVER_PAGE_WINDOW)

    return Array.from(new Set(pages)).sort((left, right) => left - right)
  }, [pagination.page, pagination.totalPages])

  const discoverCounts = useMemo(() => {
    const published = listsState.filter(list => list.published).length

    return {
      total: listsState.length,
      published,
      draft: Math.max(listsState.length - published, 0),
      visible: filteredLists.length,
    }
  }, [filteredLists.length, listsState])

  const duplicateInsights = useMemo(() => {
    const titleMap = new Map<string, string[]>()
    const slugMap = new Map<string, string[]>()

    for (const list of listsState) {
      const normalizedTitle = normalizeTopicKey(list.title)
      if (normalizedTitle) {
        titleMap.set(normalizedTitle, [...(titleMap.get(normalizedTitle) || []), list.title])
      }

      if (list.slug) {
        slugMap.set(list.slug, [...(slugMap.get(list.slug) || []), list.title || list.slug])
      }
    }

    const titleDuplicates = Array.from(titleMap.values()).filter(group => group.length > 1)
    const slugDuplicates = Array.from(slugMap.entries())
      .filter(([, group]) => group.length > 1)
      .map(([slug, group]) => `${slug} (${group.length})`)

    return {
      titleDuplicates,
      slugDuplicates,
    }
  }, [listsState])

  useEffect(() => {
    if (filteredLists.length === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1)
      }
      return
    }

    const selectedIndex = filteredLists.findIndex(list => list.id === selectedId)

    if (selectedIndex >= 0) {
      const selectedPage = Math.floor(selectedIndex / DISCOVER_ADMIN_PAGE_SIZE) + 1

      if (selectedPage !== currentPage) {
        setCurrentPage(selectedPage)
      }

      return
    }

    if (pagination.page !== currentPage) {
      setCurrentPage(pagination.page)
    }
  }, [currentPage, filteredLists, pagination.page, selectedId])

  useEffect(() => {
    setImportPreview(null)
  }, [importJson, publishImported, replaceExisting])

  function replaceSelected(nextList: DiscoverList) {
    setListsState(previous => previous.map(list => (list.id === nextList.id ? nextList : list)))
  }

  function pushFeedback(
    tone: FeedbackState['tone'],
    title: string,
    message: string,
    details?: string[]
  ) {
    setFeedback({
      tone,
      title,
      message,
      details,
      timestamp: getTimestampLabel(),
    })
  }

  function startAdminAction(
    action: 'save' | 'seed' | 'import' | 'refresh',
    work: () => Promise<void>
  ) {
    setBusyAction(action)
    startSaving(async () => {
      try {
        await work()
      } finally {
        setBusyAction(null)
      }
    })
  }

  async function requestAdminDiscover(
    method: 'GET' | 'POST' | 'PATCH',
    body?: Record<string, unknown>,
    fallback = 'Admin discover request failed.'
  ) {
    const response = await fetch('/api/admin/discover', {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })

    const result = await parseAdminResponse(response)

    if (!response.ok) {
      throw buildAdminRequestError(response, result, fallback)
    }

    return result
  }

  function createNewList(type: 'ranking' | 'guide') {
    const draft = createBlankList(type)
    setListsState(previous => [draft, ...previous])
    setSelectedId(draft.id)
    setCurrentPage(1)
    pushFeedback(
      'info',
      type === 'ranking' ? 'New ranking draft' : 'New guide draft',
      type === 'ranking'
        ? 'A fresh ranking draft is ready for editing.'
        : 'A fresh guide draft is ready for editing.'
    )
  }

  function duplicateCurrent() {
    if (!selectedList) return

    const draft = {
      ...selectedList,
      id: `draft-${Date.now()}`,
      slug: `${selectedList.slug}-copy`,
      title: `${selectedList.title} Copy`,
      featured: false,
      published: true,
      updatedAt: new Date().toISOString().slice(0, 10),
    }

    setListsState(previous => [draft, ...previous])
    setSelectedId(draft.id)
    setCurrentPage(1)
    pushFeedback('info', 'Draft duplicated', 'The current page was copied into a new draft.')
  }

  function updateSelected<K extends keyof DiscoverList>(key: K, value: DiscoverList[K]) {
    if (!selectedList) return

    const nextList = { ...selectedList, [key]: value }

    if (key === 'title' && !selectedList.slug) {
      nextList.slug = slugify(String(value))
    }

    if (key === 'type') {
      const nextType = value as DiscoverList['type']

      nextList.category = nextType === 'guide' ? 'Watch Guides' : nextList.category || 'Movies'
      nextList.icon = nextType === 'guide' ? 'ListChecks' : nextList.icon || 'Film'
      nextList.items = nextType === 'ranking' ? (selectedList.items.length ? selectedList.items : [createBlankRankingItem(1)]) : []
      nextList.steps = nextType === 'guide' ? (selectedList.steps.length ? selectedList.steps : [createBlankStep(1)]) : []
      nextList.itemCount = nextType === 'guide' ? nextList.steps.length : nextList.items.length
    }

    replaceSelected(nextList)
  }

  function updateMethodology(value: string) {
    updateSelected(
      'methodology',
      value
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
    )
  }

  function updateTags(value: string) {
    updateSelected(
      'tags',
      value
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    )
  }

  function updateRelatedSlugs(value: string) {
    updateSelected(
      'relatedSlugs',
      value
        .split(',')
        .map(slug => slug.trim())
        .filter(Boolean)
    )
  }

  function updateItem(index: number, key: keyof DiscoverItem, value: DiscoverItem[keyof DiscoverItem]) {
    if (!selectedList || selectedList.type !== 'ranking') return

    const nextItems = selectedList.items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: value } : item
    )

    replaceSelected({ ...selectedList, items: nextItems, itemCount: nextItems.length })
  }

  function updateItemTags(index: number, value: string) {
    updateItem(
      index,
      'tags',
      value
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    )
  }

  function addRankingItem() {
    if (!selectedList || selectedList.type !== 'ranking') return

    const nextItems = [...selectedList.items, createBlankRankingItem(selectedList.items.length + 1)]
    replaceSelected({ ...selectedList, items: nextItems, itemCount: nextItems.length })
  }

  function removeRankingItem(index: number) {
    if (!selectedList || selectedList.type !== 'ranking') return

    const nextItems = ensureSequentialItems(selectedList.items.filter((_, itemIndex) => itemIndex !== index))
    replaceSelected({ ...selectedList, items: nextItems, itemCount: nextItems.length })
  }

  function updateStep(index: number, key: keyof DiscoverStep, value: DiscoverStep[keyof DiscoverStep]) {
    if (!selectedList || selectedList.type !== 'guide') return

    const nextSteps = selectedList.steps.map((step, stepIndex) =>
      stepIndex === index ? { ...step, [key]: value } : step
    )

    replaceSelected({ ...selectedList, steps: nextSteps, itemCount: nextSteps.length })
  }

  function addStep() {
    if (!selectedList || selectedList.type !== 'guide') return

    const nextSteps = [...selectedList.steps, createBlankStep(selectedList.steps.length + 1)]
    replaceSelected({ ...selectedList, steps: nextSteps, itemCount: nextSteps.length })
  }

  function removeStep(index: number) {
    if (!selectedList || selectedList.type !== 'guide') return

    const nextSteps = ensureSequentialSteps(selectedList.steps.filter((_, stepIndex) => stepIndex !== index))
    replaceSelected({ ...selectedList, steps: nextSteps, itemCount: nextSteps.length })
  }

  function updateFaq(index: number, key: keyof DiscoverFaq, value: string) {
    if (!selectedList) return

    const nextFaq = selectedList.faq.map((entry, faqIndex) =>
      faqIndex === index ? { ...entry, [key]: value } : entry
    )

    replaceSelected({ ...selectedList, faq: nextFaq })
  }

  function addFaq() {
    if (!selectedList) return
    replaceSelected({ ...selectedList, faq: [...selectedList.faq, createBlankFaq()] })
  }

  function removeFaq(index: number) {
    if (!selectedList) return
    replaceSelected({ ...selectedList, faq: selectedList.faq.filter((_, faqIndex) => faqIndex !== index) })
  }

  function normalizeForSave(list: DiscoverList) {
    const normalizedSlug = slugify(list.slug || list.title || list.id)
    const normalizedId = list.id.startsWith('draft-') ? normalizedSlug : list.id
    const today = new Date().toISOString().slice(0, 10)

    return {
      ...list,
      id: normalizedId,
      slug: normalizedSlug,
      seoTitle: list.seoTitle || list.title,
      metaDescription: list.metaDescription || list.description,
      category: list.category || (list.type === 'guide' ? 'Watch Guides' : 'Movies'),
      methodology: list.methodology.filter(Boolean),
      faq: list.faq.filter(entry => entry.question.trim() || entry.answer.trim()),
      items: list.type === 'ranking' ? ensureSequentialItems(list.items) : [],
      steps: list.type === 'guide' ? ensureSequentialSteps(list.steps) : [],
      itemCount: list.type === 'guide' ? list.steps.length : list.items.length,
      updatedAt: today,
    }
  }

  function validateForSave(list: DiscoverList) {
    const issues: string[] = []

    if (!list.title.trim()) {
      issues.push('Title is required.')
    }

    if (!list.slug.trim()) {
      issues.push('Slug is required.')
    }

    if (!list.category.trim()) {
      issues.push('Category is required.')
    }

    if (list.type === 'ranking' && !list.items.some(item => item.name.trim())) {
      issues.push('Add at least one ranking item with a name before saving.')
    }

    if (
      list.type === 'guide' &&
      !list.steps.some(step => step.title.trim() || step.description.trim())
    ) {
      issues.push('Add at least one guide step before saving.')
    }

    return issues
  }

  function saveCurrent() {
    if (!selectedList) return

    startAdminAction('save', async () => {
      const payload = normalizeForSave(selectedList)
      const validationIssues = validateForSave(payload)

      if (validationIssues.length > 0) {
        pushFeedback(
          'error',
          'Save blocked',
          'Fix the required fields before saving this discover page.',
          validationIssues
        )
        return
      }

      try {
        const method = selectedList.id.startsWith('draft-') ? 'POST' : 'PATCH'
        const result = await requestAdminDiscover(
          method,
          { list: payload },
          'Failed to save discover content.'
        )

        const savedList = (result.list as DiscoverList | undefined) || payload
        const nextLists = Array.isArray(result.lists) ? (result.lists as DiscoverList[]) : null

        setListsState(nextLists || listsState.map(list => (list.id === selectedList.id ? savedList : list)))
        setSelectedId(savedList.id)
        pushFeedback(
          'success',
          'Page saved',
          result.message || `Saved "${savedList.title}" successfully.`,
          [
            `Slug: /discover/${savedList.slug}`,
            `Mode: ${savedList.published ? 'Published' : 'Draft'}`,
          ]
        )
      } catch (error: any) {
        pushFeedback('error', 'Save failed', error.message || 'Failed to save discover page.')
      }
    })
  }

  function seedStarterData() {
    startAdminAction('seed', async () => {
      try {
        const result = await requestAdminDiscover(
          'POST',
          { action: 'seed' },
          'Failed to seed starter discover data.'
        )

        if (Array.isArray(result.lists)) {
          setListsState(result.lists as DiscoverList[])
        }

        pushFeedback(
          'success',
          'Starter data seeded',
          result.message || `Seeded ${result.count || 0} starter discover pages into the local data store.`
        )
      } catch (error: any) {
        pushFeedback('error', 'Seed failed', error.message || 'Failed to seed starter data.')
      }
    })
  }

  function refreshFromServer() {
    startAdminAction('refresh', async () => {
      try {
        const result = await requestAdminDiscover(
          'GET',
          undefined,
          'Failed to refresh discover pages from the server.'
        )

        const nextLists = Array.isArray(result.lists) ? (result.lists as DiscoverList[]) : []
        setListsState(nextLists)

        if (selectedId && nextLists.some(list => list.id === selectedId)) {
          setSelectedId(selectedId)
        } else if (nextLists[0]) {
          setSelectedId(nextLists[0].id)
        } else {
          setSelectedId('')
        }

        pushFeedback(
          'info',
          'Data refreshed',
          `Loaded ${nextLists.length} discover pages from the server.`
        )
      } catch (error: any) {
        pushFeedback('error', 'Refresh failed', error.message || 'Failed to refresh discover data.')
      }
    })
  }

  async function loadImportFile(file: File) {
    try {
      const text = await readFileAsText(file)
      setImportJson(text)
      setImportFilename(file.name)
      setImportSummary(null)
      setImportPreview(null)
      pushFeedback('info', 'JSON loaded', `Loaded ${file.name} for discover import.`)
    } catch {
      pushFeedback('error', 'File read failed', 'Failed to read the JSON file.')
    }
  }

  function resetImportState() {
    setImportJson('')
    setImportFilename('')
    setImportSummary(null)
    setImportPreview(null)
    pushFeedback('info', 'Import form reset', 'The JSON payload, loaded file, and last import summary were cleared.')
  }

  function previewImportData() {
    if (!importJson.trim()) {
      pushFeedback('error', 'Nothing to preview', 'Paste JSON or upload a JSON file before previewing.')
      return
    }

    try {
      const payload = JSON.parse(importJson)
      const parsed = parseDiscoverImportPayload(payload, listsState, {
        publishImported,
        replaceExisting,
      })

      setImportPreview({
        summary: {
          ...parsed.summary,
          imported: parsed.lists.length,
        },
        previewLists: parsed.lists.slice(0, 8).map(list => ({
          title: list.title,
          slug: list.slug,
          type: list.type,
          category: list.category,
        })),
      })

      pushFeedback(
        'info',
        'Preview ready',
        parsed.lists.length > 0
          ? `Prepared ${parsed.lists.length} discover pages for import preview.`
          : 'This payload did not produce any new importable pages.',
        [
          `Received: ${parsed.summary.received}`,
          `Prepared: ${parsed.summary.prepared}`,
          `Skipped existing: ${parsed.summary.skippedExisting}`,
          `Skipped duplicates: ${parsed.summary.skippedIncomingDuplicates}`,
          `Invalid: ${parsed.summary.invalid}`,
        ]
      )
    } catch (error: any) {
      setImportPreview(null)
      pushFeedback('error', 'Preview failed', error.message || 'Invalid JSON payload.')
    }
  }

  function exportCurrentDiscoverJson() {
    const payload = {
      rankings: listsState.filter(list => list.type === 'ranking'),
      guides: listsState.filter(list => list.type === 'guide'),
      meta: {
        exportedAt: new Date().toISOString(),
        total: listsState.length,
        published: listsState.filter(list => list.published).length,
      },
    }

    downloadBlob(
      new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
      `discover-export-${new Date().toISOString().slice(0, 10)}.json`
    )

    pushFeedback('success', 'Export ready', 'The current discover library was exported as JSON.')
  }

  function importJsonData() {
    if (!importJson.trim()) {
      pushFeedback('error', 'Nothing to import', 'Paste JSON or upload a JSON file before importing.')
      return
    }

    startAdminAction('import', async () => {
      try {
        const result = await requestAdminDiscover(
          'POST',
          {
            action: 'import-json',
            rawJson: importJson,
            publishImported,
            replaceExisting,
          },
          'Failed to import discover JSON.'
        )

        const nextLists = Array.isArray(result.lists) ? (result.lists as DiscoverList[]) : listsState
        const summary = (result.summary || null) as ImportSummary | null
        const importedIds = Array.isArray(result.importedIds) ? (result.importedIds as string[]) : []

        setListsState(nextLists)
        setImportSummary(summary)
        setImportPreview(null)

        if (importedIds[0]) {
          setSelectedId(importedIds[0])
        }

        pushFeedback(
          summary && summary.imported > 0 ? 'success' : 'info',
          summary && summary.imported > 0 ? 'Import complete' : 'Import reviewed',
          result.message ||
            (summary
              ? summary.imported > 0
                ? `Imported ${summary.imported} pages successfully.`
                : 'No new pages were imported from this JSON payload.'
              : 'Discover JSON imported successfully.'),
          summary
            ? [
                `Received: ${summary.received}`,
                `Imported: ${summary.imported}`,
                `Skipped existing: ${summary.skippedExisting}`,
                `Skipped duplicate entries: ${summary.skippedIncomingDuplicates}`,
                `Invalid entries: ${summary.invalid}`,
              ]
            : undefined
        )
      } catch (error: any) {
        pushFeedback('error', 'Import failed', error.message || 'Failed to import discover JSON.')
      }
    })
  }

  return (
    <div className="max-w-screen-2xl space-y-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Discover Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage rankings, guides, FAQs, related pages, and SEO fields for discover content.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-border bg-card px-3 py-1 font-semibold text-foreground">
              Total: {discoverCounts.total}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 font-semibold text-foreground">
              Published: {discoverCounts.published}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 font-semibold text-foreground">
              Drafts: {discoverCounts.draft}
            </span>
            <span className="rounded-full border border-border bg-card px-3 py-1 font-semibold text-foreground">
              Showing: {discoverCounts.visible}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => createNewList('ranking')} className="btn-secondary gap-2 px-4 py-2 text-sm">
            <ListOrdered className="h-4 w-4" />
            New Ranking
          </button>
          <button onClick={() => createNewList('guide')} className="btn-secondary gap-2 px-4 py-2 text-sm">
            <BookOpen className="h-4 w-4" />
            New Guide
          </button>
          <button onClick={refreshFromServer} disabled={isSaving} className="btn-secondary gap-2 px-4 py-2 text-sm">
            <RefreshCw className={cn('h-4 w-4', busyAction === 'refresh' ? 'animate-spin' : '')} />
            {busyAction === 'refresh' ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={exportCurrentDiscoverJson} className="btn-secondary gap-2 px-4 py-2 text-sm">
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button onClick={seedStarterData} disabled={isSaving} className="btn-secondary gap-2 px-4 py-2 text-sm">
            <Database className="h-4 w-4" />
            {busyAction === 'seed' ? 'Seeding...' : 'Seed Starter Data'}
          </button>
          <button onClick={saveCurrent} disabled={!selectedList || isSaving} className="btn-primary gap-2 px-4 py-2 text-sm">
            <Save className="h-4 w-4" />
            {busyAction === 'save' ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      {feedback ? (
        <div
          className={cn(
            'rounded-2xl border px-4 py-4 text-sm',
            feedback.tone === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-950/60 dark:bg-emerald-950/20 dark:text-emerald-100',
            feedback.tone === 'error' && 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-950/60 dark:bg-rose-950/20 dark:text-rose-100',
            feedback.tone === 'info' && 'border-border bg-card text-foreground'
          )}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {feedback.tone === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : feedback.tone === 'error' ? (
                <TriangleAlert className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{feedback.title}</p>
                <span className="text-[11px] opacity-70">{feedback.timestamp}</span>
              </div>
              <p className="mt-1 text-sm opacity-90">{feedback.message}</p>
              {feedback.details?.length ? (
                <ul className="mt-3 space-y-1 text-xs opacity-80">
                  {feedback.details.map(detail => (
                    <li key={detail}>- {detail}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Bulk JSON Import</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload or paste JSON shaped like <code>{'{ "guides": [...] }'}</code>, <code>{'{ "rankings": [...], "guides": [...] }'}</code>, or a direct array of discover pages.
            </p>
          </div>

          <label className="btn-secondary inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm">
            <Upload className="h-4 w-4" />
            {importFilename ? 'Replace JSON File' : 'Upload JSON File'}
            <input
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={event => {
                const file = event.target.files?.[0]
                if (file) {
                  void loadImportFile(file)
                }
                event.currentTarget.value = ''
              }}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_360px]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">JSON Payload</span>
            <textarea
              value={importJson}
              onChange={event => setImportJson(event.target.value)}
              rows={12}
              placeholder='{"guides":[{"title":"How to ...","steps":[{"title":"Step 1","focus":"..."}]}]}'
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </label>

          <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
            <div className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              {importFilename ? `Loaded file: ${importFilename}` : 'No JSON file loaded yet. You can still paste JSON manually.'}
            </div>

            <label className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Publish on import</p>
                <p className="text-xs text-muted-foreground">Turn this on only if the JSON is already review-ready.</p>
              </div>
              <input
                type="checkbox"
                checked={publishImported}
                onChange={event => setPublishImported(event.target.checked)}
                className="h-4 w-4 rounded border-border"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Replace existing matches</p>
                <p className="text-xs text-muted-foreground">If off, title or slug conflicts are skipped automatically.</p>
              </div>
              <input
                type="checkbox"
                checked={replaceExisting}
                onChange={event => setReplaceExisting(event.target.checked)}
                className="h-4 w-4 rounded border-border"
              />
            </label>

            {importSummary ? (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Last Import Summary</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-foreground">Received</p>
                    <p>{importSummary.received}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Imported</p>
                    <p>{importSummary.imported}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Skipped existing</p>
                    <p>{importSummary.skippedExisting}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Skipped duplicates</p>
                    <p>{importSummary.skippedIncomingDuplicates}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Invalid</p>
                    <p>{importSummary.invalid}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Prepared</p>
                    <p>{importSummary.prepared}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {importPreview ? (
              <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Import Preview</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-foreground">Prepared</p>
                    <p>{importPreview.summary.prepared}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Will import</p>
                    <p>{importPreview.summary.imported}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Skipped existing</p>
                    <p>{importPreview.summary.skippedExisting}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Invalid</p>
                    <p>{importPreview.summary.invalid}</p>
                  </div>
                </div>
                {importPreview.previewLists.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {importPreview.previewLists.map(list => (
                      <div key={list.slug} className="rounded-xl bg-muted/40 px-3 py-2 text-xs">
                        <p className="font-semibold text-foreground">{list.title}</p>
                        <p className="mt-1 text-muted-foreground">
                          /{list.slug} • {list.type} • {list.category}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Duplicate Health</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-semibold text-foreground">Duplicate titles</p>
                  <p>{duplicateInsights.titleDuplicates.length}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Duplicate slugs</p>
                  <p>{duplicateInsights.slugDuplicates.length}</p>
                </div>
              </div>
              {duplicateInsights.titleDuplicates.length > 0 || duplicateInsights.slugDuplicates.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {duplicateInsights.titleDuplicates.slice(0, 4).map(group => (
                    <div key={group.join('|')} className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
                      Title collision: {group.join(' / ')}
                    </div>
                  ))}
                  {duplicateInsights.slugDuplicates.slice(0, 4).map(entry => (
                    <div key={entry} className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-950/20 dark:text-amber-100">
                      Slug collision: {entry}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs">No duplicate titles or slugs detected in the current discover library.</p>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <button onClick={previewImportData} disabled={isSaving} className="btn-secondary w-full gap-2 px-4 py-2 text-sm">
                <Eye className="h-4 w-4" />
                Preview Import
              </button>
              <button onClick={importJsonData} disabled={isSaving} className="btn-primary w-full gap-2 px-4 py-2 text-sm">
                <Upload className="h-4 w-4" />
                {busyAction === 'import' ? 'Importing...' : 'Import JSON into Discover'}
              </button>
            </div>
            <button
              type="button"
              onClick={resetImportState}
              disabled={isSaving || (!importJson && !importFilename && !importSummary && !importPreview)}
              className="btn-secondary w-full gap-2 px-4 py-2 text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Import
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-2xl border border-border bg-card p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={event => {
                setSearch(event.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search discover pages"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'ranking', 'guide'] as const).map(value => (
              <button
                key={value}
                onClick={() => {
                  setTypeFilter(value)
                  setCurrentPage(1)
                }}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  typeFilter === value
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {value === 'all' ? 'All types' : value}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'published', 'draft'] as const).map(value => (
              <button
                key={value}
                onClick={() => {
                  setStatusFilter(value)
                  setCurrentPage(1)
                }}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  statusFilter === value
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {value === 'all' ? 'All status' : value}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-background p-3">
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Page <span className="font-semibold text-foreground">{pagination.page}</span> of{' '}
                <span className="font-semibold text-foreground">{pagination.totalPages}</span>
              </span>
              <span>
                {visiblePageStart}-{visiblePageEnd} of {filteredLists.length}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={pagination.page === 1}
                className="btn-secondary gap-2 px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>

              {paginationPages.map((page, index) => {
                const previousPage = paginationPages[index - 1]
                const showGap = previousPage && page - previousPage > 1

                return (
                  <div key={page} className="flex items-center gap-2">
                    {showGap ? <span className="px-1 text-xs text-muted-foreground">...</span> : null}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors',
                        pagination.page === page
                          ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                          : 'border-border bg-card text-foreground hover:border-slate-300 hover:text-slate-950 dark:hover:border-slate-700 dark:hover:text-slate-50'
                      )}
                    >
                      {page}
                    </button>
                  </div>
                )
              })}

              <button
                type="button"
                onClick={() => setCurrentPage(page => Math.min(pagination.totalPages, page + 1))}
                disabled={pagination.page === pagination.totalPages}
                className="btn-secondary gap-2 px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {paginatedLists.map(list => (
              <button
                key={list.id}
                onClick={() => setSelectedId(list.id)}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left transition-colors',
                  selectedId === list.id
                    ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/30'
                    : 'border-border bg-background hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{list.title || 'Untitled page'}</p>
                    <p className="mt-1 text-xs text-muted-foreground">/{list.slug || 'no-slug-yet'}</p>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {list.type}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{list.category}</span>
                  <span>•</span>
                  <span>{list.published ? 'Published' : 'Draft'}</span>
                  {list.featured ? (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-300">Featured</span>
                    </>
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          {filteredLists.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-6 text-center">
              <p className="text-sm font-semibold text-foreground">No discover pages match this filter.</p>
              <p className="mt-1 text-xs text-muted-foreground">Try another query, type, or status filter.</p>
            </div>
          ) : null}
        </aside>

        <section className="rounded-2xl border border-border bg-card p-5">
          {!selectedList ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 text-center">
              <Sparkles className="h-10 w-10 text-muted-foreground" />
              <p className="mt-4 text-base font-semibold">Select a discover page</p>
              <p className="mt-1 text-sm text-muted-foreground">Choose an existing list or create a new ranking or guide.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Editing page</p>
                  <h2 className="mt-1 text-xl font-bold">{selectedList.title || 'Untitled discover page'}</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={duplicateCurrent} className="btn-secondary gap-2 px-3 py-2 text-sm">
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </button>
                  <button onClick={saveCurrent} disabled={isSaving} className="btn-primary gap-2 px-3 py-2 text-sm">
                    <Save className="h-4 w-4" />
                    {busyAction === 'save' ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Title</span>
                  <input value={selectedList.title} onChange={event => updateSelected('title', event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Slug</span>
                  <input value={selectedList.slug} onChange={event => updateSelected('slug', slugify(event.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Type</span>
                  <select value={selectedList.type} onChange={event => updateSelected('type', event.target.value as DiscoverList['type'])} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    <option value="ranking">Ranking</option>
                    <option value="guide">Guide</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Category</span>
                  <select value={selectedList.category} onChange={event => updateSelected('category', event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Subcategory</span>
                  <input value={selectedList.subcategory || ''} onChange={event => updateSelected('subcategory', event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Icon</span>
                  <input value={selectedList.icon} onChange={event => updateSelected('icon', event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Published</p>
                    <p className="text-xs text-muted-foreground">Show this page on the public discover section.</p>
                  </div>
                  <input type="checkbox" checked={selectedList.published} onChange={event => updateSelected('published', event.target.checked)} className="h-4 w-4 rounded border-border" />
                </label>
                <label className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">Featured</p>
                    <p className="text-xs text-muted-foreground">Highlight this page in discover listings.</p>
                  </div>
                  <input type="checkbox" checked={Boolean(selectedList.featured)} onChange={event => updateSelected('featured', event.target.checked)} className="h-4 w-4 rounded border-border" />
                </label>
              </div>

              <div className="grid gap-4">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">SEO Title</span>
                  <input value={selectedList.seoTitle} onChange={event => updateSelected('seoTitle', event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Meta Description</span>
                  <textarea value={selectedList.metaDescription} onChange={event => updateSelected('metaDescription', event.target.value)} rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Short Description</span>
                  <textarea value={selectedList.description} onChange={event => updateSelected('description', event.target.value)} rows={2} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Intro</span>
                  <textarea value={selectedList.intro} onChange={event => updateSelected('intro', event.target.value)} rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2 md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tags</span>
                  <textarea value={selectedList.tags.join(', ')} onChange={event => updateTags(event.target.value)} rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2 md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Methodology</span>
                  <textarea value={selectedList.methodology.join('\n')} onChange={event => updateMethodology(event.target.value)} rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2 md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Related Slugs</span>
                  <textarea value={selectedList.relatedSlugs.join(', ')} onChange={event => updateRelatedSlugs(event.target.value)} rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
              </div>

              {selectedList.type === 'ranking' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Ranking Items</h3>
                    <button onClick={addRankingItem} className="btn-secondary gap-2 px-3 py-2 text-sm">
                      <Plus className="h-4 w-4" />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedList.items.map((item, index) => (
                      <div key={`${item.rank}-${index}`} className="rounded-2xl border border-border bg-background p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm font-semibold">Rank #{index + 1}</p>
                          <button onClick={() => removeRankingItem(index)} className="text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400">
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Name</span>
                            <input value={item.name} onChange={event => updateItem(index, 'name', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Logo</span>
                            <input value={item.logo} onChange={event => updateItem(index, 'logo', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Best For</span>
                            <input value={item.bestFor} onChange={event => updateItem(index, 'bestFor', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Pricing Label</span>
                            <input value={item.pricing || ''} onChange={event => updateItem(index, 'pricing', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Badge</span>
                            <select value={item.badge} onChange={event => updateItem(index, 'badge', event.target.value as DiscoverItem['badge'])} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                              <option value="editorial">Editorial</option>
                              <option value="internal">Internal</option>
                              <option value="external">External</option>
                            </select>
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Rating</span>
                            <input type="number" min="0" max="5" step="0.1" value={item.rating ?? 4.5} onChange={event => updateItem(index, 'rating', Number(event.target.value))} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                        </div>
                        <label className="mt-4 block space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Summary</span>
                          <textarea value={item.summary} onChange={event => updateItem(index, 'summary', event.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">URL</span>
                            <input value={item.url || ''} onChange={event => updateItem(index, 'url', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                          <label className="space-y-2">
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tags</span>
                            <input value={item.tags.join(', ')} onChange={event => updateItemTags(index, event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Guide Steps</h3>
                    <button onClick={addStep} className="btn-secondary gap-2 px-3 py-2 text-sm">
                      <Plus className="h-4 w-4" />
                      Add Step
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedList.steps.map((step, index) => (
                      <div key={`${step.step}-${index}`} className="rounded-2xl border border-border bg-background p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <p className="text-sm font-semibold">Step {index + 1}</p>
                          <button onClick={() => removeStep(index)} className="text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400">
                            Remove
                          </button>
                        </div>
                        <label className="space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Step Title</span>
                          <input value={step.title} onChange={event => updateStep(index, 'title', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                        <label className="mt-4 block space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Description</span>
                          <textarea value={step.description} onChange={event => updateStep(index, 'description', event.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">FAQ</h3>
                  <button onClick={addFaq} className="btn-secondary gap-2 px-3 py-2 text-sm">
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedList.faq.map((entry, index) => (
                    <div key={`${index}-${entry.question}`} className="rounded-2xl border border-border bg-background p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold">FAQ #{index + 1}</p>
                        <button onClick={() => removeFaq(index)} className="text-xs font-semibold text-rose-600 hover:underline dark:text-rose-400">
                          Remove
                        </button>
                      </div>
                      <label className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Question</span>
                        <input value={entry.question} onChange={event => updateFaq(index, 'question', event.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                      </label>
                      <label className="mt-4 block space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Answer</span>
                        <textarea value={entry.answer} onChange={event => updateFaq(index, 'answer', event.target.value)} rows={3} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
