'use client'

import { useMemo, useState } from 'react'
import { Check, Copy, SlidersHorizontal } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import { trackUiCopy } from '@/lib/ui-engagement'

type EffectPlaygroundProps = {
  effectId: string
  title: string
  htmlCode: string
  cssCode: string
}

function buildPlaygroundDoc({
  htmlCode,
  cssCode,
  accentColor,
  speed,
  scale,
  radius,
}: {
  htmlCode: string
  cssCode: string
  accentColor: string
  speed: number
  scale: number
  radius: number
}) {
  const motion = `${speed.toFixed(2)}s`
  const scaleValue = (scale / 100).toFixed(2)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; }
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
        overflow: hidden;
        background: #ffffff;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .preview-root {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(${scaleValue});
        transform-origin: center center;
      }
      .preview-root *,
      .preview-root *::before,
      .preview-root *::after {
        accent-color: ${accentColor};
        caret-color: ${accentColor};
        animation-duration: ${motion} !important;
        transition-duration: ${Math.min(speed, 1.2).toFixed(2)}s !important;
      }
      .preview-root button,
      .preview-root a,
      .preview-root input,
      .preview-root textarea,
      .preview-root select,
      .preview-root label,
      .preview-root [role="button"],
      .preview-root [class*="card"],
      .preview-root [class*="panel"],
      .preview-root [class*="box"] {
        border-radius: ${radius}px !important;
      }
      .preview-root button,
      .preview-root [role="button"] {
        box-shadow: 0 8px 20px -16px ${accentColor}66;
      }
      .preview-root input:focus,
      .preview-root textarea:focus,
      .preview-root select:focus {
        outline-color: ${accentColor} !important;
        border-color: ${accentColor} !important;
        box-shadow: 0 0 0 3px ${accentColor}22 !important;
      }
${cssCode}
    </style>
  </head>
  <body>
    <div class="preview-root">${htmlCode}</div>
  </body>
</html>`
}

function buildPlaygroundExport({
  title,
  htmlCode,
  cssCode,
  accentColor,
  speed,
  scale,
  radius,
}: {
  title: string
  htmlCode: string
  cssCode: string
  accentColor: string
  speed: number
  scale: number
  radius: number
}) {
  return `/* ${title} playground export */
:root {
  --ui-accent: ${accentColor};
  --ui-motion: ${speed.toFixed(2)}s;
  --ui-scale: ${scale}%;
  --ui-radius: ${radius}px;
}

.preview-root {
  transform: scale(calc(var(--ui-scale) / 100));
  transform-origin: center center;
}

.preview-root *,
.preview-root *::before,
.preview-root *::after {
  accent-color: var(--ui-accent);
  caret-color: var(--ui-accent);
  animation-duration: var(--ui-motion) !important;
  transition-duration: min(var(--ui-motion), 1.2s) !important;
}

.preview-root button,
.preview-root a,
.preview-root input,
.preview-root textarea,
.preview-root select,
.preview-root label,
.preview-root [role="button"],
.preview-root [class*="card"],
.preview-root [class*="panel"],
.preview-root [class*="box"] {
  border-radius: var(--ui-radius) !important;
}

${cssCode}

/* HTML */
${htmlCode}`
}

export default function EffectPlayground({ effectId, title, htmlCode, cssCode }: EffectPlaygroundProps) {
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [speed, setSpeed] = useState(0.8)
  const [scale, setScale] = useState(92)
  const [radius, setRadius] = useState(12)
  const [copied, setCopied] = useState(false)

  const previewDoc = useMemo(
    () => buildPlaygroundDoc({ htmlCode, cssCode, accentColor, speed, scale, radius }),
    [accentColor, cssCode, htmlCode, radius, scale, speed]
  )

  const exportCode = useMemo(
    () => buildPlaygroundExport({ title, htmlCode, cssCode, accentColor, speed, scale, radius }),
    [accentColor, cssCode, htmlCode, radius, scale, speed, title]
  )

  async function handleCopy() {
    try {
      await copyToClipboard(exportCode)
      trackUiCopy(effectId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <SlidersHorizontal className="h-4 w-4" />
            Interactive playground
          </div>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy updated code'}
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800 lg:border-b-0 lg:border-r">
            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Accent color
                </span>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={event => setAccentColor(event.target.value)}
                    className="h-9 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{accentColor}</span>
                </div>
              </label>

              <label className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span>Motion speed</span>
                  <span>{speed.toFixed(2)}s</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.05"
                  value={speed}
                  onChange={event => setSpeed(Number(event.target.value))}
                  className="w-full accent-indigo-600"
                />
              </label>

              <label className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span>Preview size</span>
                  <span>{scale}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="115"
                  step="1"
                  value={scale}
                  onChange={event => setScale(Number(event.target.value))}
                  className="w-full accent-indigo-600"
                />
              </label>

              <label className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span>Border radius</span>
                  <span>{radius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={radius}
                  onChange={event => setRadius(Number(event.target.value))}
                  className="w-full accent-indigo-600"
                />
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950">
            <iframe
              title={`${title} playground preview`}
              srcDoc={previewDoc}
              className="h-[430px] w-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
