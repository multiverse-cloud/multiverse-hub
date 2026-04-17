export type CloudinaryConfig = {
  cloudName: string
  apiKey?: string
  apiSecret?: string
  uploadPreset?: string
  promptPreviewFolder: string
}

function readEnv(value?: string) {
  return value?.trim() || ''
}

export function getCloudinaryConfig(): CloudinaryConfig {
  return {
    cloudName: readEnv(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: readEnv(process.env.CLOUDINARY_API_KEY) || undefined,
    apiSecret: readEnv(process.env.CLOUDINARY_API_SECRET) || undefined,
    uploadPreset: readEnv(process.env.CLOUDINARY_UPLOAD_PRESET) || undefined,
    promptPreviewFolder: readEnv(process.env.CLOUDINARY_PROMPT_PREVIEW_FOLDER) || 'multiverse/prompt-previews',
  }
}

export function isCloudinaryConfigured() {
  const config = getCloudinaryConfig()
  return Boolean(config.cloudName && ((config.apiKey && config.apiSecret) || config.uploadPreset))
}

export function getCloudinaryPromptPreviewFolder() {
  return getCloudinaryConfig().promptPreviewFolder
}

export function buildCloudinaryPromptPreviewPublicId(slug: string) {
  return `${getCloudinaryPromptPreviewFolder()}/${slug}`
}

export function buildCloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'limit' | 'pad'
  }
) {
  const config = getCloudinaryConfig()
  if (!config.cloudName || !publicId) return ''

  const transforms = [
    'f_auto',
    'q_auto',
    options?.crop ? `c_${options.crop}` : 'c_fill',
    options?.width ? `w_${options.width}` : 'w_1400',
    options?.height ? `h_${options.height}` : 'h_900',
  ].join(',')

  return `https://res.cloudinary.com/${config.cloudName}/image/upload/${transforms}/${publicId}`
}
