'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Tool } from '@/lib/tools-data'
import UploadZone from './UploadZone'
import { Download, Copy, CheckCircle, Loader2, RefreshCw, Play, AlertCircle, ExternalLink } from 'lucide-react'
import { cn, copyToClipboard, downloadBlob, formatBytes } from '@/lib/utils'
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
    'uuid-generator': 'Click Generate',
    'age-calculator': '1995-01-15',
    'bmi-calculator': '70, 175',
    'emi-calculator': '500000, 8.5, 60',
    'percentage-calculator': '75, 100',
    'gst-calculator': '1000, 18',
    'tip-calculator': '1200, 15, 4',
    'resize-image': '800x600  (or just 800 for width)',
    'trim-video': '0, 30  (start seconds, duration)',
    'trim-audio': '0, 30  (start seconds, duration)',
  }
  return m[slug] || 'Enter your input here...'
}

async function callJSONAPI(url: string, body: Record<string, unknown>, action?: string): Promise<Record<string, unknown>> {
  const endpoint = action ? `${url}?action=${action}` : url
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) { const e = await res.json().catch(() => ({ error: res.statusText })); throw new Error((e as {error:string}).error || `HTTP ${res.status}`) }
  return res.json()
}

function clientSide(slug: string, input: string): string | null {
  if (slug === 'text-case-converter') return [`UPPERCASE:\n${input.toUpperCase()}`, `\nlowercase:\n${input.toLowerCase()}`, `\nTitle Case:\n${input.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())}`, `\ncamelCase:\n${input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())}`, `\nsnake_case:\n${input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}`, `\nkebab-case:\n${input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`].join('')
  if (slug === 'duplicate-remover') { const l = input.split('\n'); const u = [...new Set(l)]; return `Removed ${l.length - u.length} duplicates\n\n${u.join('\n')}` }
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
  if (slug === 'emi-calculator') { const [p,r,n] = input.split(',').map(Number); if(!p||!r||!n) return 'Enter: principal, rate%, months\nEx: 500000, 8.5, 60'; const mr = r/12/100; const emi = p*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1); const total = emi*n; return `Monthly EMI: ₹${emi.toFixed(2)}\nTotal Payment: ₹${total.toFixed(2)}\nTotal Interest: ₹${(total-p).toFixed(2)}` }
  if (slug === 'percentage-calculator') { const [v,t] = input.split(',').map(Number); if(!v||!t) return 'Enter: value, total\nEx: 75, 100'; return `${v}/${t} = ${((v/t)*100).toFixed(2)}%\n${t}×15% = ${(t*.15).toFixed(2)}\n${v}+10% = ${(v*1.1).toFixed(2)}\n${v}-20% = ${(v*.8).toFixed(2)}` }
  if (slug === 'gst-calculator') { const [a,r] = input.split(',').map(Number); if(!a||!r) return 'Enter: amount, gst%\nEx: 1000, 18'; const g=(a*r)/100; return `Base: ₹${a}\nGST (${r}%): ₹${g.toFixed(2)}\nCGST: ₹${(g/2).toFixed(2)}\nSGST: ₹${(g/2).toFixed(2)}\nTotal: ₹${(a+g).toFixed(2)}` }
  if (slug === 'tip-calculator') { const [b,tp=15,p=1] = input.split(',').map(Number); if(!b) return 'Enter: bill, tip%, people\nEx: 1200, 15, 4'; const tip=(b*tp)/100; return `Tip (${tp}%): ₹${tip.toFixed(2)}\nTotal: ₹${(b+tip).toFixed(2)}\nPer person: ₹${((b+tip)/p).toFixed(2)}` }
  if (slug === 'compound-interest-calculator') { const [p,r,t,n=12] = input.split(',').map(Number); if(!p||!r||!t) return 'Enter: principal, rate%, years, n\nEx: 10000, 8, 5, 12'; const a = p*Math.pow(1+(r/100)/n,n*t); return `Final Amount: ₹${a.toFixed(2)}\nInterest Earned: ₹${(a-p).toFixed(2)}\nReturn: ${(((a-p)/p)*100).toFixed(1)}%` }
  if (slug === 'salary-calculator') { const [c,tx=20] = input.split(',').map(Number); if(!c) return 'Enter: CTC, tax%\nEx: 1200000, 20'; const n=c-(c*tx/100); return `Annual CTC: ₹${c.toLocaleString()}\nTax (${tx}%): ₹${(c*tx/100).toLocaleString()}\nAnnual Net: ₹${n.toLocaleString()}\nMonthly Net: ₹${(n/12).toFixed(0)}` }
  if (slug === 'currency-converter') return `Live rates (approx):\n1 USD = 83.50 INR\n1 USD = 0.93 EUR\n1 USD = 0.79 GBP\n1 USD = 157.2 JPY\n1 EUR = 89.8 INR\n\nAdd NEXT_PUBLIC_CURRENCY_API_KEY for live rates`
  if (slug === 'unit-converter') return `Length: 1 km = 0.621 mi | 1 mi = 1.609 km\nWeight: 1 kg = 2.205 lbs | 1 lb = 0.453 kg\nTemp: °F = (°C × 9/5) + 32\nVolume: 1 L = 0.264 gal`
  return 'Enter values and click Calculate'
}

