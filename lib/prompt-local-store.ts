import 'server-only'

import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { PROMPTS, type PromptEntry } from '@/lib/prompt-library-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_PROMPT_STORE_FILE = path.join(DATA_DIR, 'prompt-local-store.json')
const LOCAL_PROMPT_TITLE_REGISTRY_FILE = path.join(DATA_DIR, 'prompt-topic-titles.txt')

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

async function writeTitleRegistry(prompts: PromptEntry[]) {
  const lines = sortPrompts(prompts).map(prompt => `${normalizeTopic(prompt.title)} | ${prompt.title} | ${prompt.slug}`)
  await writeFile(LOCAL_PROMPT_TITLE_REGISTRY_FILE, `${lines.join('\n')}\n`, 'utf8')
}

async function writeLocalStore(prompts: PromptEntry[], source: string) {
  await ensureDataDirectory()

  const sortedPrompts = sortPrompts(prompts)
  const payload: PromptLocalStoreFile = {
    prompts: sortedPrompts,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
      count: sortedPrompts.length,
    },
  }

  await writeFile(LOCAL_PROMPT_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  await writeTitleRegistry(sortedPrompts)

  return sortedPrompts
}

async function readLocalStore() {
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

export function getLocalPromptStorePaths() {
  return {
    storeFile: LOCAL_PROMPT_STORE_FILE,
    titleRegistryFile: LOCAL_PROMPT_TITLE_REGISTRY_FILE,
  }
}
