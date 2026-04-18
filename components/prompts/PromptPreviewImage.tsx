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
  imageFit = 'cover',
}: {
  src: string
  alt: string
  category: PromptCategoryId
  className?: string
  imgClassName?: string
  imageFit?: 'cover' | 'contain'
}) {
  const fallbackSrc = useMemo(() => getPromptPreviewFallback(category), [category])
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc || fallbackSrc}
        alt={alt}
        loading="lazy"
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc)
          }
        }}
        referrerPolicy={isRemoteUrl(currentSrc) ? 'no-referrer' : undefined}
        className={cn(
          'absolute inset-0 h-full w-full',
          imageFit === 'contain' ? 'object-contain' : 'object-cover',
          imgClassName
        )}
      />
    </div>
  )
}
