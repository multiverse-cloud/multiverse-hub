import { formatBytes } from '@/lib/utils'
import type { FilePreviewType, FileProcessResult, FileResultMetric } from './types'
import { buildOutputFilename, getBaseName, getResponseFilename } from './file-download'

function getExtension(filename: string) {
  const extension = filename.includes('.') ? filename.split('.').pop() : ''
  return extension ? extension.toUpperCase() : 'FILE'
}

async function buildPdfBinaryResult(
  response: Response,
  fallbackFilename: string,
  output: string,
  extraMetrics: FileResultMetric[] = [],
  previewType: FilePreviewType | null = 'pdf'
): Promise<FileProcessResult> {
  const outputBlob = await response.blob()
  const outputFilename = getResponseFilename(response, fallbackFilename)
  const metrics = [
    { label: 'Format', value: getExtension(outputFilename) },
    { label: 'Size', value: formatBytes(outputBlob.size) },
    ...extraMetrics,
  ]

  if (!previewType) {
    return { outputBlob, outputFilename, metrics, output }
  }

  return {
    outputBlob,
    outputFilename,
    previewUrl: URL.createObjectURL(outputBlob),
    previewType,
    previewIsObjectUrl: true,
    metrics,
    output,
  }
}

export async function handlePdfTool({
  slug,
  files,
  textInput,
  pdfAngle,
}: {
  slug: string
  files: File[]
  textInput: string
  pdfAngle: string
}): Promise<FileProcessResult> {
  const formData = new FormData()
  const actionMap: Record<string, string> = {
    'merge-pdf': '/api/tools/pdf/merge',
    'split-pdf': '/api/tools/pdf/split',
    'compress-pdf': '/api/tools/pdf/compress',
  }

  if (slug === 'merge-pdf') {
    files.forEach(file => formData.append('files', file))
    const response = await fetch(actionMap[slug], { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(response, 'merged.pdf', `Merged ${files.length} PDFs`, [
      { label: 'Sources', value: `${files.length}` },
      { label: 'Output', value: 'Single PDF' },
    ])
  }

  if (slug === 'split-pdf') {
    formData.append('file', files[0])
    const range = textInput.trim()
    formData.append('mode', range ? 'range' : 'all')
    if (range) formData.append('range', range)
    const response = await fetch(actionMap[slug], { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      buildOutputFilename(files[0].name, 'pages', 'zip'),
      range ? `Split selected pages from ${range}` : 'Split all pages into a ZIP archive',
      [
        { label: 'Mode', value: range ? 'Custom range' : 'All pages' },
        { label: 'Range', value: range || 'Every page' },
      ],
      null
    )
  }

  if (slug === 'compress-pdf') {
    formData.append('file', files[0])
    const response = await fetch(actionMap[slug], { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    const savings = response.headers.get('X-Savings-Percent') || '?'
    return buildPdfBinaryResult(
      response,
      buildOutputFilename(files[0].name, 'compressed', 'pdf'),
      `Compressed (${savings}% smaller)`,
      [{ label: 'Saved', value: `${savings}%` }]
    )
  }

  if (slug === 'rotate-pdf') {
    formData.append('file', files[0])
    formData.append('angle', pdfAngle)
    const response = await fetch('/api/tools/pdf/transform?action=rotate', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      buildOutputFilename(files[0].name, 'rotated', 'pdf'),
      `Rotated ${pdfAngle} degrees`,
      [{ label: 'Rotation', value: `${pdfAngle} deg` }]
    )
  }

  if (slug === 'pdf-watermark') {
    formData.append('file', files[0])
    formData.append('text', textInput || 'CONFIDENTIAL')
    const response = await fetch('/api/tools/pdf/transform?action=watermark', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      buildOutputFilename(files[0].name, 'watermarked', 'pdf'),
      'Watermark added',
      [{ label: 'Watermark', value: (textInput || 'CONFIDENTIAL').slice(0, 24) }]
    )
  }

  if (slug === 'pdf-metadata') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/pdf/transform?action=metadata', { method: 'POST', body: formData })
    const data = await response.json()
    return {
      metrics: [
        { label: 'Pages', value: String(data.pageCount || 0) },
        { label: 'Encrypted', value: data.encrypted ? 'Yes' : 'No' },
        { label: 'Creator', value: data.creator || 'Unknown' },
      ],
      output: [
        `Filename: ${files[0].name}`,
        `Pages: ${data.pageCount || 0}`,
        `Title: ${data.title || 'Untitled'}`,
        `Author: ${data.author || 'Unknown'}`,
        `Subject: ${data.subject || 'None'}`,
        `Creator: ${data.creator || 'Unknown'}`,
        `Producer: ${data.producer || 'Unknown'}`,
        `Encrypted: ${data.encrypted ? 'Yes' : 'No'}`,
        `Created: ${data.creationDate || 'Unknown'}`,
        `Modified: ${data.modificationDate || 'Unknown'}`,
      ].join('\n'),
    }
  }

  if (slug === 'jpg-to-pdf') {
    files.forEach(file => formData.append('files', file))
    const response = await fetch('/api/tools/pdf/transform?action=images-to-pdf', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      files.length === 1
        ? `${getBaseName(files[0].name)}.pdf`
        : 'images-to-pdf.pdf',
      `Converted ${files.length} image${files.length === 1 ? '' : 's'} to PDF`,
      [{ label: 'Images', value: `${files.length}` }]
    )
  }

  if (slug === 'word-to-pdf') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/pdf/transform?action=word-to-pdf', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      `${getBaseName(files[0].name)}.pdf`,
      'Word document converted to PDF',
      [{ label: 'Source', value: 'Word' }]
    )
  }

  if (slug === 'pdf-to-text') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/pdf/transform?action=pdf-to-text', { method: 'POST', body: formData })
    const data = await response.json()
    if (!response.ok) return { apiError: data.error }
    return {
      metrics: [
        { label: 'Words', value: String(data.words || 0) },
        { label: 'Characters', value: String(data.characters || 0) },
        { label: 'Format', value: 'TXT' },
      ],
      output: data.text as string,
    }
  }

  if (slug === 'pdf-to-word') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/pdf/transform?action=pdf-to-word', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      `${getBaseName(files[0].name)}.doc`,
      'Extracted text exported as a Word-compatible document',
      [{ label: 'Output', value: 'DOC' }],
      null
    )
  }

  if (slug === 'pdf-to-jpg') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/pdf/transform?action=pdf-to-jpg', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    const isZip = response.headers.get('Content-Type') === 'application/zip'
    return buildPdfBinaryResult(
      response,
      isZip
        ? buildOutputFilename(files[0].name, 'pages', 'zip')
        : buildOutputFilename(files[0].name, 'page-1', 'jpg'),
      isZip ? 'Converted PDF pages to JPG files in a ZIP archive' : 'Converted first PDF page to JPG',
      [{ label: 'Output', value: isZip ? 'ZIP of JPGs' : 'JPG image' }],
      isZip ? null : 'image'
    )
  }

  if (slug === 'protect-pdf' || slug === 'unlock-pdf') {
    formData.append('file', files[0])
    formData.append('password', textInput.trim())
    const response = await fetch(`/api/tools/pdf/transform?action=${slug === 'protect-pdf' ? 'protect' : 'unlock'}`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return buildPdfBinaryResult(
      response,
      buildOutputFilename(files[0].name, slug === 'protect-pdf' ? 'protected' : 'unlocked', 'pdf'),
      slug === 'protect-pdf' ? 'Password protection added' : 'Password removed from PDF',
      [{ label: 'Security', value: slug === 'protect-pdf' ? 'Protected' : 'Unlocked' }]
    )
  }

  return { output: 'PDF processed on server' }
}
