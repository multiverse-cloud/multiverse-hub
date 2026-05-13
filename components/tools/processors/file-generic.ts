import { formatBytes } from '@/lib/utils'
import type { FileProcessResult } from './types'
import { getResponseFilename } from './file-download'

export async function handleGenericFileTool({
  slug,
  files,
  textInput,
}: {
  slug: string
  files: File[]
  textInput: string
}): Promise<FileProcessResult> {
  const formData = new FormData()

  if (slug === 'zip-creator') {
    files.forEach(file => formData.append('files', file))
    if (textInput.trim()) formData.append('archiveName', textInput.trim())
    const response = await fetch('/api/tools/file?action=zip', { method: 'POST', body: formData })
    if (!response.ok) {
      const data = await response.json()
      return { apiError: data.error }
    }

    const outputFilename = getResponseFilename(
      response,
      textInput.trim() ? `${textInput.trim()}.zip` : 'archive.zip'
    )
    const outputBlob = await response.blob()

    return {
      outputBlob,
      outputFilename,
      metrics: [
        { label: 'Archive', value: 'ZIP' },
        { label: 'Items', value: `${files.length}` },
        { label: 'Size', value: formatBytes(outputBlob.size) },
      ],
      output: `ZIP created with ${files.length} ${files.length === 1 ? 'file' : 'files'}`,
    }
  }

  if (slug === 'file-hash-checker') {
    formData.append('file', files[0])
    if (textInput.trim()) formData.append('expected', textInput.trim())
    const response = await fetch('/api/tools/file?action=hash', { method: 'POST', body: formData })
    const data = await response.json()
    if (!response.ok) return { apiError: data.error }

    return {
      metrics: [
        { label: 'Type', value: data.mimeType || 'Unknown' },
        { label: 'Size', value: formatBytes(data.size) },
        ...(data.verify
          ? [
              {
                label: 'Verify',
                value: data.verify.match
                  ? `Matched ${String(data.verify.algorithm).toUpperCase()}`
                  : 'Mismatch',
              },
            ]
          : []),
      ],
      output: [
        `File: ${data.filename}`,
        `Type: ${data.mimeType || 'Unknown'}`,
        `Size: ${formatBytes(data.size)}`,
        '',
        'SHA-256',
        data.hashes.sha256,
        '',
        'SHA-512',
        data.hashes.sha512,
        '',
        'SHA-1',
        data.hashes.sha1,
        '',
        'MD5',
        data.hashes.md5,
        ...(data.verify
          ? [
              '',
              'Verification',
              `Expected: ${data.verify.expected}`,
              `Algorithm: ${data.verify.algorithm ? String(data.verify.algorithm).toUpperCase() : 'None'}`,
              `Result: ${data.verify.match ? 'Matched' : 'Mismatch'}`,
            ]
          : []),
      ].join('\n'),
    }
  }

  if (slug === 'file-metadata-viewer') {
    formData.append('file', files[0])
    const response = await fetch('/api/tools/file?action=metadata', { method: 'POST', body: formData })
    const data = await response.json()
    if (!response.ok) return { apiError: data.error }

    return {
      metrics: [
        { label: 'Type', value: data.detectedType || 'Unknown' },
        { label: 'Extension', value: data.extension || 'None' },
        { label: 'Size', value: formatBytes(data.size) },
      ],
      output: [
        `Filename: ${data.filename}`,
        `Detected Type: ${data.detectedType || 'Unknown'}`,
        `Mime Type: ${data.mimeType || 'Unknown'}`,
        `Extension: ${data.extension || 'None'}`,
        `Size: ${formatBytes(data.size)}`,
        `Magic Bytes: ${data.magicBytes}`,
        `Created: ${data.createdAt}`,
        '',
        'MD5',
        data.md5,
      ].join('\n'),
    }
  }

  return { output: 'Processing complete' }
}
