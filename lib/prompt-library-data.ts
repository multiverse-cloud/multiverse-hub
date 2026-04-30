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

export const PROMPTS: PromptEntry[] = [
  {
    id: 'prompt-childhood-then-and-now-ai-photo',
    slug: 'childhood-then-and-now-ai-photo-prompt',
    title: 'Childhood Then and Now AI Photo Prompt',
    seoTitle: 'Childhood Then and Now AI Photo Prompt - Viral Younger Self Edit',
    metaDescription:
      'Copy a viral childhood then-and-now AI photo prompt for Gemini, ChatGPT, and Photoshop AI. Create a safe nostalgic younger-self split photo edit.',
    summary:
      'Create the viral childhood vs present AI photo edit with a clean split-frame, soft nostalgia, and safe age-appropriate direction.',
    description:
      'A high-signal prompt for the trending childhood then-and-now AI image style. It helps creators turn a current portrait and childhood photo into an emotional split-frame memory edit without unsafe or suggestive framing.',
    category: 'image-editing',
    categoryTitle: 'Image Editing Prompts',
    subcategory: 'Viral AI Photo Trends',
    models: ['Gemini', 'ChatGPT', 'Photoshop AI'],
    tags: [
      'childhood ai prompt',
      'childhood now ai image prompt',
      'then and now photo',
      'childhood vs now ai edit',
      'younger self',
      'viral ai photo',
      'gemini prompt',
      'ai image editing',
      'nostalgia edit',
      'instagram trend',
    ],
    audience: 'creators, students, influencers, editors, and social media users',
    visualStyle: 'Black-and-white nostalgic editorial diptych with emotional storytelling',
    previewImage: '/prompt-previews/viral-childhood-now-ai-photo-prompt.webp',
    previewAlt: 'Childhood then and now AI photo prompt preview with a split nostalgic portrait',
    featured: true,
    prompt: `Create a tasteful viral "childhood then and now" AI photo edit using my uploaded current photo and my own childhood photo.

Composition:
- Make a clean vertical split-frame image.
- Left side: my childhood version from [CHILDHOOD_PHOTO_YEAR], looking toward my present self with an innocent natural expression.
- Right side: my current adult version from [CURRENT_PHOTO_YEAR], looking back with a calm, proud, emotional expression.
- Add small year labels above each side: "[CHILDHOOD_PHOTO_YEAR]" and "[CURRENT_PHOTO_YEAR]".
- Optional short text overlay: "[SHORT_QUOTE]" in a minimal handwritten or soft serif style.

Style:
- Realistic photo edit, black-and-white or soft warm monochrome.
- Nostalgic studio portrait mood, gentle lighting, subtle film grain, clean background.
- Keep facial identity consistent with both reference photos.
- Natural skin texture, realistic hair, realistic clothing, no plastic AI look.
- Emotional but not dramatic, like a meaningful memory captured in a studio.

Safety and quality rules:
- Use only the provided childhood reference of the same person.
- Keep the child version age-appropriate, modest, and non-romantic.
- No sensual posing, no body focus, no exaggerated beauty edits.
- Do not change ethnicity, gender presentation, or core facial identity.
- Preserve a respectful family-memory tone.

Output:
- High-resolution social media image, 4:5 portrait ratio.
- Clean enough for Instagram, WhatsApp status, YouTube Shorts thumbnail, or personal memory post.`,
    variables: [
      {
        name: 'CHILDHOOD_PHOTO_YEAR',
        hint: 'Example: 2003, 2006, 2010',
      },
      {
        name: 'CURRENT_PHOTO_YEAR',
        hint: 'Example: 2026',
      },
      {
        name: 'SHORT_QUOTE',
        hint: 'Example: Stronger than we thought, Proud of how far we came, Still us',
      },
    ],
    bestFor: [
      'Instagram childhood trend edits',
      'Gemini AI photo editing prompts',
      'Then and now photo reels',
      'Personal memory posts',
      'Emotional social media content',
    ],
    workflow: [
      'Upload one clear current photo and one childhood photo of the same person.',
      'Paste the prompt and replace the year and quote variables.',
      'Ask for 4:5 portrait output if the tool supports aspect ratio control.',
      'Check the face, hands, text labels, and age-appropriate framing before posting.',
    ],
    tips: [
      'Use a childhood photo with clear face visibility for better identity matching.',
      'Keep the quote under five words so the image stays clean.',
      'If text renders poorly, generate without text and add the year labels manually.',
      'Use monochrome or soft warm tones for a more emotional viral look.',
    ],
    examples: [
      {
        label: 'Input',
        value: 'Childhood year: 2003, current year: 2026, quote: Stronger than we thought.',
      },
      {
        label: 'Output',
        value: 'A nostalgic split-frame portrait showing childhood and current versions looking at each other with soft studio lighting.',
      },
    ],
    relatedSlugs: [],
    updatedAt: '2026-04-30',
  },
]

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
