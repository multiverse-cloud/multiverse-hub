'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Copy, Loader2, Palette, Sparkles, UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Tool } from '@/lib/tools-data'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import {
  analyzeImagePalette,
  buildPaletteReport,
  generatePaletteFromSeed,
} from './processors/image-palette'
import { copyToClipboard, downloadBlob } from '@/lib/utils'

export default function ImagePaletteStudio({ tool }: { tool: Tool }) {
  const acceptedFormats = useMemo(
    () => (tool.acceptedFormats?.length ? tool.acceptedFormats : ['.jpg', '.jpeg', '.png', '.webp']),
    [tool.acceptedFormats]
  )
  const accept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])

  const previewRef = useRef<string | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [colors, setColors] = useState<string[]>([])
  const [average, setAverage] = useState('')
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
    }
  }, [])

  function updatePreview(nextFile: File | null) {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current)
      previewRef.current = null
    }

    setFile(nextFile)
    if (!nextFile) {
      setPreviewUrl('')
      return
    }

    const nextPreview = URL.createObjectURL(nextFile)
    previewRef.current = nextPreview
    setPreviewUrl(nextPreview)
  }

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept,
    multiple: false,
    noClick: true,
    onDropAccepted: files => updatePreview(files[0] || null),
  })

  async function handleGenerate() {
    setLoading(true)
    setError('')

    try {
      if (file) {
        const analysis = await analyzeImagePalette(file, 6)
        if (!analysis.colors.length) {
          throw new Error('No strong visible colors were detected in this image.')
        }

        setColors(analysis.colors)
        setAverage(analysis.average)
        setReport(buildPaletteReport(analysis.colors, analysis.average))
      } else {
        const generated = generatePaletteFromSeed(prompt.trim() || 'multiverse', 6)
        setColors(generated)
        setAverage('')
        setReport(buildPaletteReport(generated))
      }
    } catch (generationError) {
      setError((generationError as Error).message || 'Palette generation failed.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    updatePreview(null)
    setPrompt('')
    setColors([])
    setAverage('')
    setReport('')
    setError('')
  }

  async function handleCopy() {
    if (!report) return
    await copyToClipboard(report)
    toast.success('Palette copied')
  }

  function handleDownload() {
    if (!report) return
    downloadBlob(new Blob([report], { type: 'text/plain;charset=utf-8' }), 'image-palette.txt')
  }

  const gradientPreview = colors.length ? `linear-gradient(135deg, ${colors.join(', ')})` : undefined

  return (
    <div className="space-y-7">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {['Image palette', 'Prompt seed', 'CSS ready'].map(badge => (
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
                Editorial color system
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
                Color Palette Generator
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Pull a refined palette from an uploaded image or spin one from a brand prompt.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)]">
            <div
              {...getRootProps()}
              className={`rounded-[1.75rem] border-2 border-dashed px-6 py-8 transition-colors ${
                isDragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                    Upload Image
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    {acceptLabel ? `Supports ${acceptLabel}.` : 'Upload an image palette source.'}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-6 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Choose image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] bg-white">
                    <Image
                      src={previewUrl}
                      alt={file.name}
                      fill
                      unoptimized
                      sizes="(max-width: 1280px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-[1.4rem] bg-white px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-bold tracking-tight text-slate-950">
                        {file.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-slate-100/90 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Prompt fallback
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={prompt}
                onChange={event => setPrompt(event.target.value)}
                placeholder="Editorial blue, premium finance app, minimal monochrome..."
                className="min-w-0 flex-1 rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || (!file && !prompt.trim())}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Palette className="h-4 w-4" />}
                Generate palette
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-[1.8rem] bg-white p-5 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-950">Palette Preview</h2>
              <span className="text-sm font-semibold text-indigo-600">
                {loading ? 'Generating' : colors.length ? 'Ready' : 'Idle'}
              </span>
            </div>

            {colors.length ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-[1.7rem] p-4" style={gradientPreview ? { background: gradientPreview } : undefined}>
                  <div className="h-28 rounded-[1.3rem] bg-white/10 backdrop-blur-sm" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {colors.map((color, index) => (
                    <div key={`${color}-${index}`} className="rounded-2xl bg-slate-50 p-3">
                      <div className="h-14 rounded-xl" style={{ backgroundColor: color }} />
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Color {index + 1}
                        </span>
                        <span className="font-mono text-sm font-semibold text-slate-950">{color}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {average ? (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Average tone
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: average }} />
                      <span className="font-mono text-sm font-semibold text-slate-950">{average}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 rounded-[1.7rem] bg-slate-50 p-6 text-sm leading-6 text-slate-600">
                Upload an image or enter a prompt to generate a palette and CSS-ready output.
              </div>
            )}
          </section>

          <section className="rounded-[2rem] bg-slate-950 p-6 text-white">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Output</p>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Palette report</h2>
            </div>

            {error ? (
              <div className="rounded-2xl bg-rose-500/12 p-4 text-sm leading-6 text-rose-200">{error}</div>
            ) : report ? (
              <pre className="max-h-[360px] overflow-auto rounded-[1.6rem] bg-white/6 p-4 text-sm leading-6 text-slate-200 whitespace-pre-wrap">
                {report}
              </pre>
            ) : (
              <div className="rounded-[1.6rem] bg-white/6 p-5 text-sm leading-6 text-slate-300">
                CSS variables, average tone, and gradient output will appear here.
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!report}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Copy className="h-4 w-4" />
                Copy CSS
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!report}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                Download report
              </button>
              {(file || prompt || colors.length) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Reset
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