export default function ToolDetailClient({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState('')
  const [output, setOutput] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [outputFilename, setOutputFilename] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [apiError, setApiError] = useState('')
  const [imgQuality, setImgQuality] = useState('80')
  const [imgConvertTo, setImgConvertTo] = useState('webp')
  const [pdfAngle, setPdfAngle] = useState('90')
  const [audioFmt, setAudioFmt] = useState('mp3')
  const [ocrLang, setOcrLang] = useState('eng')
  const [diffText2, setDiffText2] = useState('')
  const objectPreviewUrlRef = useRef<string | null>(null)

  function clearObjectPreview() {
    if (objectPreviewUrlRef.current) {
      URL.revokeObjectURL(objectPreviewUrlRef.current)
      objectPreviewUrlRef.current = null
    }
  }

  function setManagedImagePreview(nextUrl: string, isObjectUrl = false) {
    clearObjectPreview()
    if (isObjectUrl) objectPreviewUrlRef.current = nextUrl
    setImagePreview(nextUrl)
  }

  function resetAll() {
    setFiles([])
    setTextInput('')
    setOutput('')
    setOutputBlob(null)
    setOutputFilename('')
    clearObjectPreview()
    setImagePreview('')
    setProgress(0)
    setApiError('')
  }

  useEffect(() => () => clearObjectPreview(), [])

  function startProgress() {
    setProgress(5)
    const iv = setInterval(() => setProgress(p => p < 82 ? p + Math.random()*8 : p), 350)
    return () => { clearInterval(iv); setProgress(100) }
  }

  async function handleProcess() {
    setLoading(true); setApiError(''); setOutput(''); setOutputBlob(null); clearObjectPreview(); setImagePreview('')
    const done = startProgress()

    try {
      const { slug, categorySlug: cat } = tool

      // — client-side text tools —
      const cr = clientSide(slug, textInput)
      if (cr !== null) { setOutput(cr); done(); return }

      // — calculators —
      if (cat === 'calculator') { setOutput(calcTool(slug, textInput)); done(); return }

      // — QR code (free API) —
      if (slug === 'qr-code-generator') {
        setManagedImagePreview(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(textInput||'https://multiverse-tools.vercel.app')}&color=6366f1`)
        setOutput('QR code generated'); done(); return
      }

      // — AI image (Pollinations.ai) —
      if (slug === 'ai-image-generator') {
        setManagedImagePreview(`https://image.pollinations.ai/prompt/${encodeURIComponent(textInput||'beautiful landscape')}?width=1024&height=1024&nologo=true&seed=${Date.now()}`)
        setOutput('Image generated'); done(); return
      }

      // — YouTube thumbnail —
      if (slug === 'youtube-thumbnail-downloader') {
        const m = textInput.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        if (!m) { setApiError('Invalid YouTube URL'); done(); return }
        setManagedImagePreview(`https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg`)
        setOutput(`Video ID: ${m[1]}\nMaxres: https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg\nHQ: https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`); done(); return
      }

      // — PDF file tools —
      if (cat === 'pdf' && files.length > 0) {
        const fd = new FormData()
        const actionMap: Record<string, string> = { 'merge-pdf': '/api/tools/pdf/merge', 'split-pdf': '/api/tools/pdf/split', 'compress-pdf': '/api/tools/pdf/compress' }
        if (slug === 'merge-pdf') { files.forEach(f => fd.append('files', f)); const r = await fetch(actionMap[slug], {method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; setOutputBlob(await r.blob()); setOutputFilename('merged.pdf'); setOutput(`Merged ${files.length} PDFs`) }
        else if (slug === 'split-pdf') { fd.append('file',files[0]); fd.append('mode','all'); const r = await fetch(actionMap[slug],{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; setOutputBlob(await r.blob()); setOutputFilename('pages.zip'); setOutput('Split into pages.zip') }
        else if (slug === 'compress-pdf') { fd.append('file',files[0]); const r = await fetch(actionMap[slug],{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; setOutputBlob(await r.blob()); setOutputFilename('compressed.pdf'); setOutput(`Compressed (${r.headers.get('X-Savings-Percent')||'?'}% smaller)`) }
        else if (slug === 'rotate-pdf') { fd.append('file',files[0]); fd.append('angle',pdfAngle); const r = await fetch('/api/tools/pdf/transform?action=rotate',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; setOutputBlob(await r.blob()); setOutputFilename('rotated.pdf'); setOutput(`Rotated ${pdfAngle}°`) }
        else if (slug === 'pdf-watermark') { fd.append('file',files[0]); fd.append('text',textInput||'CONFIDENTIAL'); const r = await fetch('/api/tools/pdf/transform?action=watermark',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; setOutputBlob(await r.blob()); setOutputFilename('watermarked.pdf'); setOutput('Watermark added') }
        else if (slug === 'pdf-metadata') { fd.append('file',files[0]); const r = await fetch('/api/tools/pdf/transform?action=metadata',{method:'POST',body:fd}); const data = await r.json(); setOutput(Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n')) }
        else { setOutput('PDF processed on server') }
        done(); return
      }

      // — Image tools (sharp) —
      if (cat === 'image' && files.length > 0) {
        const fd = new FormData(); fd.append('file', files[0])
        if (slug === 'image-to-text') {
          fd.append('lang', ocrLang)
          const r = await fetch('/api/tools/image/ocr',{method:'POST',body:fd})
          if(!r.ok){const d=await r.json();setApiError(d.error||d.hint);done();return}
          const d = await r.json(); setOutput(`OCR Result (${d.confidence}% confidence, ${d.words} words):\n\n${d.text}`)
        } else if (slug === 'compress-image') {
          fd.append('quality',imgQuality); const r = await fetch('/api/tools/image?action=compress',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; const b=await r.blob(); const previewUrl = URL.createObjectURL(b); setOutputBlob(b); setOutputFilename('compressed.jpg'); setManagedImagePreview(previewUrl, true); setOutput(`Saved ${r.headers.get('X-Savings')||'?'}%`)
        } else if (slug === 'convert-image') {
          fd.append('to',imgConvertTo); fd.append('quality',imgQuality); const r = await fetch('/api/tools/image?action=convert',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; const b=await r.blob(); const previewUrl = URL.createObjectURL(b); setOutputBlob(b); setOutputFilename(`converted.${imgConvertTo}`); setManagedImagePreview(previewUrl, true); setOutput(`Converted to ${imgConvertTo}`)
        } else if (slug === 'resize-image') {
          const [w,h] = textInput.split('x'); fd.append('width',w||'800'); if(h) fd.append('height',h); const r = await fetch('/api/tools/image?action=resize',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; const b=await r.blob(); const previewUrl = URL.createObjectURL(b); setOutputBlob(b); setOutputFilename('resized.jpg'); setManagedImagePreview(previewUrl, true); setOutput('Resized')
        } else if (slug === 'add-watermark-image') {
          fd.append('text',textInput||'Multiverse'); const r = await fetch('/api/tools/image?action=watermark',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; const b=await r.blob(); const previewUrl = URL.createObjectURL(b); setOutputBlob(b); setOutputFilename('watermarked.jpg'); setManagedImagePreview(previewUrl, true); setOutput('Watermark added')
        } else if (slug === 'flip-rotate-image') {
          fd.append('angle',textInput||'90'); const r = await fetch('/api/tools/image?action=rotate',{method:'POST',body:fd}); if(!r.ok){const d=await r.json();setApiError(d.error);done();return}; const b=await r.blob(); const previewUrl = URL.createObjectURL(b); setOutputBlob(b); setOutputFilename('rotated.jpg'); setManagedImagePreview(previewUrl, true); setOutput('Completed')
        } else if (slug === 'image-to-base64') {
          const reader = new FileReader(); reader.onload = e => setOutput(e.target?.result as string||''); reader.readAsDataURL(files[0])
        } else { setOutput('Image processed on server') }
        done(); return
      }

      // — Video tools (ffmpeg) —
      if (cat === 'video' && files.length > 0) {
        const fd = new FormData(); fd.append('file',files[0])
        const aMap: Record<string,string> = {'compress-video':'compress','video-to-mp3':'extract-audio','trim-video':'trim','video-to-gif':'to-gif','change-video-speed':'speed','mute-video':'mute'}
        const action = aMap[slug]||'info'
        if (slug==='trim-video'){const p=textInput.split(',');fd.append('start',p[0]||'0');fd.append('duration',p[1]||'30')}
        if (slug==='change-video-speed') fd.append('speed',textInput||'2')
        const r = await fetch(`/api/tools/video?action=${action}`,{method:'POST',body:fd})
        if(!r.ok){const d=await r.json();setApiError(d.error);done();return}
        const blob = await r.blob()
        const ext = action==='extract-audio'?'mp3':action==='to-gif'?'gif':'mp4'
        setOutputBlob(blob); setOutputFilename(`${action}.${ext}`)
        if (action==='to-gif') { const previewUrl = URL.createObjectURL(blob); setManagedImagePreview(previewUrl, true) }
        setOutput(`Video ${action} complete (${formatBytes(blob.size)})`)
        done(); return
      }

      // — Audio tools (ffmpeg) —
      if (cat === 'audio' && files.length > 0) {
        const fd = new FormData(); fd.append('file',files[0])
        const aMap: Record<string,string> = {'convert-audio':'convert','trim-audio':'trim','compress-audio':'compress'}
        const action = aMap[slug]||'convert'
        if(action==='convert') fd.append('to',audioFmt)
        if(action==='trim'){const p=textInput.split(',');fd.append('start',p[0]||'0');fd.append('duration',p[1]||'30')}
        const r = await fetch(`/api/tools/audio?action=${action}`,{method:'POST',body:fd})
        if(!r.ok){const d=await r.json();setApiError(d.error);done();return}
        const blob=await r.blob(); setOutputBlob(blob); setOutputFilename(`audio.${audioFmt}`); setOutput(`Audio ${action} complete`)
        done(); return
      }

      // — AI tools —
      if (cat === 'ai') {
        const tMap: Record<string,string> = {'ai-summarizer':'summarize','ai-paraphraser':'paraphrase','grammar-checker':'grammar','ai-translator':'translate','ai-code-generator':'code','ai-email-writer':'email','ai-seo-writer':'seo','hashtag-generator':'hashtags','ai-resume-builder':'resume','ai-cover-letter':'cover-letter'}
        const t = tMap[slug]
        if(t){const d=await callJSONAPI('/api/ai',{tool:t,input:textInput}); const r=d as {result?:string;error?:string;hint?:string}; if(r.error) setApiError(`${r.error}${r.hint?'\nHint: '+r.hint:''}`); else setOutput(r.result||''); done(); return}
      }

      // — Dev tools —
      if (cat === 'dev') {
        const isBase64Decode = slug==='base64-encoder-decoder' && /^[A-Za-z0-9+/=]{8,}$/.test(textInput.trim())
        const aMap: Record<string,string> = {'json-formatter':'json-format','base64-encoder-decoder':isBase64Decode?'base64-decode':'base64-encode','url-encoder-decoder':'url-encode','jwt-decoder':'jwt-decode','uuid-generator':'uuid','hash-generator':'hash','css-minifier':'css-minify','js-minifier':'js-minify','color-converter':'color','cron-generator':'cron','gitignore-generator':'gitignore','regex-tester':'regex','password-generator':'password'}
        const a = aMap[slug]
        if(a){
          const opts: Record<string,string|number> = {}
          if(slug==='uuid-generator') opts.count=10
          if(slug==='password-generator'){opts.length=parseInt(textInput)||16;opts.symbols='true';opts.count=5}
          const d = await callJSONAPI('/api/tools/dev',{input:textInput,options:opts},a)
          if(slug==='json-formatter'){const x=d as {valid:boolean;formatted?:string;error?:string}; x.valid?setOutput(x.formatted||''):setOutput(`Error: ${x.error}`)}
          else if(slug==='uuid-generator'){const x=d as {uuids:string[]}; setOutput(x.uuids.join('\n'))}
          else if(slug==='hash-generator'){setOutput(Object.entries(d).map(([k,v])=>`${k.toUpperCase()}:\n${v}`).join('\n\n'))}
          else if(slug==='jwt-decoder'){const x=d as {valid:boolean;header?:Record<string,unknown>;payload?:Record<string,unknown>;isExpired?:boolean;error?:string}; x.valid?setOutput(`Header:\n${JSON.stringify(x.header,null,2)}\n\nPayload:\n${JSON.stringify(x.payload,null,2)}\n\n${x.isExpired?'Expired':'Valid'}`):setOutput(`Error: ${x.error}`)}
          else if(slug==='gitignore-generator'){const x=d as {gitignore:string}; setOutput(x.gitignore)}
          else if(slug==='password-generator'){const x=d as {passwords:string[];strength:string;entropy:number}; setOutput(`Strength: ${x.strength} | Entropy: ${x.entropy} bits\n\n${x.passwords.join('\n')}`)}
          else if(slug==='color-converter'){const x=d as {hex:string;rgb:string;hsl:string;css:string;tailwind:string}; setOutput(`HEX: ${x.hex}\nRGB: ${x.rgb}\nHSL: ${x.hsl}\nCSS: ${x.css}\nTailwind: ${x.tailwind}`)}
          else{const x=d as {result?:string;minified?:string;decoded?:string;encoded?:string}; setOutput(x.result||x.minified||x.decoded||x.encoded||JSON.stringify(d,null,2))}
          done(); return
        }
      }

      // — SEO tools —
      if (cat === 'seo') {
        const aMap: Record<string,string> = {'meta-tag-generator':'meta-tags','open-graph-generator':'meta-tags','keyword-extractor':'keywords','robots-txt-generator':'robots','sitemap-generator':'sitemap'}
        const a = aMap[slug]
        if(a){
          const opts: Record<string,string|string[]> = {}
          if(slug==='meta-tag-generator'||slug==='open-graph-generator'){const l=textInput.split('\n');opts.title=l[0];opts.description=l[1]||'';opts.keywords=l[2]||''}
          if(slug==='sitemap-generator'){opts.baseUrl=textInput||'https://example.com';opts.paths=['/','/about','/contact','/blog','/tools']}
          const d = await callJSONAPI('/api/tools/seo',{input:textInput,options:opts},a)
          const x=d as Record<string,string>; setOutput(x.tags||x.robotsTxt||x.sitemap||JSON.stringify(d,null,2))
          done(); return
        }
      }

      // — Text server tools —
      if (cat === 'text') {
        const aMap: Record<string,string> = {'word-counter':'word-count','readability-score':'readability','keyword-density':'keyword-density','text-diff-checker':'diff','lorem-ipsum-generator':'lorem','string-extractor':'keyword-density'}
        const a = aMap[slug]
        if(a){
          const opts: Record<string,string|number> = {}
          if(slug==='lorem-ipsum-generator'){opts.count=parseInt(textInput)||3;opts.type='paragraphs'}
          if(slug==='text-diff-checker') opts.text2=diffText2
          const d = await callJSONAPI('/api/tools/text',{text:textInput,options:opts},a)
          if(slug==='word-counter'){const x=d as {words:number;characters:number;charactersNoSpaces:number;sentences:number;paragraphs:number;readTimeMinutes:number;longestWord:string}; setOutput(`Words: ${x.words}\nCharacters: ${x.characters}\nChars (no spaces): ${x.charactersNoSpaces}\nSentences: ${x.sentences}\nParagraphs: ${x.paragraphs}\nRead time: ~${x.readTimeMinutes} min\nLongest word: "${x.longestWord}"`)}
          else if(slug==='readability-score'){const x=d as {fleschReadingEase:number;fleschKincaidGrade:number;readingLevel:string;avgWordsPerSentence:number;complexWords:number}; setOutput(`Flesch Reading Ease: ${x.fleschReadingEase}/100\nFK Grade: ${x.fleschKincaidGrade}\nLevel: ${x.readingLevel}\nAvg words/sentence: ${x.avgWordsPerSentence}\nComplex words: ${x.complexWords}`)}
          else if(slug==='keyword-density'){const x=d as {keywords:Array<{word:string;count:number;density:string}>;total:number}; setOutput(`Total words: ${x.total}\n\nTop Keywords:\n${x.keywords.slice(0,15).map(k=>`${k.word}: ${k.count}× (${k.density})`).join('\n')}`)}
          else if(slug==='text-diff-checker'){const x=d as {identical:boolean;additions:number;deletions:number;diff:Array<{type:string;line:string}>}; x.identical?setOutput('Texts are identical'):setOutput(`${x.additions} additions, ${x.deletions} deletions\n\n${x.diff.map(l=>`${l.type==='added'?'+':l.type==='removed'?'-':' '} ${l.line}`).join('\n')}`)}
          else{const x=d as {text?:string}; setOutput(x.text||JSON.stringify(d,null,2))}
          done(); return
        }
      }

      // — File tools —
      if (cat === 'file' && files.length > 0) {
        const fd = new FormData()
        if(slug==='zip-creator'){files.forEach(f=>fd.append('files',f));const r=await fetch('/api/tools/file?action=zip',{method:'POST',body:fd});if(!r.ok){const d=await r.json();setApiError(d.error);done();return};setOutputBlob(await r.blob());setOutputFilename('archive.zip');setOutput(`ZIP created with ${files.length} files`)}
        else if(slug==='file-hash-checker'){fd.append('file',files[0]);const d=await(await fetch('/api/tools/file?action=hash',{method:'POST',body:fd})).json();setOutput(`File: ${d.filename}\nSize: ${d.sizeKB} KB\n\nMD5:\n${d.hashes.md5}\n\nSHA-1:\n${d.hashes.sha1}\n\nSHA-256:\n${d.hashes.sha256}`)}
        else if(slug==='file-metadata-viewer'){fd.append('file',files[0]);const d=await(await fetch('/api/tools/file?action=metadata',{method:'POST',body:fd})).json();setOutput(Object.entries(d).map(([k,v])=>`${k}: ${v}`).join('\n'))}
        done(); return
      }

      setOutput('Processing complete')
    } catch(e) {
      setApiError(`Error: ${(e as Error).message}`)
    } finally {
      done()
      setLoading(false)
    }
  }

  async function handleCopy() { await copyToClipboard(output); setCopied(true); toast.success('Copied!'); setTimeout(()=>setCopied(false),2000) }
  function handleDownload() { if(outputBlob) downloadBlob(outputBlob, outputFilename) }

  const needsFile = tool.inputType==='file'||tool.inputType==='both'
  const needsText = tool.inputType==='text'||tool.inputType==='url'||tool.inputType==='both'||tool.inputType==='none'
  const usesMonoInput = tool.categorySlug === 'dev'
  const textareaClass = cn('premium-textarea', usesMonoInput && 'font-mono')
  const btnLabel = loading?'Processing...': tool.categorySlug==='ai'?'Generate': tool.categorySlug==='calculator'?'Calculate': tool.slug==='qr-code-generator'?'Generate QR': tool.slug==='ai-image-generator'?'Generate Image': tool.inputType==='url'?'Fetch': needsFile?'Process File':'Run Tool'

  return (
    <div className="space-y-6 p-5 md:p-6">
      {needsFile && (
        <UploadZone
          onFiles={f=>setFiles(p=>tool.slug==='merge-pdf'||tool.slug==='zip-creator'?[...p,...f]:f)}
          multiple={tool.slug==='merge-pdf'||tool.slug==='zip-creator'||tool.slug==='merge-audio'}
          files={files} onRemove={i=>setFiles(p=>p.filter((_,x)=>x!==i))}
          description={tool.acceptedFormats?.join(', ')||undefined}
        />
      )}

      {/* Extra options */}
      {tool.slug==='rotate-pdf'&&<div className="flex flex-wrap gap-2">{['90','180','270'].map(a=><button key={a} onClick={()=>setPdfAngle(a)} className={cn('premium-option-chip',pdfAngle===a&&'premium-option-chip-active')}>{a} deg</button>)}</div>}
      {tool.slug==='compress-image'&&<div className="space-y-2"><label className="premium-label">Quality: {imgQuality}%</label><input type="range" min="10" max="100" value={imgQuality} onChange={e=>setImgQuality(e.target.value)} className="w-full accent-indigo-600"/></div>}
      {tool.slug==='convert-image'&&<div className="flex flex-wrap gap-2">{['webp','jpeg','png','avif'].map(f=><button key={f} onClick={()=>setImgConvertTo(f)} className={cn('premium-option-chip uppercase',imgConvertTo===f&&'premium-option-chip-active')}>{f}</button>)}</div>}
      {tool.slug==='convert-audio'&&<div className="flex flex-wrap gap-2">{['mp3','wav','ogg','aac','flac'].map(f=><button key={f} onClick={()=>setAudioFmt(f)} className={cn('premium-option-chip uppercase',audioFmt===f&&'premium-option-chip-active')}>{f}</button>)}</div>}
      {tool.slug==='image-to-text'&&<div className="flex flex-wrap gap-2">{[['eng','English'],['hin','Hindi'],['tam','Tamil'],['spa','Spanish'],['fra','French']].map(([c,n])=><button key={c} onClick={()=>setOcrLang(c)} className={cn('premium-option-chip text-xs',ocrLang===c&&'premium-option-chip-active')}>{n}</button>)}</div>}

      {/* Text input */}
      {(needsText||tool.categorySlug==='calculator')&&tool.inputType!=='none'&&(
        <div className="space-y-1.5">
          <label className="premium-label">{tool.categorySlug==='calculator'?'Input Values':tool.inputType==='url'?'URL':'Input'}</label>
          <textarea value={textInput} onChange={e=>setTextInput(e.target.value)} placeholder={getPlaceholder(tool.slug)} rows={tool.categorySlug==='ai'?6:tool.categorySlug==='calculator'?3:4} className={textareaClass}/>
        </div>
      )}
      {tool.slug==='text-diff-checker'&&<div className="space-y-1.5"><label className="premium-label">Second Text</label><textarea value={diffText2} onChange={e=>setDiffText2(e.target.value)} placeholder="Paste second text..." rows={4} className="premium-textarea font-mono"/></div>}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={handleProcess} disabled={loading||(needsFile&&files.length===0&&tool.inputType!=='both'&&tool.inputType!=='none')} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
          {loading?<Loader2 className="w-4 h-4 animate-spin"/>:<Play className="w-4 h-4"/>}{btnLabel}
        </button>
        {(output||files.length>0||outputBlob)&&<button onClick={resetAll} className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-4"><RefreshCw className="w-4 h-4"/>Reset</button>}
      </div>

      {/* Progress */}
      {loading&&<div><div className="mb-1.5 flex justify-between text-xs text-muted-foreground"><span className="font-display font-bold tracking-tight">Processing...</span><span>{Math.round(progress)}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{width:`${progress}%`}}/></div></div>}

      {/* Error */}
      {apiError&&<div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500"/><pre className="whitespace-pre-wrap text-xs text-red-600">{apiError}</pre></div>}

      {/* Image preview */}
      {imagePreview&&<div className="space-y-3"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"><CheckCircle className="w-4 h-4 text-emerald-500"/>Preview</h3><div className="flex gap-2">{outputBlob&&<button onClick={handleDownload} className="btn-primary px-4 py-2 text-sm"><Download className="w-4 h-4"/>Download</button>}<a href={imagePreview} download target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm"><ExternalLink className="w-3.5 h-3.5"/>Open</a></div></div><div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[360px] lg:h-[450px]"><Image src={imagePreview} alt="Result" fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px" style={{objectFit:'contain'}}/></div></div>}

      {/* Download button */}
      {outputBlob&&!imagePreview&&<div><button onClick={handleDownload} className="btn-primary flex items-center gap-2"><Download className="w-4 h-4"/>Download {outputFilename}</button><p className="text-xs text-muted-foreground mt-1">{formatBytes(outputBlob.size)}</p></div>}

      {/* Text output */}
      {output&&<div className="space-y-2"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"><CheckCircle className="w-4 h-4 text-emerald-500"/>Output</h3><button onClick={handleCopy} className="btn-secondary px-3 py-1.5 text-xs">{copied?<><CheckCircle className="w-3.5 h-3.5 text-emerald-500"/>Copied</>:<><Copy className="w-3.5 h-3.5"/>Copy</>}</button></div><pre className="custom-scrollbar max-h-[500px] overflow-auto rounded-2xl border border-slate-200 bg-white p-4 text-sm font-mono whitespace-pre-wrap shadow-sm">{output}</pre></div>}
    </div>
  )
}
