import 'server-only'

import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { BASE_TEMPLATES, type TemplateEntry } from '@/lib/template-library-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_TEMPLATE_STORE_FILE = path.join(DATA_DIR, 'template-local-store.json')
const LOCAL_TEMPLATE_TITLE_REGISTRY_FILE = path.join(DATA_DIR, 'template-topic-titles.txt')

type TemplateLocalStoreFile = {
  templates: TemplateEntry[]
  meta?: {
    source: string
    generatedAt: string
    count: number
  }
}

function stripUtf8Bom(value: string) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getTemplateMatchKey(template: TemplateEntry) {
  return template.slug || normalizeTopic(template.title)
}

function sortTemplates(templates: TemplateEntry[]) {
  return [...templates].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return left.title.localeCompare(right.title)
  })
}

async function ensureDataDirectory() {
  await mkdir(DATA_DIR, { recursive: true })
}

async function writeTitleRegistry(templates: TemplateEntry[]) {
  const lines = sortTemplates(templates).map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
  await writeFile(LOCAL_TEMPLATE_TITLE_REGISTRY_FILE, `${lines.join('\n')}\n`, 'utf8')
}

async function writeLocalStore(templates: TemplateEntry[], source: string) {
  await ensureDataDirectory()

  const sortedTemplates = sortTemplates(templates)
  const payload: TemplateLocalStoreFile = {
    templates: sortedTemplates,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
      count: sortedTemplates.length,
    },
  }

  await writeFile(LOCAL_TEMPLATE_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  await writeTitleRegistry(sortedTemplates)

  return sortedTemplates
}

async function readLocalStore() {
  try {
    const raw = await readFile(LOCAL_TEMPLATE_STORE_FILE, 'utf8')
    const parsed = JSON.parse(stripUtf8Bom(raw)) as Partial<TemplateLocalStoreFile>
    return Array.isArray(parsed.templates) ? (parsed.templates as TemplateEntry[]) : []
  } catch {
    return []
  }
}

function resolveTemplateEntries(baseTemplates: TemplateEntry[], overrideTemplates: TemplateEntry[]) {
  // Once local templates exist, treat them as the full catalog so admin-curated
  // entries can completely replace the built-in starter set.
  if (overrideTemplates.length > 0) {
    return sortTemplates(overrideTemplates)
  }

  return sortTemplates(baseTemplates)
}

export async function loadLocalTemplateOverrideStore() {
  return readLocalStore()
}

export async function getMergedLocalTemplateEntries() {
  const overrides = await loadLocalTemplateOverrideStore()
  return resolveTemplateEntries(BASE_TEMPLATES, overrides)
}

export async function saveLocalTemplate(template: TemplateEntry) {
  const currentOverrides = await loadLocalTemplateOverrideStore()
  const nextOverrides = currentOverrides.filter(existing => {
    const sameSlug = existing.slug === template.slug
    const sameId = existing.id === template.id
    const sameTitle = normalizeTopic(existing.title) === normalizeTopic(template.title)
    return !(sameSlug || sameId || sameTitle)
  })

  nextOverrides.push(template)
  await writeLocalStore(nextOverrides, 'admin-save')
  return true
}

export async function saveLocalTemplates(templates: TemplateEntry[]) {
  const currentOverrides = await loadLocalTemplateOverrideStore()
  const incomingKeys = new Set(templates.map(getTemplateMatchKey))
  const nextOverrides = currentOverrides.filter(existing => !incomingKeys.has(getTemplateMatchKey(existing)))

  nextOverrides.push(...templates)
  await writeLocalStore(nextOverrides, 'admin-bulk-save')

  return {
    success: true,
    count: templates.length,
  }
}

export function getLocalTemplateStorePaths() {
  return {
    storeFile: LOCAL_TEMPLATE_STORE_FILE,
    titleRegistryFile: LOCAL_TEMPLATE_TITLE_REGISTRY_FILE,
  }
}
