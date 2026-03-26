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

  return (
    <div className="space-y-8" data-tool-shell="true">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {copy.badges.map(item => (
            <span key={item} className="premium-chip">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 premium-kicker">{copy.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl dark:text-slate-50">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          {copy.summary}
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_360px]">
        <div className="space-y-5">
          <section className="premium-panel p-5 sm:p-6">
            {acceptsAudioUpload ? (
              <div {...getRootProps()} className="group">
                <input {...getInputProps()} />
                <div
                  className={cn(
                    'flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed px-8 py-10 text-center transition',
                    isDragActive
                      ? 'border-indigo-400 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/20'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70'
                  )}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-indigo-950/30">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                    Drop your speech file here
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Upload {acceptLabel} files and turn spoken audio into readable text.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={open}
                      className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01]"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Choose file
                    </button>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={primaryText}
                  onChange={event => setPrimaryText(event.target.value)}
                  rows={12}
                  className="min-h-[280px] w-full rounded-[28px] bg-white px-5 py-4 text-sm leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-900/70 dark:text-slate-100 dark:ring-slate-800"
                  placeholder="Paste or write your source text here."
                />
                {tool.slug === 'text-diff-checker' && (
                  <textarea
                    value={secondaryText}
                    onChange={event => setSecondaryText(event.target.value)}
                    rows={8}
                    className="min-h-[200px] w-full rounded-[28px] bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-indigo-300 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-slate-800"
                    placeholder="Paste the second version here."
                  />
                )}
              </div>
            )}

            {audioFile && audioPreviewUrl && (
              <div className="mt-5 rounded-3xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{audioFile.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatBytes(audioFile.size)}</p>
                  </div>
                  <Mic2 className="h-5 w-5 text-slate-400" />
                </div>
                <audio src={audioPreviewUrl} controls className="mt-4 w-full" />
              </div>
            )}
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="premium-card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="premium-kicker">Workspace options</p>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                    Tune the output
                  </h2>
                </div>
                <Sparkles className="h-5 w-5 text-indigo-500" />
              </div>

              {['ai-text-generator', 'text-grammar-checker', 'paraphrasing-tool'].includes(tool.slug) && (
                <div className="flex flex-wrap gap-3">
                  {['clear', 'professional', 'persuasive'].map(tone => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setWritingTone(tone)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm font-semibold capitalize transition',
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
                <div className="mt-4 flex flex-wrap gap-3">
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
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['0.9', '1', '1.1', '1.25'].map(speed => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => setSpeechSpeed(speed)}
                        className={cn(
                          'rounded-full px-4 py-2 text-sm font-semibold transition',
                          speechSpeed === speed
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                        )}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Voice: Alloy • Output: MP3</p>
                </div>
              )}
            </div>

            <div className="premium-card p-5">
              <p className="premium-kicker">Source stats</p>
              <div className="mt-4 space-y-4">
                {sourceMetrics.map(metric => (
                  <div key={metric.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-slate-50">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="premium-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">Live process</h2>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{Math.round(progress)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200 dark:bg-slate-950/30 dark:ring-slate-800">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Type className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {loading ? 'Processing input' : result ? 'Result ready' : 'Waiting for input'}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  The output, text preview, and download controls appear here after processing.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#1f2560,#090c18_68%)] p-6 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
              {result ? 'Result ready' : 'Processed output appears here'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              {result?.output || 'Run the tool to see the cleaned text, rewritten output, or playable audio result.'}
            </p>
            {error && (
              <div className="mt-5 rounded-2xl bg-rose-500/12 px-4 py-4 text-sm text-rose-100 ring-1 ring-rose-400/20">
                {error}
              </div>
            )}
            {result?.previewUrl && result.previewType === 'audio' && (
              <div className="mt-5 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <audio src={result.previewUrl} controls className="w-full" />
              </div>
            )}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(result?.metrics || [{ label: 'Output', value: 'Pending' }, { label: 'Mode', value: tool.name }]).slice(0, 4).map(metric => (
                <div key={metric.label} className="rounded-2xl bg-white/6 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">{metric.label}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!result?.output && !result?.outputBlob}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download result
              </button>
              <button
                type="button"
                onClick={() => void copyText(result?.output || '')}
                disabled={!result?.output}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Copy className="h-4 w-4" />
                Copy output
              </button>
            </div>
          </section>

          <section className="premium-card p-5">
            <p className="premium-kicker">Result insight</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {result?.output ? `${result.output.length} characters ready` : 'No output yet'}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Clean text output stays easy to copy, review, and export.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileAudio2 className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                    {result?.previewUrl ? 'Audio preview ready' : 'Text-only result'}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Audio preview appears automatically for text-to-speech results.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleProcess}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#24389c,#465fd6)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {copy.actionLabel}
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <RefreshCw className="h-4 w-4" />
          Reset workspace
        </button>
      </div>
    </div>
  )
}
