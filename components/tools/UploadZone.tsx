'use client'

import { useCallback, useState } from 'react'
import { useDropzone, type Accept, type FileRejection } from 'react-dropzone'
import { Upload, File as FileIcon, X } from 'lucide-react'
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
        className={cn('upload-zone', isDragActive && 'dragging')}
      >
        <input {...getInputProps()} />
        <div className="pointer-events-none flex flex-col items-center gap-3">
          <div className={cn('flex h-14 w-14 items-center justify-center rounded-xl transition-colors', isDragActive ? 'bg-indigo-100' : 'bg-slate-100')}>
            <Upload className={cn('h-6 w-6 transition-colors', isDragActive ? 'text-indigo-500' : 'text-slate-500')} />
          </div>
          <div>
            <p className="font-display text-sm font-bold tracking-tight text-slate-950">
              {label || (isDragActive ? 'Drop file here' : 'Click or drag and drop')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-slate-100 px-2.5 py-1">Drag and drop</span>
            <span>or</span>
            <span className="font-display font-bold text-indigo-600">Browse Files</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1.5">
          <X className="w-4 h-4" /> {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                <FileIcon className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
              </div>
              {onRemove && (
                <button onClick={() => onRemove(i)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500">
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
