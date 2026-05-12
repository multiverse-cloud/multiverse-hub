import 'server-only'

import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { hasRuntimeKvStore, readRuntimeJson, writeRuntimeJson } from '@/lib/runtime-kv'
import type { Tool, ToolTag } from '@/lib/tools-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_TOOL_STORE_FILE = path.join(DATA_DIR, 'tool-local-store.json')
const UPSTASH_TOOL_STORE_KEY = 'mtverse:tool-local-store:v1'
const VALID_TOOL_TAGS = new Set<ToolTag>(['new', 'trending', 'beta', 'hot', 'free'])

type ToolOverride = {
  id: string
  updates: Partial<Tool>
}

type ToolLocalStoreFile = {
  tools: ToolOverride[]
  meta?: {
    source: string
    generatedAt: string
    count: number
  }
}

async function ensureDataDirectory() {
  await mkdir(DATA_DIR, { recursive: true })
}

function sanitizeToolUpdates(updates: Partial<Tool>) {
  const next: Partial<Tool> = {}

  if (typeof updates.enabled === 'boolean') next.enabled = updates.enabled
  if (typeof updates.popular === 'boolean') next.popular = updates.popular
  if (typeof updates.implemented === 'boolean') next.implemented = updates.implemented
  if (Array.isArray(updates.tags)) {
    next.tags = updates.tags.filter((tag): tag is ToolTag => VALID_TOOL_TAGS.has(tag as ToolTag))
  }

  return next
}

function mergeToolOverrides(overrides: ToolOverride[]) {
  const byId = new Map<string, Partial<Tool>>()

  for (const override of overrides) {
    if (!override.id) continue
    byId.set(override.id, {
      ...(byId.get(override.id) || {}),
      ...sanitizeToolUpdates(override.updates),
    })
  }

  return Array.from(byId.entries()).map(([id, updates]) => ({ id, updates }))
}

async function readLocalStore() {
  const useBundledStoreOnly = process.env.NEXT_PHASE === 'phase-production-build'

  if (hasRuntimeKvStore() && !useBundledStoreOnly) {
    try {
      const payload = await readRuntimeJson<Partial<ToolLocalStoreFile>>(UPSTASH_TOOL_STORE_KEY, ['tools'])
      if (payload && Array.isArray(payload.tools)) {
        return mergeToolOverrides(payload.tools as ToolOverride[])
      }
    } catch (error) {
      console.error('Tool Upstash store read failed:', error)
      if (process.env.VERCEL) return []
    }
  }

  try {
    const raw = await readFile(LOCAL_TOOL_STORE_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<ToolLocalStoreFile>
    return Array.isArray(parsed.tools) ? mergeToolOverrides(parsed.tools as ToolOverride[]) : []
  } catch {
    return []
  }
}

async function writeLocalStore(overrides: ToolOverride[], source: string) {
  const mergedOverrides = mergeToolOverrides(overrides)
  const payload: ToolLocalStoreFile = {
    tools: mergedOverrides,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
      count: mergedOverrides.length,
    },
  }

  if (hasRuntimeKvStore()) {
    await writeRuntimeJson(UPSTASH_TOOL_STORE_KEY, payload)

    if (!process.env.VERCEL) {
      await ensureDataDirectory()
      await writeFile(LOCAL_TOOL_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    }

    return mergedOverrides
  }

  if (process.env.VERCEL) {
    throw new Error(
      'Tool admin writes need UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN on Vercel, or must be run locally where data files are writable.'
    )
  }

  await ensureDataDirectory()
  await writeFile(LOCAL_TOOL_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  return mergedOverrides
}

export async function applyLocalToolOverrides(tools: Tool[]) {
  const overrides = await readLocalStore()
  if (overrides.length === 0) return tools

  const byId = new Map(overrides.map(override => [override.id, override.updates]))
  return tools.map(tool => ({
    ...tool,
    ...(byId.get(tool.id) || {}),
  }))
}

export async function saveLocalToolUpdate(id: string, updates: Partial<Tool>) {
  const cleanUpdates = sanitizeToolUpdates(updates)

  if (Object.keys(cleanUpdates).length === 0) {
    throw new Error('No supported tool updates were provided.')
  }

  const currentOverrides = await readLocalStore()
  const existing = currentOverrides.find(override => override.id === id)
  const nextOverrides = currentOverrides.filter(override => override.id !== id)

  nextOverrides.push({
    id,
    updates: {
      ...(existing?.updates || {}),
      ...cleanUpdates,
    },
  })

  await writeLocalStore(nextOverrides, 'admin-save')
  return true
}

export function hasRuntimeToolStore() {
  return hasRuntimeKvStore() || !process.env.VERCEL
}

export function getLocalToolStorePaths() {
  return {
    storeFile: LOCAL_TOOL_STORE_FILE,
  }
}
