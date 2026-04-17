import type { PromptCategoryId, PromptEntry, PromptModelId } from '@/lib/prompt-library-data'

export const PROMPTS_PUBLIC_PAGE_SIZE = 30

export function normalizePromptSearchParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export function normalizePromptQuery(value?: string | string[]) {
  return normalizePromptSearchParam(value)?.trim() || ''
}

export function resolvePromptCategory(value?: string): 'all' | PromptCategoryId {
  if (
    value === 'writing' ||
    value === 'work' ||
    value === 'coding' ||
    value === 'career' ||
    value === 'study' ||
    value === 'research' ||
    value === 'image-generation' ||
    value === 'image-editing'
  ) {
    return value
  }

  return 'all'
}

export function resolvePromptModel(value?: string): 'all' | PromptModelId {
  if (
    value === 'ChatGPT' ||
    value === 'Claude' ||
    value === 'Gemini' ||
    value === 'Midjourney' ||
    value === 'Flux' ||
    value === 'Photoshop AI'
  ) {
    return value
  }

  return 'all'
}

export function parsePromptPage(value?: string) {
  const numeric = Number.parseInt(value || '1', 10)
  if (!Number.isFinite(numeric) || numeric < 1) return 1
  return numeric
}

export function filterPrompts(
  prompts: PromptEntry[],
  filters: {
    category: 'all' | PromptCategoryId
    model: 'all' | PromptModelId
    query?: string
  }
) {
  const normalizedQuery = filters.query?.trim().toLowerCase() || ''

  return prompts.filter(prompt => {
    if (filters.category !== 'all' && prompt.category !== filters.category) {
      return false
    }

    if (filters.model !== 'all' && !prompt.models.includes(filters.model)) {
      return false
    }

    if (normalizedQuery) {
      const haystack = [
        prompt.title,
        prompt.summary,
        prompt.description,
        prompt.categoryTitle,
        prompt.subcategory,
        ...prompt.tags,
        ...prompt.models,
        ...prompt.bestFor,
      ]
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(normalizedQuery)) {
        return false
      }
    }

    return true
  })
}

export function paginatePrompts(prompts: PromptEntry[], page: number, pageSize = PROMPTS_PUBLIC_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(prompts.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, prompts.length)

  return {
    items: prompts.slice(startIndex, endIndex),
    page: safePage,
    totalPages,
    startIndex,
    endIndex,
  }
}

