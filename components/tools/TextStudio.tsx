'use client'

import { useDropzone } from 'react-dropzone'
import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  Copy,
  Download,
  FileAudio2,
  FileText,
  Loader2,
  Mic2,
  Play,
  RefreshCw,
  Sparkles,
  Type,
  UploadCloud,
} from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { cn, downloadBlob, formatBytes } from '@/lib/utils'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { handleAiTool } from './processors/text-ai'
import { handleAudioTextTool } from './processors/text-audio'
import { handleAudioTool } from './processors/file-media'
import { handleDevTool } from './processors/text-dev'
import { handleTextTool } from './processors/text-tools'
import type { FileProcessResult } from './processors/types'

const TEXT_COPY = {
  'ai-text-generator': { eyebrow: 'Creative drafting', title: 'AI Text Generator', summary: 'Turn a short prompt into a polished draft with clearer structure and ready-to-edit output.', badges: ['Prompt based', 'Draft ready', 'Fast result'], actionLabel: 'Generate text' },
  'text-case-converter': { eyebrow: 'Format cleanup', title: 'Case Converter', summary: 'Convert the same text into multiple clean casing styles inside one compact workspace.', badges: ['Uppercase', 'Camel case', 'Kebab case'], actionLabel: 'Convert case' },
  'remove-duplicate-lines': { eyebrow: 'Content cleanup', title: 'Duplicate Text Remover', summary: 'Remove repeated lines and keep a cleaner, easier-to-use text set.', badges: ['Unique lines', 'Quick cleanup', 'Instant output'], actionLabel: 'Remove duplicates' },
  'text-grammar-checker': { eyebrow: 'Writing polish', title: 'Grammar Checker', summary: 'Clean grammar, improve clarity, and make text easier to read before publishing or sharing.', badges: ['Grammar pass', 'Cleaner tone', 'Readable output'], actionLabel: 'Check grammar' },
  'paraphrasing-tool': { eyebrow: 'Rewrite workspace', title: 'Paraphrasing Tool', summary: 'Rephrase text into a cleaner version while keeping the meaning readable and stable.', badges: ['Rewrite modes', 'Cleaner phrasing', 'Quick output'], actionLabel: 'Paraphrase text' },
  'plagiarism-checker': { eyebrow: 'Originality review', title: 'Plagiarism Checker', summary: 'Review repeated phrases and sentence similarity with a simple originality-style report.', badges: ['Originality score', 'Repeated phrases', 'Quick scan'], actionLabel: 'Scan text' },
  'text-speech-to-text': { eyebrow: 'Voice transcript', title: 'Speech to Text', summary: 'Upload a voice file and turn spoken words into text you can review and reuse.', badges: ['Audio upload', 'Fast transcript', 'Readable text'], actionLabel: 'Transcribe speech' },
  'text-diff-checker': { eyebrow: 'Version compare', title: 'Text Compare', summary: 'Compare two versions side by side and highlight additions, removals, and changes.', badges: ['Two inputs', 'Diff output', 'Fast compare'], actionLabel: 'Compare text' },
  'text-summarizer': { eyebrow: 'Summary engine', title: 'Text Summarizer', summary: 'Shrink long content into a shorter brief, a detailed recap, or bullet insights.', badges: ['Short or detailed', 'Bullet points', 'Quick summary'], actionLabel: 'Summarize text' },
  'text-to-speech': { eyebrow: 'Voice output', title: 'Text to Speech', summary: 'Convert written text into a playable audio file from the same premium text workspace.', badges: ['Audio preview', 'Speed control', 'MP3 output'], actionLabel: 'Generate speech' },
  'text-url-encoder-decoder': { eyebrow: 'Encoding utility', title: 'URL Encoder / Decoder', summary: 'Encode clean URL components or decode an existing encoded string in one focused panel.', badges: ['Encode', 'Decode', 'Clean output'], actionLabel: 'Process URL text' },
  'word-counter': { eyebrow: 'Text metrics', title: 'Word Counter', summary: 'Measure words, reading time, structure, and readability basics from one live editor.', badges: ['Word count', 'Read time', 'Structure'], actionLabel: 'Analyze text' },
  'password-generator': { eyebrow: 'Security utility', title: 'Password Generator', summary: 'Generate strong, secure random passwords with custom length and character settings.', badges: ['Custom length', 'Symbols & digits', 'Copy ready'], actionLabel: 'Generate password' },
  'lorem-ipsum-generator': { eyebrow: 'Placeholder content', title: 'Lorem Ipsum Generator', summary: 'Generate placeholder paragraphs for mockups, designs, and wireframes instantly.', badges: ['Custom paragraphs', 'Quick copy', 'Design ready'], actionLabel: 'Generate text' },
  'emoji-copy-paste': { eyebrow: 'Emoji browser', title: 'Emoji Copy Paste', summary: 'Browse popular emoji categories and copy any emoji to your clipboard with one click.', badges: ['All categories', 'One-click copy', 'Search & browse'], actionLabel: 'Load emojis' },
  'fancy-text-generator': { eyebrow: 'Style converter', title: 'Fancy Text Generator', summary: 'Convert text into stylish Unicode fonts for Instagram bios, Twitter names, and social media.', badges: ['Fancy fonts', 'Unicode styles', 'Social ready'], actionLabel: 'Generate styles' },
  'random-name-picker': { eyebrow: 'Randomizer', title: 'Random Name Picker', summary: 'Enter a list of names and pick random winners for raffles, giveaways, or classroom activities.', badges: ['Random pick', 'Spin to win', 'Fair selection'], actionLabel: 'Pick a name' },
} as const

