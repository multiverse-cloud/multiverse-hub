import 'server-only'

import type { Tool } from '@/lib/tools-data'
import { VIDEO_DOWNLOADER_TOOL_SLUGS } from '@/lib/tools-data'
import { isCommandAvailable, YTDLP_PATH } from '@/lib/server-utils'

export type ToolRuntimeStatus = {
  available: boolean
  title: string
  message: string
  details: string[]
}

const OPENROUTER_REQUIRED_SLUGS = new Set([
  'ai-summarizer',
  'ai-paraphraser',
  'grammar-checker',
  'ai-translator',
  'ai-code-generator',
  'ai-email-writer',
  'ai-seo-writer',
  'hashtag-generator',
  'ai-resume-builder',
  'ai-cover-letter',
])

const OPENAI_REQUIRED_SLUGS = new Set([
  'speech-to-text',
  'audio-text-to-speech',
])

function createStatus(
  available: boolean,
  title: string,
  message: string,
  details: string[]
): ToolRuntimeStatus {
  return {
    available,
    title,
    message,
    details,
  }
}

export function getToolRuntimeStatus(tool: Pick<Tool, 'slug' | 'categorySlug' | 'name'>): ToolRuntimeStatus | null {
  if (tool.slug === 'remove-background') {
    if (process.env.REMOVEBG_API_KEY) {
      return null
    }

    return createStatus(
      false,
      'Hosted limitation',
      'Background removal needs `REMOVEBG_API_KEY`, so this tool is disabled in environments where that key is missing.',
      [
        'Local development: add `REMOVEBG_API_KEY` in `.env.local` to test the full flow.',
        'Hosted deploys: the page stays visible, but image processing should be treated as unavailable until the key is configured.',
      ]
    )
  }

  if (tool.categorySlug === 'ai' || OPENROUTER_REQUIRED_SLUGS.has(tool.slug)) {
    if (process.env.OPENROUTER_API_KEY) {
      return null
    }

    return createStatus(
      false,
      'AI key required',
      `${tool.name} depends on \`OPENROUTER_API_KEY\` for live AI responses.`,
      [
        'Without the key, requests will fail even though the page and editor still load.',
        'Best practice: show this tool as unavailable in hosted demos until the key is configured.',
      ]
    )
  }

  if (OPENAI_REQUIRED_SLUGS.has(tool.slug)) {
    if (process.env.OPENAI_API_KEY) {
      return null
    }

    return createStatus(
      false,
      'OpenAI key required',
      `${tool.name} needs \`OPENAI_API_KEY\` for server-side audio generation or transcription.`,
      [
        'The UI can still render, but production usage should be treated as unavailable until the key exists.',
      ]
    )
  }

  if (VIDEO_DOWNLOADER_TOOL_SLUGS.has(tool.slug)) {
    if (isCommandAvailable(YTDLP_PATH)) {
      return null
    }

    return createStatus(
      false,
      'Binary missing',
      `${tool.name} depends on the \`yt-dlp\` binary, and it is not available in the current runtime.`,
      [
        'Local development: install `yt-dlp` or set `YTDLP_PATH` to the correct executable.',
        'Hosted deployments: show a disabled state unless the binary is bundled and accessible.',
      ]
    )
  }

  return null
}
