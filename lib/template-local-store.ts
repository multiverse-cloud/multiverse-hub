import 'server-only'

import { mkdir, readFile, readdir, rm, writeFile } from 'fs/promises'
import path from 'path'
import { BASE_TEMPLATES, type TemplateEntry } from '@/lib/template-library-data'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_TEMPLATE_STORE_FILE = path.join(DATA_DIR, 'template-local-store.json')
const LOCAL_TEMPLATE_TITLE_REGISTRY_FILE = path.join(DATA_DIR, 'template-topic-titles.txt')
const LOCAL_TEMPLATE_DETAILS_DIR = path.join(DATA_DIR, 'template-details')

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

function createTemplateDetailPath(slug: string) {
  return path.join(LOCAL_TEMPLATE_DETAILS_DIR, `${slug}.json`)
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
  await mkdir(LOCAL_TEMPLATE_DETAILS_DIR, { recursive: true })
}

async function writeTitleRegistry(templates: TemplateEntry[]) {
  const lines = sortTemplates(templates).map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
  await writeFile(LOCAL_TEMPLATE_TITLE_REGISTRY_FILE, `${lines.join('\n')}\n`, 'utf8')
}

function stripTemplateForIndex(template: TemplateEntry): TemplateEntry {
  return {
    ...template,
    files: template.files.map(file => ({
      ...file,
      content: '',
    })),
    previewHtml: undefined,
  }
}

async function writeTemplateDetailFiles(templates: TemplateEntry[]) {
  await mkdir(LOCAL_TEMPLATE_DETAILS_DIR, { recursive: true })
  const nextSlugs = new Set(templates.map(template => template.slug))
  const currentEntries = await readdir(LOCAL_TEMPLATE_DETAILS_DIR, { withFileTypes: true }).catch(() => [])

  for (const entry of currentEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const slug = entry.name.replace(/\.json$/i, '')
    if (!nextSlugs.has(slug)) {
      await rm(path.join(LOCAL_TEMPLATE_DETAILS_DIR, entry.name), { force: true })
    }
  }

  for (const template of templates) {
    await writeFile(createTemplateDetailPath(template.slug), `${JSON.stringify(template, null, 2)}\n`, 'utf8')
  }
}

async function writeLocalStore(templates: TemplateEntry[], source: string) {
  await ensureDataDirectory()

  const sortedTemplates = sortTemplates(templates)
  await writeTemplateDetailFiles(sortedTemplates)
  const payload: TemplateLocalStoreFile = {
    templates: sortedTemplates.map(stripTemplateForIndex),
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

function hasEmbeddedTemplateContent(template: TemplateEntry) {
  return template.files.some(file => Boolean(file.content)) || Boolean(template.previewHtml?.trim())
}

async function readTemplateDetail(slug: string) {
  try {
    const raw = await readFile(createTemplateDetailPath(slug), 'utf8')
    return JSON.parse(stripUtf8Bom(raw)) as TemplateEntry
  } catch {
    return null
  }
}

async function loadLocalTemplateEntries(detail = false) {
  const entries = await readLocalStore()

  if (!detail) {
    return entries
  }

  return Promise.all(
    entries.map(async template => {
      if (hasEmbeddedTemplateContent(template)) {
        return template
      }

      const detailEntry = await readTemplateDetail(template.slug)
      return detailEntry || template
    })
  )
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
  return loadLocalTemplateEntries(false)
}

export async function loadLocalTemplateOverrideStoreWithDetails() {
  return loadLocalTemplateEntries(true)
}

export async function getMergedLocalTemplateEntries() {
  const overrides = await loadLocalTemplateOverrideStore()
  return resolveTemplateEntries(BASE_TEMPLATES, overrides)
}

export async function getMergedLocalTemplateEntriesWithDetails() {
  const overrides = await loadLocalTemplateOverrideStoreWithDetails()
  return resolveTemplateEntries(BASE_TEMPLATES, overrides)
}

export async function getLocalTemplateBySlugWithDetails(slug: string) {
  const overrides = await loadLocalTemplateOverrideStore()
  const match = overrides.find(template => template.slug === slug)

  if (!match) {
    return BASE_TEMPLATES.find(template => template.slug === slug) || null
  }

  if (hasEmbeddedTemplateContent(match)) {
    return match
  }

  return (await readTemplateDetail(slug)) || match
}

export async function saveLocalTemplate(template: TemplateEntry) {
  const currentOverrides = await loadLocalTemplateOverrideStoreWithDetails()
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
  const currentOverrides = await loadLocalTemplateOverrideStoreWithDetails()
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
    detailsDir: LOCAL_TEMPLATE_DETAILS_DIR,
  }
}
