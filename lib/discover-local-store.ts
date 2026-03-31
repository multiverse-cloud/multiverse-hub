import 'server-only'

import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { DISCOVER_LISTS, type DiscoverList } from '@/lib/discover-data'
import { parseDiscoverImportPayload } from '@/lib/discover-import'

const DATA_DIR = path.join(process.cwd(), 'data')
const LOCAL_DISCOVER_STORE_FILE = path.join(DATA_DIR, 'discover-local-store.json')
const LOCAL_DISCOVER_TITLE_REGISTRY_FILE = path.join(DATA_DIR, 'discover-topic-titles.txt')

type DiscoverLocalStoreFile = {
  lists: DiscoverList[]
  meta?: {
    source: string
    generatedAt: string
    count: number
    sourceFiles?: string[]
  }
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function sortDiscoverLists(lists: DiscoverList[]) {
  return [...lists].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return right.updatedAt.localeCompare(left.updatedAt)
  })
}

function getListMatchKey(list: DiscoverList) {
  return list.slug || normalizeTopic(list.title)
}

async function ensureDataDirectory() {
  await mkdir(DATA_DIR, { recursive: true })
}

async function writeTitleRegistry(lists: DiscoverList[]) {
  const lines = sortDiscoverLists(lists).map(
    list => `${normalizeTopic(list.title)} | ${list.title} | ${list.slug}`
  )

  await writeFile(LOCAL_DISCOVER_TITLE_REGISTRY_FILE, `${lines.join('\n')}\n`, 'utf8')
}

async function writeLocalStore(lists: DiscoverList[], source: string, sourceFiles?: string[]) {
  await ensureDataDirectory()

  const sortedLists = sortDiscoverLists(lists)
  const payload: DiscoverLocalStoreFile = {
    lists: sortedLists,
    meta: {
      source,
      generatedAt: new Date().toISOString(),
      count: sortedLists.length,
      sourceFiles,
    },
  }

  await writeFile(LOCAL_DISCOVER_STORE_FILE, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  await writeTitleRegistry(sortedLists)

  return sortedLists
}

async function readLocalStore() {
  try {
    const raw = await readFile(LOCAL_DISCOVER_STORE_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<DiscoverLocalStoreFile>

    return Array.isArray(parsed.lists) ? (parsed.lists as DiscoverList[]) : null
  } catch {
    return null
  }
}

function mergeDiscoverLists(baseLists: DiscoverList[], overrideLists: DiscoverList[]) {
  const byKey = new Map<string, DiscoverList>()

  for (const list of baseLists) {
    byKey.set(getListMatchKey(list), list)
  }

  for (const list of overrideLists) {
    byKey.set(getListMatchKey(list), list)
  }

  return sortDiscoverLists(Array.from(byKey.values()))
}

async function buildOverridesFromDataFiles() {
  await ensureDataDirectory()

  const files = (await readdir(DATA_DIR))
    .filter(name => name.endsWith('.json') && name !== path.basename(LOCAL_DISCOVER_STORE_FILE))
    .sort((left, right) => left.localeCompare(right))

  const existing = [...DISCOVER_LISTS]
  const importedLists: DiscoverList[] = []

  for (const fileName of files) {
    const filePath = path.join(DATA_DIR, fileName)

    try {
      const raw = await readFile(filePath, 'utf8')
      const payload = JSON.parse(raw)
      const parsed = parseDiscoverImportPayload(payload, [...existing, ...importedLists], {
        publishImported: true,
        replaceExisting: false,
      })

      importedLists.push(...parsed.lists)
    } catch (error) {
      console.warn(`Skipping discover data file ${fileName}:`, error)
    }
  }

  await writeLocalStore(importedLists, 'data-folder-dedupe-build', files)
  return importedLists
}

export async function loadLocalDiscoverOverrideStore() {
  const existingLists = await readLocalStore()

  if (existingLists) {
    return existingLists
  }

  return []
}

export async function getMergedLocalDiscoverLists() {
  const overrideLists = await loadLocalDiscoverOverrideStore()
  return mergeDiscoverLists(DISCOVER_LISTS, overrideLists)
}

export async function saveLocalDiscoverList(list: DiscoverList) {
  const currentOverrides = await loadLocalDiscoverOverrideStore()
  const nextOverrides = currentOverrides.filter(existing => {
    const sameSlug = existing.slug === list.slug
    const sameId = existing.id === list.id
    const sameTitle = normalizeTopic(existing.title) === normalizeTopic(list.title)
    return !(sameSlug || sameId || sameTitle)
  })

  nextOverrides.push(list)
  await writeLocalStore(nextOverrides, 'admin-save')
  return true
}

export async function saveLocalDiscoverLists(lists: DiscoverList[]) {
  const currentOverrides = await loadLocalDiscoverOverrideStore()
  const incomingKeys = new Set(lists.map(getListMatchKey))
  const nextOverrides = currentOverrides.filter(existing => !incomingKeys.has(getListMatchKey(existing)))

  nextOverrides.push(...lists)
  await writeLocalStore(nextOverrides, 'admin-bulk-save')

  return {
    success: true,
    count: lists.length,
  }
}

export async function seedLocalDiscoverStoreFromDataFiles() {
  const lists = await buildOverridesFromDataFiles()

  return {
    success: true,
    count: lists.length,
  }
}

export function getLocalDiscoverStorePaths() {
  return {
    storeFile: LOCAL_DISCOVER_STORE_FILE,
    titleRegistryFile: LOCAL_DISCOVER_TITLE_REGISTRY_FILE,
  }
}
