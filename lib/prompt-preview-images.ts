import type { PromptCategoryId } from '@/lib/prompt-library-data'

export const PROMPT_CATEGORY_LOCAL_PREVIEWS: Record<PromptCategoryId, string> = {
  writing: '/prompt-previews/writing-studio.svg',
  work: '/prompt-previews/work-ops.svg',
  coding: '/prompt-previews/code-lab.svg',
  career: '/prompt-previews/career-lab.svg',
  study: '/prompt-previews/study-board.svg',
  research: '/prompt-previews/research-grid.svg',
  'image-generation': '/prompt-previews/image-canvas.svg',
  'image-editing': '/prompt-previews/image-edit-suite.svg',
}

export const PROMPT_CATEGORY_REMOTE_PREVIEWS: Record<PromptCategoryId, { src: string; alt: string }> = {
  writing: {
    src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
    alt: 'Editorial writing desk with notebook and coffee',
  },
  work: {
    src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
    alt: 'Modern team workspace with planning materials',
  },
  coding: {
    src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Developer workspace with code on screen',
  },
  career: {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    alt: 'Professional interview and career conversation setting',
  },
  study: {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Focused study desk with books and notes',
  },
  research: {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    alt: 'Research desk with reports, charts, and laptop',
  },
  'image-generation': {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Creative visual concept workspace with digital tools',
  },
  'image-editing': {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
    alt: 'Photo editing desk with monitor and creative tools',
  },
}

export function getPromptPreviewFallback(category: PromptCategoryId) {
  return PROMPT_CATEGORY_LOCAL_PREVIEWS[category]
}

export function getPromptPreviewDefault(category: PromptCategoryId) {
  return PROMPT_CATEGORY_REMOTE_PREVIEWS[category]
}

export function isPromptPlaceholderPreview(value: string) {
  return Object.values(PROMPT_CATEGORY_LOCAL_PREVIEWS).includes(value)
}
