import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const SOURCE_FILES = [
  {
    key: 'discover-data',
    file: 'lib/discover-data.ts',
    kind: 'text',
    extract(text) {
      const baseSection = sliceBetween(text, 'const BASE_DISCOVER_LISTS: DiscoverList[] = [', 'const GENERATED_DISCOVER_LISTS:')
      return matchIndentedTitles(baseSection, 4)
    },
  },
  {
    key: 'discover-high-traffic-seeds',
    file: 'lib/discover-high-traffic-seeds.ts',
    kind: 'text',
    extract(text) {
      const rankingSection = sliceBetween(
        text,
        'export const HIGH_TRAFFIC_DISCOVER_RANKING_SEEDS: DiscoverRankingSeed[] = [',
        'export const HIGH_TRAFFIC_DISCOVER_GUIDE_SEEDS: DiscoverGuideSeed[] = ['
      )
      const guideSection = sliceAfter(text, 'export const HIGH_TRAFFIC_DISCOVER_GUIDE_SEEDS: DiscoverGuideSeed[] = [')

      return [...matchIndentedTitles(rankingSection, 4), ...matchIndentedTitles(guideSection, 4)]
    },
  },
  {
    key: 'discover-topic-taxonomy',
    file: 'lib/discover-topic-taxonomy.ts',
    kind: 'text',
    extract(text) {
      return extractQuotedItemsFromNamedArrays(text, 'examplePageIdeas')
    },
  },
  {
    key: 'discover-search-intents',
    file: 'lib/discover-search-intents.ts',
    kind: 'text',
    extract(text) {
      return extractQuotedItemsFromNamedArrays(text, 'ideas')
    },
  },
  ...getDataJsonSources(),
]

function getDataJsonSources() {
  const dataDir = path.join(root, 'data')

  if (!fs.existsSync(dataDir)) {
    return []
  }

  return fs
    .readdirSync(dataDir)
    .filter(file => file.endsWith('.json'))
    .sort((left, right) => left.localeCompare(right))
    .map(file => ({
      key: `data-${file.replace(/\.json$/i, '')}`,
      file: path.posix.join('data', file),
      kind: 'json',
      extractJson(json) {
        return extractGuideTitlesFromJson(json)
      },
    }))
}

function sliceBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker)
  const end = text.indexOf(endMarker)
  if (start === -1 || end === -1 || end <= start) return ''
  return text.slice(start, end)
}

function sliceAfter(text, startMarker) {
  const start = text.indexOf(startMarker)
  if (start === -1) return ''
  return text.slice(start)
}

function matchIndentedTitles(text, spaces) {
  const pattern = new RegExp(`^ {${spaces}}title:\\s*'([^']+)'`, 'gm')
  return [...text.matchAll(pattern)].map(match => match[1].trim())
}

function extractQuotedItemsFromNamedArrays(text, propertyName) {
  const pattern = new RegExp(`${propertyName}:\\s*\\[([\\s\\S]*?)\\]`, 'g')
  const values = []

  for (const match of text.matchAll(pattern)) {
    for (const item of match[1].matchAll(/'([^']+)'/g)) {
      values.push(item[1].trim())
    }
  }

  return values
}

function extractGuideTitlesFromJson(json) {
  const guides = Array.isArray(json) ? json : json?.guides || []
  return guides
    .map(guide => (typeof guide?.title === 'string' ? guide.title.trim() : ''))
    .filter(Boolean)
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function collectTopicRows() {
  const rows = []

  for (const source of SOURCE_FILES) {
    const fullPath = path.join(root, source.file)
    const raw = fs.readFileSync(fullPath, 'utf8')
    const values = source.kind === 'json' ? source.extractJson(JSON.parse(raw)) : source.extract(raw)

    for (const value of values) {
      rows.push({
        source: source.key,
        file: source.file,
        title: value,
        normalized: normalizeTopic(value),
      })
    }
  }

  return rows.filter(row => row.normalized.length > 0)
}

function buildGroups(rows) {
  const groups = new Map()

  for (const row of rows) {
    const current = groups.get(row.normalized) || {
      normalized: row.normalized,
      canonical: row.title,
      titles: new Set(),
      sources: new Set(),
      count: 0,
    }

    current.count += 1
    current.titles.add(row.title)
    current.sources.add(row.source)
    groups.set(row.normalized, current)
  }

  return [...groups.values()].sort((left, right) => left.normalized.localeCompare(right.normalized))
}

function buildRegistry(groups) {
  const lines = [
    'DISCOVER TOPIC TITLE REGISTRY',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Purpose:',
    '- Use this file before adding new Discover topics.',
    '- Search by normalized key or by title to avoid duplicate topics across source files.',
    '- Data folder JSON imports are included in this registry.',
    '',
    `Unique normalized topics: ${groups.length}`,
    '',
    'Format:',
    'normalized key | canonical title | sources',
    '',
  ]

  for (const group of groups) {
    lines.push(
      `${group.normalized} | ${group.canonical} | ${[...group.sources].sort().join(', ')}`
    )
  }

  return lines.join('\n')
}

function buildDuplicateAudit(rows, groups) {
  const duplicates = groups.filter(group => group.count > 1)
  const titleCountBySource = new Map()

  for (const row of rows) {
    titleCountBySource.set(row.source, (titleCountBySource.get(row.source) || 0) + 1)
  }

  const lines = [
    'DISCOVER SOURCE DUPLICATE AUDIT',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Audited files:',
    ...SOURCE_FILES.map(source => `- ${source.file}`),
    '',
    'Counts by source:',
    ...[...titleCountBySource.entries()]
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([source, count]) => `- ${source}: ${count}`),
    '',
    `Total extracted topic titles/ideas: ${rows.length}`,
    `Unique normalized topics: ${groups.length}`,
    `Duplicate normalized groups: ${duplicates.length}`,
    '',
    'Notes:',
    '- Live Discover page data already has duplicate slug protection in lib/discover-data.ts.',
    '- Most duplicates below are expected overlap between planning/reference files and live seed files.',
    '- Data folder JSON guides are included so new imports can avoid title collisions.',
    '- Use the registry file as the ignore list when adding future topics.',
    '',
  ]

  if (duplicates.length === 0) {
    lines.push('No duplicate normalized groups found.')
  } else {
    lines.push('Duplicate groups:')

    for (const group of duplicates) {
      lines.push('')
      lines.push(`- normalized: ${group.normalized}`)
      lines.push(`  canonical: ${group.canonical}`)
      lines.push(`  count: ${group.count}`)
      lines.push(`  titles: ${[...group.titles].sort().join(' | ')}`)
      lines.push(`  sources: ${[...group.sources].sort().join(', ')}`)
    }
  }

  return lines.join('\n')
}

function main() {
  const rows = collectTopicRows()
  const groups = buildGroups(rows)

  const registryPath = path.join(root, 'DISCOVER_TOPIC_TITLE_REGISTRY.txt')
  const auditPath = path.join(root, 'DISCOVER_SOURCE_DUPLICATE_AUDIT.txt')

  fs.writeFileSync(registryPath, buildRegistry(groups), 'utf8')
  fs.writeFileSync(auditPath, buildDuplicateAudit(rows, groups), 'utf8')

  console.log(
    JSON.stringify(
      {
        registryPath,
        auditPath,
        extractedRows: rows.length,
        uniqueNormalizedTopics: groups.length,
        duplicateGroups: groups.filter(group => group.count > 1).length,
      },
      null,
      2
    )
  )
}

main()
