import type { TextProcessResult } from './types'

export async function handleAudioTextTool(
  slug: string,
  textInput: string,
  options: { voice?: string; speed?: number } = {}
): Promise<TextProcessResult> {
  if (slug !== 'text-to-speech') {
    return { output: 'Processing complete' }
  }

  const response = await fetch('/api/tools/audio/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: textInput,
      voice: options.voice || 'alloy',
      speed: options.speed || 1,
      format: 'mp3',
    }),
  })

  if (response.ok) {
    return {
      outputBlob: await response.blob(),
      outputFilename: 'speech.mp3',
      output: 'Speech audio generated successfully.',
    }
  }

  const data = (await response.json().catch(() => ({ error: response.statusText }))) as {
    error?: string
    hint?: string
  }

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(textInput)
    utterance.lang = 'en-US'
    utterance.rate = options.speed || 1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    return {
      output: `${data.error || 'Browser fallback enabled'}\n${data.hint || 'Audio is playing through your browser instead of a downloadable file.'}`,
    }
  }

  return {
    apiError: `${data.error || 'Text-to-speech failed'}${data.hint ? `\n${data.hint}` : ''}`,
  }
}
