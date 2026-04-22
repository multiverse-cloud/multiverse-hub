import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const DETAILS_DIR = path.join(ROOT, 'data', 'template-details')
const EXPORT_DIR = path.join(ROOT, 'template-repo-export', 'templates')
const ENV_PATH = path.join(ROOT, '.env.local')
const TEMP_DIR = path.join(ROOT, '.tmp', 'portfolio-cloudinary')
const CAPTURE_DIR = path.join(TEMP_DIR, 'captures')
const PROFILE_DIR = path.join(TEMP_DIR, 'browser-profile')
const CRASH_DIR = path.join(TEMP_DIR, 'crash')
const PORTFOLIO_SLUGS = [
  'bug-hunter-developer-portfolio',
  'designer-folio-editorial-portfolio',
  'macos-desktop-portfolio-experience',
  'purple-wave-creative-portfolio',
  'retro-terminal-portfolio',
]

function stripUtf8Bom(value) {
  return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value
}

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
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_1600,h_1000/${publicId}`
}

function resolveBrowserPath() {
  const candidates = [
    process.env.TEMPLATE_PREVIEW_BROWSER,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate
    }
  }

  return ''
}

async function captureScreenshot({ browserPath, url, outputPath }) {
  const args = [
    `--user-data-dir=${PROFILE_DIR}`,
    `--crash-dumps-dir=${CRASH_DIR}`,
    '--no-first-run',
    '--disable-sync',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-component-update',
    '--disable-features=OptimizationGuideModelDownloading,MediaRouter',
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1440,1024',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=7000',
    `--screenshot=${outputPath}`,
    url,
  ]

  const result = spawnSync(browserPath, args, {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 90000,
  })

  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || '').trim() || `Browser exited with ${result.status}`)
  }

  const info = await stat(outputPath)
  if (!info.size) {
    throw new Error('Screenshot file was created but empty.')
  }
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
    throw new Error(payload?.error?.message || `Cloudinary upload failed with HTTP ${response.status}`)
  }

  return payload
}

async function loadJson(filePath) {
  return JSON.parse(stripUtf8Bom(await readFile(filePath, 'utf8')))
}

async function saveJson(filePath, payload) {
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

async function main() {
  const browserPath = resolveBrowserPath()
  if (!browserPath) {
    throw new Error('No supported browser executable found. Install Chrome/Edge or set TEMPLATE_PREVIEW_BROWSER.')
  }

  const env = fs.existsSync(ENV_PATH) ? parseEnv(await readFile(ENV_PATH, 'utf8')) : {}
  const cloudName = (env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim()
  const apiKey = (env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '').trim()
  const apiSecret = (env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '').trim()
  const uploadPreset = (env.CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folder = (
    env.CLOUDINARY_TEMPLATE_PREVIEW_FOLDER ||
    process.env.CLOUDINARY_TEMPLATE_PREVIEW_FOLDER ||
    'multiverse/template-cards/portfolio'
  )
    .trim()
    .replace(/\/$/, '')

  if (!cloudName) {
    throw new Error('Missing CLOUDINARY_CLOUD_NAME.')
  }

  if (!uploadPreset && !(apiKey && apiSecret)) {
    throw new Error('Missing Cloudinary upload credentials or preset.')
  }

  await mkdir(CAPTURE_DIR, { recursive: true })
  await mkdir(PROFILE_DIR, { recursive: true })
  await mkdir(CRASH_DIR, { recursive: true })

  const store = await loadJson(STORE_PATH)
  const results = []

  for (const slug of PORTFOLIO_SLUGS) {
    const previewPath = path.join(EXPORT_DIR, slug, 'preview.html')
    if (!fs.existsSync(previewPath)) {
      throw new Error(`Preview file not found for ${slug}`)
    }

    const screenshotPath = path.join(CAPTURE_DIR, `${slug}.png`)
    const previewUrl = `file:///${previewPath.replace(/\\/g, '/')}`

    await captureScreenshot({
      browserPath,
      url: previewUrl,
      outputPath: screenshotPath,
    })

    const publicId = `${folder}/${slug}`
    const payload = await uploadLocalImage({
      cloudName,
      apiKey,
      apiSecret,
      uploadPreset,
      publicId,
      filePath: screenshotPath,
    })

    const cloudinaryUrl = buildCloudinaryUrl(cloudName, payload.public_id || publicId)
    const capturedAt = new Date().toISOString()

    const template = Array.isArray(store.templates) ? store.templates.find(entry => entry.slug === slug) : null
    if (template) {
      template.previewImage = cloudinaryUrl
      template.previewCapturedAt = capturedAt
    }

    const detailPath = path.join(DETAILS_DIR, `${slug}.json`)
    if (fs.existsSync(detailPath)) {
      const detail = await loadJson(detailPath)
      detail.previewImage = cloudinaryUrl
      detail.previewCapturedAt = capturedAt
      await saveJson(detailPath, detail)
    }

    const exportMetadataPath = path.join(EXPORT_DIR, slug, 'metadata.json')
    if (fs.existsSync(exportMetadataPath)) {
      const metadata = await loadJson(exportMetadataPath)
      metadata.previewImage = cloudinaryUrl
      metadata.previewCapturedAt = capturedAt
      await saveJson(exportMetadataPath, metadata)
    }

    results.push({
      slug,
      screenshotPath,
      cloudinaryUrl,
    })
  }

  await saveJson(STORE_PATH, store)

  console.log(JSON.stringify({ uploaded: results.length, results }, null, 2))
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
