'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import type { PromptCategoryId } from '@/lib/prompt-library-data'
import { getPromptPreviewFallback } from '@/lib/prompt-preview-images'
import { cn } from '@/lib/utils'

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

const PROXIED_IMAGE_HOSTS = new Set(['promptimg.ionicerrrrscode.com'])

function shouldProxyImage(value: string) {
  try {
    const url = new URL(value)
    return PROXIED_IMAGE_HOSTS.has(url.hostname)
  } catch {
    return false
  }
}

function getDisplaySrc(value: string) {
  if (!isRemoteUrl(value) || !shouldProxyImage(value)) return value
  return `/api/prompt-image?url=${encodeURIComponent(value)}`
}

export default function PromptPreviewImage({
  src,
  alt,
  category,
  className,
  imgClassName,
  imageFit = 'cover',
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  category: PromptCategoryId
  className?: string
  imgClassName?: string
  imageFit?: 'cover' | 'contain'
  priority?: boolean
  sizes?: string
}) {
  const fallbackSrc = useMemo(() => getPromptPreviewFallback(category), [category])
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [loaded, setLoaded] = useState(false)
  const displaySrc = useMemo(() => getDisplaySrc(currentSrc || fallbackSrc), [currentSrc, fallbackSrc])

  useEffect(() => {
    setLoaded(false)
    setCurrentSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  // Reduced timeout: 4s instead of 16s for much faster fallback on slow networks
  useEffect(() => {
    if (!currentSrc || currentSrc === fallbackSrc || loaded) return

    const timer = window.setTimeout(() => {
      setCurrentSrc(fallbackSrc)
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [currentSrc, fallbackSrc, loaded])

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {/* Clean skeleton — no gradient, just a flat pulse */}
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-slate-100 dark:bg-slate-800" />
      ) : null}
      <Image
        key={displaySrc}
        src={displaySrc}
        alt={alt}
        fill
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes ?? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw'}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setLoaded(false)
            setCurrentSrc(fallbackSrc)
          } else {
            setLoaded(true)
          }
        }}
        className={cn(
          'absolute inset-0 h-full w-full',
          imageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-center',
          loaded ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-150',
          imgClassName
        )}
      />
    </div>
  )
}
