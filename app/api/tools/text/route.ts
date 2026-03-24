import { NextRequest } from 'next/server'
import { err } from '@/lib/server-utils'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'word-count'

  try {
    const body = await req.json() as {
      text?: string
      options?: Record<string, any>
    }
    const { text = '', options = {} } = body

    if (!text && action !== 'lorem') return err('Missing text input')

    switch (action) {
      case 'word-count': {
        const words = text.trim().split(/\s+/).filter(Boolean)
        const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)
        const paragraphs = text.split(/\n\n+/).filter((p: string) => p.trim().length > 0)
        const chars = text.length
        const charsNoSpaces = text.replace(/\s/g, '').length
        const readTimeMin = Math.ceil(words.length / 200)
        const speakTimeMin = Math.ceil(words.length / 130)
        return Response.json({
          words: words.length,
          characters: chars,
          charactersNoSpaces: charsNoSpaces,
          sentences: sentences.length,
          paragraphs: paragraphs.length,
          readTimeMinutes: readTimeMin,
          speakTimeMinutes: speakTimeMin,
          avgWordsPerSentence: sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
          longestWord: words.sort((a: string, b: string) => b.length - a.length)[0] || '',
        })
      }

      case 'hash': {
        const algorithms = ['md5', 'sha1', 'sha256', 'sha512']
        const results: Record<string, string> = {}
        for (const alg of algorithms) {
          results[alg] = crypto.createHash(alg).update(text, 'utf8').digest('hex')
        }
        return Response.json(results)
      }

      case 'lorem': {
        const count = parseInt(options.count || '3')
        const type = options.type || 'paragraphs' // paragraphs | sentences | words
        const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

        function sentence() {
          const len = Math.floor(Math.random() * 12) + 8
          const words = Array.from({ length: len }, (_, i) => {
            const w = loremWords[Math.floor(Math.random() * loremWords.length)]
            return i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w
          })
          return words.join(' ') + '.'
        }

        function paragraph() {
          return Array.from({ length: Math.floor(Math.random() * 4) + 3 }, sentence).join(' ')
        }

        let result = ''
        if (type === 'words') {
          result = Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)]).join(' ')
        } else if (type === 'sentences') {
          result = Array.from({ length: count }, sentence).join(' ')
        } else {
          result = Array.from({ length: count }, paragraph).join('\n\n')
        }
        return Response.json({ text: result })
      }

      case 'keyword-density': {
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'it', 'as', 'be', 'was', 'are', 'were', 'been', 'has', 'have', 'had', 'not', 'this', 'that', 'from', 'you', 'we', 'they', 'he', 'she', 'his', 'her', 'its', 'our', 'your'])
        const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
        const freq: Record<string, number> = {}
        words.forEach((w: string) => { if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1 })
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30)
        return Response.json({
          total: words.length,
          unique: Object.keys(freq).length,
          keywords: sorted.map(([word, count]) => ({
            word,
            count,
            density: ((count / words.length) * 100).toFixed(2) + '%',
          })),
        })
      }

      case 'readability': {
        const words = text.trim().split(/\s+/).filter(Boolean)
        const sentences = text.split(/[.!?]+/).filter((s: string) => s.trim())
        const syllableCount = (word: string) => {
          word = word.toLowerCase().replace(/[^a-z]/g, '')
          if (word.length <= 3) return 1
          const matches = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
            .replace(/^y/, '')
            .match(/[aeiouy]{1,2}/g)
          return matches ? matches.length : 1
        }
        const totalSyllables = words.reduce((sum, w) => sum + syllableCount(w), 0)
        const avgWordsPerSentence = words.length / Math.max(sentences.length, 1)
        const avgSyllablesPerWord = totalSyllables / Math.max(words.length, 1)
        const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
        const fkGrade = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59

        const level = fleschScore >= 90 ? 'Very Easy (Grade 5)' :
                      fleschScore >= 80 ? 'Easy (Grade 6)' :
                      fleschScore >= 70 ? 'Fairly Easy (Grade 7)' :
                      fleschScore >= 60 ? 'Standard (Grade 8-9)' :
                      fleschScore >= 50 ? 'Fairly Difficult (Grade 10-12)' :
                      fleschScore >= 30 ? 'Difficult (College)' : 'Very Difficult (College Graduate)'

        return Response.json({
          fleschReadingEase: Math.round(Math.max(0, Math.min(100, fleschScore))),
          fleschKincaidGrade: Math.round(Math.max(0, fkGrade) * 10) / 10,
          readingLevel: level,
          avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
          avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
          totalSyllables,
          complexWords: words.filter(w => syllableCount(w) >= 3).length,
        })
      }

      case 'diff': {
        const text2 = options.text2 || ''
        const lines1 = text.split('\n')
        const lines2 = text2.split('\n')
        const diff: Array<{ type: 'same' | 'added' | 'removed'; line: string; lineNum: number }> = []
        const maxLines = Math.max(lines1.length, lines2.length)
        let additions = 0, deletions = 0

        for (let i = 0; i < maxLines; i++) {
          if (lines1[i] === lines2[i]) {
            diff.push({ type: 'same', line: lines1[i] || '', lineNum: i + 1 })
          } else {
            if (lines1[i] !== undefined) { diff.push({ type: 'removed', line: lines1[i], lineNum: i + 1 }); deletions++ }
            if (lines2[i] !== undefined) { diff.push({ type: 'added', line: lines2[i], lineNum: i + 1 }); additions++ }
          }
        }
        return Response.json({ diff, additions, deletions, identical: additions === 0 && deletions === 0 })
      }

      default:
        return err(`Unknown text action: ${action}`)
    }
  } catch (e) {
    return err(`Text processing failed: ${(e as Error).message}`, 500)
  }
}
