'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Tool } from '@/lib/tools-data'
import { Copy, CheckCircle, Loader2, RefreshCw, Play, AlertCircle, ExternalLink, Download } from 'lucide-react'
import { cn, copyToClipboard, downloadBlob } from '@/lib/utils'
import type { TextProcessResult } from './processors/types'
import toast from 'react-hot-toast'

function getPlaceholder(slug: string): string {
  const m: Record<string, string> = {
    'ai-summarizer': 'Paste the article or text to summarize...',
    'ai-paraphraser': 'Enter the text you want to rephrase...',
    'grammar-checker': 'Paste your text here to check grammar...',
    'ai-translator': 'Translate to Spanish: Hello, world!',
    'ai-code-generator': 'A React hook for fetching data with loading/error states',
    'ai-email-writer': 'Professional follow-up email after a job interview at Google',
    'hashtag-generator': 'Describe your post or content topic...',
    'word-counter': 'Paste or type your text here...',
    'text-case-converter': 'Enter text to convert case...',
    'remove-duplicate-lines': 'apple\napple\norange\nbanana\norange',
    'lorem-ipsum-generator': '3',
    'json-formatter': '{"name":"Multiverse","tools":150}',
    'base64-encoder-decoder': 'Enter text to encode or base64 to decode...',
    'url-encoder-decoder': 'https://example.com/path?q=hello world',
    'jwt-decoder': 'Paste your JWT token here...',
    'hash-generator': 'Enter text to hash...',
    'css-minifier': 'body { margin: 0; padding: 0; }',
    'js-minifier': 'function hello(name) { console.log("Hello " + name); }',
    'meta-tag-generator': 'Title: My Site\nDescription: Best tools\nKeywords: tools, free',
    'keyword-extractor': 'Paste your article or content here...',
    'qr-code-generator': 'https://multiverse-tools.vercel.app',
    'ai-image-generator': 'A breathtaking mountain landscape at sunset, photorealistic, 4K',
    'youtube-thumbnail-downloader': 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    'gitignore-generator': 'node, nextjs, react, python',
    'cron-generator': '0 9 * * 1-5',
    'color-converter': '#6366f1',
    'api-tester': 'https://api.example.com/health',
    'regex-tester': 'Paste the text you want to test against your pattern...',
    'social-media-preview': 'https://example.com/article',
    'text-to-speech': 'Turn this paragraph into a spoken audio file.',
    'uuid-generator': 'Click Generate',
    'age-calculator': '1995-01-15',
    'bmi-calculator': '70, 175',
    'emi-calculator': '500000, 8.5, 60',
    'percentage-calculator': '75, 100',
    'gst-calculator': '1000, 18',
    'tip-calculator': '1200, 15, 4',
    'date-difference-calculator': '2024-01-01, 2026-03-21',
    'timezone-converter': '2026-03-21T14:30:00+05:30, America/New_York, Europe/London',
    'calorie-calculator': 'male, 30, 70, 175, moderate, maintain',
  }

  return m[slug] || 'Enter your input here...'
}