type StudioResult = FileProcessResult

function buildGeneratedDraft(prompt: string, tone: string, length: string) {
  const cleanedPrompt = prompt.trim() || 'Your next idea'
  const intro =
    tone === 'professional'
      ? `Here is a polished draft focused on ${cleanedPrompt}.`
      : tone === 'persuasive'
        ? `Let’s turn ${cleanedPrompt} into a clearer, more convincing draft.`
        : `Here is a clear first draft for ${cleanedPrompt}.`

  const middle = [
    `Start with a direct opening that explains why ${cleanedPrompt} matters right now.`,
    `Add one useful example, one practical benefit, and one clear next step.`,
    `Keep the language simple so the draft is easy to edit for posts, emails, or landing pages.`,
  ]

  const extra =
    length === 'long'
      ? '\n\nAdd a fuller middle section with supporting details, social proof, and a confident close.'
      : length === 'medium'
        ? '\n\nKeep the body concise but include one strong supporting detail before the ending.'
        : '\n\nKeep the final version short and direct.'

  return [intro, '', ...middle, extra].join('\n')
}

function buildSummary(text: string, mode: string) {
  const sentences = text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).map(sentence => sentence.trim()).filter(Boolean)
  if (sentences.length === 0) return 'Add some text to summarize.'
  if (mode === 'bullet') return sentences.slice(0, 5).map(sentence => `• ${sentence}`).join('\n')
  if (mode === 'detailed') return sentences.slice(0, 6).join(' ')
  return sentences.slice(0, 2).join(' ')
}

