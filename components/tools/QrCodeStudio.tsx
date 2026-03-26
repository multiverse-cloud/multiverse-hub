'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Download, Loader2, QrCode, Sparkles } from 'lucide-react'
import type { Tool } from '@/lib/tools-data'
import { downloadBlob } from '@/lib/utils'

export default function QrCodeStudio({ tool: _tool }: { tool: Tool }) {
  const [value, setValue] = useState('https://multiverse-tools.vercel.app')
  const [foreground, setForeground] = useState('#24389C')
  const [background, setBackground] = useState('#FFFFFF')
  const [size, setSize] = useState('512')
  const [generated, setGenerated] = useState('')
  const [loading, setLoading] = useState(false)

  const previewUrl = useMemo(() => {
    if (!generated) return ''
    const safeForeground = foreground.replace('#', '')
    const safeBackground = background.replace('#', '')
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      generated
    )}&color=${safeForeground}&bgcolor=${safeBackground}&margin=20`
  }, [background, foreground, generated, size])

  async function handleDownload() {
    if (!previewUrl) return
    const response = await fetch(previewUrl)
    const blob = await response.blob()
    downloadBlob(blob, 'qr-code.png')
  }

  return (
    <div className="space-y-7">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {['Vector-ready feel', 'Color controls', 'Fast export'].map(badge => (
                <span
                  key={badge}
                  className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
                Premium scan workflow
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                QR Code Studio
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Build clean QR codes with brand colors, larger canvases, and an immediate live preview.
              </p>
            </div>
          </div>

          <section className="rounded-[2rem] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                <span>Content</span>
                <textarea
                  value={value}
                  onChange={event => setValue(event.target.value)}
                  rows={5}
                  className="w-full rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700">
                <span>Foreground</span>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <input type="color" value={foreground} onChange={event => setForeground(event.target.value)} />
                  <span className="font-mono text-sm text-slate-600">{foreground}</span>
                </div>
              </label>

              <label className="space-y-2 text-sm font-semibold text-slate-700">
                <span>Background</span>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <input type="color" value={background} onChange={event => setBackground(event.target.value)} />
                  <span className="font-mono text-sm text-slate-600">{background}</span>
                </div>
              </label>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Canvas size</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  ['320', '320 px'],
                  ['512', '512 px'],
                  ['1024', '1024 px'],
                ].map(([valueOption, label]) => (
                  <button
                    key={valueOption}
                    type="button"
                    onClick={() => setSize(valueOption)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      size === valueOption
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setLoading(true)
                  setGenerated(value.trim())
                  window.setTimeout(() => setLoading(false), 200)
                }}
                disabled={!value.trim()}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Generate QR
              </button>
              {generated && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-[1.8rem] bg-white p-5 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-950">Live Preview</h2>
              <span className="text-sm font-semibold text-indigo-600">{generated ? 'Ready' : 'Idle'}</span>
            </div>

            {previewUrl ? (
              <div className="mt-4 rounded-[1.7rem] bg-slate-50 p-5">
                <div className="relative mx-auto h-[320px] w-[320px] max-w-full overflow-hidden rounded-[1.5rem] bg-white">
                  <Image
                    src={previewUrl}
                    alt="Generated QR code"
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 400px"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-[1.7rem] bg-slate-50 p-10 text-center text-sm leading-6 text-slate-600">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600">
                  <QrCode className="h-7 w-7" />
                </div>
                Generate the QR code to see the live preview here.
              </div>
            )}
          </section>

          <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Result card</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
              {generated ? 'QR asset is ready' : 'Waiting for content'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {generated
                ? 'Preview the code, download the PNG, and use the same content again later.'
                : 'Enter a URL, contact payload, or custom text to generate the code.'}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Canvas</p>
                <p className="mt-1 text-sm font-semibold text-white">{size} x {size}</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Content length</p>
                <p className="mt-1 text-sm font-semibold text-white">{generated.length || 0} chars</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
