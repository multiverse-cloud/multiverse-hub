export type PromptCategoryId =
  | 'writing'
  | 'work'
  | 'coding'
  | 'career'
  | 'study'
  | 'research'
  | 'image-generation'
  | 'image-editing'

export type PromptModelId =
  | 'ChatGPT'
  | 'Claude'
  | 'Gemini'
  | 'Midjourney'
  | 'Flux'
  | 'Photoshop AI'

export type PromptVariable = {
  name: string
  hint: string
}

export type PromptExample = {
  label: string
  value: string
}

export type PromptEntry = {
  id: string
  slug: string
  title: string
  seoTitle: string
  metaDescription: string
  summary: string
  description: string
  category: PromptCategoryId
  categoryTitle: string
  subcategory: string
  models: PromptModelId[]
  tags: string[]
  audience: string
  visualStyle: string
  previewImage: string
  previewAlt: string
  featured?: boolean
  prompt: string
  variables: PromptVariable[]
  bestFor: string[]
  workflow: string[]
  tips: string[]
  examples: PromptExample[]
  relatedSlugs: string[]
  updatedAt: string
}

export type PromptCategory = {
  id: PromptCategoryId
  title: string
  description: string
  count: number
  href: string
}

const CATEGORY_META: Record<
  PromptCategoryId,
  {
    title: string
    description: string
    previewImage: string
  }
> = {
  writing: {
    title: 'Writing Prompts',
    description: 'Email, article, summary, and rewrite prompts with stronger structure.',
    previewImage: '/prompt-previews/writing-studio.svg',
  },
  work: {
    title: 'Work Prompts',
    description: 'Meeting notes, action plans, briefs, and execution prompts.',
    previewImage: '/prompt-previews/work-ops.svg',
  },
  coding: {
    title: 'Coding Prompts',
    description: 'Debugging, reviews, specs, and implementation prompts for developers.',
    previewImage: '/prompt-previews/code-lab.svg',
  },
  career: {
    title: 'Career Prompts',
    description: 'Resume, interview, and job-search prompts that stay practical.',
    previewImage: '/prompt-previews/career-lab.svg',
  },
  study: {
    title: 'Study Prompts',
    description: 'Revision plans, explainers, flashcards, and study structure prompts.',
    previewImage: '/prompt-previews/study-board.svg',
  },
  research: {
    title: 'Research Prompts',
    description: 'Comparison, extraction, market, and analysis prompts with clearer synthesis.',
    previewImage: '/prompt-previews/research-grid.svg',
  },
  'image-generation': {
    title: 'Image Generation Prompts',
    description: 'Visual prompts for portraits, products, interiors, posters, and branded scenes.',
    previewImage: '/prompt-previews/image-canvas.svg',
  },
  'image-editing': {
    title: 'Image Editing Prompts',
    description: 'Retouch, relight, restore, clean up, and edit images with better direction.',
    previewImage: '/prompt-previews/image-edit-suite.svg',
  },
}

export const PROMPTS: PromptEntry[] = []

export const FEATURED_PROMPTS = PROMPTS.filter(entry => entry.featured)

export const PROMPT_MODELS: PromptModelId[] = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Midjourney',
  'Flux',
  'Photoshop AI',
]

export const PROMPT_CATEGORIES: PromptCategory[] = (Object.entries(CATEGORY_META) as Array<
  [PromptCategoryId, (typeof CATEGORY_META)[PromptCategoryId]]
>).map(([id, meta]) => ({
  id,
  title: meta.title,
  description: meta.description,
  count: 0,
  href: `/prompts?category=${id}`,
}))

export function getPromptBySlug(slug: string) {
  return PROMPTS.find(prompt => prompt.slug === slug) || null
}

export function getRelatedPrompts(slug: string, limit = 4) {
  const prompt = getPromptBySlug(slug)
  if (!prompt) return []

  return prompt.relatedSlugs
    .map(relatedSlug => getPromptBySlug(relatedSlug))
    .filter((entry): entry is PromptEntry => Boolean(entry))
    .slice(0, limit)
}

export const PROMPT_LIBRARY_STATS = {
  totalPrompts: PROMPTS.length,
  imagePrompts: PROMPTS.filter(prompt => prompt.category.startsWith('image')).length,
  featuredPrompts: FEATURED_PROMPTS.length,
}
