'use client'

import { useCallback, useState } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'
import { Upload, File as FileIcon, X, CloudUpload, Sparkles } from 'lucide-react'
import { cn, formatBytes } from '@/lib/utils'

interface Props {
  onFiles: (files: File[]) => void
  accept?: Accept
  acceptLabel?: string
  multiple?: boolean
  maxSize?: number
  label?: string
  description?: string
  files?: File[]
  onRemove?: (index: number) => void
}

function getDropError(rejection: FileRejection, maxSize: number, multiple: boolean, acceptLabel?: string) {
  const primaryError = rejection.errors[0]

  if (primaryError?.code === 'file-invalid-type') {
    return acceptLabel
      ? `Use a supported file format: ${acceptLabel}.`
      : 'This file type is not supported for this tool.'
  }

  if (primaryError?.code === 'file-too-large') {
    return `File is too large. Maximum size is ${formatBytes(maxSize)}.`
  }

  if (primaryError?.code === 'too-many-files') {
    return multiple ? 'Please upload fewer files at once.' : 'Please upload one file at a time.'
  }

  return primaryError?.message || 'File not accepted'
}

export default function UploadZone({
  onFiles,
  accept,
  acceptLabel,
  multiple = false,
  maxSize = 100 * 1024 * 1024,
  label,
  description,
  files = [],
  onRemove,
}: Props) {
  const [error, setError] = useState('')

  const onDrop = useCallback((accepted: File[], rejected: FileRejection[]) => {
    setError('')
    if (rejected.length > 0) {
      setError(getDropError(rejected[0], maxSize, multiple, acceptLabel))
      return
    }
    onFiles(accepted)
  }, [acceptLabel, maxSize, multiple, onFiles])

  const helperText = description
    ? `${description} | Max ${formatBytes(maxSize)}`
    : `Max ${formatBytes(maxSize)}`

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
  })

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn('upload-zone group', isDragActive && 'dragging')}
      >
        <input {...getInputProps()} />
        <div className="pointer-events-none flex flex-col items-center gap-3">
          {/* Icon with animated background */}
          <div className={cn(
            'relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300',
            isDragActive
              ? 'bg-indigo-100 scale-110 dark:bg-indigo-900/40'
              : 'bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-indigo-100 group-hover:to-indigo-50 dark:from-slate-800 dark:to-slate-900 dark:group-hover:from-indigo-900/40 dark:group-hover:to-indigo-950/40'
          )}>
            {isDragActive ? (
              <Sparkles className="h-7 w-7 text-indigo-500 animate-icon-bounce" />
            ) : (
              <CloudUpload className={cn(
                'h-7 w-7 transition-colors duration-300',
                'text-slate-400 group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400'
              )} />
            )}
            {/* Subtle glow ring */}
            <div className={cn(
              'absolute inset-0 rounded-2xl transition-opacity duration-300',
              isDragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            )} style={{ boxShadow: '0 0 0 4px rgba(99,102,241,0.08)' }} />
          </div>

          <div className="text-center">
            <p className="font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {label || (isDragActive ? 'Release to upload' : 'Click or drag to upload')}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{helperText}</p>
          </div>

          {/* Action pills */}
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span className={cn(
              'rounded-full px-3 py-1.5 font-medium transition-colors',
              isDragActive
                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300'
                : 'bg-slate-100 dark:bg-slate-800'
            )}>
              Drag and drop
            </span>
            <span className="text-slate-300 dark:text-slate-700">or</span>
            <span className="font-display font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline underline-offset-2">
              Browse Files
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          <X className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="file-item-chip animate-fade-in">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 dark:from-indigo-900/30 dark:to-indigo-950/30">
                <FileIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(i)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-red-50 hover:text-red-500 hover:scale-110 dark:hover:bg-red-950/30"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
