import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const envPath = path.join(root, '.env.local')
const storePath = path.join(root, 'data', 'prompt-local-store.json')
const reportPath = path.join(root, 'data', 'prompt-preview-upload-report.json')
const imagesRoot = path.join(root, 'public')

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

function toLocalImagePath(previewImage) {
  return previewImage.startsWith('/') ? previewImage.slice(1) : previewImage
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

async function main() {
  const env = parseEnv(await readFile(envPath, 'utf8'))
  const cloudName = (env.CLOUDINARY_CLOUD_NAME || '').trim()
  const apiKey = (env.CLOUDINARY_API_KEY || '').trim()
  const apiSecret = (env.CLOUDINARY_API_SECRET || '').trim()
  const uploadPreset = (env.CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folder = (env.CLOUDINARY_PROMPT_PREVIEW_FOLDER || 'multiverse/prompt-previews').trim().replace(/\/$/, '')

  if (!cloudName) {
    throw new Error('Missing CLOUDINARY_CLOUD_NAME')
  }

  if (!uploadPreset && !(apiKey && apiSecret)) {
    throw new Error('Missing Cloudinary upload credentials or preset')
  }

  const store = JSON.parse((await readFile(storePath, 'utf8')).replace(/^\uFEFF/, ''))
  const report = []

  for (const prompt of store.prompts) {
    const currentPreview = String(prompt.previewImage || '').trim()
    const localRelativePath = toLocalImagePath(currentPreview)
    const localAbsolutePath = path.join(imagesRoot, localRelativePath)
    const publicId = `${folder}/${prompt.slug}`

    try {
      const payload = await uploadLocalImage({
        cloudName,
        apiKey,
        apiSecret,
        uploadPreset,
        publicId,
        filePath: localAbsolutePath,
      })

      prompt.previewImage = buildCloudinaryUrl(cloudName, payload.public_id || publicId)
      report.push({
        slug: prompt.slug,
        status: 'uploaded',
        localPath: currentPreview,
        publicId: payload.public_id || publicId,
        imageUrl: prompt.previewImage,
      })
    } catch (error) {
      report.push({
        slug: prompt.slug,
        status: 'failed',
        localPath: currentPreview,
        publicId,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  await writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const uploaded = report.filter(entry => entry.status === 'uploaded').length
  const failed = report.filter(entry => entry.status === 'failed').length

  console.log(`uploaded=${uploaded}`)
  console.log(`failed=${failed}`)

  if (failed > 0) {
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
