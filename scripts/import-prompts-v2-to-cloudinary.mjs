import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const ENV_PATH = path.join(ROOT, '.env.local')
const SOURCE_DIR = path.join(ROOT, 'prompts-v2')
const SOURCE_JSON = path.join(SOURCE_DIR, 'prompts.json')
const SOURCE_IMAGES_DIR = path.join(SOURCE_DIR, 'images')
const STORE_PATH = path.join(ROOT, 'data', 'prompt-local-store.json')
const TITLES_PATH = path.join(ROOT, 'data', 'prompt-topic-titles.txt')
const REPORT_PATH = path.join(ROOT, 'data', 'prompt-preview-upload-report-v2.json')
const IMAGE_MODELS = ['Midjourney', 'Flux', 'ChatGPT']
const UPDATED_AT = '2026-04-17'
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
  'photo',
  'shot',
  'view',
  'realistic',
  'ai',
])

function parseEnv(content) {
  const env = {}
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const index = line.indexOf('=')
    if (index === -1) continue
    const key = line.slice(0, index).trim()
    let value = line.slice(index + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeTopic(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function toTitleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function decodeLooseUtf8(value) {
  return value.replace(/cafÃ©/g, 'cafe')
}

function buildTitle(shortPrompt) {
  const firstChunk = shortPrompt.split(',')[0]?.trim() || shortPrompt.trim()
  return toTitleCase(firstChunk)
}

function buildSummary(title, category) {
  return `${title} is a polished ${category.toLowerCase()} prompt for scroll-stopping AI image outputs.`
}

function buildDescription(category) {
  return `Built for ${category.toLowerCase()} visuals with stronger composition, lighting, styling, and subject detail so first-pass generations feel more premium and usable.`
}

function extractTags(shortPrompt, category) {
  const keywords = decodeLooseUtf8(shortPrompt)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(word => !STOP_WORDS.has(word))
    .slice(0, 6)

  return Array.from(new Set(['image-generation', slugify(category), ...keywords.map(slugify)])).slice(0, 7)
}

function buildBestFor(category, shortPrompt) {
  const lower = shortPrompt.toLowerCase()
  const values = ['AI image generation', category]

  if (lower.includes('selfie') || lower.includes('profile') || lower.includes('thumbnail')) {
    values.push('Social content visuals')
  } else if (lower.includes('cinematic') || lower.includes('film') || lower.includes('scene')) {
    values.push('Cinematic concept frames')
  } else if (lower.includes('portrait') || lower.includes('person') || lower.includes('headshot')) {
    values.push('Character and portrait work')
  } else if (lower.includes('lifestyle') || lower.includes('travel') || lower.includes('coffee')) {
    values.push('Lifestyle image concepts')
  } else {
    values.push('Visual concept exploration')
  }

  return values
}

function buildExamples(shortPrompt) {
  return [
    {
      label: 'Base direction',
      value: shortPrompt,
    },
    {
      label: 'Variation idea',
      value: `${shortPrompt}, alternate lighting, cleaner framing, richer texture detail`,
    },
  ]
}

function buildSignature(params, apiSecret) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex')
}

function buildCloudinaryUrl(cloudName, publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_1400,h_900/${publicId}`
}

async function uploadLocalImage({
  cloudName,
  apiKey,
  apiSecret,
  uploadPreset,
  publicId,
  filePath,
}) {
  const body = new FormData()
  const fileBuffer = await readFile(filePath)
  const filename = path.basename(filePath)

  body.set('file', new Blob([fileBuffer]), filename)
  body.set('public_id', publicId)
  body.set('overwrite', 'true')

  if (apiKey && apiSecret) {
    const timestamp = String(Math.floor(Date.now() / 1000))
    const signature = buildSignature({ overwrite: 'true', public_id: publicId, timestamp }, apiSecret)
    body.set('api_key', apiKey)
    body.set('timestamp', timestamp)
    body.set('signature', signature)
  } else if (uploadPreset) {
    body.set('upload_preset', uploadPreset)
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload?.error?.message || `HTTP ${response.status}`)
  }

  return payload
}

function sortPrompts(prompts) {
  return [...prompts].sort((left, right) => {
    if (Boolean(left.featured) !== Boolean(right.featured)) {
      return left.featured ? -1 : 1
    }

    return left.title.localeCompare(right.title)
  })
}

function getPromptMatchKey(prompt) {
  return prompt.slug || normalizeTopic(prompt.title)
}

async function main() {
  const env = parseEnv(await readFile(ENV_PATH, 'utf8'))
  const cloudName = (env.CLOUDINARY_CLOUD_NAME || '').trim()
  const apiKey = (env.CLOUDINARY_API_KEY || '').trim()
  const apiSecret = (env.CLOUDINARY_API_SECRET || '').trim()
  const uploadPreset = (env.CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folder = (env.CLOUDINARY_PROMPT_PREVIEW_FOLDER || 'multiverse/prompt-previews').trim().replace(/\/$/, '')

  if (!cloudName) throw new Error('Missing CLOUDINARY_CLOUD_NAME')
  if (!uploadPreset && !(apiKey && apiSecret)) {
    throw new Error('Missing Cloudinary upload credentials or preset')
  }

  const rawSource = JSON.parse(await readFile(SOURCE_JSON, 'utf8'))
  const existingStore = JSON.parse((await readFile(STORE_PATH, 'utf8')).replace(/^\uFEFF/, ''))
  const existingPrompts = Array.isArray(existingStore.prompts) ? existingStore.prompts : []
  const nextPrompts = []
  const uploadReport = []

  for (const entry of rawSource) {
    const shortPrompt = decodeLooseUtf8(String(entry.short_prompt || '').trim())
    const proPrompt = decodeLooseUtf8(String(entry.pro_prompt || '').trim())
    const category = decodeLooseUtf8(String(entry.category || 'AI Visuals').trim())
    const title = buildTitle(shortPrompt)
    const slug = slugify(`${category}-${title}`)
    const imageFilename = String(entry.image_filename || '').trim()
    const imagePath = path.join(SOURCE_IMAGES_DIR, imageFilename)
    const publicId = `${folder}/${slug}`

    if (!imageFilename || !fs.existsSync(imagePath)) {
      throw new Error(`Missing image for ${title}: ${imageFilename}`)
    }

    const payload = await uploadLocalImage({
      cloudName,
      apiKey,
      apiSecret,
      uploadPreset,
      publicId,
      filePath: imagePath,
    })

    const previewImage = buildCloudinaryUrl(cloudName, payload.public_id || publicId)
    const prompt = {
      id: `prompt-v2-${String(entry.id).padStart(3, '0')}`,
      slug,
      title,
      seoTitle: `${title} AI Prompt`,
      metaDescription: buildSummary(title, category),
      summary: buildSummary(title, category),
      description: buildDescription(category),
      category: 'image-generation',
      categoryTitle: 'Image Generation Prompts',
      subcategory: category,
      models: IMAGE_MODELS,
      tags: extractTags(shortPrompt, category),
      audience: 'creators, marketers, designers, and visual storytellers',
      visualStyle: category,
      previewImage,
      previewAlt: `${title} prompt preview`,
      featured: FEATURED_IDS.has(Number(entry.id)),
      prompt: proPrompt,
      variables: [],
      bestFor: buildBestFor(category, shortPrompt),
      workflow: [
        'Start with the prompt as-is for the cleanest first pass.',
        'Change aspect ratio or camera angle only after you lock the main subject and mood.',
        'Keep one strong lighting cue when iterating so the outputs stay consistent.',
      ],
      tips: [
        'Use portrait ratios like 4:5 for selfies, thumbnails, and headshots.',
        'Use cinematic wide ratios like 16:9 for scenes, interiors, and storytelling visuals.',
        'If the image feels flat, add one stronger lens, texture, or mood cue before regenerating.',
      ],
      examples: buildExamples(shortPrompt),
      relatedSlugs: [],
      updatedAt: UPDATED_AT,
    }

    nextPrompts.push(prompt)
    uploadReport.push({
      id: prompt.id,
      slug: prompt.slug,
      sourceImage: imageFilename,
      publicId: payload.public_id || publicId,
      imageUrl: previewImage,
    })
  }

  const byKey = new Map()
  for (const prompt of existingPrompts) byKey.set(getPromptMatchKey(prompt), prompt)
  for (const prompt of nextPrompts) byKey.set(getPromptMatchKey(prompt), prompt)

  const mergedPrompts = sortPrompts(Array.from(byKey.values()))
  const titleRegistry = mergedPrompts
    .map(prompt => `${normalizeTopic(prompt.title)} | ${prompt.title} | ${prompt.slug}`)
    .join('\n')

  await writeFile(
    STORE_PATH,
    `${JSON.stringify(
      {
        prompts: mergedPrompts,
        meta: {
          source: 'merged-ai-art-prompts-and-prompts-v2',
          generatedAt: new Date().toISOString(),
          count: mergedPrompts.length,
        },
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  await writeFile(TITLES_PATH, `${titleRegistry}\n`, 'utf8')
  await writeFile(REPORT_PATH, `${JSON.stringify(uploadReport, null, 2)}\n`, 'utf8')

  console.log(`imported=${nextPrompts.length}`)
  console.log(`total=${mergedPrompts.length}`)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
