export const POPULAR_SITE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'Tamil' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ar', label: 'Arabic' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
] as const

export const LANGUAGE_DISCOVERY_META = POPULAR_SITE_LANGUAGES
  .map(language => `${language.label} (${language.code})`)
  .join(', ')

export const NAV_LANGUAGE_LINKS = POPULAR_SITE_LANGUAGES.filter(language =>
  ['en', 'ta', 'hi', 'es', 'fr', 'ar', 'id', 'pt', 'ja', 'ko'].includes(language.code)
)

export function buildTranslateUrl(languageCode: string, siteUrl: string) {
  if (languageCode === 'en') return siteUrl
  return `https://translate.google.com/translate?sl=en&tl=${encodeURIComponent(languageCode)}&u=${encodeURIComponent(siteUrl)}`
}
