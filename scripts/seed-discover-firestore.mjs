import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

const root = process.cwd()
const dataDir = path.join(root, 'data')
const tempBuildDir = path.join(root, '.tmp', 'discover-build')
const registryPath = path.join(root, 'DISCOVER_DATA_IMPORT_TITLES.txt')
const auditPath = path.join(root, 'DISCOVER_FIRESTORE_SEED_AUDIT.txt')
const collectionName = 'discoverLists'
const updatedAt = new Date().toISOString().slice(0, 10)

function parseEnvFile(filePath) {
  const values = {}

  if (!fs.existsSync(filePath)) {
    return values
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1)

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    values[key] = value
  }

  return values
}

function loadEnv() {
  const envFromFile = parseEnvFile(path.join(root, '.env.local'))

  for (const [key, value] of Object.entries(envFromFile)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

function normalizeTopic(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function inferScope(...parts) {
  const combined = parts.flat().filter(Boolean).join(' ')
  const scopePatterns = [
    { pattern: /\btamil\b/i, label: 'Tamil' },
    { pattern: /\bhindi\b/i, label: 'Hindi' },
    { pattern: /\bkorean\b/i, label: 'Korean' },
    { pattern: /\benglish\b/i, label: 'English-language' },
    { pattern: /\bindian\b/i, label: 'Indian' },
    { pattern: /\bglobal\b/i, label: 'Global' },
  ]

  const labels = scopePatterns.flatMap(({ pattern, label }) => (pattern.test(combined) ? [label] : []))
  const unique = [...new Set(labels)]

  if (unique.length === 0) return undefined
  if (unique.length === 1) return unique[0]
  return unique.join(' + ')
}

function inferCategory(guide) {
  const parts = [guide.subcategory, guide.title, ...(guide.tags || [])].filter(Boolean)
  const haystack = parts.join(' ').toLowerCase()

  if (/\b(ai models?|llm|prompt engineering|model selection|model routing|reasoning model)\b/.test(haystack)) return 'AI Models'
  if (/\b(ai|retrieval augmented generation|rag|workflow automation)\b/.test(haystack)) return 'AI'
  if (/\b(youtube|channel growth|content strategy|creator)\b/.test(haystack)) return 'Creator Economy'
  if (/\b(video editing|editing workflow|editing app)\b/.test(haystack)) return 'Editing Apps'
  if (/\b(privacy|security|cyber|password|tracking protection)\b/.test(haystack)) return 'Cybersecurity'
  if (/\b(android|battery drain|slow phone|storage full|network issues|home networking|wifi|connectivity)\b/.test(haystack)) return 'Mobile Problems'
  if (/\b(smartphone buying|budget phones|student laptops?)\b/.test(haystack)) return 'Smartphones'
  if (/\b(laptop buying|laptops?)\b/.test(haystack)) return 'Laptops'
  if (/\b(productivity apps?|collaboration tools|note taking)\b/.test(haystack)) return 'Apps'
  if (/\b(software selection|productivity software)\b/.test(haystack)) return 'Software'
  if (/\b(job search|resume|resumes|career)\b/.test(haystack)) return 'Career'
  if (/\b(study skills|exam prep|research methods|student)\b/.test(haystack)) return 'Education'
  if (/\b(freelancing|gig economy|client acquisition|online jobs|make money online)\b/.test(haystack)) return 'Money & Online Income'
  if (/\b(startup|validation|product market fit)\b/.test(haystack)) return 'Startups'
  if (/\b(pricing strategy|business)\b/.test(haystack)) return 'Business'
  if (/\b(personal finance|budgeting|stock market|investing)\b/.test(haystack)) return 'Finance & Investing'
  if (/\b(sleep|health habits)\b/.test(haystack)) return 'Health'
  if (/\b(habit systems|focus techniques|time management)\b/.test(haystack)) return 'Self Improvement'
  if (/\bproductivity\b/.test(haystack)) return 'Productivity'
  if (/\b(politics|political theory)\b/.test(haystack)) return 'Politics'
  if (/\b(geopolitics|international relations)\b/.test(haystack)) return 'Geopolitics'
  if (/\b(history|cultural history)\b/.test(haystack)) return 'History'
  if (/\b(space|astronomy)\b/.test(haystack)) return 'Space'

  return 'Tech'
}

function sanitizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function ensureCompiledDiscoverData() {
  fs.mkdirSync(tempBuildDir, { recursive: true })
  execFileSync(
    'cmd',
    [
      '/c',
      'npx tsc lib\\discover-data.ts lib\\discover-high-traffic-seeds.ts --module NodeNext --moduleResolution NodeNext --target ES2022 --outDir .tmp\\discover-build --skipLibCheck',
    ],
    { cwd: root, stdio: 'pipe' }
  )
}

async function loadDiscoverLists() {
  ensureCompiledDiscoverData()
  const moduleUrl = `${pathToFileURL(path.join(tempBuildDir, 'discover-data.js')).href}?t=${Date.now()}`
  const mod = await import(moduleUrl)
  return Array.isArray(mod.DISCOVER_LISTS) ? mod.DISCOVER_LISTS : []
}

function loadImportGuides() {
  const files = fs.existsSync(dataDir)
    ? fs.readdirSync(dataDir).filter(file => file.endsWith('.json')).sort((left, right) => left.localeCompare(right))
    : []

  const rows = []

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dataDir, file), 'utf8')
    const json = JSON.parse(raw)
    const guides = Array.isArray(json) ? json : json?.guides || []

    for (const guide of guides) {
      rows.push({ file, guide })
    }
  }

  return rows
}

