import { Film, Headphones, ImageIcon } from 'lucide-react'
import type { DownloadOption } from '@/lib/video-downloader'
import { cn } from '@/lib/utils'
import type { DownloadState } from './types'
import DownloadActionButton from './DownloadActionButton'

interface Props {
  option: DownloadOption
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
  tone?: 'indigo' | 'emerald'
}

function getOptionIcon(option: DownloadOption) {
  if (option.kind === 'audio') return Headphones
  if (option.kind === 'thumbnail') return ImageIcon
  return Film
}

export default function DownloadOptionRow({
  option,
  downloadState,
  onDownload,
  getButtonLabel,
  tone = 'indigo',
}: Props) {
  const OptionIcon = getOptionIcon(option)
  const isBusy = downloadState?.id === option.id
  const isDisabled = downloadState !== null && !isBusy

  return (
    <div className="rounded-[18px] border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
              tone === 'emerald'
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300'
            )}
          >
            <OptionIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              {option.ext.toUpperCase()}
            </p>
            <h4 className="font-display text-base font-extrabold text-slate-950 dark:text-slate-50">
              {option.qualityLabel}
            </h4>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>{option.label}</span>
              {option.filesizeMB && <span>{option.filesizeMB} MB</span>}
              {option.hasAudio && <span>Audio included</span>}
            </div>
          </div>
        </div>

        <div className="sm:w-[180px]">
          <DownloadActionButton
            optionId={option.id}
            label={getButtonLabel(option)}
            busy={isBusy}
            disabled={isDisabled}
            onClick={() => onDownload(option)}
            tone={tone === 'emerald' ? 'secondary' : 'primary'}
          />
        </div>
      </div>
    </div>
  )
}
