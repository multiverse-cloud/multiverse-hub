'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { TemplateCategoryId, TemplateEntry } from '@/lib/template-library-data'
import { cn } from '@/lib/utils'

function getCompactPreviewScale(template: TemplateEntry) {
  switch (template.category) {
    case 'mobile':
      return 0.58
    case 'dashboard':
    case 'saas':
    case 'agency':
    case 'education':
    case 'healthcare':
    case 'restaurant':
    case 'real-estate':
    case 'ecommerce':
      return 0.34
    case 'landing':
    case 'auth':
    case 'portfolio':
    case 'pricing':
    case 'onboarding':
    case 'crypto':
    case 'fitness':
      return 0.42
    default:
      return 0.4
  }
}

function escapeSvg(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderDashboardPreview(title: string) {
  return `
    <rect width="1600" height="1000" fill="#f8fafc"/>
    <rect x="40" y="40" width="1520" height="920" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="82" y="82" width="260" height="836" rx="24" fill="#f8fafc"/>
    <rect x="388" y="82" width="1130" height="120" rx="24" fill="#f8fafc"/>
    <rect x="388" y="236" width="740" height="400" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="1156" y="236" width="362" height="400" rx="28" fill="#eef2ff"/>
    <rect x="388" y="668" width="540" height="210" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="954" y="668" width="564" height="210" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="118" y="132" width="150" height="20" rx="10" fill="#4f46e5" fill-opacity="0.85"/>
    <rect x="118" y="212" width="170" height="18" rx="9" fill="#cbd5e1"/>
    <rect x="118" y="258" width="140" height="18" rx="9" fill="#cbd5e1"/>
    <rect x="118" y="304" width="160" height="18" rx="9" fill="#cbd5e1"/>
    <rect x="118" y="350" width="124" height="18" rx="9" fill="#cbd5e1"/>
    <rect x="428" y="122" width="320" height="24" rx="12" fill="#0f172a" fill-opacity="0.88"/>
    <rect x="428" y="158" width="540" height="16" rx="8" fill="#94a3b8"/>
    <rect x="428" y="288" width="660" height="260" rx="18" fill="#eff6ff"/>
    <rect x="1220" y="288" width="244" height="42" rx="14" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <rect x="1220" y="356" width="244" height="42" rx="14" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <rect x="1220" y="424" width="244" height="42" rx="14" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <rect x="1220" y="492" width="244" height="42" rx="14" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <path d="M470 520 C560 360, 680 450, 760 350 S930 360, 1020 300" stroke="#4f46e5" stroke-width="18" fill="none" stroke-linecap="round"/>
    <rect x="470" y="730" width="140" height="110" rx="18" fill="#eef2ff"/>
    <rect x="634" y="730" width="140" height="110" rx="18" fill="#eef2ff"/>
    <rect x="798" y="730" width="92" height="110" rx="18" fill="#eef2ff"/>
    <text x="118" y="860" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">${escapeSvg(title)}</text>
  `
}

function renderLandingPreview(title: string) {
  return `
    <rect width="1600" height="1000" fill="#f8fafc"/>
    <rect x="50" y="60" width="1500" height="880" rx="30" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="110" width="180" height="18" rx="9" fill="#4f46e5" fill-opacity="0.85"/>
    <rect x="100" y="210" width="560" height="50" rx="20" fill="#0f172a" fill-opacity="0.92"/>
    <rect x="100" y="282" width="520" height="50" rx="20" fill="#0f172a" fill-opacity="0.92"/>
    <rect x="100" y="380" width="460" height="18" rx="9" fill="#94a3b8"/>
    <rect x="100" y="418" width="420" height="18" rx="9" fill="#94a3b8"/>
    <rect x="100" y="486" width="190" height="56" rx="18" fill="#4f46e5"/>
    <rect x="314" y="486" width="190" height="56" rx="18" fill="#eef2ff"/>
    <rect x="740" y="180" width="720" height="520" rx="30" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="790" y="230" width="620" height="58" rx="20" fill="#e0e7ff"/>
    <rect x="790" y="324" width="290" height="132" rx="22" fill="#eef2ff"/>
    <rect x="1110" y="324" width="300" height="132" rx="22" fill="#eef2ff"/>
    <rect x="790" y="488" width="620" height="162" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="100" y="640" width="380" height="220" rx="26" fill="#f8fafc"/>
    <rect x="510" y="640" width="380" height="220" rx="26" fill="#f8fafc"/>
    <rect x="920" y="640" width="540" height="220" rx="26" fill="#f8fafc"/>
    <text x="100" y="910" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">${escapeSvg(title)}</text>
  `
}

function renderAuthPreview(title: string) {
  return `
    <rect width="1600" height="1000" fill="#f8fafc"/>
    <rect x="70" y="70" width="1460" height="860" rx="34" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="70" y="70" width="760" height="860" rx="34" fill="#eef2ff"/>
    <rect x="150" y="180" width="180" height="18" rx="9" fill="#6366f1" fill-opacity="0.7"/>
    <rect x="150" y="260" width="420" height="56" rx="20" fill="#0f172a" fill-opacity="0.92"/>
    <rect x="150" y="338" width="360" height="20" rx="10" fill="#94a3b8"/>
    <rect x="150" y="392" width="420" height="160" rx="24" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <rect x="150" y="580" width="420" height="160" rx="24" fill="#ffffff" stroke="#dbeafe" stroke-width="2"/>
    <rect x="940" y="180" width="420" height="66" rx="22" fill="#e0e7ff"/>
    <rect x="940" y="300" width="420" height="470" rx="28" fill="#f8fafc"/>
    <rect x="990" y="370" width="320" height="50" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="990" y="448" width="320" height="50" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="990" y="548" width="320" height="60" rx="18" fill="#4f46e5"/>
    <text x="940" y="865" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="700">${escapeSvg(title)}</text>
  `
}

function renderMobilePreview(title: string) {
  return `
    <rect width="1600" height="1000" fill="#f8fafc"/>
    <rect x="70" y="70" width="1460" height="860" rx="34" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="330" y="120" width="320" height="760" rx="46" fill="#ffffff" stroke="#cbd5e1" stroke-width="10"/>
    <rect x="380" y="190" width="220" height="40" rx="20" fill="#eef2ff"/>
    <rect x="380" y="280" width="220" height="150" rx="30" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="380" y="470" width="220" height="70" rx="22" fill="#eef2ff"/>
    <rect x="380" y="566" width="220" height="70" rx="22" fill="#eef2ff"/>
    <rect x="380" y="662" width="220" height="70" rx="22" fill="#eef2ff"/>
    <rect x="810" y="220" width="500" height="120" rx="28" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="810" y="376" width="500" height="120" rx="28" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="810" y="532" width="500" height="120" rx="28" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <text x="810" y="748" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">${escapeSvg(title)}</text>
  `
}

function renderGenericPreview(title: string) {
  return `
    <rect width="1600" height="1000" fill="#f8fafc"/>
    <rect x="50" y="60" width="1500" height="880" rx="30" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="110" y="140" width="260" height="20" rx="10" fill="#4f46e5" fill-opacity="0.85"/>
    <rect x="110" y="230" width="430" height="46" rx="18" fill="#0f172a" fill-opacity="0.92"/>
    <rect x="110" y="330" width="320" height="18" rx="9" fill="#94a3b8"/>
    <rect x="780" y="150" width="650" height="330" rx="28" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="110" y="440" width="410" height="340" rx="24" fill="#f8fafc"/>
    <rect x="560" y="440" width="410" height="340" rx="24" fill="#f8fafc"/>
    <rect x="1010" y="440" width="420" height="340" rx="24" fill="#f8fafc"/>
    <text x="110" y="860" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">${escapeSvg(title)}</text>
  `
}

function getPosterPalette(template: TemplateEntry) {
  switch (template.category as TemplateCategoryId) {
    case 'dashboard':
      return {
        base: '#0f172a',
        glow: '#2563eb',
        panel: '#111827',
        soft: '#1e293b',
        accent: '#60a5fa',
      }
    case 'auth':
      return {
        base: '#f8fafc',
        glow: '#c7d2fe',
        panel: '#ffffff',
        soft: '#e0e7ff',
        accent: '#4f46e5',
      }
    case 'mobile':
      return {
        base: '#fff7ed',
        glow: '#fdba74',
        panel: '#ffffff',
        soft: '#ffedd5',
        accent: '#ea580c',
      }
    case 'landing':
    default:
      return {
        base: '#eff6ff',
        glow: '#bfdbfe',
        panel: '#ffffff',
        soft: '#dbeafe',
        accent: '#2563eb',
      }
  }
}

function buildPosterPreviewSvg(template: TemplateEntry) {
  const palette = getPosterPalette(template)
  return `
    <defs>
      <linearGradient id="bg-${template.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.base}" />
        <stop offset="100%" stop-color="#ffffff" />
      </linearGradient>
      <linearGradient id="accent-${template.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.accent}" />
        <stop offset="100%" stop-color="${palette.glow}" />
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#bg-${template.slug})"/>
    <circle cx="1280" cy="180" r="260" fill="${palette.glow}" fill-opacity="0.28"/>
    <circle cx="240" cy="860" r="340" fill="${palette.soft}" fill-opacity="0.45"/>
    <rect x="80" y="80" width="1440" height="840" rx="38" fill="${palette.panel}" fill-opacity="0.94" stroke="#e2e8f0" stroke-opacity="0.8" stroke-width="2"/>
    <rect x="140" y="140" width="180" height="18" rx="9" fill="url(#accent-${template.slug})" fill-opacity="0.95"/>
    <rect x="140" y="220" width="520" height="52" rx="22" fill="#0f172a" fill-opacity="0.94"/>
    <rect x="140" y="294" width="420" height="18" rx="9" fill="#94a3b8"/>
    <rect x="140" y="332" width="360" height="18" rx="9" fill="#cbd5e1"/>
    <rect x="140" y="402" width="180" height="54" rx="18" fill="url(#accent-${template.slug})"/>
    <rect x="348" y="402" width="170" height="54" rx="18" fill="${palette.soft}"/>
    <rect x="860" y="180" width="520" height="320" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="900" y="228" width="440" height="36" rx="18" fill="${palette.soft}"/>
    <rect x="900" y="290" width="200" height="110" rx="22" fill="#f8fafc"/>
    <rect x="1124" y="290" width="216" height="110" rx="22" fill="${palette.soft}"/>
    <rect x="140" y="560" width="390" height="250" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="570" y="560" width="360" height="250" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="970" y="560" width="410" height="250" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <text x="140" y="876" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="800">${escapeSvg(template.title)}</text>
    <text x="140" y="915" fill="#64748b" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600">${escapeSvg(template.industry)}</text>
  `
}

function buildPreviewSvg(template: TemplateEntry) {
  switch (template.category as TemplateCategoryId) {
    case 'dashboard':
      return renderDashboardPreview(template.title)
    case 'landing':
      return renderLandingPreview(template.title)
    case 'auth':
      return renderAuthPreview(template.title)
    case 'mobile':
      return renderMobilePreview(template.title)
    default:
      return renderGenericPreview(template.title)
  }
}

function toDataUrl(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="none">${svg}</svg>`)}`
}

export default function TemplateLivePreview({
  template,
  compact = false,
  className,
  viewport = 'desktop',
  reloadToken = 0,
}: {
  template: TemplateEntry
  compact?: boolean
  className?: string
  viewport?: 'desktop' | 'tablet' | 'mobile'
  reloadToken?: number
}) {
  const ratio = template.category === 'mobile' ? 'aspect-[10/16]' : compact ? 'aspect-[4/3]' : 'aspect-[16/10]'
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [reloadToken, template.previewImage, template.slug, viewport])

  if (compact && template.previewImage) {
    return (
      <div className={cn('relative overflow-hidden bg-card', ratio, className)}>
        {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_55%)]" />
        <div className="absolute inset-0 p-2.5 sm:p-3">
          <Image
            src={template.previewImage}
            alt={`${template.title} preview image`}
            fill
            sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            onLoad={() => setLoaded(true)}
            className={cn(
              'object-contain object-top transition-opacity duration-200',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>
    )
  }

  if (template.previewHtml) {
    const viewportWidth =
      viewport === 'mobile' ? 'w-[390px] max-w-full' : viewport === 'tablet' ? 'w-[820px] max-w-full' : 'w-full'
    const compactScale = getCompactPreviewScale(template)

    if (compact) {
      // Render a full-width desktop (1440px) preview scaled to fit the card
      const DESKTOP_WIDTH = 1440
      return (
        <div className={cn('h-full w-full overflow-hidden bg-[#eef2f7]', className)}>
          <div className="relative h-full w-full overflow-hidden">
            {!loaded ? <div className="absolute inset-0 animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
            <iframe
              key={`${template.slug}-compact-${reloadToken}`}
              title={`${template.title} compact preview`}
              srcDoc={template.previewHtml}
              className="border-0 bg-white"
              loading="lazy"
              sandbox="allow-scripts"
              scrolling="no"
              onLoad={() => setLoaded(true)}
              style={{
                width: `${DESKTOP_WIDTH}px`,
                height: `${DESKTOP_WIDTH * 0.7}px`,
                transform: `scale(var(--preview-scale, 1))`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
                background: '#ffffff',
                // scale set via container query fallback via inline var
              }}
              ref={(el) => {
                if (!el) return
                const parent = el.parentElement
                if (!parent) return
                const scale = parent.offsetWidth / DESKTOP_WIDTH
                el.style.setProperty('--preview-scale', `${scale}`)
                el.style.transform = `scale(${scale})`
              }}
            />
          </div>
        </div>
      )
    }

    return (
      <div className={cn('overflow-hidden rounded-xl border border-border bg-white', ratio, className)}>
        <div className="flex h-full w-full items-start justify-center bg-[#eef2f7] p-3">
          <div className={cn('relative h-full overflow-hidden rounded-lg bg-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.28)]', viewportWidth)}>
            {!loaded ? <div className="absolute inset-0 animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
            <iframe
              key={`${template.slug}-${viewport}-${reloadToken}`}
              title={`${template.title} live preview`}
              srcDoc={template.previewHtml}
              className="h-full w-full border-0 bg-white"
              loading="lazy"
              sandbox="allow-scripts"
              scrolling="no"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
      </div>
    )
  }

  if (template.previewImage) {
    return (
      <div className={cn('relative overflow-hidden rounded-xl border border-border bg-card', ratio, className)}>
        {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.18),transparent_55%)]" />
        <div className="absolute inset-0 p-3">
          <Image
            src={template.previewImage}
            alt={`${template.title} preview image`}
            fill
            sizes={compact ? '(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw' : '100vw'}
            onLoad={() => setLoaded(true)}
            className={cn(
              'object-contain object-top transition-opacity duration-200',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
      </div>
    )
  }

  const src = toDataUrl(buildPreviewSvg(template))

  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-border bg-card', ratio, className)}>
      {!loaded ? <div className="absolute inset-0 z-[1] animate-pulse bg-slate-100 dark:bg-slate-900" /> : null}
      <Image
        src={src}
        alt={`${template.title} preview image`}
        width={1600}
        height={1000}
        unoptimized
        onLoad={() => setLoaded(true)}
        className={cn('h-full w-full object-cover transition-opacity duration-200', loaded ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  )
}
