import { callJSONAPI } from './text-api'
import type { TextProcessResult } from './types'

export async function handleSeoTool(slug: string, textInput: string): Promise<TextProcessResult> {
  const actionMap: Record<string, string> = {
    'meta-tag-generator': 'meta-tags',
    'open-graph-generator': 'meta-tags',
    'keyword-extractor': 'keywords',
    'robots-txt-generator': 'robots',
    'sitemap-generator': 'sitemap',
    'social-media-preview': 'social-preview',
  }

  const action = actionMap[slug]
  if (!action) return { output: 'Processing complete' }

  const options: Record<string, string | string[]> = {}
  if (slug === 'meta-tag-generator' || slug === 'open-graph-generator') {
    const lines = textInput.split('\n')
    options.title = lines[0]
    options.description = lines[1] || ''
    options.keywords = lines[2] || ''
  }
  if (slug === 'sitemap-generator') {
    options.baseUrl = textInput || 'https://example.com'
    options.paths = ['/', '/about', '/contact', '/blog', '/tools']
  }

  const data = await callJSONAPI('/api/tools/seo', { input: textInput, options }, action)
  const result = data as Record<string, unknown>

  if (slug === 'social-media-preview') {
    return {
      output: [
        `Title: ${String(result.title || 'Not found')}`,
        `Description: ${String(result.description || 'Not found')}`,
        `Canonical: ${String(result.canonical || 'Not found')}`,
        `Open Graph Type: ${String(result.ogType || 'website')}`,
        `Twitter Card: ${String(result.twitterCard || 'summary_large_image')}`,
        `Robots: ${String(result.robots || 'index, follow')}`,
      ].join('\n'),
      imagePreview: typeof result.ogImage === 'string' ? result.ogImage : undefined,
    }
  }

  if (slug === 'keyword-extractor') {
    const keywords = Array.isArray(result.keywords)
      ? result.keywords as Array<{ word: string; count: number; density: string }>
      : []
    const phrases = Array.isArray(result.phrases)
      ? result.phrases as Array<{ phrase: string; count: number }>
      : []

    return {
      output: [
        `Total words: ${String(result.totalWords || 0)}`,
        `Unique keywords: ${String(result.uniqueWords || 0)}`,
        '',
        'Top keywords:',
        ...keywords.slice(0, 12).map((keyword, index) => `${index + 1}. ${keyword.word} (${keyword.count}x, ${keyword.density})`),
        '',
        'Top phrases:',
        ...(phrases.length > 0 ? phrases.slice(0, 8).map((phrase, index) => `${index + 1}. ${phrase.phrase} (${phrase.count}x)`) : ['No repeated phrases found']),
      ].join('\n'),
    }
  }

  if (slug === 'meta-tag-generator' || slug === 'open-graph-generator') {
    const warnings = Array.isArray(result.warnings) ? result.warnings as string[] : []
    return {
      output: [
        `Title length: ${String(result.titleLength || 0)}`,
        `Description length: ${String(result.descriptionLength || 0)}`,
        warnings.length > 0 ? `Warnings: ${warnings.join(' | ')}` : 'Warnings: None',
        '',
        String(result.tags || ''),
      ].join('\n'),
    }
  }

  if (slug === 'sitemap-generator') {
    return {
      output: [`URL count: ${String(result.urlCount || 0)}`, '', String(result.sitemap || '')].join('\n'),
    }
  }

  return {
    output: String(result.tags || result.robotsTxt || result.sitemap || JSON.stringify(data, null, 2)),
  }
}
