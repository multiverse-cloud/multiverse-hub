import 'server-only'

import { revalidateTag } from 'next/cache'
import {
  BASE_TEMPLATES,
  TEMPLATE_CATEGORY_DEFS,
  TEMPLATE_FRAMEWORK_LABELS,
  TEMPLATE_PLATFORM_DEFS,
  type TemplateCategoryDefinition,
  type TemplateEntry,
  type TemplateFrameworkId,
  type TemplatePlatformDefinition,
  type TemplateType,
} from '@/lib/template-library-data'
import { getMergedLocalTemplateEntries, saveLocalTemplate, saveLocalTemplates } from '@/lib/template-local-store'

const TEMPLATES_TAG = 'templates'
const TEMPLATE_MEMORY_CACHE_MS = 60 * 1000

let templateLibraryCache:
  | {
      state: TemplateLibraryState
      expiresAt: number
    }
  | null = null

type CountedCategory = TemplateCategoryDefinition & { count: number; href: string }
type CountedPlatform = TemplatePlatformDefinition & { count: number; href: string }

type TemplateLibraryState = {
  templates: TemplateEntry[]
  featuredTemplates: TemplateEntry[]
  categories: CountedCategory[]
  platforms: CountedPlatform[]
  stats: {
    totalTemplates: number
    featuredTemplates: number
    starterTemplates: number
    totalFiles: number
    webTemplates: number
    mobileTemplates: number
  }
}

function buildFeaturedTemplates(templates: TemplateEntry[]) {
  const preferredCategories: Array<TemplateEntry['category']> = [
    'ecommerce',
    'landing',
    'dashboard',
    'agency',
    'saas',
    'crypto',
    'education',
    'healthcare',
  ]

  const picks: TemplateEntry[] = []
  const seen = new Set<string>()

  for (const category of preferredCategories) {
    const match = templates.find(template => template.category === category && !seen.has(template.slug))
    if (match) {
      picks.push(match)
      seen.add(match.slug)
    }
  }

  for (const template of templates) {
    if (picks.length >= 8) break
    if (template.featured && !seen.has(template.slug)) {
      picks.push(template)
      seen.add(template.slug)
    }
  }

  return picks.slice(0, 8)
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

function normalizeSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function sortTemplates(templates: TemplateEntry[]) {
  return [...templates].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1
    }

    return left.title.localeCompare(right.title)
  })
}

function normalizeFiles(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .filter((entry): entry is TemplateEntry['files'][number] => Boolean(entry && typeof entry === 'object'))
    .map(entry => {
      const language: TemplateEntry['files'][number]['language'] =
        entry.language === 'css' ||
        entry.language === 'js' ||
        entry.language === 'tsx' ||
        entry.language === 'ts' ||
        entry.language === 'md' ||
        entry.language === 'json'
          ? entry.language
          : 'html'

      return {
        path: asString(entry.path) || 'index.html',
        language,
        content: asString(entry.content),
        summary: asString(entry.summary) || 'Template file',
        primary: Boolean(entry.primary),
      }
    })
}

function normalizeTemplateEntry(template: TemplateEntry): TemplateEntry {
  const base = BASE_TEMPLATES.find(entry => entry.slug === template.slug)
  const title = asString(template.title)
  const slug = normalizeSlug(asString(template.slug) || title)
  const category = TEMPLATE_CATEGORY_DEFS.find(entry => entry.id === template.category)?.id || 'landing'
  const platform = TEMPLATE_PLATFORM_DEFS.find(entry => entry.id === template.platform)?.id || 'responsive'
  const framework = (
    template.framework === 'html-tailwind' || template.framework === 'html-css-js' || template.framework === 'react-tailwind' || template.framework === 'next-tailwind' ? template.framework : 'next-tailwind'
  ) as TemplateFrameworkId
  const templateType: TemplateType = template.templateType === 'component' ? 'component' : 'template'

  return {
    ...template,
    id: asString(template.id) || `template-${slug}`,
    slug,
    title,
    seoTitle: asString(template.seoTitle) || `${title} - Downloadable Premium UI Template | Multiverse`,
    metaDescription: asString(template.metaDescription) || asString(template.summary) || asString(template.description),
    summary: asString(template.summary) || asString(template.description) || 'Downloadable premium UI template.',
    description: asString(template.description) || asString(template.summary) || 'Downloadable premium UI template.',
    category,
    categoryTitle: TEMPLATE_CATEGORY_DEFS.find(entry => entry.id === category)?.title || template.categoryTitle,
    platform,
    platformLabel: TEMPLATE_PLATFORM_DEFS.find(entry => entry.id === platform)?.title || template.platformLabel,
    framework,
    frameworkLabel: TEMPLATE_FRAMEWORK_LABELS[framework],
    templateType,
    industry: asString(template.industry) || base?.industry || 'Product UI',
    style: asString(template.style) || base?.style || 'Premium interface system',
    audience: asString(template.audience) || base?.audience || 'product teams',
    tags: asStringArray(template.tags),
    techStack: asStringArray(template.techStack),
    prompt: asString(template.prompt),
    sections: asStringArray(template.sections),
    layoutNotes: asStringArray(template.layoutNotes),
    responsiveNotes: asStringArray(template.responsiveNotes),
    bestFor: asStringArray(template.bestFor),
    files: normalizeFiles(template.files),
    previewHtml: asString(template.previewHtml) || undefined,
    previewImage: asString((template as TemplateEntry & { previewImage?: unknown }).previewImage) || undefined,
    previewCapturedAt: asString((template as TemplateEntry & { previewCapturedAt?: unknown }).previewCapturedAt) || undefined,
    liveUrl: asString((template as TemplateEntry & { liveUrl?: unknown }).liveUrl) || undefined,
    downloadUrl: asString((template as TemplateEntry & { downloadUrl?: unknown }).downloadUrl) || undefined,
    featured: Boolean(template.featured),
    updatedAt: asString(template.updatedAt) || new Date().toISOString().slice(0, 10),
    license: asString(template.license) || 'Free download',
    priceLabel: asString(template.priceLabel) || 'Free',
  }
}

