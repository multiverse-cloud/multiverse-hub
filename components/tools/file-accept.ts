import type { Accept } from 'react-dropzone'

const EXTENSION_TO_MIME: Record<string, string> = {
  '.aac': 'audio/aac',
  '.avi': 'video/x-msvideo',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.flac': 'audio/flac',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.m4a': 'audio/mp4',
  '.mkv': 'video/x-matroska',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/opus',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

function normalizeExtension(extension: string): string {
  return extension.startsWith('.') ? extension.toLowerCase() : `.${extension.toLowerCase()}`
}

export function buildDropzoneAccept(acceptedFormats?: string[]): Accept | undefined {
  if (!acceptedFormats?.length) return undefined

  const accept: Accept = {}

  for (const format of acceptedFormats) {
    const extension = normalizeExtension(format)
    const mime = EXTENSION_TO_MIME[extension] || 'application/octet-stream'
    accept[mime] = [...(accept[mime] || []), extension]
  }

  return accept
}

export function formatAcceptedFormats(acceptedFormats?: string[]): string | undefined {
  if (!acceptedFormats?.length) return undefined

  return acceptedFormats
    .map(format => normalizeExtension(format).replace(/^\./, '').toUpperCase())
    .join(', ')
}
