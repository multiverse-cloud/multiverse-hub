'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PromptCategoryId } from '@/lib/prompt-library-data'
import { getPromptPreviewFallback } from '@/lib/prompt-preview-images'
import { cn } from '@/lib/utils'

function isRemoteUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

const PROXIED_IMAGE_HOSTS = new Set(['promptimg.ionicerrrrscode.com', 'res.cloudinary.com'])

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
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null)
  const displaySrc = useMemo(() => getDisplaySrc(currentSrc || fallbackSrc), [currentSrc, fallbackSrc])

  const imageRef = useCallback((node: HTMLImageElement | null) => {
    setImageElement(node)
  }, [])

  useEffect(() => {
    setLoaded(false)
    setCurrentSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  useEffect(() => {
    if (!imageElement) return
    if (imageElement.complete && imageElement.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [currentSrc, imageElement])

  useEffect(() => {
    if (!currentSrc || currentSrc === fallbackSrc || loaded) return

    const timer = window.setTimeout(() => {
      setCurrentSrc(fallbackSrc)
    }, 16000)

    return () => window.clearTimeout(timer)
  }, [currentSrc, fallbackSrc, loaded])

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-white dark:bg-slate-950', className)}>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f8fafc_8%,#e2e8f0_18%,#f8fafc_33%)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#0f172a_8%,#1e293b_18%,#0f172a_33%)]" />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={displaySrc}
        src={displaySrc}
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
        ref={imageRef}
        className={cn(
          'absolute inset-0 h-full w-full',
          imageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-center',
          loaded ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-200',
          imgClassName
        )}
      />
    </div>
  )
}
