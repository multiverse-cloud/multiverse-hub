'use client'

import { useState } from 'react'
import { Monitor, RotateCw, Smartphone, Tablet } from 'lucide-react'
import TemplateLivePreview from '@/components/templates/TemplateLivePreview'
import type { TemplateEntry } from '@/lib/template-library-data'
import { cn } from '@/lib/utils'

const VIEWPORTS = [
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
] as const

export default function TemplatePreviewPanel({ template }: { template: TemplateEntry }) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [reloadToken, setReloadToken] = useState(0)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Live preview</p>
          <p className="text-xs text-muted-foreground">Real template source rendered inside mtverse.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background/70 p-1">
            {VIEWPORTS.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setViewport(item.id)}
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors',
                    viewport === item.id
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800'
                  )}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => setReloadToken(current => current + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            aria-label="Reload preview"
            title="Reload preview"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      <TemplateLivePreview
        template={template}
        viewport={viewport}
        reloadToken={reloadToken}
        className="rounded-none border-0"
      />
    </div>
  )
}
