import type { TemplateCategoryId, TemplateEntry, TemplatePlatformId, TemplateType } from '@/lib/template-library-data'
import { TEMPLATE_CATEGORY_DEFS } from '@/lib/template-library-data'

export const TEMPLATES_PUBLIC_PAGE_SIZE = 30

const VALID_CATEGORY_IDS = new Set(TEMPLATE_CATEGORY_DEFS.map(c => c.id))

export function normalizeTemplateSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export function normalizeTemplateQuery(value?: string | string[]) {
  return normalizeTemplateSearchParam(value)?.trim() || ''
}

export function resolveTemplateCategory(value?: string): 'all' | TemplateCategoryId {
  if (value && VALID_CATEGORY_IDS.has(value as TemplateCategoryId)) {
    return value as TemplateCategoryId
  }
  return 'all'
}

export function resolveTemplatePlatform(value?: string): 'all' | TemplatePlatformId {
  if (value === 'web' || value === 'mobile' || value === 'responsive') {
    return value
  }
  return 'all'
}

export function resolveTemplateType(value?: string): 'all' | TemplateType {
  if (value === 'template' || value === 'component') {
    return value
  }
  return 'all'
}

export function parseTemplatePage(value?: string) {
  const numeric = Number.parseInt(value || '1', 10)
  if (!Number.isFinite(numeric) || numeric < 1) return 1
  return numeric
}

export function filterTemplates(
  templates: TemplateEntry[],
  filters: {
    category: 'all' | TemplateCategoryId
    platform: 'all' | TemplatePlatformId
    templateType?: 'all' | TemplateType
    industry?: string
    query?: string
  }
) {
  const normalizedQuery = filters.query?.trim().toLowerCase() || ''

  return templates.filter(template => {
    if (filters.category !== 'all' && template.category !== filters.category) return false
    if (filters.platform !== 'all' && template.platform !== filters.platform) return false
    if (filters.templateType && filters.templateType !== 'all' && template.templateType !== filters.templateType) return false
    if (filters.industry && filters.industry !== 'all') {
      if (template.industry.toLowerCase() !== filters.industry.toLowerCase()) return false
    }

    if (normalizedQuery) {
      const haystack = [
        template.title,
        template.summary,
        template.description,
        template.categoryTitle,
        template.platformLabel,
        template.industry,
        template.style,
        template.audience,
        ...template.tags,
        ...template.bestFor,
        ...template.sections,
        ...template.techStack,
        template.frameworkLabel,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(normalizedQuery)) return false
    }

    return true
  })
}

export function paginateTemplates(templates: TemplateEntry[], page: number, pageSize = TEMPLATES_PUBLIC_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(templates.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, templates.length)

  return {
    items: templates.slice(startIndex, endIndex),
    page: safePage,
    totalPages,
    startIndex,
    endIndex,
  }
}
