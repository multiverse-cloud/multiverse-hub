import Image from 'next/image'
import type { DownloadOption } from '@/lib/video-downloader'
import {
  PremiumContainer,
  PremiumSection,
  PremiumSectionHeader,
} from '@/components/platform/premium/Surface'
import type { DownloadState, VideoInfo } from './types'
import DownloadActionButton from './DownloadActionButton'
import { THUMBNAIL_PLACEHOLDERS } from './content'

interface Props {
  info: VideoInfo | null
  downloadState: DownloadState | null
  onDownload: (option: DownloadOption) => void
  getButtonLabel: (option: DownloadOption) => string
}

export default function DownloaderThumbnailSection({
  info,
  downloadState,
  onDownload,
  getButtonLabel,
}: Props) {
  const previewImage = info?.thumbnailHQ || info?.thumbnail

  return (
    <PremiumSection muted className="py-20">
      <PremiumContainer className="max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <PremiumSectionHeader
              title="Thumbnail Download"
              description="Save the landscape thumbnail artwork in high quality directly from the video result."
              className="mb-10"
            />

            <div className="space-y-4">
              {info && info.thumbnailDownloads.length > 0
                ? info.thumbnailDownloads.map(option => {
                    const isBusy = downloadState?.id === option.id
                    const isDisabled = downloadState !== null && !isBusy

                    return (
                      <div
                        key={option.id}
                        className="flex flex-col gap-4 rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-1.5 rounded-full bg-indigo-500" />
                          <div>
                            <p className="font-display text-base font-bold text-slate-950 dark:text-slate-50">{option.label}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{option.ext.toUpperCase()}</p>
                          </div>
                        </div>

                        <div className="sm:w-[180px]">
                          <DownloadActionButton
                            optionId={option.id}
                            label={getButtonLabel(option)}
                            busy={isBusy}
                            disabled={isDisabled}
                            onClick={() => onDownload(option)}
                          />
                        </div>
                      </div>
                    )
                  })
                : THUMBNAIL_PLACEHOLDERS.map(item => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-4 rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-1.5 rounded-full ${item.accent}`} />
                        <div>
                          <p className="font-display text-base font-bold text-slate-950 dark:text-slate-50">{item.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.meta}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:text-slate-500"
                      >
                        Download
                      </button>
                    </div>
                  ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative ml-auto max-w-2xl rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-36px_rgba(15,23,42,0.32)] rotate-1 dark:bg-slate-900 dark:shadow-none">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-slate-100 dark:bg-slate-950">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={info?.title || 'Thumbnail preview'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <p className="font-display text-xl font-extrabold text-slate-950 dark:text-slate-50">Landscape Thumbnail</p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">HD preview appears here after analysis.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-5 left-6 rounded-2xl bg-indigo-600 px-5 py-3 font-display text-sm font-bold text-white shadow-lg">
                HD THUMBNAIL
              </div>
            </div>
          </div>
        </div>
      </PremiumContainer>
    </PremiumSection>
  )
}
