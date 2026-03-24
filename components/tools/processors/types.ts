export interface TextProcessResult {
  output?: string
  imagePreview?: string
  outputBlob?: Blob
  outputFilename?: string
  apiError?: string
}

export type FilePreviewType = 'image' | 'video' | 'audio' | 'pdf'

export interface FileResultMetric {
  label: string
  value: string
}

export interface FileProcessResult {
  output?: string
  outputBlob?: Blob
  outputFilename?: string
  previewUrl?: string
  previewType?: FilePreviewType
  previewIsObjectUrl?: boolean
  metrics?: FileResultMetric[]
  imagePreviewUrl?: string
  imagePreviewIsObjectUrl?: boolean
  apiError?: string
}
