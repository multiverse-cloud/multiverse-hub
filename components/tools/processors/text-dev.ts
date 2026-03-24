import { callJSONAPI } from './text-api'
import type { TextProcessResult } from './types'

type DevToolOptions = Record<string, string | number | boolean | Record<string, string>>

export async function handleDevTool(
  slug: string,
  textInput: string,
  extraOptions: DevToolOptions = {}
): Promise<TextProcessResult> {
  if (slug === 'gradient-generator') {
    const palette = ['#0f172a', '#2563eb', '#14b8a6']
    return {
      output: `linear-gradient(135deg, ${palette.join(', ')})\n\nCSS:\nbackground: linear-gradient(135deg, ${palette.join(', ')});\nbackground-size: 200% 200%;\n\nTailwind:\nbg-[linear-gradient(135deg,_${palette.join(',_')})]`,
    }
  }

  const isBase64Decode =
    slug === 'base64-encoder-decoder' && /^[A-Za-z0-9+/=]{8,}$/.test(textInput.trim())
  const isUrlDecode =
    slug === 'url-encoder-decoder' && /%[0-9A-Fa-f]{2}/.test(textInput)

  const actionMap: Record<string, string> = {
    'json-formatter': 'json-format',
    'base64-encoder-decoder': isBase64Decode ? 'base64-decode' : 'base64-encode',
    'url-encoder-decoder': isUrlDecode ? 'url-decode' : 'url-encode',
    'jwt-decoder': 'jwt-decode',
    'uuid-generator': 'uuid',
    'hash-generator': 'hash',
    'css-minifier': 'css-minify',
    'js-minifier': 'js-minify',
    'color-converter': 'color',
    'cron-generator': 'cron',
    'gitignore-generator': 'gitignore',
    'api-tester': 'api-test',
    'regex-tester': 'regex',
    'password-generator': 'password',
  }

  const action = actionMap[slug]
  if (!action) return { output: 'Processing complete' }

  const options: DevToolOptions = { ...extraOptions }
  if (slug === 'uuid-generator') options.count = 10
  if (slug === 'password-generator') {
    options.length = parseInt(textInput) || 16
    options.symbols = 'true'
    options.count = 5
  }

  const data = await callJSONAPI('/api/tools/dev', { input: textInput, options }, action)

  if (slug === 'json-formatter') {
    const result = data as {
      valid: boolean
      formatted?: string
      minified?: string
      size?: number
      lines?: number
      error?: string
    }
    return {
      output: result.valid
        ? [
            `Lines: ${result.lines ?? 0}`,
            `Characters: ${result.size ?? 0}`,
            '',
            result.formatted || '',
            '',
            'Minified:',
            result.minified || '',
          ].join('\n')
        : `Error: ${result.error}`,
    }
  }

  if (slug === 'uuid-generator') {
    const result = data as { uuids: string[] }
    return { output: result.uuids.join('\n') }
  }

  if (slug === 'base64-encoder-decoder') {
    const result = data as { result?: string; valid?: boolean; error?: string }
    return {
      output: result.error
        ? `Error: ${result.error}`
        : `${isBase64Decode ? 'Decoded text' : 'Base64 output'}:\n${result.result || ''}`,
    }
  }

  if (slug === 'url-encoder-decoder') {
    const result = data as { encoded?: string; component?: string; full?: string; decoded?: string; error?: string }
    return {
      output: result.error
        ? `Error: ${result.error}`
        : isUrlDecode
          ? [`Decoded URL:`, result.decoded || '', '', `Safe URL:`, result.full || ''].join('\n')
          : [`Encoded component:`, result.encoded || '', '', `Encoded full URL:`, result.full || '', '', `Strict component encoding:`, result.component || ''].join('\n'),
    }
  }

  if (slug === 'hash-generator') {
    return { output: Object.entries(data).map(([key, value]) => `${key.toUpperCase()}:\n${value}`).join('\n\n') }
  }

  if (slug === 'jwt-decoder') {
    const result = data as {
      valid: boolean
      header?: Record<string, unknown>
      payload?: Record<string, unknown>
      isExpired?: boolean
      error?: string
    }

    return {
      output: result.valid
        ? `Header:\n${JSON.stringify(result.header, null, 2)}\n\nPayload:\n${JSON.stringify(result.payload, null, 2)}\n\n${result.isExpired ? 'Expired' : 'Valid'}`
        : `Error: ${result.error}`,
    }
  }

  if (slug === 'gitignore-generator') {
    const result = data as { gitignore: string }
    return { output: result.gitignore }
  }

  if (slug === 'password-generator') {
    const result = data as { passwords: string[]; strength: string; entropy: number }
    return {
      output: `Strength: ${result.strength} | Entropy: ${result.entropy} bits\n\n${result.passwords.join('\n')}`,
    }
  }

  if (slug === 'color-converter') {
    const result = data as { hex: string; rgb: string; hsl: string; css: string; tailwind: string }
    return {
      output: `HEX: ${result.hex}\nRGB: ${result.rgb}\nHSL: ${result.hsl}\nCSS: ${result.css}\nTailwind: ${result.tailwind}`,
    }
  }

  if (slug === 'api-tester') {
    const result = data as {
      url: string
      method: string
      ok: boolean
      status: number
      statusText: string
      responseTimeMs?: number
      bodyType: string
      headers: Record<string, string>
      body: unknown
    }

    return {
      output: [
        `${result.method} ${result.url}`,
        `Status: ${result.status} ${result.statusText}`,
        `OK: ${result.ok ? 'yes' : 'no'}`,
        `Response time: ${result.responseTimeMs ?? '?'} ms`,
        '',
        'Headers:',
        Object.entries(result.headers).map(([key, value]) => `${key}: ${value}`).join('\n') || 'None',
        '',
        `Body (${result.bodyType}):`,
        typeof result.body === 'string' ? result.body : JSON.stringify(result.body, null, 2),
      ].join('\n'),
    }
  }

  if (slug === 'cron-generator') {
    const result = data as {
      expression: string
      humanReadable: string
      fields: string[]
      nextRuns: string[]
      isValid: boolean
    }
    return {
      output: result.isValid
        ? [
            `Expression: ${result.expression}`,
            `Summary: ${result.humanReadable}`,
            '',
            'Fields:',
            ...result.fields.map(field => `- ${field}`),
            '',
            'Next runs:',
            ...result.nextRuns.map((run, index) => `${index + 1}. ${run}`),
          ].join('\n')
        : 'Invalid cron expression',
    }
  }

  if (slug === 'regex-tester') {
    const result = data as {
      valid: boolean
      error?: string
      pattern: string
      flags: string
      count: number
      matches: Array<{ match: string; index: number; groups: Record<string, string> | null }>
      highlighted: string
    }

    if (!result.valid) {
      return { output: `Regex Error: ${result.error}` }
    }

    const matchLines =
      result.matches.length > 0
        ? result.matches
            .slice(0, 25)
            .map((match, index) => {
              const groupText =
                match.groups && Object.keys(match.groups).length > 0
                  ? ` | groups: ${JSON.stringify(match.groups)}`
                  : ''
              return `${index + 1}. "${match.match}" at index ${match.index}${groupText}`
            })
            .join('\n')
        : 'No matches'

    return {
      output: [
        `Pattern: /${result.pattern}/${result.flags}`,
        `Matches: ${result.count}`,
        '',
        'Match list:',
        matchLines,
        '',
        'Highlighted text:',
        result.highlighted,
      ].join('\n'),
    }
  }

  const result = data as { result?: string; minified?: string; decoded?: string; encoded?: string }
  return {
    output: result.result || result.minified || result.decoded || result.encoded || JSON.stringify(data, null, 2),
  }
}