function clientSide(slug: string, input: string): string | null {
  if (slug === 'text-case-converter') return [`UPPERCASE:\n${input.toUpperCase()}`, `\nlowercase:\n${input.toLowerCase()}`, `\nTitle Case:\n${input.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())}`, `\ncamelCase:\n${input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())}`, `\nsnake_case:\n${input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}`, `\nkebab-case:\n${input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`].join('')
  if (slug === 'remove-duplicate-lines' || slug === 'duplicate-remover') { const l = input.split('\n'); const u = [...new Set(l)]; return `Removed ${l.length - u.length} duplicates\n\n${u.join('\n')}` }
  if (slug === 'text-reverser') return `Reversed:\n${input.split('').reverse().join('')}\n\nWords reversed:\n${input.split(' ').reverse().join(' ')}`
  if (slug === 'markdown-to-html') return `<!DOCTYPE html>\n<html><body>\n${input.replace(/^### (.+)/gm,'<h3>$1</h3>').replace(/^## (.+)/gm,'<h2>$1</h2>').replace(/^# (.+)/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`(.+?)`/g,'<code>$1</code>')}\n</body></html>`
  if (slug === 'binary-to-text') { try { return `Decoded:\n${input.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('')}` } catch { return 'Invalid binary' } }
  if (slug === 'text-to-binary') return `Binary:\n${input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ')}`
  if (slug === 'csv-to-json') { const l = input.trim().split('\n'); const h = l[0].split(',').map(s => s.trim()); return JSON.stringify(l.slice(1).map(line => { const v = line.split(','); return h.reduce((o,k,i) => ({...o,[k]:v[i]?.trim()||''}),{}) }), null, 2) }
  if (slug === 'json-to-csv') { try { const d = JSON.parse(input); if (!Array.isArray(d)) return 'Input must be an array'; const h = Object.keys(d[0]||{}); return [h.join(','), ...d.map(r => h.map(k => r[k]??'').join(','))].join('\n') } catch(e) { return `Error: ${(e as Error).message}` } }
  return null
}

