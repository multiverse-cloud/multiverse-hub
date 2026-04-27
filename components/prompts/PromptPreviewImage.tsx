'use client'

import { useEffect, useMemo, useState } from 'react'
import type { PromptCategoryId } from '@/lib/prompt-library-data'
import { getPromptPreviewFallback } from '@/lib/prompt-preview-images'
import { cn } from '@/lib/utils'

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

export default function PromptPreviewImage({
  src,
  alt,
  category,
  className,
  imgClassName,
  imageFit = 'contain',
  priority = false,
}: {
  src: string
  alt: string
  category: PromptCategoryId
  className?: string
  imgClassName?: string
  imageFit?: 'cover' | 'contain'
  priority?: boolean
}) {
  const fallbackSrc = useMemo(() => getPromptPreviewFallback(category), [category])
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setCurrentSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  useEffect(() => {
    if (!currentSrc || currentSrc === fallbackSrc || loaded) return

    const timer = window.setTimeout(() => {
      setCurrentSrc(fallbackSrc)
    }, 9000)

    return () => window.clearTimeout(timer)
  }, [currentSrc, fallbackSrc, loaded])

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-white dark:bg-slate-950', className)}>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f8fafc_8%,#e2e8f0_18%,#f8fafc_33%)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#0f172a_8%,#1e293b_18%,#0f172a_33%)]" />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={currentSrc || fallbackSrc}
        src={currentSrc || fallbackSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setLoaded(false)
            setCurrentSrc(fallbackSrc)
          } else {
            setLoaded(true)
          }
        }}
        referrerPolicy={isRemoteUrl(currentSrc) ? 'no-referrer' : undefined}
        className={cn(
          'absolute inset-0 h-full w-full',
          imageFit === 'contain' ? 'object-contain object-center p-1.5 md:p-2' : 'object-cover object-center',
          loaded ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-200',
          imgClassName
        )}
      />
    </div>
  )
}
