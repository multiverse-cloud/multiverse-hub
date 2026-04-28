import type { TemplateEntry } from '@/lib/template-library-data'

export type TemplateImportSummary = {
  received: number
  prepared: number
  skippedExisting: number
  skippedIncomingDuplicates: number
  invalid: number
  imported?: number
}

type ParseOptions = {
  replaceExisting?: boolean
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function getMatchKey(value: Pick<TemplateEntry, 'slug' | 'title'>) {
  return value.slug || normalizeTopic(value.title)
}

function asTemplateArray(payload: unknown) {
  if (Array.isArray(payload)) return payload
  if (payload && typeof payload === 'object' && Array.isArray((payload as { templates?: unknown[] }).templates)) {
    return (payload as { templates: unknown[] }).templates
  }

  return []
}

function isValidTemplateEntry(value: unknown): value is TemplateEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Partial<TemplateEntry>
  const hasFiles = Array.isArray(entry.files)
  const hasLinkedAssets = Boolean(
    entry.previewImage ||
    entry.cloudinaryPublicId ||
    entry.liveUrl ||
    entry.githubUrl ||
    entry.downloadUrl
  )

  return typeof entry.title === 'string' && typeof entry.category === 'string' && (hasFiles || hasLinkedAssets)
}

export function parseTemplateImportPayload(
  payload: unknown,
  existingTemplates: TemplateEntry[],
  options: ParseOptions = {}
) {
  const incoming = asTemplateArray(payload)
  const existingKeys = new Set(existingTemplates.map(getMatchKey))
  const prepared: TemplateEntry[] = []
  const seenIncoming = new Set<string>()

  let skippedExisting = 0
  let skippedIncomingDuplicates = 0
  let invalid = 0

  for (const entry of incoming) {
    if (!isValidTemplateEntry(entry)) {
      invalid += 1
      continue
    }

    const key = getMatchKey(entry)
    if (seenIncoming.has(key)) {
      skippedIncomingDuplicates += 1
      continue
    }
    seenIncoming.add(key)

    if (!options.replaceExisting && existingKeys.has(key)) {
      skippedExisting += 1
      continue
    }

    prepared.push(entry)
  }

  const summary: TemplateImportSummary = {
    received: incoming.length,
    prepared: prepared.length,
    skippedExisting,
    skippedIncomingDuplicates,
    invalid,
  }

  return {
    templates: prepared,
    summary,
  }
}