function calcTool(slug: string, input: string): string {
  if (slug === 'age-calculator') { const d = new Date(input||'1990-01-01'); if(isNaN(d.getTime())) return 'Enter YYYY-MM-DD'; const t = new Date(); const y = t.getFullYear()-d.getFullYear(); const m = t.getMonth()-d.getMonth(); const days = t.getDate()-d.getDate(); const years = m<0||(m===0&&days<0)?y-1:y; const months = ((m+12)%12); const total = Math.floor((t.getTime()-d.getTime())/86400000); return `Age: ${years} years, ${months} months\nTotal days: ${total.toLocaleString()}\nHours: ~${(total*24).toLocaleString()}` }
  if (slug === 'bmi-calculator') { const [w,h] = input.split(',').map(Number); if(!w||!h) return 'Enter: weight(kg), height(cm)\nEx: 70, 175'; const b = w/Math.pow(h/100,2); const c = b<18.5?'Underweight':b<25?'Normal':b<30?'Overweight':'Obese'; return `BMI: ${b.toFixed(1)}\nCategory: ${c}\nIdeal weight: ${(18.5*Math.pow(h/100,2)).toFixed(1)}-${(24.9*Math.pow(h/100,2)).toFixed(1)} kg` }
  if (slug === 'emi-calculator') { const [p,r,n] = input.split(',').map(Number); if(!p||!r||!n) return 'Enter: principal, rate%, months\nEx: 500000, 8.5, 60'; const mr = r/12/100; const emi = p*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1); const total = emi*n; return `Monthly EMI: Rs ${emi.toFixed(2)}\nTotal Payment: Rs ${total.toFixed(2)}\nTotal Interest: Rs ${(total-p).toFixed(2)}` }
  if (slug === 'percentage-calculator') { const [v,t] = input.split(',').map(Number); if(!v||!t) return 'Enter: value, total\nEx: 75, 100'; return `${v}/${t} = ${((v/t)*100).toFixed(2)}%\n${t}x15% = ${(t*.15).toFixed(2)}\n${v}+10% = ${(v*1.1).toFixed(2)}\n${v}-20% = ${(v*.8).toFixed(2)}` }
  if (slug === 'gst-calculator') { const [a,r] = input.split(',').map(Number); if(!a||!r) return 'Enter: amount, gst%\nEx: 1000, 18'; const g=(a*r)/100; return `Base: Rs ${a}\nGST (${r}%): Rs ${g.toFixed(2)}\nCGST: Rs ${(g/2).toFixed(2)}\nSGST: Rs ${(g/2).toFixed(2)}\nTotal: Rs ${(a+g).toFixed(2)}` }
  if (slug === 'tip-calculator') { const [b,tp=15,p=1] = input.split(',').map(Number); if(!b) return 'Enter: bill, tip%, people\nEx: 1200, 15, 4'; const tip=(b*tp)/100; return `Tip (${tp}%): Rs ${tip.toFixed(2)}\nTotal: Rs ${(b+tip).toFixed(2)}\nPer person: Rs ${((b+tip)/p).toFixed(2)}` }
  if (slug === 'compound-interest-calculator') { const [p,r,t,n=12] = input.split(',').map(Number); if(!p||!r||!t) return 'Enter: principal, rate%, years, n\nEx: 10000, 8, 5, 12'; const a = p*Math.pow(1+(r/100)/n,n*t); return `Final Amount: Rs ${a.toFixed(2)}\nInterest Earned: Rs ${(a-p).toFixed(2)}\nReturn: ${(((a-p)/p)*100).toFixed(1)}%` }
  if (slug === 'salary-calculator') { const [c,tx=20] = input.split(',').map(Number); if(!c) return 'Enter: CTC, tax%\nEx: 1200000, 20'; const n=c-(c*tx/100); return `Annual CTC: Rs ${c.toLocaleString()}\nTax (${tx}%): Rs ${(c*tx/100).toLocaleString()}\nAnnual Net: Rs ${n.toLocaleString()}\nMonthly Net: Rs ${(n/12).toFixed(0)}` }
  if (slug === 'currency-converter') return `Live rates (approx):\n1 USD = 83.50 INR\n1 USD = 0.93 EUR\n1 USD = 0.79 GBP\n1 USD = 157.2 JPY\n1 EUR = 89.8 INR\n\nAdd NEXT_PUBLIC_CURRENCY_API_KEY for live rates`
  if (slug === 'unit-converter') return `Length: 1 km = 0.621 mi | 1 mi = 1.609 km\nWeight: 1 kg = 2.205 lbs | 1 lb = 0.453 kg\nTemp: F = (C x 9/5) + 32\nVolume: 1 L = 0.264 gal`
  if (slug === 'date-difference-calculator') { const [fromRaw, toRaw] = input.split(/[\n,]+/).map(part => part.trim()); if (!fromRaw || !toRaw) return 'Enter: start-date, end-date\nEx: 2024-01-01, 2026-03-21'; const from = new Date(fromRaw); const to = new Date(toRaw); if (isNaN(from.getTime()) || isNaN(to.getTime())) return 'Use valid dates like 2024-01-01, 2026-03-21'; const diffDays = Math.floor(Math.abs(to.getTime() - from.getTime()) / 86400000); return `Difference: ${diffDays} days\nWeeks: ${(diffDays / 7).toFixed(1)}\nMonths: ${(diffDays / 30.44).toFixed(1)}\nYears: ${(diffDays / 365.25).toFixed(2)}` }
  if (slug === 'timezone-converter') { const parts = input.split(',').map(part => part.trim()).filter(Boolean); if (parts.length === 0) { const now = new Date(); const zones = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo']; return zones.map(zone => `${zone}: ${now.toLocaleString('en-US', { timeZone: zone, dateStyle: 'medium', timeStyle: 'short' })}`).join('\n') } const base = new Date(parts[0]); if (isNaN(base.getTime())) return 'Enter ISO date/time with offset, then target zones\nEx: 2026-03-21T14:30:00+05:30, America/New_York, Europe/London'; const zones = parts.slice(1); if (zones.length === 0) return 'Add at least one target time zone after the timestamp'; return zones.map(zone => `${zone}: ${base.toLocaleString('en-US', { timeZone: zone, dateStyle: 'medium', timeStyle: 'short' })}`).join('\n') }
  if (slug === 'calorie-calculator') { const [sex='male', ageRaw, weightRaw, heightRaw, activity='moderate', goal='maintain'] = input.split(',').map(part => part.trim().toLowerCase()); const age = Number(ageRaw); const weight = Number(weightRaw); const height = Number(heightRaw); if (!age || !weight || !height) return 'Enter: sex, age, weightKg, heightCm, activity, goal\nEx: male, 30, 70, 175, moderate, maintain'; const bmr = sex === 'female' ? 10*weight + 6.25*height - 5*age - 161 : 10*weight + 6.25*height - 5*age + 5; const activityMap: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 }; const calories = bmr * (activityMap[activity] || 1.55); const adjusted = goal === 'cut' ? calories - 400 : goal === 'bulk' ? calories + 300 : calories; return `BMR: ${Math.round(bmr)} kcal/day\nMaintenance: ${Math.round(calories)} kcal/day\nTarget (${goal}): ${Math.round(adjusted)} kcal/day\nProtein: ${Math.round(weight * 1.8)} g/day\nWater: ${(weight * 0.035).toFixed(1)} L/day` }
  return 'Enter values and click Calculate'
}

