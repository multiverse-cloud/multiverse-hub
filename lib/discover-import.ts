import type { DiscoverFaq, DiscoverItem, DiscoverList, DiscoverStep } from '@/lib/discover-data'

type JsonRecord = Record<string, unknown>

type HintedEntry = {
  hintedType?: DiscoverList['type']
  value: unknown
}

export type DiscoverImportSummary = {
  received: number
  prepared: number
  skippedExisting: number
  skippedIncomingDuplicates: number
  invalid: number
  replaceExisting: boolean
  publishImported: boolean
}

export type DiscoverImportResult = {
  lists: DiscoverList[]
  summary: DiscoverImportSummary
}

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toStringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function toStringArray(value: unknown) {
  return Array.isArray(value)
    ? value
        .map(entry => (typeof entry === 'string' ? entry.trim() : ''))
        .filter(Boolean)
    : []
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeTopic(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function truncate(value: string, length: number) {
  return value.length <= length ? value : `${value.slice(0, length - 3).trimEnd()}...`
}

function lowerFirst(value: string) {
  return value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value
}

function inferScope(...parts: Array<string | string[] | undefined>) {
  const combined = parts
    .flatMap(part => (Array.isArray(part) ? part : part ? [part] : []))
    .join(' ')

  const scopePatterns = [
    { pattern: /\btamil\b/i, label: 'Tamil' },
    { pattern: /\bhindi\b/i, label: 'Hindi' },
    { pattern: /\bkorean\b/i, label: 'Korean' },
    { pattern: /\benglish\b/i, label: 'English-language' },
    { pattern: /\bindian\b/i, label: 'Indian' },
    { pattern: /\bglobal\b/i, label: 'Global' },
  ] as const

  const labels = scopePatterns.flatMap(({ pattern, label }) => (pattern.test(combined) ? [label] : []))
  const uniqueLabels = Array.from(new Set(labels))

  if (uniqueLabels.length === 0) return undefined
  if (uniqueLabels.length === 1) return uniqueLabels[0]
  return uniqueLabels.join(' + ')
}

function inferCategory(record: JsonRecord, type: DiscoverList['type']) {
  const explicit = toStringValue(record.category)
  if (explicit) return explicit

  const parts = [
    toStringValue(record.subcategory),
    toStringValue(record.title),
    ...toStringArray(record.tags),
  ].filter(Boolean)
  const haystack = parts.join(' ').toLowerCase()

  if (/\b(ai models?|llm|prompt engineering|model selection|reasoning model)\b/.test(haystack)) return 'AI Models'
  if (/\b(ai|retrieval augmented generation|rag|workflow automation)\b/.test(haystack)) return 'AI'
  if (/\b(youtube|channel growth|creator|content strategy)\b/.test(haystack)) return 'Creator Economy'
  if (/\b(video editing|editing workflow|editing app)\b/.test(haystack)) return 'Editing Apps'
  if (/\b(privacy|security|cyber|password|tracking protection)\b/.test(haystack)) return 'Cybersecurity'
  if (/\b(android|battery drain|slow phone|storage full|wifi|network issues|connectivity)\b/.test(haystack)) return 'Mobile Problems'
  if (/\b(smartphone|budget phones|iphone|android phone)\b/.test(haystack)) return 'Smartphones'
  if (/\b(laptop|notebook|student laptops?)\b/.test(haystack)) return 'Laptops'
  if (/\b(productivity apps?|note taking|collaboration tools)\b/.test(haystack)) return 'Apps'
  if (/\b(software selection|productivity software)\b/.test(haystack)) return 'Software'
  if (/\b(job search|resume|career|interview)\b/.test(haystack)) return 'Career'
  if (/\b(study skills|exam prep|student|learning)\b/.test(haystack)) return 'Education'
  if (/\b(freelancing|gig economy|online jobs|make money online|side hustle)\b/.test(haystack)) return 'Money & Online Income'
  if (/\b(startup|validation|product market fit)\b/.test(haystack)) return 'Startups'
  if (/\b(pricing strategy|business)\b/.test(haystack)) return 'Business'
  if (/\b(personal finance|budgeting|stock market|investing)\b/.test(haystack)) return 'Finance & Investing'
  if (/\b(sleep|health habits|workout|weight loss)\b/.test(haystack)) return 'Health'
  if (/\b(habit systems|focus techniques|time management|procrastination)\b/.test(haystack)) return 'Self Improvement'
  if (/\bproductivity\b/.test(haystack)) return 'Productivity'
  if (/\b(politics|political theory|election)\b/.test(haystack)) return 'Politics'
  if (/\b(geopolitics|international relations)\b/.test(haystack)) return 'Geopolitics'
  if (/\b(history|cultural history)\b/.test(haystack)) return 'History'
  if (/\b(space|astronomy|universe)\b/.test(haystack)) return 'Space'
  if (/\b(movie|cinema|film|actor|actress|director|series|song)\b/.test(haystack)) {
    return type === 'guide' ? 'Watch Guides' : 'Movies'
  }

  return type === 'guide' ? 'Productivity' : 'Tech'
}

function inferType(record: JsonRecord, hintedType?: DiscoverList['type']): DiscoverList['type'] {
  const explicitType = toStringValue(record.type)

  if (explicitType === 'ranking' || explicitType === 'guide') {
    return explicitType
  }

  if (hintedType) {
    return hintedType
  }

  if (Array.isArray(record.items) || Array.isArray(record.picks)) {
    return 'ranking'
  }

  return 'guide'
}

function normalizeFaq(value: unknown): DiscoverFaq[] {
  if (!Array.isArray(value)) return []

  return value.reduce<DiscoverFaq[]>((faq, entry) => {
    const record = isRecord(entry) ? entry : {}
    const question = toStringValue(record.question)
    const answer = toStringValue(record.answer)

    if (question || answer) {
      faq.push({ question, answer })
    }

    return faq
  }, [])
}

function normalizeItems(record: JsonRecord): DiscoverItem[] {
  const directItems = Array.isArray(record.items) ? record.items : []
  const seedPicks = Array.isArray(record.picks) ? record.picks : []
  const source = directItems.length > 0 ? directItems : seedPicks

  return source.reduce<DiscoverItem[]>((items, entry, index) => {
    const item = isRecord(entry) ? entry : {}
    const name = toStringValue(item.name)

    if (!name) {
      return items
    }

    const bestFor = toStringValue(item.bestFor)
    const summary =
      toStringValue(item.summary) ||
      (bestFor ? `${name} is especially useful for ${lowerFirst(bestFor)}.` : '')

    const badgeValue = toStringValue(item.badge)
    const badge: DiscoverItem['badge'] =
      badgeValue === 'internal' || badgeValue === 'external' || badgeValue === 'editorial'
        ? badgeValue
        : 'editorial'

    const ratingValue = typeof item.rating === 'number' ? item.rating : Number(item.rating)

    items.push({
      rank: index + 1,
      name,
      logo: toStringValue(item.logo),
      summary,
      bestFor,
      pricing: toStringValue(item.pricing) || 'Editorial pick',
      badge,
      url: toStringValue(item.url),
      tags: toStringArray(item.tags),
      rating: Number.isFinite(ratingValue) ? ratingValue : 4.5,
    })

    return items
  }, [])
}

function normalizeSteps(record: JsonRecord): DiscoverStep[] {
  if (!Array.isArray(record.steps)) return []

  return record.steps.reduce<DiscoverStep[]>((steps, entry, index) => {
    const step = isRecord(entry) ? entry : {}
    const title = toStringValue(step.title)
    const description = toStringValue(step.description) || toStringValue(step.focus)

    if (!title && !description) {
      return steps
    }

    steps.push({
      step: index + 1,
      title,
      description,
    })

    return steps
  }, [])
}

function buildFallbackDescription(title: string, type: DiscoverList['type'], angle: string) {
  if (type === 'ranking') {
    return angle
      ? `${title} with an editorial angle focused on ${lowerFirst(angle)}.`
      : `${title} with curated picks and practical selection guidance.`
  }

  return angle
    ? `${title} explained through a practical guide focused on ${lowerFirst(angle)}.`
    : `${title} broken into a practical, step-by-step guide.`
}

function normalizeEntry(
  entry: HintedEntry,
  index: number,
  publishImported: boolean
): DiscoverList | null {
  if (!isRecord(entry.value)) return null

  const record = entry.value
  const title = toStringValue(record.title)

  if (!title) return null

  const type = inferType(record, entry.hintedType)
  const items = type === 'ranking' ? normalizeItems(record) : []
  const steps = type === 'guide' ? normalizeSteps(record) : []

  if (type === 'ranking' && items.length === 0) return null
  if (type === 'guide' && steps.length === 0) return null

  const slug = slugify(toStringValue(record.slug) || title)
  if (!slug) return null

  const description = toStringValue(record.description)
  const angle = toStringValue(record.angle)
  const intro = toStringValue(record.intro) || description || buildFallbackDescription(title, type, angle)
  const finalDescription = description || buildFallbackDescription(title, type, angle)
  const methodology = toStringArray(record.methodology)
  const tags = toStringArray(record.tags)
  const relatedSlugs = toStringArray(record.relatedSlugs).map(slugify).filter(Boolean)
  const scope = toStringValue(record.scope) || inferScope(title, tags, toStringValue(record.subcategory))
  const published = typeof record.published === 'boolean' ? record.published : publishImported
  const featured = typeof record.featured === 'boolean' ? record.featured : false
  const updatedAt = toStringValue(record.updatedAt) || new Date().toISOString().slice(0, 10)
  const id = slugify(toStringValue(record.id) || slug || `import-${index + 1}`)

  return {
    id,
    slug,
    type,
    title,
    seoTitle: toStringValue(record.seoTitle) || title,
    metaDescription:
      toStringValue(record.metaDescription) || truncate(finalDescription || intro || title, 160),
    description: finalDescription,
    intro,
    category: inferCategory(record, type),
    subcategory: toStringValue(record.subcategory),
    angle,
    audience: toStringValue(record.audience),
    scope,
    icon: toStringValue(record.icon) || (type === 'guide' ? 'ListChecks' : 'Sparkles'),
    itemCount: type === 'guide' ? steps.length : items.length,
    updatedAt,
    featured,
    published,
    tags,
    methodology,
    items,
    steps,
    faq: normalizeFaq(record.faq),
    relatedSlugs,
  }
}

function collectEntries(payload: unknown): HintedEntry[] {
  if (Array.isArray(payload)) {
    return payload.map(value => ({ value }))
  }

  if (!isRecord(payload)) {
    return []
  }

  const entries: HintedEntry[] = []

  if (Array.isArray(payload.lists)) {
    entries.push(...payload.lists.map(value => ({ value })))
  }

  if (Array.isArray(payload.rankings)) {
    entries.push(...payload.rankings.map(value => ({ value, hintedType: 'ranking' as const })))
  }

  if (Array.isArray(payload.guides)) {
    entries.push(...payload.guides.map(value => ({ value, hintedType: 'guide' as const })))
  }

  if (entries.length > 0) {
    return entries
  }

  return [{ value: payload }]
}

export function parseDiscoverImportPayload(
  payload: unknown,
  existingLists: DiscoverList[],
  options?: {
    publishImported?: boolean
    replaceExisting?: boolean
  }
): DiscoverImportResult {
  const publishImported = Boolean(options?.publishImported)
  const replaceExisting = Boolean(options?.replaceExisting)
  const entries = collectEntries(payload)
  const existingTitleKeys = new Set(existingLists.map(list => normalizeTopic(list.title)).filter(Boolean))
  const existingSlugs = new Set(existingLists.map(list => list.slug).filter(Boolean))
  const incomingKeys = new Set<string>()

  let invalid = 0
  let skippedExisting = 0
  let skippedIncomingDuplicates = 0

  const lists: DiscoverList[] = []

  entries.forEach((entry, index) => {
    const normalized = normalizeEntry(entry, index, publishImported)

    if (!normalized) {
      invalid += 1
      return
    }

    const dedupeKey = normalized.slug || normalizeTopic(normalized.title)

    if (!replaceExisting && (existingSlugs.has(normalized.slug) || existingTitleKeys.has(normalizeTopic(normalized.title)))) {
      skippedExisting += 1
      return
    }

    if (incomingKeys.has(dedupeKey)) {
      skippedIncomingDuplicates += 1
      return
    }

    incomingKeys.add(dedupeKey)
    lists.push(normalized)
  })

  return {
    lists,
    summary: {
      received: entries.length,
      prepared: lists.length,
      skippedExisting,
      skippedIncomingDuplicates,
      invalid,
      replaceExisting,
      publishImported,
    },
  }
}
