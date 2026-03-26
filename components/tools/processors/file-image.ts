import { formatBytes } from '@/lib/utils'
import type { FileProcessResult, FileResultMetric } from './types'
import { analyzeImagePalette, loadImage } from './image-palette'
import { buildOutputFilename, getFileExtension, getResponseFilename } from './file-download'

async function probeImageDetails(previewUrl: string) {
  const image = new window.Image()
  image.decoding = 'async'

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Unable to load generated image preview'))
    image.src = previewUrl
  })

  return { width: image.naturalWidth || image.width, height: image.naturalHeight || image.height }
}

async function buildImageResult(
  response: Response,
  fallbackFilename: string,
  outputText: string,
  extraMetrics: FileResultMetric[] = []
): Promise<FileProcessResult> {
  const outputBlob = await response.blob()
  const previewUrl = URL.createObjectURL(outputBlob)
  const outputFilename = getResponseFilename(response, fallbackFilename)
  const imageFormat = (outputBlob.type.split('/')[1] || getFileExtension(outputFilename, 'image')).toUpperCase()

  try {
    const details = await probeImageDetails(previewUrl)
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'image',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: imageFormat },
        { label: 'Dimensions', value: `${details.width} x ${details.height}` },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  } catch {
    return {
      outputBlob,
      outputFilename,
      previewUrl,
      previewType: 'image',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Format', value: imageFormat },
        { label: 'Size', value: formatBytes(outputBlob.size) },
        ...extraMetrics,
      ],
      output: outputText,
    }
  }
}

async function getCropFields(file: File, textInput: string) {
  const parts = textInput
    .split(/[,\sx]+/)
    .map(part => part.trim())
    .filter(Boolean)

  if (parts.length >= 4) {
    return { left: parts[0], top: parts[1], width: parts[2], height: parts[3] }
  }

  const image = await loadImage(file)
  const aspectMap: Record<string, number | null> = {
    square: 1,
    portrait: 4 / 5,
    story: 9 / 16,
    landscape: 16 / 9,
    original: null,
  }
  const normalizedAspect = textInput.trim().toLowerCase()
  if (normalizedAspect in aspectMap) {
    const requestedAspect = aspectMap[normalizedAspect]
    if (requestedAspect === null) {
      return {
        left: '0',
        top: '0',
        width: String(image.width),
        height: String(image.height),
      }
    }

    const sourceAspect = image.width / image.height
    if (sourceAspect > requestedAspect) {
      const width = Math.round(image.height * requestedAspect)
      return {
        left: String(Math.max(0, Math.round((image.width - width) / 2))),
        top: '0',
        width: String(width),
        height: String(image.height),
      }
    }

    const height = Math.round(image.width / requestedAspect)
    return {
      left: '0',
      top: String(Math.max(0, Math.round((image.height - height) / 2))),
      width: String(image.width),
      height: String(height),
    }
  }

  const size = Math.min(image.width, image.height)
  return {
    left: String(Math.floor((image.width - size) / 2)),
    top: String(Math.floor((image.height - size) / 2)),
    width: String(size),
    height: String(size),
  }
}