function buildRelatedTemplates(entry: TemplateEntry, templates: TemplateEntry[]) {
  return templates
    .filter(candidate => candidate.slug !== entry.slug)
    .map(candidate => {
      const sharedTags = candidate.tags.filter(tag => entry.tags.includes(tag)).length
      const sameCategory = candidate.category === entry.category ? 3 : 0
      const samePlatform = candidate.platform === entry.platform ? 2 : 0

      return {
        candidate,
        score: sharedTags + sameCategory + samePlatform,
      }
    })
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title))
    .slice(0, 4)
    .map(item => item.candidate)
}

function buildTemplateLibraryState(entries: TemplateEntry[]): TemplateLibraryState {
  const templates = sortTemplates(entries.map(normalizeTemplateEntry))
  const featuredTemplates = buildFeaturedTemplates(templates)
  const categories = TEMPLATE_CATEGORY_DEFS.map(category => ({
    ...category,
    count: templates.filter(template => template.category === category.id).length,
    href: `/templates?category=${category.id}`,
  }))
  const platforms = TEMPLATE_PLATFORM_DEFS.map(platform => ({
    ...platform,
    count: templates.filter(template => template.platform === platform.id).length,
    href: `/templates?platform=${platform.id}`,
  }))

  return {
    templates,
    featuredTemplates,
    categories,
    platforms,
    stats: {
      totalTemplates: templates.length,
      featuredTemplates: featuredTemplates.length,
      starterTemplates: BASE_TEMPLATES.length,
      totalFiles: templates.reduce((total, template) => total + template.files.length, 0),
      webTemplates: templates.filter(template => template.platform === 'web').length,
      mobileTemplates: templates.filter(template => template.platform === 'mobile').length,
    },
  }
}

function resetTemplateCache() {
  templateLibraryCache = null
}

function assertWritableLocalTemplateStore() {
  if (process.env.VERCEL) {
    throw new Error(
      'UI Templates is currently in local-only mode. This deployment is read-only, so template import/save works only in local development until a database is enabled again.'
    )
  }
}

export async function getTemplateLibraryData(): Promise<TemplateLibraryState> {
  if (templateLibraryCache && templateLibraryCache.expiresAt > Date.now()) {
    return templateLibraryCache.state
  }

  const entries = await getMergedLocalTemplateEntries()
  const state = buildTemplateLibraryState(entries)

  templateLibraryCache = {
    state,
    expiresAt: Date.now() + TEMPLATE_MEMORY_CACHE_MS,
  }

  return state
}

export async function getPublishedTemplates() {
  return (await getTemplateLibraryData()).templates
}

export async function getAdminTemplates() {
  return (await getTemplateLibraryData()).templates
}

export async function getTemplateBySlug(slug: string) {
  const templates = await getPublishedTemplates()
  return templates.find(template => template.slug === slug) || null
}

export async function getRelatedTemplates(slug: string, limit = 4) {
  const templates = await getPublishedTemplates()
  const current = templates.find(template => template.slug === slug)
  if (!current) return []
  return buildRelatedTemplates(current, templates).slice(0, limit)
}

export async function saveTemplate(input: TemplateEntry) {
  assertWritableLocalTemplateStore()
  await saveLocalTemplate(normalizeTemplateEntry(input))
  resetTemplateCache()
  revalidateTag(TEMPLATES_TAG)
  return true
}

export async function saveTemplates(inputs: TemplateEntry[]) {
  assertWritableLocalTemplateStore()
  await saveLocalTemplates(inputs.map(normalizeTemplateEntry))
  resetTemplateCache()
  revalidateTag(TEMPLATES_TAG)
  return { success: true, count: inputs.length }
}

