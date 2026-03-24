'use client'

import { extractPdfTextWithOcr, renderPdfPreviewImages } from './pdf-browser'

export async function extractPdfTextFromServer(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/tools/pdf/transform?action=pdf-to-text', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Could not read text from this PDF')
  }

  return data as {
    text: string
    words?: number
    characters?: number
  }
}

export async function extractPdfDocumentText(
  file: File,
  options: {
    useOcr?: boolean
    lang?: string
    onProgress?: (details: {
      phase: 'extract' | 'ocr-render' | 'ocr-read'
      currentPage?: number
      totalPages?: number
    }) => void
  } = {}
) {
  if (options.useOcr) {
    const result = await extractPdfTextWithOcr(file, {
      lang: options.lang || 'eng',
      onProgress: details => {
        options.onProgress?.({
          phase: details.phase === 'render' ? 'ocr-render' : 'ocr-read',
          currentPage: details.currentPage,
          totalPages: details.totalPages,
        })
      },
    })

    return {
      text: result.text,
      totalPages: result.totalPages,
      source: 'ocr' as const,
    }
  }

  options.onProgress?.({ phase: 'extract' })
  const result = await extractPdfTextFromServer(file)

  return {
    text: result.text,
    totalPages: 0,
    source: 'text-layer' as const,
  }
}

export async function callAiTextTool(
  tool: 'summarize' | 'translate',
  input: string,
  options: {
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
  } = {}
) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tool,
      input,
      systemPrompt: options.systemPrompt,
      temperature: options.temperature,
      maxTokens: options.maxTokens,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'AI request failed')
  }

  return String(data.result || '').trim()
}

export async function exportTextAsWordDocument(
  text: string,
  options: {
    title: string
    mode?: 'layout' | 'text' | 'editable'
  }
) {
  const formData = new FormData()
  formData.append('mode', options.mode || 'editable')
  formData.append('ocr', 'true')
  formData.append('ocrText', text)
  formData.append('title', options.title)

  const response = await fetch('/api/tools/pdf/transform?action=pdf-to-word', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Could not export Word document')
  }

  return {
    blob: await response.blob(),
    filename: response.headers.get('Content-Disposition')?.match(/filename="?([^"]+)"?/)?.[1] || `${options.title}.doc`,
  }
}

export function downloadTextFile(filename: string, text: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export async function loadWordPreviewText(file: File) {
  const ext = file.name.toLowerCase().split('.').pop()
  if (ext !== 'docx') {
    return {
      preview: '',
      supported: false,
    }
  }

  const mammothModule = await import('mammoth/mammoth.browser')
  const mammoth = mammothModule.default ?? mammothModule
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
  const cleaned = String(result.value || '')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return {
    preview: cleaned,
    supported: true,
  }
}

function dataUrlToBlob(dataUrl: string) {
  const [header, payload] = dataUrl.split(',')
  const mime = header.match(/data:(.*?);base64/)?.[1] || 'image/jpeg'
  const binary = atob(payload)
  const array = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    array[index] = binary.charCodeAt(index)
  }

  return new Blob([array], { type: mime })
}

export async function exportPdfPagesAsJpg(
  file: File,
  options: {
    pageNumbers?: number[]
    scale?: number
    quality?: number
    zipBaseName?: string
    onProgress?: (current: number, total: number) => void
  } = {}
) {
  const images = await renderPdfPreviewImages(file, {
    pageNumbers: options.pageNumbers,
    maxPages: options.pageNumbers?.length || 999,
    scale: options.scale || 1.6,
    quality: options.quality || 0.9,
  })

  if (images.pages.length === 0) {
    throw new Error('No pages were available for export')
  }

  if (images.pages.length === 1) {
    return {
      blob: dataUrlToBlob(images.pages[0].src),
      filename: `${options.zipBaseName || file.name.replace(/\.pdf$/i, '')}-page-${images.pages[0].pageNumber}.jpg`,
      pages: images.pages.length,
    }
  }

  const jszipModule = await import('jszip')
  const JSZip = jszipModule.default
  const zip = new JSZip()
  const baseName = options.zipBaseName || file.name.replace(/\.pdf$/i, '')

  images.pages.forEach((page, index) => {
    zip.file(`${baseName}-page-${page.pageNumber}.jpg`, dataUrlToBlob(page.src))
    options.onProgress?.(index + 1, images.pages.length)
  })

  return {
    blob: await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }),
    filename: `${baseName}-jpg-pages.zip`,
    pages: images.pages.length,
  }
}

export function parsePageSelection(value: string, totalPages: number) {
  const parts = value
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  const pages = new Set<number>()

  for (const part of parts) {
    const [startText, endText] = part.split('-').map(item => item.trim())
    const start = Number.parseInt(startText, 10)
    const end = endText ? Number.parseInt(endText, 10) : start

    if (!Number.isFinite(start) || !Number.isFinite(end)) continue

    const from = Math.max(1, Math.min(start, end))
    const to = totalPages > 0 ? Math.min(totalPages, Math.max(start, end)) : Math.max(start, end)

    for (let page = from; page <= to; page += 1) {
      pages.add(page)
    }
  }

  return Array.from(pages).sort((left, right) => left - right)
}