function parseHeaderInput(input: string): Record<string, string> {
  return Object.fromEntries(
    input
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const separatorIndex = line.indexOf(':')
        if (separatorIndex === -1) return null
        const key = line.slice(0, separatorIndex).trim()
        const value = line.slice(separatorIndex + 1).trim()
        return key ? [key, value] : null
      })
      .filter((entry): entry is [string, string] => Array.isArray(entry))
  )
}

export default function ToolDetailTextClient({ tool }: { tool: Tool }) {
  const [textInput, setTextInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [apiError, setApiError] = useState('')
  const [diffText2, setDiffText2] = useState('')
  const [regexPattern, setRegexPattern] = useState('\\b\\w+\\b')
  const [regexFlags, setRegexFlags] = useState('gi')
  const [apiMethod, setApiMethod] = useState('GET')
  const [apiHeaders, setApiHeaders] = useState('')
  const [apiBody, setApiBody] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (!outputBlob || !outputBlob.type.startsWith('audio/')) {
      setMediaPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(outputBlob)
    setMediaPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [outputBlob])

  useEffect(() => () => {
    mediaRecorderRef.current?.stop()
    mediaStreamRef.current?.getTracks().forEach(track => track.stop())
  }, [])

  function resetAll() {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
    setTextInput('')
    setDiffText2('')
    setOutput('')
    setOutputBlob(null)
    setOutputFilename('')
    setImagePreview('')
    setProgress(0)
    setApiError('')
    setRegexPattern('\\b\\w+\\b')
    setRegexFlags('gi')
    setApiMethod('GET')
    setApiHeaders('')
    setApiBody('')
  }

  function startProgress() {
    setProgress(5)
    const iv = setInterval(() => setProgress(p => p < 82 ? p + Math.random() * 8 : p), 350)
    return () => { clearInterval(iv); setProgress(100) }
  }

  function applyProcessResult(result: TextProcessResult) {
    if (result.apiError) {
      setApiError(result.apiError)
      return
    }

    if (result.imagePreview) setImagePreview(result.imagePreview)
    if (result.output) setOutput(result.output)
    if (result.outputBlob) setOutputBlob(result.outputBlob)
    if (result.outputFilename) setOutputFilename(result.outputFilename)
  }

  async function handleRecorderAction() {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      return
    }

    try {
      setApiError('')
      setOutput('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      const chunks: BlobPart[] = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = event => {
        if (event.data.size > 0) chunks.push(event.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
        setOutputBlob(blob)
        setOutputFilename('recording.webm')
        setOutput(`Audio recording complete.\n\nFormat: ${recorder.mimeType || 'audio/webm'}`)
      }

      recorder.start()
      setIsRecording(true)
      setOutput('Recording in progress...')
    } catch (error) {
      setApiError(`Microphone access failed: ${(error as Error).message}`)
    }
  }

  async function handleProcess() {
    setLoading(true)
    setApiError('')
    setOutput('')
    setOutputBlob(null)
    setOutputFilename('')
    setImagePreview('')
    const done = startProgress()

    try {
      const { slug, categorySlug: cat } = tool

      const clientResult = clientSide(slug, textInput)
      if (clientResult !== null) {
        setOutput(clientResult)
        return
      }

      if (cat === 'calculator') {
        setOutput(calcTool(slug, textInput))
        return
      }

      if (slug === 'qr-code-generator') {
        setImagePreview(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(textInput || 'https://multiverse-tools.vercel.app')}&color=6366f1`)
        setOutput('QR code generated')
        return
      }

      if (slug === 'ai-image-generator') {
        setImagePreview(`https://image.pollinations.ai/prompt/${encodeURIComponent(textInput || 'beautiful landscape')}?width=1024&height=1024&nologo=true&seed=${Date.now()}`)
        setOutput('Image generated')
        return
      }

      if (slug === 'youtube-thumbnail-downloader') {
        const m = textInput.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        if (!m) {
          setApiError('Invalid YouTube URL')
          return
        }
        setImagePreview(`https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg`)
        setOutput([
          `Video ID: ${m[1]}`,
          '',
          'Available thumbnails:',
          `Maxres: https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg`,
          `Standard: https://img.youtube.com/vi/${m[1]}/sddefault.jpg`,
          `High quality: https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,
          `Medium quality: https://img.youtube.com/vi/${m[1]}/mqdefault.jpg`,
          `Default: https://img.youtube.com/vi/${m[1]}/default.jpg`,
        ].join('\n'))
        return
      }

      if (cat === 'audio') {
        const { handleAudioTextTool } = await import('./processors/text-audio')
        applyProcessResult(await handleAudioTextTool(slug, textInput))
        return
      }

      if (cat === 'ai') {
        const { handleAiTool } = await import('./processors/text-ai')
        applyProcessResult(await handleAiTool(slug, textInput))
        return
      }

      if (cat === 'dev') {
        const { handleDevTool } = await import('./processors/text-dev')
        applyProcessResult(
          await handleDevTool(slug, textInput, {
            ...(slug === 'regex-tester'
              ? {
                  pattern: regexPattern,
                  flags: regexFlags,
                }
              : {}),
            ...(slug === 'api-tester'
              ? {
                  method: apiMethod,
                  headers: parseHeaderInput(apiHeaders),
                  body: apiBody,
                }
              : {}),
          })
        )
        return
      }

      if (cat === 'seo') {
        const { handleSeoTool } = await import('./processors/text-seo')
        applyProcessResult(await handleSeoTool(slug, textInput))
        return
      }

      if (cat === 'text') {
        const { handleTextTool } = await import('./processors/text-tools')
        applyProcessResult(await handleTextTool(slug, textInput, diffText2))
        return
      }

      setOutput('Processing complete')
    } catch (e) {
      setApiError(`Error: ${(e as Error).message}`)
    } finally {
      done()
      setLoading(false)
    }
  }

  async function handleCopy() {
    await copyToClipboard(output)
    setCopied(true)
    toast.success('Copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (outputBlob) downloadBlob(outputBlob, outputFilename || 'output.bin')
  }

  const needsText = tool.inputType !== 'none' || tool.categorySlug === 'calculator'
  const usesMonoInput = tool.categorySlug === 'dev'
  const textareaClass = cn('premium-textarea', usesMonoInput && 'font-mono')
  const showApiBody = !['GET', 'HEAD'].includes(apiMethod)
  const btnLabel =
    tool.slug === 'audio-recorder'
      ? isRecording
        ? 'Stop Recording'
        : 'Start Recording'
      : loading
        ? 'Processing...'
        : tool.categorySlug === 'ai'
          ? 'Generate'
          : tool.categorySlug === 'calculator'
            ? 'Calculate'
            : tool.slug === 'qr-code-generator'
              ? 'Generate QR'
              : tool.slug === 'ai-image-generator'
                ? 'Generate Image'
                : tool.inputType === 'url'
                  ? 'Fetch'
                  : 'Run Tool'

  return (
    <div className="space-y-6 p-5 md:p-6">
      {needsText && tool.slug !== 'audio-recorder' && (
        <div className="space-y-1.5">
          <label className="premium-label">
            {tool.slug === 'api-tester'
              ? 'Request URL'
              : tool.slug === 'regex-tester'
                ? 'Test Text'
                : tool.categorySlug === 'calculator'
                  ? 'Input Values'
                  : tool.inputType === 'url'
                    ? 'URL'
                    : 'Input'}
          </label>
          <textarea value={textInput} onChange={e => setTextInput(e.target.value)} placeholder={getPlaceholder(tool.slug)} rows={tool.categorySlug === 'ai' ? 6 : tool.categorySlug === 'calculator' ? 3 : 4} className={textareaClass} />
        </div>
      )}

      {tool.slug === 'text-diff-checker' && <div className="space-y-1.5"><label className="premium-label">Second Text</label><textarea value={diffText2} onChange={e => setDiffText2(e.target.value)} placeholder="Paste second text..." rows={4} className="premium-textarea font-mono" /></div>}

      {tool.slug === 'regex-tester' && (
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_120px]">
          <div className="space-y-1.5">
            <label className="premium-label">Pattern</label>
            <input
              value={regexPattern}
              onChange={e => setRegexPattern(e.target.value)}
              placeholder="\\b\\w+\\b"
              className="premium-input font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="premium-label">Flags</label>
            <input
              value={regexFlags}
              onChange={e => setRegexFlags(e.target.value)}
              placeholder="gi"
              className="premium-input font-mono"
            />
          </div>
        </div>
      )}

      {tool.slug === 'api-tester' && (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="space-y-1.5">
              <label className="premium-label">Method</label>
              <select
                value={apiMethod}
                onChange={e => setApiMethod(e.target.value)}
                className="premium-input"
              >
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(method => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="premium-label">Headers</label>
              <textarea
                value={apiHeaders}
                onChange={e => setApiHeaders(e.target.value)}
                placeholder={'Authorization: Bearer <token>\nAccept: application/json'}
                rows={3}
                className="premium-textarea font-mono"
              />
            </div>
          </div>

          {showApiBody && (
            <div className="space-y-1.5">
              <label className="premium-label">Request Body</label>
              <textarea
                value={apiBody}
                onChange={e => setApiBody(e.target.value)}
                placeholder='{"message":"hello"}'
                rows={5}
                className="premium-textarea font-mono"
              />
            </div>
          )}
        </div>
      )}

      {tool.slug === 'audio-recorder' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">
            Record straight from your microphone, then download the captured file.
          </p>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button onClick={tool.slug === 'audio-recorder' ? handleRecorderAction : handleProcess} disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}{btnLabel}
        </button>
        {(output || textInput || imagePreview || outputBlob) && <button onClick={resetAll} className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-4"><RefreshCw className="w-4 h-4" />Reset</button>}
      </div>

      {loading && <div><div className="mb-1.5 flex justify-between text-xs text-muted-foreground"><span className="font-display font-bold tracking-tight">Processing...</span><span>{Math.round(progress)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>}

      {apiError && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /><pre className="whitespace-pre-wrap text-xs text-red-600">{apiError}</pre></div>}

      {imagePreview && <div className="space-y-3"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"><CheckCircle className="w-4 h-4 text-emerald-500" />Preview</h3><a href={imagePreview} download target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm"><ExternalLink className="w-3.5 h-3.5" />Open</a></div><div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[360px] lg:h-[450px]"><Image src={imagePreview} alt="Result" fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px" style={{ objectFit: 'contain' }} /></div></div>}

      {mediaPreviewUrl && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"><CheckCircle className="w-4 h-4 text-emerald-500" />Audio Preview</h3>
          <audio controls className="w-full" src={mediaPreviewUrl} />
        </div>
      )}

      {outputBlob && <div><button onClick={handleDownload} className="btn-primary flex items-center gap-2"><Download className="w-4 h-4" />Download {outputFilename || 'output'}</button></div>}

      {output && <div className="space-y-2"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"><CheckCircle className="w-4 h-4 text-emerald-500" />Output</h3><button onClick={handleCopy} className="btn-secondary px-3 py-1.5 text-xs">{copied ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}</button></div><pre className="custom-scrollbar max-h-[500px] overflow-auto rounded-2xl border border-slate-200 bg-white p-4 text-sm font-mono whitespace-pre-wrap shadow-sm">{output}</pre></div>}
    </div>
  )
}