export async function handleImageTool({
  slug,
  file,
  textInput,
  ocrLang,
  imgQuality,
  imgConvertTo,
  resizeWidth,
  resizeHeight,
  resizeFit,
  blurStrength,
  blurTint,
  upscaleFactor,
}: {
  slug: string
  file: File
  textInput: string
  ocrLang: string
  imgQuality: string
  imgConvertTo: string
  resizeWidth?: string
  resizeHeight?: string
  resizeFit?: string
  blurStrength?: string
  blurTint?: string
  upscaleFactor?: string
}): Promise<FileProcessResult> {
  const formData = new FormData()
  formData.append('file', file)

  if (slug === 'image-to-text') {
    formData.append('lang', ocrLang)
    const response = await fetch('/api/tools/image/ocr', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error || data.hint }
    }
    const data = await response.json()
    return { output: `OCR Result (${data.confidence}% confidence, ${data.words} words):\n\n${data.text}` }
  }

  if (slug === 'compress-image') {
    formData.append('quality', imgQuality)
    const extension = getFileExtension(file.name, 'jpg')
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=compress',
      buildOutputFilename(file.name, 'compressed', extension),
      response => `Saved ${response.headers.get('X-Savings') || '?'}%`
    )
  }

  if (slug === 'convert-image') {
    formData.append('to', imgConvertTo)
    formData.append('quality', imgQuality)
    const extension = imgConvertTo === 'jpeg' ? 'jpg' : imgConvertTo
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=convert',
      buildOutputFilename(file.name, 'converted', extension),
      () => `Converted to ${imgConvertTo}`
    )
  }

  if (slug === 'resize-image') {
    const width = resizeWidth || textInput.split('x')[0] || '800'
    const height = resizeHeight || textInput.split('x')[1] || ''
    formData.append('width', width)
    if (height) formData.append('height', height)
    if (resizeFit) formData.append('fit', resizeFit)
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=resize',
      buildOutputFilename(file.name, 'resized', getFileExtension(file.name, 'jpg')),
      () => 'Resized'
    )
  }

  if (slug === 'crop-image') {
    const crop = await getCropFields(file, textInput)
    formData.append('left', crop.left)
    formData.append('top', crop.top)
    formData.append('width', crop.width)
    formData.append('height', crop.height)
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=crop',
      buildOutputFilename(file.name, 'cropped', getFileExtension(file.name, 'jpg')),
      () => `Cropped to ${crop.width}x${crop.height}`
    )
  }

  if (slug === 'remove-background') {
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=remove-bg',
      buildOutputFilename(file.name, 'no-bg', 'png'),
      () => 'Background removed'
    )
  }

  if (slug === 'blur-background') {
    if (blurStrength) formData.append('blur', blurStrength)
    if (blurTint) formData.append('tint', blurTint)
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=blur-background',
      buildOutputFilename(file.name, 'blurred', 'jpg'),
      () => 'Background blurred'
    )
  }

  if (slug === 'passport-photo-maker') {
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=passport-photo',
      buildOutputFilename(file.name, 'passport-photo', 'jpg'),
      () => 'Passport photo ready'
    )
  }

  if (slug === 'image-upscaler') {
    formData.append('factor', upscaleFactor || '2')
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=upscale',
      buildOutputFilename(file.name, `upscaled-${upscaleFactor || '2'}x`, getFileExtension(file.name, 'jpg')),
      response => `Upscaled ${response.headers.get('X-Upscale-Factor') || upscaleFactor || '2'}x`
    )
  }

  if (slug === 'add-watermark-image') {
    formData.append('text', textInput || 'Multiverse')
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=watermark',
      buildOutputFilename(file.name, 'watermarked', getFileExtension(file.name, 'jpg')),
      () => 'Watermark added'
    )
  }

  if (slug === 'flip-rotate-image') {
    formData.append('angle', textInput || '90')
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=rotate',
      buildOutputFilename(file.name, 'rotated', getFileExtension(file.name, 'jpg')),
      () => 'Completed'
    )
  }

  if (slug === 'svg-to-png') {
    formData.append('to', 'png')
    return fetchImageBlobResult(
      formData,
      '/api/tools/image?action=convert',
      buildOutputFilename(file.name, 'converted', 'png'),
      () => 'SVG converted to PNG'
    )
  }

  if (slug === 'favicon-generator') {
    const response = await fetch('/api/tools/image?action=favicon', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }
    return {
      outputBlob: await response.blob(),
      outputFilename: getResponseFilename(response, buildOutputFilename(file.name, 'favicon-pack', 'zip')),
      metrics: [
        { label: 'Pack', value: 'ICO + PNG' },
        { label: 'Includes', value: '16 to 512 px' },
      ],
      output: 'Generated favicon.ico plus modern app-icon PNGs in a ZIP pack',
    }
  }

  if (slug === 'color-picker') {
    const { colors, average } = await analyzeImagePalette(file, 10)
    const previewUrl = URL.createObjectURL(file)
    return {
      previewUrl,
      previewType: 'image',
      previewIsObjectUrl: true,
      metrics: [
        { label: 'Average', value: average },
        { label: 'Palette', value: `${colors.length} colors` },
      ],
      output: `Average color: ${average}\n\nDominant colors:\n${colors.map((color, index) => `${index + 1}. ${color}`).join('\n')}`,
    }
  }

  if (slug === 'image-to-base64') {
    return {
      output: await new Promise<string>(resolve => {
        const reader = new FileReader()
        reader.onload = event => resolve((event.target?.result as string) || '')
        reader.readAsDataURL(file)
      }),
    }
  }

  return { output: 'Image processed on server' }
}

async function fetchImageBlobResult(
  formData: FormData,
  url: string,
  outputFilename: string,
  getOutput: (response: Response) => string
): Promise<FileProcessResult> {
  const response = await fetch(url, { method: 'POST', body: formData })
  if (!response.ok) {
    const data = await response.json()
    return { apiError: data.error || data.hint }
  }
  const outputText = getOutput(response)
  const extraMetrics: FileResultMetric[] = []

  const savings = response.headers.get('X-Savings')
  if (savings) extraMetrics.push({ label: 'Saved', value: `${savings}%` })
  const upscaleFactor = response.headers.get('X-Upscale-Factor')
  if (upscaleFactor) extraMetrics.push({ label: 'Upscale', value: `${upscaleFactor}x` })

  return buildImageResult(response, outputFilename, outputText, extraMetrics)
}
