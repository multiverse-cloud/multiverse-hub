'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle, Copy, Image as ImageIcon, Loader2, Palette, RefreshCw, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Tool } from '@/lib/tools-data'
import { copyToClipboard } from '@/lib/utils'
import UploadZone from './UploadZone'
import { buildDropzoneAccept, formatAcceptedFormats } from './file-accept'
import { analyzeImagePalette, buildPaletteReport, generatePaletteFromSeed } from './processors/image-palette'
import MobileToolActionBar from './MobileToolActionBar'

export default function ToolDetailBothClient({ tool }: { tool: Tool }) {
  const acceptedFormats = useMemo(
    () => tool.acceptedFormats?.length ? tool.acceptedFormats : ['.jpg', '.jpeg', '.png', '.webp'],
    [tool.acceptedFormats]
  )
  const uploadAccept = useMemo(() => buildDropzoneAccept(acceptedFormats), [acceptedFormats])
  const acceptLabel = useMemo(() => formatAcceptedFormats(acceptedFormats), [acceptedFormats])
  const previewUrlRef = useRef<string | null>(null)

  const [files, setFiles] = useState<File[]>([])
  const [textInput, setTextInput] = useState('')
  const [colors, setColors] = useState<string[]>([])
  const [averageColor, setAverageColor] = useState('')
  const [report, setReport] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function clearPreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
  }

  useEffect(() => () => clearPreviewUrl(), [])

  function resetAll() {
    setFiles([])
    setTextInput('')
    setColors([])
    setAverageColor('')
    setReport('')
    setError('')
    clearPreviewUrl()
    setPreviewUrl('')
  }

  async function handleGenerate() {
    setLoading(true)
    setError('')

    try {
      if (files[0]) {
        const analysis = await analyzeImagePalette(files[0], 6)
        if (analysis.colors.length === 0) {
          throw new Error('No visible colors were found in this image')
        }
        clearPreviewUrl()
        const nextPreviewUrl = URL.createObjectURL(files[0])
        previewUrlRef.current = nextPreviewUrl
        setPreviewUrl(nextPreviewUrl)
        setColors(analysis.colors)
        setAverageColor(analysis.average)
        setReport(buildPaletteReport(analysis.colors, analysis.average))
        return
      }

      const palette = generatePaletteFromSeed(textInput.trim() || 'multiverse', 6)
      clearPreviewUrl()
      setPreviewUrl('')
      setColors(palette)
      setAverageColor('')
      setReport(buildPaletteReport(palette))
    } catch (processingError) {
      setError((processingError as Error).message || 'Palette generation failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    await copyToClipboard(report)
    toast.success('Palette copied')
  }

  const gradientPreview = colors.length > 0 ? `linear-gradient(135deg, ${colors.join(', ')})` : undefined
  const hasInput = files.length > 0 || textInput.trim().length > 0

  return (
    <div className="space-y-4 p-4 sm:space-y-6 sm:p-5 md:p-6">
      <MobileToolActionBar
        primaryLabel="Generate Palette"
        onPrimary={handleGenerate}
        primaryDisabled={!hasInput}
        loading={loading}
        secondaryLabel="Reset"
        onSecondary={resetAll}
        secondaryDisabled={!hasInput && colors.length === 0}
      />
      <UploadZone
        onFiles={incomingFiles => setFiles(incomingFiles.slice(0, 1))}
        accept={uploadAccept}
        acceptLabel={acceptLabel}
        files={files}
        onRemove={() => setFiles([])}
        description={acceptLabel ? `Upload an image palette source: ${acceptLabel}` : 'Upload an image palette source'}
      />

      <div className="relative">
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center text-slate-400 sm:flex">
          <Sparkles className="h-4 w-4" />
        </div>
        <input
          value={textInput}
          onChange={event => setTextInput(event.target.value)}
          placeholder="Or enter a color mood, brand name, or prompt"
          className="premium-input sm:pl-11"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading || !hasInput}
          className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Palette className="h-4 w-4" />}
          Generate Palette
        </button>
        {(hasInput || colors.length > 0) && (
          <button onClick={resetAll} className="btn-secondary flex items-center gap-2 px-4 py-2.5 text-sm">
            <RefreshCw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {colors.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold tracking-tight text-slate-950">Palette Preview</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {files[0] ? 'Generated from your uploaded image' : 'Generated from your color prompt'}
                </p>
              </div>
              <button onClick={handleCopy} className="btn-secondary flex items-center gap-2 px-3 py-2 text-xs">
                <Copy className="h-3.5 w-3.5" />
                Copy CSS
              </button>
            </div>

            <div
              className="overflow-hidden rounded-2xl border border-slate-200"
              style={gradientPreview ? { background: gradientPreview } : undefined}
            >
              {previewUrl ? (
                <div className="relative h-52 w-full">
                  <Image
                    src={previewUrl}
                    alt="Palette source"
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-52 items-center justify-center bg-slate-950/10">
                  <div className="rounded-full bg-white/80 p-3 text-slate-700 shadow-sm backdrop-blur">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {colors.map((color, index) => (
                <div key={`${color}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="h-16 rounded-xl border border-white/60 shadow-sm" style={{ backgroundColor: color }} />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Color {index + 1}
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-900">{color}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <h3 className="font-display text-base font-bold tracking-tight text-slate-950">Ready to Use</h3>
            </div>

            {averageColor && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Average Tone</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl border border-white shadow-sm" style={{ backgroundColor: averageColor }} />
                  <span className="font-mono text-sm font-semibold text-slate-950">{averageColor}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Gradient</p>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="h-20 rounded-xl" style={gradientPreview ? { background: gradientPreview } : undefined} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">CSS Output</p>
              <pre className="custom-scrollbar max-h-[360px] overflow-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                {report}
              </pre>
            </div>
          </div>
        </div>
      )}

      {!colors.length && !loading && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-muted-foreground">
          Upload an image or enter a prompt to generate a palette with reusable color codes and CSS gradient output.
        </div>
      )}
    </div>
  )
}
