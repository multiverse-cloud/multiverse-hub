import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const envPath = path.join(root, '.env.local')
const storePath = path.join(root, 'data', 'prompt-local-store.json')
const sourcesPath = path.join(root, 'data', 'prompt-preview-sources.json')
const planPath = path.join(root, 'data', 'prompt-preview-generation-plan.json')
const reportPath = path.join(root, 'data', 'prompt-preview-upload-report.json')

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

function normalizeSentence(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').replace(/[. ]+$/, '')
}

function buildPlan(entry, folder) {
  const publicId = `${folder}/${entry.slug}`
  const prompt = [
    'Create a premium marketplace preview image for this AI prompt.',
    `Prompt title: ${entry.title}`,
    `Category: ${entry.categoryTitle}`,
    `Subcategory: ${entry.subcategory}`,
    `Summary: ${normalizeSentence(entry.summary)}`,
    `Audience: ${normalizeSentence(entry.audience)}`,
    `Visual style: ${normalizeSentence(entry.visualStyle)}`,
    `Tags: ${(entry.tags || []).join(', ')}`,
    'Art direction: premium marketplace thumbnail, realistic textures, clean composition, no watermark, no readable text overlays.',
  ].join('\n')

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    publicId,
    alt: entry.previewAlt || `${entry.title} preview image`,
    prompt,
  }
}

function buildSignature(params, apiSecret) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex')
}

function buildCloudinaryUrl(cloudName, publicId) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_1400,h_900/${publicId}`
}

async function main() {
  const env = parseEnv(await readFile(envPath, 'utf8'))
  const cloudName = (env.CLOUDINARY_CLOUD_NAME || '').trim()
  const apiKey = (env.CLOUDINARY_API_KEY || '').trim()
  const apiSecret = (env.CLOUDINARY_API_SECRET || '').trim()
  const uploadPreset = (env.CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folder = (env.CLOUDINARY_PROMPT_PREVIEW_FOLDER || 'multiverse/prompt-previews').trim().replace(/\/$/, '')

  if (!cloudName) throw new Error('Missing CLOUDINARY_CLOUD_NAME')
  if (!uploadPreset && !(apiKey && apiSecret)) {
    throw new Error('Missing Cloudinary upload credentials or preset')
  }

  const store = JSON.parse((await readFile(storePath, 'utf8')).replace(/^\uFEFF/, ''))
  const sourceList = JSON.parse((await readFile(sourcesPath, 'utf8')).replace(/^\uFEFF/, ''))
  const sourceMap = new Map(sourceList.map((entry) => [entry.slug, entry.sourceUrl]))

  const report = []
  for (const prompt of store.prompts) {
    const sourceUrl = sourceMap.get(prompt.slug)
    const publicId = `${folder}/${prompt.slug}`
    const plan = buildPlan(prompt, folder)
    prompt.previewPlan = plan

    if (!sourceUrl) {
      report.push({ slug: prompt.slug, status: 'skipped', reason: 'missing_source_url' })
      continue
    }

    const body = new URLSearchParams()
    body.set('file', sourceUrl)
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      report.push({ slug: prompt.slug, status: 'failed', sourceUrl, error: payload?.error?.message || `HTTP ${response.status}` })
      continue
    }

    prompt.previewImage = buildCloudinaryUrl(cloudName, payload.public_id || publicId)
    prompt.previewAlt = prompt.previewAlt || `${prompt.title} preview image`
    report.push({ slug: prompt.slug, status: 'uploaded', sourceUrl, publicId: payload.public_id || publicId, imageUrl: prompt.previewImage })
  }

  await writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
  await writeFile(planPath, `${JSON.stringify(store.prompts.map((prompt) => prompt.previewPlan), null, 2)}\n`, 'utf8')
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const uploaded = report.filter((entry) => entry.status === 'uploaded').length
  const failed = report.filter((entry) => entry.status === 'failed').length
  const skipped = report.filter((entry) => entry.status === 'skipped').length
  console.log(`uploaded=${uploaded}`)
  console.log(`failed=${failed}`)
  console.log(`skipped=${skipped}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})






