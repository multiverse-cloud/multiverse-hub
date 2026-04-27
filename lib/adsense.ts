const ADSENSE_DIRECT_CERTIFICATION_ID = 'f08c47fec0942fa0'

function readEnv(value?: string) {
  return value?.trim() || ''
}

export function getGoogleAdsenseClient() {
  return readEnv(process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT)
}

export function getGoogleAdsensePublisherId() {
  const client = getGoogleAdsenseClient()
  return client.startsWith('ca-') ? client.slice(3) : client
}

export function isGoogleAdsenseEnabled() {
  return process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === 'true' && Boolean(getGoogleAdsenseClient())
}

export function getGoogleAdsTxtLine() {
  const publisherId = getGoogleAdsensePublisherId()
  if (!publisherId) return ''

  return `google.com, ${publisherId}, DIRECT, ${ADSENSE_DIRECT_CERTIFICATION_ID}`
}

