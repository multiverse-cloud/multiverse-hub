import { getGoogleAdsenseClient, isGoogleAdsenseEnabled } from '@/lib/adsense'

export default function AdsenseScript() {
  if (!isGoogleAdsenseEnabled()) return null

  const client = getGoogleAdsenseClient()

  return (
    <script
      id="google-adsense-auto-ads"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
    />
  )
}
