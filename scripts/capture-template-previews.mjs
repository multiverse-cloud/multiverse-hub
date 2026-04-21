import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const STORE_PATH = path.join(ROOT, 'data', 'template-local-store.json')
const ENV_PATH = path.join(ROOT, '.env.local')
const OUTPUT_DIR = path.join(ROOT, 'public', 'template-previews')
const REPORT_PATH = path.join(ROOT, 'data', 'template-preview-capture-report.json')
const DEFAULT_BASE_URL = ''
const DEFAULT_FOLDER = 'multiverse/template-previews'

function parseArgs(argv) {
  const options = {
    slugs: [],
    overwrite: false,
    uploadCloudinary: false,
    baseUrl: DEFAULT_BASE_URL,
    limit: 0,
  }

  for (const arg of argv) {
    if (arg === '--overwrite') options.overwrite = true
    else if (arg === '--upload-cloudinary') options.uploadCloudinary = true
    else if (arg.startsWith('--base-url=')) options.baseUrl = arg.slice('--base-url='.length).trim()
    else if (arg.startsWith('--slugs=')) {
      options.slugs = arg
        .slice('--slugs='.length)
        .split(',')
        .map(value => value.trim())
        .filter(Boolean)
    } else if (arg.startsWith('--limit=')) {
      const value = Number(arg.slice('--limit='.length))
      options.limit = Number.isFinite(value) && value > 0 ? value : 0
    }
  }

  return options
}

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
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate
    }
  }

  return ''
}

function resolveLiveUrl(template, baseUrl) {
  if (template.liveUrl) return String(template.liveUrl).trim()
  if (!baseUrl) return ''
  return `${baseUrl.replace(/\/+$/, '')}/${template.slug}`
}

async function captureScreenshot({ browserPath, url, outputPath }) {
  const attempts = [
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1440,1024',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=5000',
      `--screenshot=${outputPath}`,
      url,
    ],
    [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--window-size=1440,1024',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=5000',
      `--screenshot=${outputPath}`,
      url,
    ],
  ]

  let lastError = ''

  for (const args of attempts) {
    const result = spawnSync(browserPath, args, {
      cwd: ROOT,
      encoding: 'utf8',
      timeout: 45000,
    })

    if (result.status === 0 && fs.existsSync(outputPath)) {
      const info = await stat(outputPath)
      if (info.size > 0) return
    }

    lastError = (result.stderr || result.stdout || '').trim() || `exit ${result.status}`
  }

  throw new Error(lastError || 'Browser screenshot capture failed.')
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
  const options = parseArgs(process.argv.slice(2))
  const browserPath = resolveBrowserPath()

  if (!browserPath) {
    throw new Error('No supported browser executable found. Set TEMPLATE_PREVIEW_BROWSER or install Edge/Chrome.')
  }

  const rawStore = await readFile(STORE_PATH, 'utf8')
  const store = JSON.parse(stripUtf8Bom(rawStore))
  const templates = Array.isArray(store.templates) ? store.templates : []
  const env = fs.existsSync(ENV_PATH) ? parseEnv(await readFile(ENV_PATH, 'utf8')) : {}

  const cloudName = (env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim()
  const apiKey = (env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '').trim()
  const apiSecret = (env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '').trim()
  const uploadPreset = (env.CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET || '').trim()
  const folder = (env.CLOUDINARY_TEMPLATE_PREVIEW_FOLDER || process.env.CLOUDINARY_TEMPLATE_PREVIEW_FOLDER || DEFAULT_FOLDER)
    .trim()
    .replace(/\/$/, '')

  if (options.uploadCloudinary && !cloudName) {
    throw new Error('Missing CLOUDINARY_CLOUD_NAME for template preview upload.')
  }

  if (options.uploadCloudinary && !uploadPreset && !(apiKey && apiSecret)) {
    throw new Error('Missing Cloudinary upload credentials or preset for template previews.')
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  const selectedTemplates = templates
    .filter(template => (options.slugs.length ? options.slugs.includes(template.slug) : true))
    .filter(template => resolveLiveUrl(template, options.baseUrl))
    .slice(0, options.limit > 0 ? options.limit : undefined)

  if (selectedTemplates.length === 0) {
    console.log('captured=0')
    console.log('uploaded=0')
    console.log('skipped=0')
    console.log('failed=0')
    return
  }

  const report = []
  let captured = 0
  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const template of selectedTemplates) {
    const localImagePath = path.join(OUTPUT_DIR, `${template.slug}.png`)
    const publicImagePath = `/template-previews/${template.slug}.png`
    const liveUrl = resolveLiveUrl(template, options.baseUrl)

    if (!options.overwrite && template.previewImage && String(template.previewImage).trim()) {
      skipped += 1
      report.push({
        slug: template.slug,
        status: 'skipped',
        reason: 'preview_exists',
        liveUrl,
        previewImage: template.previewImage,
      })
      continue
    }

    try {
      await captureScreenshot({
        browserPath,
        url: liveUrl,
        outputPath: localImagePath,
      })

      captured += 1
      template.liveUrl = liveUrl
      template.previewImage = publicImagePath
      template.previewCapturedAt = new Date().toISOString()

      if (options.uploadCloudinary) {
        const publicId = `${folder}/${template.slug}`
        const payload = await uploadLocalImage({
          cloudName,
          apiKey,
          apiSecret,
          uploadPreset,
          publicId,
          filePath: localImagePath,
        })
        template.previewImage = buildCloudinaryUrl(cloudName, payload.public_id || publicId)
        uploaded += 1
      }

      report.push({
        slug: template.slug,
        status: 'captured',
        liveUrl,
        previewImage: template.previewImage,
        localImagePath: publicImagePath,
      })
    } catch (error) {
      failed += 1
      report.push({
        slug: template.slug,
        status: 'failed',
        liveUrl,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  await writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
  await writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(`captured=${captured}`)
  console.log(`uploaded=${uploaded}`)
  console.log(`skipped=${skipped}`)
  console.log(`failed=${failed}`)

  if (failed > 0) {
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
