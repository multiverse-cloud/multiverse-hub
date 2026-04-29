import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { guardAdminWriteRequest } from '@/lib/admin-api-guard'
import {
  buildCloudinaryImageUrl,
  buildCloudinaryPromptPreviewPublicId,
  getCloudinaryConfig,
  isCloudinaryConfigured,
} from '@/lib/cloudinary'
import { slugify } from '@/lib/utils'

export const runtime = 'nodejs'

function jsonError(error: string, status: number, code?: string, details?: string) {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
      details,
    },
    { status }
  )
}

function createCloudinarySignature(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex')
}

async function uploadImageToCloudinary(file: File, slug: string) {
  const config = getCloudinaryConfig()

  if (!config.cloudName) {
    throw new Error('Cloudinary cloud name is missing.')
  }

  const publicId = buildCloudinaryPromptPreviewPublicId(slug)
  const formData = new FormData()
  formData.append('file', file, file.name || `${slug}.png`)
  formData.append('public_id', publicId)
  formData.append('overwrite', 'true')

  if (config.apiKey && config.apiSecret) {
    const timestamp = String(Math.floor(Date.now() / 1000))
    const signedParams: Record<string, string> = {
      overwrite: 'true',
      public_id: publicId,
      timestamp,
    }

    if (config.uploadPreset) {
      signedParams.upload_preset = config.uploadPreset
      formData.append('upload_preset', config.uploadPreset)
    }

    formData.append('api_key', config.apiKey)
    formData.append('timestamp', timestamp)
    formData.append('signature', createCloudinarySignature(signedParams, config.apiSecret))
  } else if (config.uploadPreset) {
    formData.append('upload_preset', config.uploadPreset)
  } else {
    throw new Error('Cloudinary upload is not fully configured. Add an upload preset or API key and secret.')
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  const payload = (await response.json()) as {
    secure_url?: string
    public_id?: string
    error?: { message?: string }
  }

  if (!response.ok) {
    throw new Error(payload.error?.message || 'Cloudinary upload failed.')
  }

  const uploadedPublicId = payload.public_id || publicId
  const transformedUrl = buildCloudinaryImageUrl(uploadedPublicId, {
    width: 1400,
    height: 900,
    crop: 'fill',
  })

  return {
    publicId: uploadedPublicId,
    secureUrl: payload.secure_url || transformedUrl,
    imageUrl: transformedUrl || payload.secure_url || '',
  }
}

export async function POST(request: NextRequest) {
  try {
    const blocked = await guardAdminWriteRequest(request, {
      key: 'prompt-upload',
      maxRequests: 20,
      maxBytes: 12 * 1024 * 1024,
    })

    if (blocked) return blocked

    if (!isCloudinaryConfigured()) {
      return jsonError(
        'Cloudinary is not configured. Add cloud name and either an upload preset or API key/secret.',
        400,
        'cloudinary_not_configured'
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const slugValue = String(formData.get('slug') || formData.get('title') || '').trim()
    const slug = slugify(slugValue || `prompt-preview-${Date.now()}`)

    if (!(file instanceof File)) {
      return jsonError('Choose an image file before uploading.', 400, 'missing_image_file')
    }

    if (!file.type.startsWith('image/')) {
      return jsonError('Only image uploads are supported for prompt previews.', 400, 'invalid_image_type')
    }

    if (file.size > 10 * 1024 * 1024) {
      return jsonError('Image is too large. Upload a preview under 10 MB.', 413, 'image_too_large')
    }

    const upload = await uploadImageToCloudinary(file, slug)

    return NextResponse.json({
      success: true,
      message: 'Image uploaded to Cloudinary successfully.',
      imageUrl: upload.imageUrl,
      secureUrl: upload.secureUrl,
      publicId: upload.publicId,
    })
  } catch (error) {
    console.error('Admin prompt preview upload failed:', error)
    return jsonError(error instanceof Error ? error.message : 'Failed to upload prompt preview image.', 500, 'cloudinary_upload_failed')
  }
}
