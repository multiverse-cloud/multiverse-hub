export function getFilenameFromDisposition(disposition: string | null, fallback: string): string {
  if (!disposition) return fallback

  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i)
  if (utfMatch?.[1]) return decodeURIComponent(utfMatch[1])

  const basicMatch = disposition.match(/filename="([^"]+)"/i) || disposition.match(/filename=([^;]+)/i)
  if (basicMatch?.[1]) return basicMatch[1].trim()

  return fallback
}

export function getResponseFilename(response: Response, fallback: string): string {
  return getFilenameFromDisposition(response.headers.get('Content-Disposition'), fallback)
}

export function getFileExtension(filename: string, fallback = ''): string {
  const sanitized = filename.trim()
  const dotIndex = sanitized.lastIndexOf('.')
  if (dotIndex <= 0 || dotIndex === sanitized.length - 1) return fallback
  return sanitized.slice(dotIndex + 1).toLowerCase()
}

export function getBaseName(filename: string, fallback = 'download'): string {
  const sanitized = filename.trim().replace(/[<>:"/\\|?*\u0000-\u001F]+/g, '-')
  const withoutExtension = sanitized.replace(/\.[^.]+$/, '')
  return withoutExtension || fallback
}

export function buildOutputFilename(sourceFilename: string, suffix: string, extension: string): string {
  const normalizedExtension = extension.replace(/^\./, '')
  return `${getBaseName(sourceFilename)}-${suffix}.${normalizedExtension}`
}
