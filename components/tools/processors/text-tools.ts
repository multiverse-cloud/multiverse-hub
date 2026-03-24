import { callJSONAPI } from './text-api'
import type { TextProcessResult } from './types'

export async function handleTextTool(
  slug: string,
  textInput: string,
  diffText2: string
): Promise<TextProcessResult> {
  if (slug === 'remove-duplicate-lines') {
    const lines = textInput.split('\n')
    const unique = [...new Set(lines)]
    return {
      output: `Original lines: ${lines.length}\nUnique lines: ${unique.length}\nRemoved duplicates: ${lines.length - unique.length}\n\n${unique.join('\n')}`,
    }
  }

  const actionMap: Record<string, string> = {
    'word-counter': 'word-count',
    'readability-score': 'readability',
    'keyword-density': 'keyword-density',
    'text-diff-checker': 'diff',
    'lorem-ipsum-generator': 'lorem',
    'string-extractor': 'keyword-density',
  }

  const action = actionMap[slug]
  if (!action) return { output: 'Processing complete' }

  const options: Record<string, string | number> = {}
  if (slug === 'lorem-ipsum-generator') {
    options.count = parseInt(textInput) || 3
    options.type = 'paragraphs'
  }
  if (slug === 'text-diff-checker') options.text2 = diffText2

  const data = await callJSONAPI('/api/tools/text', { text: textInput, options }, action)

  if (slug === 'word-counter') {
    const result = data as {
      words: number
      characters: number
      charactersNoSpaces: number
      sentences: number
      paragraphs: number
      readTimeMinutes: number
      speakTimeMinutes: number
      avgWordsPerSentence: number
      longestWord: string
    }
    return {
      output: `Words: ${result.words}\nCharacters: ${result.characters}\nChars (no spaces): ${result.charactersNoSpaces}\nSentences: ${result.sentences}\nParagraphs: ${result.paragraphs}\nRead time: ~${result.readTimeMinutes} min\nSpeak time: ~${result.speakTimeMinutes} min\nAvg words / sentence: ${result.avgWordsPerSentence}\nLongest word: "${result.longestWord}"`,
    }
  }

  if (slug === 'readability-score') {
    const result = data as {
      fleschReadingEase: number
      fleschKincaidGrade: number
      readingLevel: string
      avgWordsPerSentence: number
      avgSyllablesPerWord: number
      totalSyllables: number
      complexWords: number
    }
    return {
      output: `Flesch Reading Ease: ${result.fleschReadingEase}/100\nFK Grade: ${result.fleschKincaidGrade}\nLevel: ${result.readingLevel}\nAvg words/sentence: ${result.avgWordsPerSentence}\nAvg syllables/word: ${result.avgSyllablesPerWord}\nTotal syllables: ${result.totalSyllables}\nComplex words: ${result.complexWords}`,
    }
  }

  if (slug === 'keyword-density') {
    const result = data as { keywords: Array<{ word: string; count: number; density: string }>; total: number }
    return {
      output: `Total words: ${result.total}\n\nTop Keywords:\n${result.keywords.slice(0, 15).map(keyword => `${keyword.word}: ${keyword.count}x (${keyword.density})`).join('\n')}`,
    }
  }

  if (slug === 'text-diff-checker') {
    const result = data as {
      identical: boolean
      additions: number
      deletions: number
      diff: Array<{ type: string; line: string }>
    }
    return {
      output: result.identical
        ? 'Texts are identical'
        : `${result.additions} additions, ${result.deletions} deletions\n\n${result.diff.map(line => `${line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '} ${line.line}`).join('\n')}`,
    }
  }

  const result = data as { text?: string }
  return { output: result.text || JSON.stringify(data, null, 2) }
}
