import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const SOURCE_DIR = path.join(ROOT, 'ai-art-prompts')
const SOURCE_JSON = path.join(SOURCE_DIR, 'prompts.json')
const SOURCE_IMAGES_DIR = path.join(SOURCE_DIR, 'images')
const OUTPUT_JSON = path.join(ROOT, 'data', 'prompt-local-store.json')
const OUTPUT_TITLES = path.join(ROOT, 'data', 'prompt-topic-titles.txt')
const OUTPUT_IMAGES_DIR = path.join(ROOT, 'public', 'prompt-previews', 'ai-art-styles')

const IMAGE_MODELS = ['Midjourney', 'Flux', 'ChatGPT']
const UPDATED_AT = '2026-04-16'
const FEATURED_IDS = new Set([1, 2, 3, 21, 22, 23, 41, 42, 43, 61, 62, 63, 81, 82, 83])
const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'of',
  'with',
  'in',
  'on',
  'the',
  'to',
  'for',
  'style',
  'realistic',
  'ultra',
  'ai',
])

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toTitleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function buildTitle(shortPrompt) {
  const firstChunk = shortPrompt.split(',')[0]?.trim() || shortPrompt.trim()
  return toTitleCase(firstChunk)
}

function buildSummary(shortPrompt, category) {
  return `${buildTitle(shortPrompt)} is a polished ${category.toLowerCase()} prompt built for high-quality AI image generation.`
}

function buildDescription(category) {
  return `This prompt is structured for ${category.toLowerCase()} outputs with clear subject direction, style cues, lighting guidance, composition detail, and quality keywords so image models return stronger first-pass results.`
}

function extractTags(shortPrompt, category) {
  const keywords = shortPrompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(word => !STOP_WORDS.has(word))
    .slice(0, 5)

  return Array.from(
    new Set([
      'image-generation',
      slugify(category),
      ...keywords.map(word => slugify(word)),
    ])
  ).slice(0, 6)
}

function buildBestFor(category, shortPrompt) {
  const lower = shortPrompt.toLowerCase()
  const bestFor = ['AI image generation', category]

  if (lower.includes('portrait') || lower.includes('headshot') || lower.includes('profile')) {
    bestFor.push('Portrait concepts')
  } else if (lower.includes('city') || lower.includes('village') || lower.includes('landscape') || lower.includes('scene')) {
    bestFor.push('Environment concepts')
  } else if (lower.includes('avatar') || lower.includes('selfie') || lower.includes('photo')) {
    bestFor.push('Social profile visuals')
  } else {
    bestFor.push('Visual concept exploration')
  }

  return bestFor
}

function buildExamples(shortPrompt) {
  return [
    {
      label: 'Base direction',
      value: shortPrompt,
    },
    {
      label: 'Variation idea',
      value: `${shortPrompt}, alternate lighting, alternate camera angle, refined color palette`,
    },
  ]
}

const raw = JSON.parse(fs.readFileSync(SOURCE_JSON, 'utf8'))
const prompts = raw.map(entry => {
  const title = buildTitle(entry.short_prompt)
  const slug = slugify(`${entry.category}-${title}`)
  const previewImage = `/prompt-previews/ai-art-styles/${entry.image_filename}`

  return {
    id: `prompt-ai-art-${String(entry.id).padStart(3, '0')}`,
    slug,
    title,
    seoTitle: `${title} AI Art Prompt`,
    metaDescription: buildSummary(entry.short_prompt, entry.category),
    summary: buildSummary(entry.short_prompt, entry.category),
    description: buildDescription(entry.category),
    category: 'image-generation',
    categoryTitle: 'Image Generation Prompts',
    subcategory: entry.category,
    models: IMAGE_MODELS,
    tags: extractTags(entry.short_prompt, entry.category),
    audience: 'designers, creators, marketers, and visual storytellers',
    visualStyle: entry.category,
    previewImage,
    previewAlt: `${title} AI art preview`,
    featured: FEATURED_IDS.has(entry.id),
    prompt: entry.pro_prompt,
    variables: [],
    bestFor: buildBestFor(entry.category, entry.short_prompt),
    workflow: [
      'Start with the base prompt as written to get the strongest composition first.',
      'Adjust aspect ratio, camera angle, or color palette only after the first strong generation.',
      'Keep the subject and lighting cues intact when creating variations.',
    ],
    tips: [
      'Use portrait ratios like 4:5 or 3:4 for characters and profile-style visuals.',
      'Use wider ratios like 16:9 for cities, environments, and cinematic landscapes.',
      'If the output feels generic, add one stronger material, lighting, or lens detail before regenerating.',
    ],
    examples: buildExamples(entry.short_prompt),
    relatedSlugs: [],
    updatedAt: UPDATED_AT,
  }
})

const titles = prompts
  .map(prompt => `${normalizeTopic(prompt.title)} | ${prompt.title} | ${prompt.slug}`)
  .join('\n')

fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true })
fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true })

for (const entry of raw) {
  fs.copyFileSync(
    path.join(SOURCE_IMAGES_DIR, entry.image_filename),
    path.join(OUTPUT_IMAGES_DIR, entry.image_filename)
  )
}

fs.writeFileSync(
  OUTPUT_JSON,
  `${JSON.stringify(
    {
      prompts,
      meta: {
        source: 'ai-art-prompts-import',
        generatedAt: new Date().toISOString(),
        count: prompts.length,
      },
    },
    null,
    2
  )}\n`,
  'utf8'
)

fs.writeFileSync(OUTPUT_TITLES, `${titles}\n`, 'utf8')

console.log(`Imported ${prompts.length} AI art prompts and ${raw.length} preview images.`)