function buildPlagiarismReport(text: string) {
  const sentences = text.split(/(?<=[.!?])\s+/).map(sentence => sentence.trim()).filter(Boolean)
  const repeated = new Map<string, number>()
  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase()
    repeated.set(normalized, (repeated.get(normalized) || 0) + 1)
  }
  const duplicates = Array.from(repeated.entries()).filter(([, count]) => count > 1)
  const words = text.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
  const phraseMap = new Map<string, number>()
  for (let index = 0; index < words.length - 2; index++) {
    const phrase = `${words[index]} ${words[index + 1]} ${words[index + 2]}`
    phraseMap.set(phrase, (phraseMap.get(phrase) || 0) + 1)
  }
  const repeatedPhrases = Array.from(phraseMap.entries()).filter(([, count]) => count > 1).slice(0, 6)
  const originalityScore = Math.max(42, 96 - duplicates.length * 8 - repeatedPhrases.length * 3)
  return {
    text: [
      `Originality score: ${originalityScore}/100`,
      `Repeated sentences: ${duplicates.length}`,
      `Repeated phrases: ${repeatedPhrases.length}`,
      '',
      duplicates.length > 0 ? 'Repeated sentences:\n' + duplicates.map(([sentence, count]) => `- ${sentence} (${count}x)`).join('\n') : 'No repeated full sentences were detected.',
      '',
      repeatedPhrases.length > 0 ? 'Repeated phrases:\n' + repeatedPhrases.map(([phrase, count]) => `- ${phrase} (${count}x)`).join('\n') : 'No repeated phrase clusters were detected.',
    ].join('\n'),
    originalityScore,
  }
}

async function copyText(text: string) {
  if (!text) return
  await navigator.clipboard.writeText(text)
}

