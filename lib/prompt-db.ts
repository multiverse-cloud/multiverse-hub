import 'server-only'

import { revalidateTag } from 'next/cache'
import {
  PROMPT_CATEGORIES,
  PROMPT_MODELS,
  type PromptCategory,
  type PromptEntry,
  type PromptModelId,
} from '@/lib/prompt-library-data'
import { getPromptPreviewDefault, isPromptPlaceholderPreview } from '@/lib/prompt-preview-images'
import { getMergedLocalPromptEntries, saveLocalPrompt, saveLocalPrompts } from '@/lib/prompt-local-store'

const PROMPTS_TAG = 'prompts'
const PROMPTS_MEMORY_CACHE_MS = 60 * 60 * 1000

let promptLibraryCache:
  | {
      state: PromptLibraryState
      expiresAt: number
    }
  | null = null

type PromptLibraryState = {
  prompts: PromptEntry[]
  featuredPrompts: PromptEntry[]
  categories: PromptCategory[]
  models: PromptModelId[]
  stats: {
    totalPrompts: number
    imagePrompts: number
    featuredPrompts: number
  }
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function normalizePromptBody(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
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

function normalizePromptEntry(prompt: PromptEntry): PromptEntry {
  const fallbackPreview = getPromptPreviewDefault(prompt.category)
  const previewImage = asString(prompt.previewImage)

  return {
    ...prompt,
    id: asString(prompt.id) || `prompt-${prompt.slug}`,
    slug: asString(prompt.slug),
    title: asString(prompt.title),
    seoTitle: asString(prompt.seoTitle) || prompt.title,
    metaDescription: asString(prompt.metaDescription) || asString(prompt.description) || asString(prompt.summary),
    summary: asString(prompt.summary) || asString(prompt.description) || 'Premium prompt entry.',
    description: asString(prompt.description) || asString(prompt.summary) || 'Premium prompt entry.',
    categoryTitle: PROMPT_CATEGORIES.find(category => category.id === prompt.category)?.title || 'Prompt Hub',
    subcategory: asString(prompt.subcategory) || 'General',
    tags: asStringArray(prompt.tags),
    audience: asString(prompt.audience) || 'builders and creators',
    visualStyle: asString(prompt.visualStyle) || 'Premium prompt workflow',
    previewImage:
      !previewImage || isPromptPlaceholderPreview(previewImage)
        ? fallbackPreview.src
        : previewImage,
    previewAlt: asString(prompt.previewAlt) || fallbackPreview.alt,
    featured: Boolean(prompt.featured),
    prompt: asString(prompt.prompt),
    variables: Array.isArray(prompt.variables) ? prompt.variables : [],
    bestFor: asStringArray(prompt.bestFor),
    workflow: asStringArray(prompt.workflow),
    tips: asStringArray(prompt.tips),
    examples: Array.isArray(prompt.examples) ? prompt.examples : [],
    relatedSlugs: asStringArray(prompt.relatedSlugs),
    updatedAt: asString(prompt.updatedAt) || new Date().toISOString().slice(0, 10),
  }
}

function buildRelatedSlugs(entry: PromptEntry, prompts: PromptEntry[]) {
  return prompts
    .filter(candidate => candidate.slug !== entry.slug)
    .map(candidate => {
      const sharedTags = candidate.tags.filter(tag => entry.tags.includes(tag)).length
      const sameCategory = candidate.category === entry.category ? 3 : 0
      const sameModel = candidate.models.some(model => entry.models.includes(model)) ? 1 : 0

      return {
        slug: candidate.slug,
        score: sharedTags + sameCategory + sameModel,
        title: candidate.title,
      }
    })
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 4)
    .map(candidate => candidate.slug)
}

function dedupePromptEntries(entries: PromptEntry[]) {
  const selected: PromptEntry[] = []
  const slugMap = new Map<string, number>()
  const titleMap = new Map<string, number>()
  const promptMap = new Map<string, number>()

  for (const entry of entries) {
    const slugKey = entry.slug.trim().toLowerCase()
    const titleKey = normalizeTopic(entry.title)
    const promptKey = normalizePromptBody(entry.prompt)
    const existingIndex = [slugMap.get(slugKey), titleMap.get(titleKey), promptMap.get(promptKey)].find(
      value => typeof value === 'number'
    )

    if (typeof existingIndex !== 'number') {
      const nextIndex = selected.push(entry) - 1
      if (slugKey) slugMap.set(slugKey, nextIndex)
      if (titleKey) titleMap.set(titleKey, nextIndex)
      if (promptKey) promptMap.set(promptKey, nextIndex)
      continue
    }

    const existing = selected[existingIndex]
    const shouldReplace =
      Number(Boolean(entry.featured)) > Number(Boolean(existing.featured)) ||
      entry.updatedAt > existing.updatedAt ||
      (entry.previewImage.startsWith('http') && !existing.previewImage.startsWith('http'))

    if (shouldReplace) {
      selected[existingIndex] = entry
      if (slugKey) slugMap.set(slugKey, existingIndex)
      if (titleKey) titleMap.set(titleKey, existingIndex)
      if (promptKey) promptMap.set(promptKey, existingIndex)
    }
  }

  return selected
}

function buildPromptLibraryState(entries: PromptEntry[]): PromptLibraryState {
  const normalized = sortPrompts(dedupePromptEntries(entries.map(normalizePromptEntry)))
  const prompts = normalized.map(entry => ({
    ...entry,
    relatedSlugs: buildRelatedSlugs(entry, normalized),
  }))
  const featuredPrompts = prompts.filter(entry => entry.featured)
  const categories = PROMPT_CATEGORIES.map(category => ({
    ...category,
    count: prompts.filter(prompt => prompt.category === category.id).length,
  }))

  return {
    prompts,
    featuredPrompts,
    categories,
    models: PROMPT_MODELS,
    stats: {
      totalPrompts: prompts.length,
      imagePrompts: prompts.filter(prompt => prompt.category.startsWith('image')).length,
      featuredPrompts: featuredPrompts.length,
    },
  }
}

function resetPromptCache() {
  promptLibraryCache = null
}

function assertWritableLocalPromptStore() {
  if (process.env.VERCEL) {
    throw new Error(
      'Prompt Hub is currently in local-only mode. This deployment is read-only, so prompt import/save works only in local development until a database is enabled again.'
    )
  }
}

export async function getPromptLibraryData(): Promise<PromptLibraryState> {
  if (promptLibraryCache && promptLibraryCache.expiresAt > Date.now()) {
    return promptLibraryCache.state
  }

  const entries = await getMergedLocalPromptEntries()
  const state = buildPromptLibraryState(entries)

  promptLibraryCache = {
    state,
    expiresAt: Date.now() + PROMPTS_MEMORY_CACHE_MS,
  }

  return state
}

export async function getPublishedPrompts() {
  return (await getPromptLibraryData()).prompts
}

export async function getAdminPrompts() {
  return (await getPromptLibraryData()).prompts
}

export async function getPromptBySlug(slug: string) {
  const prompts = await getPublishedPrompts()
  return prompts.find(prompt => prompt.slug === slug) || null
}

export async function getRelatedPrompts(slug: string, limit = 4) {
  const prompts = await getPublishedPrompts()
  const prompt = prompts.find(entry => entry.slug === slug)

  if (!prompt) return []

  return prompt.relatedSlugs
    .map(relatedSlug => prompts.find(entry => entry.slug === relatedSlug) || null)
    .filter((entry): entry is PromptEntry => Boolean(entry))
    .slice(0, limit)
}

export async function savePrompt(input: PromptEntry) {
  assertWritableLocalPromptStore()
  const prompt = normalizePromptEntry(input)
  await saveLocalPrompt(prompt)
  resetPromptCache()
  revalidateTag(PROMPTS_TAG)
  return true
}

export async function savePrompts(inputs: PromptEntry[]) {
  assertWritableLocalPromptStore()
  const prompts = inputs.map(normalizePromptEntry)
  await saveLocalPrompts(prompts)
  resetPromptCache()
  revalidateTag(PROMPTS_TAG)
  return { success: true, count: prompts.length }
}
