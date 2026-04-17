import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCE_ROOT = path.join(ROOT, 'website-template-hub-main')
const COMPONENTS_JSON = path.join(SOURCE_ROOT, 'data', 'components.json')
const TEMPLATES_JSON = path.join(SOURCE_ROOT, 'data', 'templates.json')
const TEMPLATE_STORE_JSON = path.join(ROOT, 'data', 'template-local-store.json')
const TEMPLATE_TITLES = path.join(ROOT, 'data', 'template-topic-titles.txt')
const UI_STORE_JSON = path.join(ROOT, 'data', 'ui-imported-store.json')

const UPDATED_AT = '2026-04-17'

const UI_CATEGORY_MAP = {
  badges: 'notification',
  buttons: 'button',
  cards: 'card',
  data: 'data',
  footers: 'footer',
  forms: 'form',
  heroes: 'hero',
  modals: 'modal',
  navbars: 'navbar',
  statistics: 'stats',
  ui: 'layout',
}

const TEMPLATE_CATEGORY_MAP = {
  'Digital Agency': 'agency',
  Crypto: 'crypto',
  'E-commerce': 'ecommerce',
  Education: 'education',
  Fitness: 'fitness',
  Healthcare: 'healthcare',
  'Real Estate': 'real-estate',
  Restaurant: 'restaurant',
  SaaS: 'saas',
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function cleanSummary(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function stripUtf8Bom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

function rewriteSourceAssetPaths(html) {
  return html
    .replace(/\.\.\/assets\//g, '/website-template-hub-assets/')
    .replace(/(["'(])assets\//g, '$1/website-template-hub-assets/')
    .replace(/<script[^>]*loader\.js[^>]*><\/script>/gi, '')
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i)
  return match ? cleanSummary(match[1]) : ''
}

function extractMetaDescription(html) {
  const match = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i)
  return match ? cleanSummary(match[1]) : ''
}

function extractStyleBlocks(html) {
  const matches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
  return matches.map(match => match[1].trim()).filter(Boolean).join('\n\n')
}

function extractBodyContent(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return (match ? match[1] : html).trim()
}

function mapComponentCategory(category) {
  return UI_CATEGORY_MAP[category] || 'layout'
}

function mapTemplateCategory(industry) {
  return TEMPLATE_CATEGORY_MAP[industry] || 'landing'
}

function mapFramework(tech = []) {
  const normalized = tech.map(entry => String(entry).toLowerCase())
  if (normalized.includes('tailwind')) return 'html-tailwind'
  return 'html-css-js'
}

function buildComponentTags(item) {
  return [
    item.category,
    'website template hub',
    'html',
    'live preview',
  ]
}

function buildTemplateTags(template) {
  return [
    template.industry.toLowerCase(),
    template.category.toLowerCase(),
    'website template hub',
    'html template',
    ...template.tech.map(entry => String(entry).toLowerCase()),
  ]
}

function buildUiDescription(item, html) {
  return (
    extractMetaDescription(html) ||
    `${item.name} imported from Website Template Hub with a ready live preview and clean HTML source.`
  )
}

function buildTemplateSummary(template, html) {
  return (
    extractMetaDescription(html) ||
    `${template.name} is a ${template.industry.toLowerCase()} template with a polished one-page layout and production-ready sections.`
  )
}

async function readJson(filePath) {
  const raw = await readFile(filePath, 'utf8')
  return JSON.parse(stripUtf8Bom(raw))
}

async function readHtml(relativePath) {
  const filePath = path.join(SOURCE_ROOT, relativePath)
  const raw = await readFile(filePath, 'utf8')
  return rewriteSourceAssetPaths(raw)
}

async function readCurrentTemplateStore() {
  const existing = await readJson(TEMPLATE_STORE_JSON)
  return Array.isArray(existing.templates) ? existing.templates : []
}

async function writeTemplateTitles(templates) {
  const lines = templates
    .slice()
    .sort((left, right) => left.title.localeCompare(right.title))
    .map(template => `${normalizeTopic(template.title)} | ${template.title} | ${template.slug}`)
  await writeFile(TEMPLATE_TITLES, `${lines.join('\n')}\n`, 'utf8')
}

async function main() {
  await mkdir(path.join(ROOT, 'data'), { recursive: true })

  const componentSeeds = await readJson(COMPONENTS_JSON)
  const templateSeeds = await readJson(TEMPLATES_JSON)
  const currentTemplates = await readCurrentTemplateStore()

  const importedUiItems = await Promise.all(
    componentSeeds.map(async (item, index) => {
      const html = await readHtml(item.file)
      const slug = slugify(item.name)
      return {
        id: `hub-${slug}`,
        title: item.name,
        category: mapComponentCategory(item.category),
        description: buildUiDescription(item, html),
        tags: buildComponentTags(item),
        cssCode: extractStyleBlocks(html),
        htmlCode: extractBodyContent(html),
        previewClass: `hub-${slug}`,
        previewDocument: html,
        kind: 'generated',
        sourcePath: item.file,
        publishedAt: UPDATED_AT,
        featured: index < 16,
        provider: 'website-template-hub-main',
        frameworkLabel: 'HTML + Tailwind',
      }
    })
  )

  const importedTemplates = await Promise.all(
    templateSeeds.map(async (item, index) => {
      const html = await readHtml(item.previewUrl)
      const slug = slugify(item.name)
      const summary = buildTemplateSummary(item, html)
      const category = mapTemplateCategory(item.industry)
      return {
        id: `template-${slug}`,
        slug,
        title: item.name,
        seoTitle: `${item.name} - Free ${item.industry} Website Template | Multiverse`,
        metaDescription: summary,
        summary,
        description: summary,
        category,
        categoryTitle: item.industry,
        platform: 'responsive',
        platformLabel: 'Responsive',
        framework: mapFramework(item.tech),
        frameworkLabel: item.tech.includes('Tailwind') ? 'HTML + Tailwind CSS' : 'HTML + CSS + JS',
        templateType: 'template',
        industry: item.industry,
        style: item.category,
        audience: `${item.industry} brands and product teams`,
        tags: buildTemplateTags(item),
        techStack: item.tech,
        prompt: `Build a premium ${item.industry.toLowerCase()} website inspired by ${item.name}. Keep the page polished, high-trust, and conversion-ready with responsive sections and clear hierarchy.`,
        sections: ['Header', 'Hero', 'Core sections', 'Trust blocks', 'Call to action', 'Footer'],
        layoutNotes: [
          'Imported from Website Template Hub as a local source-backed template.',
          'Preview and downloadable code are generated from the original HTML source.',
          'Asset paths are normalized so the template can preview inside Multiverse.',
        ],
        responsiveNotes: [
          'Responsive layout comes from the original one-page template source.',
          'Preview uses the real HTML file instead of a synthetic poster image.',
        ],
        bestFor: [item.industry, item.category, 'Quick-launch marketing sites'],
        files: [
          {
            path: 'index.html',
            language: 'html',
            summary: 'Main template source file imported from Website Template Hub.',
            content: html,
            primary: true,
          },
        ],
        previewHtml: html,
        featured: index < 12,
        updatedAt: UPDATED_AT,
        license: 'Free download',
        priceLabel: 'Free',
        importSource: 'website-template-hub-main',
      }
    })
  )

  const importedTemplateIds = new Set(importedTemplates.map(template => template.id))
  const mergedTemplates = [
    ...currentTemplates.filter(template => !importedTemplateIds.has(template.id)),
    ...importedTemplates,
  ]

  await writeFile(
    UI_STORE_JSON,
    `${JSON.stringify(
      {
        items: importedUiItems,
        meta: {
          source: 'website-template-hub-main',
          generatedAt: new Date().toISOString(),
          count: importedUiItems.length,
        },
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  await writeFile(
    TEMPLATE_STORE_JSON,
    `${JSON.stringify(
      {
        templates: mergedTemplates,
        meta: {
          source: 'website-template-hub-main-import',
          generatedAt: new Date().toISOString(),
          count: mergedTemplates.length,
        },
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  await writeTemplateTitles(mergedTemplates)

  console.log(
    JSON.stringify(
      {
        importedUi: importedUiItems.length,
        importedTemplates: importedTemplates.length,
        totalTemplates: mergedTemplates.length,
      },
      null,
      2
    )
  )
}

await main()
