import 'server-only'

import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { PROMPTS, type PromptEntry } from '@/lib/prompt-library-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_PROMPT_STORE_FILE = path.join(DATA_DIR, 'prompt-local-store.json')
const LOCAL_PROMPT_TITLE_REGISTRY_FILE = path.join(DATA_DIR, 'prompt-topic-titles.txt')
const UPSTASH_PROMPT_STORE_KEY = 'mtverse:prompt-local-store:v1'

type PromptLocalStoreFile = {
  prompts: PromptEntry[]
  meta?: {
    source: string
    generatedAt: string
    count: number
  }
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getPromptMatchKey(prompt: PromptEntry) {
  return prompt.slug || normalizeTopic(prompt.title)
}

function sortPrompts(prompts: PromptEntry[]) {
  return [...prompts].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return left.title.localeCompare(right.title)
  })
}

async function ensureDataDirectory() {
  await mkdir(DATA_DIR, { recursive: true })
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim()
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim()

  if (!url || !token) return null

  return {
    url: url.replace(/\/$/, ''),
    token,
  }
}

async function callUpstashPipeline(commands: Array<Array<string | number>>, mode: 'read' | 'write') {
  const config = getUpstashConfig()
  if (!config) return null
  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  }

  if (mode === 'read') {
    init.next = {
      revalidate: 300,
      tags: ['prompts'],
    }
  } else {
    init.cache = 'no-store'
  }

  const response = await fetch(`${config.url}/pipeline`, {
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Prompt store failed with ${response.status}`)
  }

  return (await response.json()) as Array<{ result?: unknown; error?: string }>
}

async function readUpstashStore() {
  const result = await callUpstashPipeline([['GET', UPSTASH_PROMPT_STORE_KEY]], 'read')
  const raw = result?.[0]?.result

  if (typeof raw !== 'string' || !raw.trim()) return null

  const parsed = JSON.parse(raw) as Partial<PromptLocalStoreFile>
  return Array.isArray(parsed.prompts) ? (parsed.prompts as PromptEntry[]) : []
}

async function writeUpstashStore(payload: PromptLocalStoreFile) {
  await callUpstashPipeline([['SET', UPSTASH_PROMPT_STORE_KEY, JSON.stringify(payload)]], 'write')
}

async function writeTitleRegistry(prompts: PromptEntry[]) {
  const lines = sortPrompts(prompts).map(prompt => `${normalizeTopic(prompt.title)} | ${prompt.title} | ${prompt.slug}`)
  await writeFile(LOCAL_PROMPT_TITLE_REGISTRY_FILE, `${lines.join('\n')}\n`, 'utf8')
}

async function writeLocalStore(prompts: PromptEntry[], source: string) {
  const sortedPrompts = sortPrompts(prompts)
  const payload: PromptLocalStoreFile = {
    prompts: sortedPrompts,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
      count: sortedPrompts.length,
    },
  }

  if (getUpstashConfig()) {
    await writeUpstashStore(payload)

    if (!process.env.VERCEL) {
      await ensureDataDirectory()
      await writeFile(LOCAL_PROMPT_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
      await writeTitleRegistry(sortedPrompts)
    }

    return sortedPrompts
  }

  if (process.env.VERCEL) {
    throw new Error(
      'Prompt Hub admin writes need UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN on Vercel, or must be run locally where data files are writable.'
    )
  }

  await ensureDataDirectory()
  await writeFile(LOCAL_PROMPT_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  await writeTitleRegistry(sortedPrompts)

  return sortedPrompts
}

async function readLocalStore() {
  if (getUpstashConfig()) {
    try {
      const upstashPrompts = await readUpstashStore()
      if (upstashPrompts) return upstashPrompts
    } catch (error) {
      console.error('Prompt Upstash store read failed:', error)
      if (process.env.VERCEL) return []
    }
  }

  try {
    const raw = await readFile(LOCAL_PROMPT_STORE_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<PromptLocalStoreFile>
    return Array.isArray(parsed.prompts) ? (parsed.prompts as PromptEntry[]) : []
  } catch {
    return []
  }
}

function mergePromptEntries(basePrompts: PromptEntry[], overridePrompts: PromptEntry[]) {
  const byKey = new Map<string, PromptEntry>()

  for (const prompt of basePrompts) {
    byKey.set(getPromptMatchKey(prompt), prompt)
  }

  for (const prompt of overridePrompts) {
    byKey.set(getPromptMatchKey(prompt), prompt)
  }

  return sortPrompts(Array.from(byKey.values()))
}

export async function loadLocalPromptOverrideStore() {
  return readLocalStore()
}

export async function getMergedLocalPromptEntries() {
  const overrides = await loadLocalPromptOverrideStore()
  return mergePromptEntries(PROMPTS, overrides)
}

export async function saveLocalPrompt(prompt: PromptEntry) {
  const currentOverrides = await loadLocalPromptOverrideStore()
  const nextOverrides = currentOverrides.filter(existing => {
    const sameSlug = existing.slug === prompt.slug
    const sameId = existing.id === prompt.id
    const sameTitle = normalizeTopic(existing.title) === normalizeTopic(prompt.title)
    return !(sameSlug || sameId || sameTitle)
  })

  nextOverrides.push(prompt)
  await writeLocalStore(nextOverrides, 'admin-save')
  return true
}

export async function saveLocalPrompts(prompts: PromptEntry[]) {
  const currentOverrides = await loadLocalPromptOverrideStore()
  const incomingKeys = new Set(prompts.map(getPromptMatchKey))
  const nextOverrides = currentOverrides.filter(existing => !incomingKeys.has(getPromptMatchKey(existing)))

  nextOverrides.push(...prompts)
  await writeLocalStore(nextOverrides, 'admin-bulk-save')

  return {
    success: true,
    count: prompts.length,
  }
}

export function hasRuntimePromptStore() {
  return Boolean(getUpstashConfig()) || !process.env.VERCEL
}

export function getLocalPromptStorePaths() {
  return {
    storeFile: LOCAL_PROMPT_STORE_FILE,
    titleRegistryFile: LOCAL_PROMPT_TITLE_REGISTRY_FILE,
  }
}