function toGuideList(guide, sourceFile) {
  const title = sanitizeText(guide.title)
  const slug = slugify(title)
  const tags = Array.isArray(guide.tags) ? guide.tags.map(sanitizeText).filter(Boolean) : []
  const steps = Array.isArray(guide.steps)
    ? guide.steps.slice(0, 5).map((step, index) => ({
        step: index + 1,
        title: sanitizeText(step?.title),
        description: sanitizeText(step?.focus),
      }))
    : []
  const faq = Array.isArray(guide.faq)
    ? guide.faq.map(entry => ({
        question: sanitizeText(entry?.question),
        answer: sanitizeText(entry?.answer),
      }))
    : []
  const methodology = Array.isArray(guide.methodology)
    ? guide.methodology.map(sanitizeText).filter(Boolean)
    : []

  return {
    id: slug,
    slug,
    type: 'guide',
    title,
    seoTitle: sanitizeText(guide.seoTitle) || title,
    metaDescription: sanitizeText(guide.metaDescription) || sanitizeText(guide.description),
    description: sanitizeText(guide.description),
    intro: sanitizeText(guide.intro),
    category: inferCategory(guide),
    subcategory: sanitizeText(guide.subcategory),
    angle: sanitizeText(guide.angle),
    audience: sanitizeText(guide.audience),
    scope: inferScope(title, tags, guide.subcategory),
    icon: sanitizeText(guide.icon) || 'BookOpen',
    itemCount: steps.length,
    updatedAt,
    featured: Boolean(guide.featured),
    published: true,
    tags,
    methodology,
    items: [],
    steps,
    faq,
    relatedSlugs: [],
    importSource: sourceFile,
  }
}

function writeImportTitleRegistry(uniqueImportRows, duplicateGroups, existingOverlapGroups) {
  const lines = [
    'DISCOVER DATA IMPORT TITLE REGISTRY',
    `Generated: ${new Date().toISOString()}`,
    '',
    'Purpose:',
    '- Use this file as an ignore list before adding more Discover guides from data/.',
    '- Titles below are deduplicated by normalized form.',
    '',
    `Unique import titles: ${uniqueImportRows.length}`,
    `Duplicate groups inside data/: ${duplicateGroups.length}`,
    `Overlaps with existing live Discover titles: ${existingOverlapGroups.length}`,
    '',
    'Format:',
    'normalized key | title | source file',
    '',
  ]

  for (const row of uniqueImportRows) {
    lines.push(`${row.normalized} | ${row.guide.title} | ${row.file}`)
  }

  if (duplicateGroups.length > 0) {
    lines.push('', 'Duplicate groups inside data/:')
    for (const group of duplicateGroups) {
      lines.push(`- ${group.normalized} | ${group.title} | ${group.files.join(', ')}`)
    }
  }

  if (existingOverlapGroups.length > 0) {
    lines.push('', 'Existing live Discover overlaps skipped:')
    for (const group of existingOverlapGroups) {
      lines.push(`- ${group.normalized} | ${group.title}`)
    }
  }

  fs.writeFileSync(registryPath, lines.join('\n'), 'utf8')
}

