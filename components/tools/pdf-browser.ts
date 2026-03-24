'use client'

import { useEffect, useState } from 'react'

const PDF_JS_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38'
const PDF_JS_MODULE_URL = `${PDF_JS_BASE_URL}/pdf.min.mjs`
const PDF_JS_WORKER_URL = `${PDF_JS_BASE_URL}/pdf.worker.min.mjs`

export type PdfPreviewImage = {
  pageNumber: number
  src: string
  width: number
  height: number
}

type PdfJsModule = {
  getDocument: (
    source: { data: Uint8Array }
  ) => {
    promise: Promise<PdfJsDocument>
    destroy?: () => void
  }
  GlobalWorkerOptions: {
    workerSrc: string
  }
}

type PdfJsDocument = {
  numPages: number
  getPage: (pageNumber: number) => Promise<PdfJsPage>
  cleanup?: () => void
  destroy?: () => void
}

type PdfJsPage = {
  getViewport: (options: { scale: number }) => {
    width: number
    height: number
  }
  render: (options: {
    canvasContext: CanvasRenderingContext2D
    viewport: {
      width: number
      height: number
    }
  }) => {
    promise: Promise<void>
  }
  cleanup?: () => void
}

let pdfJsPromise: Promise<PdfJsModule> | null = null

async function loadPdfJs(): Promise<PdfJsModule> {
  if (pdfJsPromise) return pdfJsPromise

  pdfJsPromise = import(
    /* webpackIgnore: true */
    PDF_JS_MODULE_URL
  )
    .then(module => {
      const candidate = (module as { default?: unknown }).default ?? module
      const pdfjs = candidate as PdfJsModule
      pdfjs.GlobalWorkerOptions.workerSrc = PDF_JS_WORKER_URL
      return pdfjs
    })
    .catch(error => {
      pdfJsPromise = null
      throw error
    })

  return pdfJsPromise
}

async function openPdfDocument(source: Blob | File) {
  const pdfjs = await loadPdfJs()
  const bytes = new Uint8Array(await source.arrayBuffer())
  const loadingTask = pdfjs.getDocument({ data: bytes })
  const document = await loadingTask.promise

  return {
    document,
    destroy: () => {
      document.cleanup?.()
      document.destroy?.()
      loadingTask.destroy?.()
    },
  }
}

async function renderPageImage(page: PdfJsPage, scale: number, quality = 0.86) {
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas preview is not available in this browser')
  }

  canvas.width = Math.ceil(viewport.width)
  canvas.height = Math.ceil(viewport.height)

  await page.render({ canvasContext: context, viewport }).promise

  return {
    src: canvas.toDataURL('image/jpeg', quality),
    width: canvas.width,
    height: canvas.height,
  }
}

async function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob)
        else reject(new Error('Could not create OCR image'))
      },
      'image/jpeg',
      0.92
    )
  })
}

export async function renderPdfPreviewImages(
  source: Blob | File,
  options: {
    maxPages?: number
    scale?: number
    quality?: number
    pageNumbers?: number[]
  } = {}
) {
  const { maxPages = 4, scale = 0.42, quality = 0.86, pageNumbers } = options
  const { document: pdfDocument, destroy } = await openPdfDocument(source)

  try {
    const totalPages = pdfDocument.numPages
    const pages: PdfPreviewImage[] = []
    const requestedPages = pageNumbers?.length
      ? pageNumbers.filter(pageNumber => pageNumber >= 1 && pageNumber <= totalPages)
      : Array.from({ length: Math.min(totalPages, maxPages) }, (_, index) => index + 1)

    for (const pageNumber of requestedPages) {
      const page = await pdfDocument.getPage(pageNumber)
      const image = await renderPageImage(page, scale, quality)
      pages.push({
        pageNumber,
        ...image,
      })
      page.cleanup?.()
    }

    return {
      pages,
      totalPages,
    }
  } finally {
    destroy()
  }
}

export async function extractPdfTextWithOcr(
  source: Blob | File,
  options: {
    lang?: string
    scale?: number
    onProgress?: (details: {
      phase: 'render' | 'ocr'
      currentPage: number
      totalPages: number
    }) => void
  } = {}
) {
  const { lang = 'eng', scale = 1.45, onProgress } = options
  const { document: pdfDocument, destroy } = await openPdfDocument(source)

  try {
    const totalPages = pdfDocument.numPages
    const segments: string[] = []

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      onProgress?.({ phase: 'render', currentPage: pageNumber, totalPages })

      const page = await pdfDocument.getPage(pageNumber)
      const viewport = page.getViewport({ scale })
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Canvas OCR is not available in this browser')
      }

      canvas.width = Math.ceil(viewport.width)
      canvas.height = Math.ceil(viewport.height)

      await page.render({ canvasContext: context, viewport }).promise
      page.cleanup?.()

      onProgress?.({ phase: 'ocr', currentPage: pageNumber, totalPages })

      const blob = await canvasToBlob(canvas)
      const formData = new FormData()
      formData.append('file', new File([blob], `page-${pageNumber}.jpg`, { type: 'image/jpeg' }))
      formData.append('lang', lang)

      const response = await fetch('/api/tools/image/ocr', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || `OCR failed on page ${pageNumber}`)
      }

      const data = (await response.json()) as {
        text?: string
      }

      if (data.text?.trim()) {
        segments.push(data.text.trim())
      }
    }

    return {
      text: segments.join('\n\n').trim(),
      totalPages,
    }
  } finally {
    destroy()
  }
}

export function usePdfPreviewData(
  source: Blob | File | null,
  options: {
    maxPages?: number
    scale?: number
    quality?: number
    pageNumbers?: number[]
  } = {}
) {
  const { maxPages = 4, scale = 0.42, quality = 0.86, pageNumbers } = options
  const [pages, setPages] = useState<PdfPreviewImage[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (!source) {
      setPages([])
      setTotalPages(0)
      setLoading(false)
      setError('')
      setPreviewUrl('')
      return
    }

    const nextPreviewUrl = URL.createObjectURL(source)
    let cancelled = false

    setPreviewUrl(nextPreviewUrl)
    setLoading(true)
    setError('')

    renderPdfPreviewImages(source, { maxPages, scale, quality, pageNumbers })
      .then(result => {
        if (cancelled) return
        setPages(result.pages)
        setTotalPages(result.totalPages)
      })
      .catch(error => {
        if (cancelled) return
        setPages([])
        setTotalPages(0)
        setError(error instanceof Error ? error.message : 'Preview unavailable')
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [source, maxPages, scale, quality, pageNumbers])

  return {
    pages,
    totalPages,
    loading,
    error,
    previewUrl,
  }
}
