import type { PromptCategoryId, PromptEntry } from '@/lib/prompt-library-data'
import { buildCloudinaryPromptPreviewPublicId } from '@/lib/cloudinary'

type PromptPreviewPlan = {
  slug: string
  title: string
  category: PromptCategoryId
  alt: string
  publicId: string
  prompt: string
}

const CATEGORY_ART_DIRECTION: Record<PromptCategoryId, string> = {
  writing:
    'premium editorial desk scene, soft daylight, tasteful stationery, laptop or notebook context, clean negative space, no visible brand logos, no readable UI text',
  work:
    'modern operations workspace, premium planning surface, dashboard or note context without readable text, cinematic but restrained lighting, startup-operator atmosphere',
  coding:
    'premium developer workspace, code and engineering mood, monitor glow, focused desk composition, no readable code text, clean cinematic atmosphere',
  career:
    'career strategy scene, professional desk or interview prep environment, premium natural lighting, polished but human, no logos or readable documents',
  study:
    'focused study desk, books, notes, calm learning environment, premium daylight, organized but lived-in, no readable text',
  research:
    'research and analysis workspace, charts or reports implied but not readable, premium strategic mood, clean table composition',
  'image-generation':
    'high-end creative concept art direction, premium visual composition, campaign-ready image, no readable text or embedded UI frames',
  'image-editing':
    'professional retouch and edit workflow concept, before-after feel without obvious split text, realistic creative studio mood, premium polish',
}

function sentence(value: string) {
  return value.trim().replace(/\s+/g, ' ').replace(/[. ]+$/, '')
}

function createAlt(entry: PromptEntry) {
  return `${entry.title} preview image for the ${entry.categoryTitle} prompt collection`
}

export function buildPromptPreviewGenerationPrompt(entry: PromptEntry) {
  const imageIntent = entry.category.startsWith('image')
    ? 'The image itself should feel like the final creative result or the premium edit direction implied by the prompt.'
    : 'The image should feel like a marketplace cover image for this prompt, not a literal screenshot of the text prompt.'

  return `Create a premium marketplace preview image for this AI prompt.

Prompt title: ${entry.title}
Category: ${entry.categoryTitle}
Subcategory: ${entry.subcategory}
Summary: ${sentence(entry.summary)}
Audience: ${sentence(entry.audience)}
Visual style: ${sentence(entry.visualStyle)}
Tags: ${entry.tags.join(', ')}

Art direction:
- ${CATEGORY_ART_DIRECTION[entry.category]}
- ${imageIntent}
- premium marketplace thumbnail feel
- strong focal hierarchy
- realistic textures and lighting
- clean composition with breathing room
- no watermarks
- no readable text overlays
- no fake brand marks
- no collage clutter

Goal:
Make the image feel like a high-value prompt listing thumbnail that someone would click in a premium prompt marketplace.`
}

export function buildPromptPreviewPlan(entry: PromptEntry): PromptPreviewPlan {
  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    alt: createAlt(entry),
    publicId: buildCloudinaryPromptPreviewPublicId(entry.slug),
    prompt: buildPromptPreviewGenerationPrompt(entry),
  }
}

export function buildPromptPreviewPlans(entries: PromptEntry[]) {
  return entries.map(buildPromptPreviewPlan)
}

export type { PromptPreviewPlan }
