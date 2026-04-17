'use client'

import { useMemo, useState } from 'react'
import { Copy, Download } from 'lucide-react'
import type { TemplateEntry } from '@/lib/template-library-data'
import { cn, copyToClipboard, downloadFile } from '@/lib/utils'

function getMimeType(language: string) {
  switch (language) {
    case 'css':
      return 'text/css'
    case 'js':
      return 'application/javascript'
    case 'json':
      return 'application/json'
    case 'md':
      return 'text/markdown'
    case 'tsx':
    case 'ts':
      return 'text/plain'
    default:
      return 'text/html'
  }
}

export default function TemplateFileExplorer({ template }: { template: TemplateEntry }) {
  const [activePath, setActivePath] = useState(template.files[0]?.path || '')
  const activeFile = useMemo(
    () => template.files.find(file => file.path === activePath) || template.files[0] || null,
    [activePath, template.files]
  )

  if (!activeFile) {
    return null
  }

  return (
    <div className="rounded-[20px] border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="premium-kicker">Template files</p>
          <h2 className="mt-1 text-lg font-bold text-foreground">Inspect the starter code before you download</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copyToClipboard(activeFile.content)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-slate-300 dark:hover:border-slate-700"
          >
            <Copy className="h-4 w-4" />
            Copy file
          </button>
          <button
            type="button"
            onClick={() => downloadFile(activeFile.content, activeFile.path.split('/').pop() || activeFile.path, getMimeType(activeFile.language))}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
          >
            <Download className="h-4 w-4" />
            Download file
          </button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-background/60 p-3 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {template.files.map(file => (
              <button
                key={file.path}
                type="button"
                onClick={() => setActivePath(file.path)}
                className={cn(
                  'w-full rounded-xl border px-3 py-3 text-left transition-colors',
                  activeFile.path === file.path
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                    : 'border-border bg-card text-foreground hover:border-slate-300 dark:hover:border-slate-700'
                )}
              >
                <p className="truncate text-sm font-semibold">{file.path}</p>
                <p className={cn('mt-1 text-xs leading-5', activeFile.path === file.path ? 'text-white/80 dark:text-slate-700' : 'text-muted-foreground')}>
                  {file.summary}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <div className="min-w-0 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {activeFile.language}
            </span>
            <span className="text-xs text-muted-foreground">{activeFile.path}</span>
          </div>
          <pre className="max-h-[720px] overflow-auto rounded-[18px] border border-border bg-slate-950 p-4 text-sm leading-7 text-slate-100">
            <code>{activeFile.content}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