function writeAudit(summary) {
  const lines = [
    'DISCOVER FIRESTORE SEED AUDIT',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Local Discover lists loaded: ${summary.localCount}`,
    `Data folder raw guides: ${summary.rawImportCount}`,
    `Unique import guides kept: ${summary.uniqueImportCount}`,
    `Duplicate groups inside data/: ${summary.duplicateGroups.length}`,
    `Overlaps skipped against live Discover: ${summary.existingOverlapGroups.length}`,
    `Total documents written this run: ${summary.totalWritten}`,
    `Firestore collection count after seed: ${summary.firestoreCount}`,
    '',
    'Data files included:',
    ...summary.dataFiles.map(file => `- ${file}`),
    '',
    'Duplicate groups inside data/:',
    ...(summary.duplicateGroups.length > 0
      ? summary.duplicateGroups.map(group => `- ${group.normalized} | ${group.title} | ${group.files.join(', ')}`)
      : ['- none']),
    '',
    'Live Discover overlaps skipped:',
    ...(summary.existingOverlapGroups.length > 0
      ? summary.existingOverlapGroups.map(group => `- ${group.normalized} | ${group.title}`)
      : ['- none']),
  ]

  fs.writeFileSync(auditPath, lines.join('\n'), 'utf8')
}

function chunk(array, size) {
  const result = []
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size))
  }
  return result
}

function getDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || undefined

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin env vars are missing. Expected FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.')
  }

  const app = getApps()[0] || initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  })

  const db = getFirestore(app)
  db.settings({ ignoreUndefinedProperties: true })
  return db
}

function buildImportSets(localLists, rawImportRows) {
  const existingNormalized = new Set(localLists.map(list => normalizeTopic(list.title)).filter(Boolean))
  const existingSlugs = new Set(localLists.map(list => list.slug).filter(Boolean))
  const seenImportNormalized = new Map()
  const duplicateGroups = []
  const existingOverlapGroups = []
  const uniqueImportRows = []

  for (const row of rawImportRows) {
    const normalized = normalizeTopic(row.guide.title)
    const title = sanitizeText(row.guide.title)
    const slug = slugify(title)

    if (!normalized || !slug) {
      continue
    }

    if (existingNormalized.has(normalized) || existingSlugs.has(slug)) {
      existingOverlapGroups.push({ normalized, title })
      continue
    }

    if (seenImportNormalized.has(normalized)) {
      const first = seenImportNormalized.get(normalized)
      const existingGroup = duplicateGroups.find(group => group.normalized === normalized)
      if (existingGroup) {
        if (!existingGroup.files.includes(row.file)) existingGroup.files.push(row.file)
      } else {
        duplicateGroups.push({ normalized, title, files: [first.file, row.file] })
      }
      continue
    }

    const enriched = { ...row, normalized }
    seenImportNormalized.set(normalized, enriched)
    uniqueImportRows.push(enriched)
  }

  uniqueImportRows.sort((left, right) => left.guide.title.localeCompare(right.guide.title))
  duplicateGroups.sort((left, right) => left.normalized.localeCompare(right.normalized))
  existingOverlapGroups.sort((left, right) => left.normalized.localeCompare(right.normalized))

  return { uniqueImportRows, duplicateGroups, existingOverlapGroups }
}

async function seed() {
  loadEnv()

  const localLists = await loadDiscoverLists()
  const rawImportRows = loadImportGuides()
  const dataFiles = fs.existsSync(dataDir)
    ? fs.readdirSync(dataDir).filter(file => file.endsWith('.json')).sort((left, right) => left.localeCompare(right))
    : []
  const { uniqueImportRows, duplicateGroups, existingOverlapGroups } = buildImportSets(localLists, rawImportRows)
  const importLists = uniqueImportRows.map(row => toGuideList(row.guide, row.file))

  writeImportTitleRegistry(uniqueImportRows, duplicateGroups, existingOverlapGroups)

  const db = getDb()
  const documents = [...localLists, ...importLists]

  for (const group of chunk(documents, 400)) {
    const batch = db.batch()
    for (const doc of group) {
      const docId = doc.id || doc.slug
      batch.set(
        db.collection(collectionName).doc(docId),
        {
          ...doc,
          updatedAtServer: FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
    }
    await batch.commit()
  }

  const snapshot = await db.collection(collectionName).get()
  const summary = {
    localCount: localLists.length,
    rawImportCount: rawImportRows.length,
    uniqueImportCount: importLists.length,
    duplicateGroups,
    existingOverlapGroups,
    totalWritten: documents.length,
    firestoreCount: snapshot.size,
    dataFiles,
  }

  writeAudit(summary)

  console.log(JSON.stringify(summary, null, 2))
}

seed().catch(error => {
  console.error(error && (error.stack || error.message || String(error)))
  process.exit(1)
})
