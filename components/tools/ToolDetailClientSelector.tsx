'use client'

import { Suspense, lazy, useMemo } from 'react'
import type { Tool } from '@/lib/tools-data'

const ToolDetailTextClient = lazy(() => import('./ToolDetailTextClient'))
const ToolDetailFileClient = lazy(() => import('./ToolDetailFileClient'))
const ToolDetailBothClient = lazy(() => import('./ToolDetailBothClient'))

function LoadingFallback() {
  return (
    <div className="p-3 sm:p-6 md:p-8">
      <div className="space-y-3 sm:space-y-4">
        <div className="h-5 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900 sm:h-32" />
        <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}

export default function ToolDetailClientSelector({ tool }: { tool: Tool }) {
  const Component = useMemo(() => {
    if (tool.inputType === 'file') return ToolDetailFileClient
    if (tool.inputType === 'both') return ToolDetailBothClient
    return ToolDetailTextClient
  }, [tool.inputType])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component tool={tool} />
    </Suspense>
  )
}
