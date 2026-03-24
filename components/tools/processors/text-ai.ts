import { callJSONAPI } from './text-api'
import type { TextProcessResult } from './types'

export async function handleAiTool(slug: string, textInput: string): Promise<TextProcessResult> {
  const toolMap: Record<string, string> = {
    'ai-summarizer': 'summarize',
    'ai-paraphraser': 'paraphrase',
    'grammar-checker': 'grammar',
    'ai-translator': 'translate',
    'ai-code-generator': 'code',
    'ai-email-writer': 'email',
    'ai-seo-writer': 'seo',
    'hashtag-generator': 'hashtags',
    'ai-resume-builder': 'resume',
    'ai-cover-letter': 'cover-letter',
  }

  const tool = toolMap[slug]
  if (!tool) return { output: 'Processing complete' }

  const data = await callJSONAPI('/api/ai', { tool, input: textInput })
  const result = data as { result?: string; error?: string; hint?: string }

  if (result.error) {
    return {
      apiError: `${result.error}${result.hint ? `\nHint: ${result.hint}` : ''}`,
    }
  }

  return { output: result.result || '' }
}