export default function TextStudio({ tool }: { tool: Tool }) {
  const copy = TEXT_COPY[tool.slug as keyof typeof TEXT_COPY]
  const acceptsAudioUpload = tool.slug === 'text-speech-to-text'
  const acceptedFormats = useMemo(() => ['.mp3', '.wav', '.ogg', '.m4a'], [])
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])

  const [primaryText, setPrimaryText] = useState('')
  const [secondaryText, setSecondaryText] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioPreviewUrl, setAudioPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [result, setResult] = useState<StudioResult | null>(null)
  const [writingTone, setWritingTone] = useState('clear')
  const [summaryMode, setSummaryMode] = useState('short')
  const [speechSpeed, setSpeechSpeed] = useState('1')

  useEffect(() => () => {
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl)
    if (result?.previewIsObjectUrl && result.previewUrl) URL.revokeObjectURL(result.previewUrl)
  }, [audioPreviewUrl, result])

  function resetAll() {
    setPrimaryText('')
    setSecondaryText('')
    setError('')
    setProgress(0)
    setWritingTone('clear')
    setSummaryMode('short')
    setSpeechSpeed('1')
    setResult(current => {
      if (current?.previewIsObjectUrl && current.previewUrl) URL.revokeObjectURL(current.previewUrl)
      return null
    })
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl)
    setAudioPreviewUrl('')
    setAudioFile(null)
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept,
    multiple: false,
    noClick: true,
    onDropAccepted: files => {
      const [file] = files
      if (!file) return
      setAudioFile(file)
      setError('')
      setResult(current => {
        if (current?.previewIsObjectUrl && current.previewUrl) URL.revokeObjectURL(current.previewUrl)
        return null
      })
      if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl)
      setAudioPreviewUrl(URL.createObjectURL(file))
    },
  })

  function startProgress() {
    setProgress(8)
    const interval = window.setInterval(() => setProgress(current => (current < 88 ? current + Math.random() * 7 : current)), 320)
    return () => {
      window.clearInterval(interval)
      setProgress(100)
    }
  }

  function makeTextResult(output: string, metrics: Array<{ label: string; value: string }> = []) {
    return { output, metrics } satisfies StudioResult
  }

  async function handleProcess() {
    setError('')
    setResult(current => {
      if (current?.previewIsObjectUrl && current.previewUrl) URL.revokeObjectURL(current.previewUrl)
      return null
    })

    if (acceptsAudioUpload && !audioFile) {
      setError('Upload an audio file before transcribing.')
      return
    }
    if (!acceptsAudioUpload && !primaryText.trim()) {
      setError('Enter your text before processing.')
      return
    }

    setLoading(true)
    const done = startProgress()

    try {
      if (tool.slug === 'ai-text-generator') {
        const output = buildGeneratedDraft(primaryText, writingTone, summaryMode)
        setResult(makeTextResult(output, [{ label: 'Mode', value: writingTone }, { label: 'Length', value: summaryMode }, { label: 'Words', value: `${output.split(/\s+/).filter(Boolean).length}` }]))
        return
      }

      if (tool.slug === 'text-case-converter') {
        const output = [
          `UPPERCASE\n${primaryText.toUpperCase()}`,
          `\nlowercase\n${primaryText.toLowerCase()}`,
          `\nTitle Case\n${primaryText.replace(/\w\S*/g, word => word[0].toUpperCase() + word.slice(1).toLowerCase())}`,
          `\ncamelCase\n${primaryText.toLowerCase().replace(/[^a-z0-9]+([a-z0-9])/g, (_, char) => char.toUpperCase()).replace(/^[A-Z]/, letter => letter.toLowerCase())}`,
        ].join('\n')
        setResult(makeTextResult(output, [{ label: 'Transforms', value: '4 variants' }]))
        return
      }

      if (tool.slug === 'remove-duplicate-lines') {
        const resultText = await handleTextTool('remove-duplicate-lines', primaryText, '')
        setResult(makeTextResult(resultText.output || '', [{ label: 'Lines', value: `${primaryText.split('\n').length}` }, { label: 'Mode', value: 'Unique only' }]))
        return
      }

      if (tool.slug === 'text-grammar-checker') {
        try {
          const resultText = await handleAiTool('grammar-checker', primaryText)
          setResult(makeTextResult(resultText.output || '', [{ label: 'Tone', value: writingTone }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }]))
        } catch {
          setResult(makeTextResult(`Grammar review\n\n- Tighten long sentences.\n- Replace repeated filler words.\n- Keep punctuation and capitalization consistent.\n\nOriginal text:\n${primaryText}`, [{ label: 'Mode', value: 'Fallback' }]))
        }
        return
      }

      if (tool.slug === 'paraphrasing-tool') {
        try {
          const resultText = await handleAiTool('ai-paraphraser', primaryText)
          setResult(makeTextResult(resultText.output || '', [{ label: 'Mode', value: writingTone }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }]))
        } catch {
          setResult(makeTextResult(buildGeneratedDraft(primaryText, writingTone, 'short'), [{ label: 'Mode', value: 'Fallback rewrite' }]))
        }
        return
      }

      if (tool.slug === 'plagiarism-checker') {
        const report = buildPlagiarismReport(primaryText)
        setResult(makeTextResult(report.text, [{ label: 'Score', value: `${report.originalityScore}/100` }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }]))
        return
      }

      if (tool.slug === 'text-speech-to-text') {
        const resultText = await handleAudioTool({ slug: 'speech-to-text', file: audioFile as File, files: [audioFile as File], textInput: '', audioFmt: 'mp3' })
        if (resultText.apiError) {
          setError(resultText.apiError)
          return
        }
        setResult({ output: resultText.output || '', metrics: [{ label: 'Source', value: audioFile?.name || 'Audio file' }, { label: 'Size', value: audioFile ? formatBytes(audioFile.size) : 'Pending' }] })
        return
      }

      if (tool.slug === 'text-diff-checker') {
        const resultText = await handleTextTool('text-diff-checker', primaryText, secondaryText)
        setResult(makeTextResult(resultText.output || '', [{ label: 'Version A', value: `${primaryText.split(/\n/).length} lines` }, { label: 'Version B', value: `${secondaryText.split(/\n/).length} lines` }]))
        return
      }

      if (tool.slug === 'text-summarizer') {
        try {
          const resultText = await handleAiTool('ai-summarizer', primaryText)
          setResult(makeTextResult(resultText.output || '', [{ label: 'Mode', value: summaryMode }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }]))
        } catch {
          setResult(makeTextResult(buildSummary(primaryText, summaryMode), [{ label: 'Mode', value: summaryMode }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }]))
        }
        return
      }

      if (tool.slug === 'text-to-speech') {
        const speechResult = await handleAudioTextTool('text-to-speech', primaryText, { speed: Number(speechSpeed) })
        if (speechResult.apiError) {
          setError(speechResult.apiError)
          return
        }
        const previewUrl = speechResult.outputBlob ? URL.createObjectURL(speechResult.outputBlob) : ''
        setResult({
          output: speechResult.output,
          outputBlob: speechResult.outputBlob,
          outputFilename: speechResult.outputFilename || 'speech.mp3',
          previewUrl,
          previewType: 'audio',
          previewIsObjectUrl: Boolean(previewUrl),
          metrics: [{ label: 'Speed', value: `${speechSpeed}x` }, { label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }],
        })
        return
      }

      if (tool.slug === 'text-url-encoder-decoder') {
        const resultText = await handleDevTool('url-encoder-decoder', primaryText)
        setResult(makeTextResult(resultText.output || '', [{ label: 'Mode', value: /%[0-9A-F]/i.test(primaryText) ? 'Decode' : 'Encode' }]))
        return
      }

      if (tool.slug === 'word-counter') {
        const resultText = await handleTextTool('word-counter', primaryText, '')
        setResult(makeTextResult(resultText.output || '', [{ label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }, { label: 'Chars', value: `${primaryText.length}` }]))
        return
      }

      if (tool.slug === 'password-generator') {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
        const lengths = [16, 20, 24, 32]
        const passwords = lengths.map(len => {
          const arr = new Uint32Array(len)
          crypto.getRandomValues(arr)
          return Array.from(arr, v => chars[v % chars.length]).join('')
        })
        const output = passwords.map((p, i) => `${lengths[i]} chars: ${p}`).join('\n\n')
        setResult(makeTextResult(output, [{ label: 'Generated', value: `${lengths.length} passwords` }, { label: 'Strength', value: 'Very strong' }]))
        return
      }

      if (tool.slug === 'lorem-ipsum-generator') {
        const loremSentences = [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
          'Nulla pariatur excepteur sint occaecat cupidatat non proident.',
          'Curabitur pretium tincidunt lacus nulla gravida orci.',
          'Praesent blandit dolor sed non massa pulvinar.',
          'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
          'Maecenas sed diam eget risus varius blandit sit amet non magna.',
          'Donec ullamcorper nulla non metus auctor fringilla.',
          'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        ]
        const paragraphCount = Math.max(1, Math.min(10, parseInt(primaryText) || 3))
        const paragraphs = Array.from({ length: paragraphCount }, (_, i) => {
          const start = i % loremSentences.length
          return Array.from({ length: 4 }, (__, j) => loremSentences[(start + j) % loremSentences.length]).join(' ')
        })
        setResult(makeTextResult(paragraphs.join('\n\n'), [{ label: 'Paragraphs', value: `${paragraphCount}` }, { label: 'Words', value: `${paragraphs.join(' ').split(/\s+/).length}` }]))
        return
      }

      if (tool.slug === 'emoji-copy-paste') {
        const emojiGroups: Record<string, string[]> = {
          'Smileys': ['😀','😂','🤣','😍','🥰','😎','🤩','😴','🤔','😱','🥳','😡','🤯','🥺','😇'],
          'Hands': ['👍','👎','👏','🙌','🤝','✌️','🤞','👋','🤟','💪','🫶','🙏'],
          'Hearts': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','💕','💖','💗','💘'],
          'Animals': ['🐶','🐱','🐻','🦊','🐼','🐸','🐵','🦁','🐰','🐯','🦄','🐝'],
          'Food': ['🍕','🍔','🍟','🌮','🍣','🍩','🍪','🎂','🍫','☕','🧋','🍺'],
          'Travel': ['✈️','🚀','🏖️','🏔️','🌍','🗽','🎡','🚗','🛳️','🏕️','🌅','🎪'],
          'Symbols': ['⭐','🔥','💯','✅','❌','⚡','💡','🎯','🏆','💎','🎵','📌'],
        }
        const output = Object.entries(emojiGroups).map(([group, emojis]) => `${group}:\n${emojis.join('  ')}`).join('\n\n')
        setResult(makeTextResult(output, [{ label: 'Categories', value: `${Object.keys(emojiGroups).length}` }, { label: 'Total', value: `${Object.values(emojiGroups).flat().length} emojis` }]))
        return
      }

      if (tool.slug === 'fancy-text-generator') {
        const text = primaryText.trim() || 'Hello World'
        const fancyMaps: Record<string, (c: string) => string> = {
          '𝗕𝗼𝗹𝗱': c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + code - 97); return c },
          '𝘐𝘵𝘢𝘭𝘪𝘤': c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D608 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D622 + code - 97); return c },
          '𝙼𝚘𝚗𝚘': c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D670 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D68A + code - 97); return c },
          'Ⓒⓘⓡⓒⓛⓔⓓ': c => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97); return c },
        }
        const output = Object.entries(fancyMaps).map(([style, fn]) => `${style}:\n${text.split('').map(fn).join('')}`).join('\n\n')
        setResult(makeTextResult(output, [{ label: 'Styles', value: `${Object.keys(fancyMaps).length} variants` }, { label: 'Length', value: `${text.length} chars` }]))
        return
      }

      if (tool.slug === 'random-name-picker') {
        const names = primaryText.split('\n').map(n => n.trim()).filter(Boolean)
        if (names.length === 0) { setError('Enter names (one per line) to pick from.'); return }
        const arr = new Uint32Array(1)
        crypto.getRandomValues(arr)
        const winner = names[arr[0] % names.length]
        const shuffled = [...names].sort(() => Math.random() - 0.5)
        const output = `🎉 Winner: ${winner}\n\nFull shuffle order:\n${shuffled.map((n, i) => `${i + 1}. ${n}`).join('\n')}`
        setResult(makeTextResult(output, [{ label: 'Entries', value: `${names.length}` }, { label: 'Winner', value: winner }]))
        return
      }
    } catch (processError) {
      setError((processError as Error).message)
    } finally {
      done()
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (result?.outputBlob) {
      downloadBlob(result.outputBlob, result.outputFilename || 'result.mp3')
      return
    }
    if (!result?.output) return
    downloadBlob(new Blob([result.output], { type: 'text/plain;charset=utf-8' }), `${tool.slug}.txt`)
  }

  const sourceMetrics = acceptsAudioUpload
    ? [{ label: 'Source', value: audioFile?.name || 'No audio file' }, { label: 'Size', value: audioFile ? formatBytes(audioFile.size) : 'Pending' }, { label: 'Formats', value: acceptLabel }]
    : [{ label: 'Words', value: `${primaryText.split(/\s+/).filter(Boolean).length}` }, { label: 'Chars', value: `${primaryText.length}` }, { label: 'Mode', value: tool.slug === 'text-summarizer' ? summaryMode : writingTone }]
  const canRunWithoutText = ['password-generator', 'lorem-ipsum-generator', 'emoji-copy-paste'].includes(tool.slug)
  const hasTextInput = acceptsAudioUpload ? Boolean(audioFile) : primaryText.trim().length > 0 || canRunWithoutText

  return (
    <div className="space-y-4 sm:space-y-5" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-1.5">
          {copy.badges.map(item => (
            <span key={item} className="premium-chip text-[10px] px-2 py-0.5 sm:text-xs sm:px-2.5 sm:py-1">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-3 premium-kicker text-[10px] sm:mt-6 sm:text-xs">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 md:text-4xl dark:text-slate-50 sm:text-3xl md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
          {copy.summary}
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.14fr)_360px] sm:gap-6">
        <div className="space-y-4 sm:space-y-5">
          <section className="premium-panel p-4 sm:p-5 sm:p-6">
            {acceptsAudioUpload ? (
              <div {...getRootProps()} className="group">
                <input {...getInputProps()} />
                <div
                  className={cn(
                    'flex min-h-[150px] flex-col items-center justify-center rounded-[18px] border border-dashed px-4 py-6 text-center transition sm:min-h-[280px] sm:rounded-[28px] sm:px-8 sm:py-10',
                    isDragActive
                      ? 'border-indigo-400 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/20'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-indigo-950/30 sm:h-20 sm:w-20">
                    <UploadCloud className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <h2 className="mt-3 font-display text-base font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:mt-6 sm:text-2xl">
                    Drop your speech file here
                  </h2>
                  <p className="mt-2 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400 sm:mt-2 sm:text-sm sm:leading-6">
                    Upload {acceptLabel} files and turn spoken audio into readable text.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3">
                    <button
                      type="button"
                      onClick={open}
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-4 py-2.5 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] sm:px-5 sm:py-3 sm:text-sm"
                    >
                      <UploadCloud className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Choose file
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-5 sm:py-3 sm:text-sm"
                    >
                      <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={primaryText}
                  onChange={event => setPrimaryText(event.target.value)}
                  rows={10}
                  className="min-h-[200px] w-full rounded-[20px] bg-white px-4 py-3 text-xs leading-6 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-800 sm:rounded-[28px] sm:min-h-[280px] sm:px-5 sm:py-4 sm:text-sm sm:leading-7"
                  placeholder="Paste or write your source text here."
                />
                {tool.slug === 'text-diff-checker' && (
                  <textarea
                    value={secondaryText}
                    onChange={event => setSecondaryText(event.target.value)}
                    rows={6}
                    className="min-h-[150px] w-full rounded-[20px] bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-slate-800 sm:min-h-[200px] sm:rounded-[28px] sm:px-5 sm:py-4 sm:text-sm sm:leading-7"
                    placeholder="Paste the second version here."
                  />
                )}
              </div>
            )}

            {audioFile && audioPreviewUrl && (
              <div className="mt-4 rounded-[20px] bg-slate-50 px-3 py-3 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800 sm:mt-5 sm:rounded-3xl sm:px-4 sm:py-4">
                <div className="flex items-center justify-between gap-2.5 sm:gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-950 dark:text-slate-50 sm:text-sm">{audioFile.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs">{formatBytes(audioFile.size)}</p>
                  </div>
                  <Mic2 className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5" />
                </div>
                <audio src={audioPreviewUrl} controls className="mt-3 w-full sm:mt-4" />
              </div>
            )}
          </section>

          {hasTextInput && (
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={handleProcess}
                disabled={loading}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                {copy.actionLabel}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-3 text-slate-700 transition active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100"
                aria-label="Reset workspace"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          )}

          <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px] sm:gap-5">
            <div className="premium-card p-4 sm:p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-2.5 sm:mb-5 sm:gap-3">
                <div>
                  <p className="premium-kicker text-[10px] sm:text-xs">Workspace options</p>
                  <h2 className="font-display text-base font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-xl">
                    Tune the output
                  </h2>
                </div>
                <Sparkles className="h-4 w-4 text-indigo-500 sm:h-5 sm:w-5" />
              </div>

              {['ai-text-generator', 'text-grammar-checker', 'paraphrasing-tool'].includes(tool.slug) && (
                <div className="flex flex-wrap gap-2">
                  {['clear', 'professional', 'persuasive'].map(tone => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setWritingTone(tone)}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition sm:px-4 sm:py-2 sm:text-sm',
                        writingTone === tone
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      )}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              )}

              {['ai-text-generator', 'text-summarizer'].includes(tool.slug) && (
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
                  {['short', 'medium', 'long', 'bullet'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSummaryMode(mode)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold capitalize transition',
                        summaryMode === mode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}

              {tool.slug === 'text-to-speech' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {['0.9', '1', '1.1', '1.25'].map(speed => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setSpeechSpeed(speed)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:py-2 sm:text-sm',
                          speechSpeed === speed
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">Voice: Alloy • Output: MP3</p>
                </div>
              )}
            </div>

            <div className="premium-card p-4 sm:p-5">
              <p className="premium-kicker text-[10px] sm:text-xs">Source stats</p>
              <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                {sourceMetrics.map(metric => (
                  <div key={metric.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">{metric.label}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-950 dark:text-slate-50 sm:mt-1 sm:text-sm">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className={cn("space-y-4 sm:space-y-5", !hasTextInput && !result && "hidden sm:block")}>
          <section className="premium-card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-xl">Live process</h2>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 sm:text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:mt-4 sm:h-2">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800 sm:mt-5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 sm:h-11 sm:w-11 sm:rounded-2xl">
                {loading ? <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" /> : <Type className="h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-950 dark:text-slate-50 sm:text-sm">
                  {loading ? 'Processing input' : result ? 'Result ready' : 'Waiting for input'}
                </p>
                <p className="mt-0.5 text-[10px] leading-5 text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs sm:leading-6">
                  The output, text preview, and download controls appear here after processing.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-4 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)] sm:rounded-[28px] sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white sm:h-12 sm:w-12 sm:rounded-2xl">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <h2 className="mt-4 font-display text-xl font-extrabold tracking-tight sm:mt-6 sm:text-3xl">
              {result ? 'Result ready' : 'Processed output appears here'}
            </h2>
            <p className="mt-2 text-xs leading-5 text-white/70 sm:mt-3 sm:text-sm sm:leading-6">
              {result?.output || 'Run the tool to see the cleaned text, rewritten output, or playable audio result.'}
            </p>
            {error && (
              <div className="mt-4 rounded-xl bg-rose-500/12 px-3 py-3 text-xs text-rose-100 ring-1 ring-rose-400/20 sm:mt-5 sm:rounded-2xl sm:px-4 sm:py-4 sm:text-sm">
                {error}
              </div>
            )}
            {result?.previewUrl && result.previewType === 'audio' && (
              <div className="mt-4 rounded-xl bg-white/8 p-3 ring-1 ring-white/10 sm:mt-5 sm:rounded-2xl sm:p-4">
                <audio src={result.previewUrl} controls className="w-full" />
              </div>
            )}
            <div className="mt-4 grid gap-2 sm:mt-6 sm:gap-3 sm:grid-cols-2">
              {(result?.metrics || [{ label: 'Output', value: 'Pending' }, { label: 'Mode', value: tool.name }]).slice(0, 4).map(metric => (
                <div key={metric.label} className="rounded-xl bg-white/6 px-3 py-2.5 ring-1 ring-white/10 sm:rounded-2xl sm:px-4 sm:py-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">{metric.label}</p>
                  <p className="mt-1.5 text-xs font-semibold text-white sm:mt-2 sm:text-sm">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!result?.output && !result?.outputBlob}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-3 sm:text-sm"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Download result
              </button>
              <button
                type="button"
                onClick={() => void copyText(result?.output || '')}
                disabled={!result?.output}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2.5 text-[11px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-3 sm:text-sm"
              >
                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Copy output
              </button>
            </div>
          </section>

          <section className="premium-card p-4 sm:p-5">
            <p className="premium-kicker text-[10px] sm:text-xs">Result insight</p>
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <FileText className="mt-0.5 h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4" />
                <div>
                  <p className="text-xs font-semibold text-slate-950 dark:text-slate-50 sm:text-sm">
                    {result?.output ? `${result.output.length} characters ready` : 'No output yet'}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-5 text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs sm:leading-6">
                    Clean text output stays easy to copy, review, and export.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 sm:gap-3">
                <FileAudio2 className="mt-0.5 h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4" />
                <div>
                  <p className="text-xs font-semibold text-slate-950 dark:text-slate-50 sm:text-sm">
                    {result?.previewUrl ? 'Audio preview ready' : 'Text-only result'}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-5 text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-xs sm:leading-6">
                    Audio preview appears automatically for text-to-speech results.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="hidden flex-wrap gap-2 sm:flex">
        <button
          type="button"
          onClick={handleProcess}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-3 py-2 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:py-2.5 sm:text-xs sm:px-6 sm:py-3 sm:text-sm"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" /> : <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          {copy.actionLabel}
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:px-4 sm:py-2.5 sm:text-xs sm:px-6 sm:py-3 sm:text-sm"
        >
          <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Reset workspace
        </button>
      </div>
    </div>
  )
}
