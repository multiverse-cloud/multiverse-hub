'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Calculator,
  Code,
  FileText,
  Folder,
  Image as ImageIcon,
  Music,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Type as TypeIcon,
  Video,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ToolTag } from '@/lib/tools-data'

const TAG_OPTIONS = ['trending', 'new', 'hot', 'beta'] as const

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  ai: Bot,
  audio: Music,
  calculator: Calculator,
  dev: Code,
  file: Folder,
  image: ImageIcon,
  pdf: FileText,
  seo: Search,
  text: TypeIcon,
  video: Video,
}

export interface AdminToolCategoryOption {
  id: string
  label: string
}

export interface AdminToolRecord {
  id: string
  name: string
  categorySlug: string
  slug: string
  tags: ToolTag[]
  enabled?: boolean
}

type ToolState = {
  enabled: boolean
  tags: ToolTag[]
}

function getCategoryIcon(categorySlug: string): LucideIcon {
  return CATEGORY_ICONS[categorySlug] || Wrench
}

export default function AdminToolsClient({
  categories,
  tools,
}: {
  categories: AdminToolCategoryOption[]
  tools: AdminToolRecord[]
}) {
  const [search, setSearch] = useState('')
  const deferredSearch = useDeferredValue(search)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [toolStates, setToolStates] = useState<Record<string, ToolState>>(() =>
    Object.fromEntries(tools.map(tool => [tool.id, { enabled: true, tags: [...tool.tags] }]))
  )

  const normalizedSearch = deferredSearch.trim().toLowerCase()

  const filteredTools = useMemo(
    () =>
      tools.filter(tool => {
        const matchesCategory = categoryFilter === 'all' || tool.categorySlug === categoryFilter
        const matchesSearch =
          !normalizedSearch ||
          tool.name.toLowerCase().includes(normalizedSearch) ||
          tool.slug.toLowerCase().includes(normalizedSearch)

        return matchesCategory && matchesSearch
      }),
    [categoryFilter, normalizedSearch, tools]
  )

  const enabledCount = useMemo(
    () => Object.values(toolStates).filter(state => state.enabled).length,
    [toolStates]
  )

  async function toggleTool(id: string) {
    const previousState = toolStates[id]
    const newState = { ...previousState, enabled: !previousState.enabled }
    
    setToolStates(previous => ({
      ...previous,
      [id]: newState,
    }))

    try {
      const res = await fetch('/api/admin/tools', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { enabled: newState.enabled } })
      })
      if (!res.ok) throw new Error('Failed to save state to database')
    } catch {
      setToolStates(previous => ({
        ...previous,
        [id]: previousState,
      }))
    }
  }

  async function toggleTag(id: string, tag: (typeof TAG_OPTIONS)[number]) {
    const previousState = toolStates[id]
    const currentTags = previousState.tags
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(item => item !== tag)
      : [...currentTags, tag]
      
    const newState = { ...previousState, tags: newTags }

    setToolStates(previous => ({
      ...previous,
      [id]: newState,
    }))

    try {
      const res = await fetch('/api/admin/tools', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { tags: newTags } })
      })
      if (!res.ok) throw new Error('Failed to update tags in database')
    } catch {
      setToolStates(previous => ({
        ...previous,
        [id]: previousState,
      }))
    }
  }

  return (
    <div className="max-w-screen-xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">Tools Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tools.length} total tools · {enabledCount} enabled
          </p>
        </div>
        <button className="btn-primary gap-2 px-4 py-2 text-sm">
          <Plus className="h-4 w-4" />
          Add Tool
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search tools"
            className="w-56 rounded-xl border border-border bg-card py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              categoryFilter === 'all'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                categoryFilter === category.id
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tool</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tags</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTools.map(tool => {
                const state = toolStates[tool.id]
                const CategoryIcon = getCategoryIcon(tool.categorySlug)

                return (
                  <tr
                    key={tool.id}
                    className={cn('transition-colors hover:bg-muted/30', !state.enabled && 'opacity-50')}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
                          <CategoryIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tool.name}</p>
                          <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                            /tools/{tool.categorySlug}/{tool.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">
                        {tool.categorySlug}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1">
                        {TAG_OPTIONS.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tool.id, tag)}
                            className={cn(
                              'rounded-full px-1.5 py-0.5 text-xs transition-colors',
                              state.tags.includes(tag)
                                ? tag === 'new'
                                  ? 'tag-new'
                                  : tag === 'trending'
                                    ? 'tag-trending'
                                    : tag === 'hot'
                                      ? 'tag-hot'
                                      : 'tag-beta'
                                : 'bg-muted text-muted-foreground hover:text-foreground'
                            )}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          state.enabled
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {state.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleTool(tool.id)}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {state.enabled ? (
                          <ToggleRight className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          Showing {filteredTools.length} of {tools.length} tools
        </div>
      </div>
    </div>
  )
}
