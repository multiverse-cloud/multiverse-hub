import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const DETAILS_DIR = path.join(ROOT, 'data', 'template-details')
const TITLE_REGISTRY_PATH = path.join(ROOT, 'data', 'template-topic-titles.txt')
const REMOVE_SLUGS = new Set(['auren-premium-saas-commerce-kit', 'nexusshop-platform-ui-kit'])

function stripBom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function normalizeTopic(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function sortTemplates(templates) {
  return [...templates].sort((left, right) => {
    if (Boolean(left.featured) !== Boolean(right.featured)) {
      return left.featured ? -1 : 1
    }

    return String(left.title).localeCompare(String(right.title))
  })
}

function toIndexTemplate(template) {
  return {
    ...template,
    files: Array.isArray(template.files)
      ? template.files.map(file => ({
          ...file,
          content: '',
        }))
      : [],
    previewHtml: undefined,
  }
}

async function cleanDetailsDir(validSlugs) {
  await mkdir(DETAILS_DIR, { recursive: true })
  const entries = await readdir(DETAILS_DIR, { withFileTypes: true }).catch(() => [])

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const slug = entry.name.replace(/\.json$/i, '')
    if (!validSlugs.has(slug)) {
      await rm(path.join(DETAILS_DIR, entry.name), { force: true })
    }
  }
}

async function main() {
  const raw = await readFile(STORE_PATH, 'utf8')
  const parsed = JSON.parse(stripBom(raw))
  const templates = sortTemplates(
    (Array.isArray(parsed.templates) ? parsed.templates : []).filter(template => !REMOVE_SLUGS.has(template.slug))
  )
  const validSlugs = new Set(templates.map(template => template.slug))

  await cleanDetailsDir(validSlugs)

  for (const template of templates) {
    await writeFile(
      path.join(DETAILS_DIR, `${template.slug}.json`),
      `${JSON.stringify(template, null, 2)}\n`,
      'utf8'
    )
  }

  await writeFile(
    STORE_PATH,
    `${JSON.stringify(
      {
        templates: templates.map(toIndexTemplate),
        meta: {
          source: 'split-store-migration',
          generatedAt: new Date().toISOString(),
          count: templates.length,
        },
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  const titleRegistry = templates
    .map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
    .join('\n')

  await writeFile(TITLE_REGISTRY_PATH, `${titleRegistry}\n`, 'utf8')

  console.log(
    JSON.stringify(
      {
        migrated: templates.length,
        removed: [...REMOVE_SLUGS],
      },
      null,
      2
    )
  )
}

await main()
