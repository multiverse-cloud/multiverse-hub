'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { POPULAR_SITE_LANGUAGES } from '@/lib/seo-languages'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'multiverse:site-language'
const TRANSLATE_ELEMENT_ID = 'google_translate_element'
const TRANSLATE_SCRIPT_ID = 'google-translate-script'
const TRANSLATE_LANGUAGES = POPULAR_SITE_LANGUAGES.map(language => language.code).join(',')

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void
      }
    }
  }
}

let translateReadyPromise: Promise<void> | null = null

function ensureTranslateElement() {
  if (typeof document === 'undefined') return
  if (document.getElementById(TRANSLATE_ELEMENT_ID)) return

  const node = document.createElement('div')
  node.id = TRANSLATE_ELEMENT_ID
  node.setAttribute('aria-hidden', 'true')
  document.body.appendChild(node)
}

function clearGoogleTranslateCookie() {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = `googtrans=;path=/;${expires}`
  document.cookie = `googtrans=;path=/;domain=${window.location.hostname};${expires}`
}

function setGoogleTranslateCookie(languageCode: string) {
  if (languageCode === 'en') {
    clearGoogleTranslateCookie()
    return
  }

  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `googtrans=/en/${languageCode};path=/;max-age=${maxAge};SameSite=Lax`
}

function readSavedLanguage() {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(STORAGE_KEY) || 'en'
}

function getTranslateCombo() {
  return document.querySelector<HTMLSelectElement>('.goog-te-combo')
}

function loadGoogleTranslate() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.translate?.TranslateElement) return Promise.resolve()
  if (translateReadyPromise) return translateReadyPromise

  translateReadyPromise = new Promise(resolve => {
    ensureTranslateElement()

    window.googleTranslateElementInit = () => {
      ensureTranslateElement()
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: TRANSLATE_LANGUAGES,
            autoDisplay: false,
          },
          TRANSLATE_ELEMENT_ID
        )
      }
      resolve()
    }

    const existingScript = document.getElementById(TRANSLATE_SCRIPT_ID)
    if (existingScript) return

    const script = document.createElement('script')
    script.id = TRANSLATE_SCRIPT_ID
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  })

  return translateReadyPromise
}

async function applyGoogleLanguage(languageCode: string) {
  window.localStorage.setItem(STORAGE_KEY, languageCode)
  setGoogleTranslateCookie(languageCode)

  if (languageCode === 'en') {
    window.location.reload()
    return
  }

  await loadGoogleTranslate()

  window.setTimeout(() => {
    const combo = getTranslateCombo()
    if (!combo) return
    combo.value = languageCode
    combo.dispatchEvent(new Event('change'))
  }, 120)
}

export default function SiteLanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLanguage = readSavedLanguage()
    setCurrentLanguage(savedLanguage)
    if (savedLanguage !== 'en') {
      setGoogleTranslateCookie(savedLanguage)
      loadGoogleTranslate().then(() => {
        const combo = getTranslateCombo()
        if (!combo) return
        combo.value = savedLanguage
        combo.dispatchEvent(new Event('change'))
      })
    }
  }, [])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const selectedLanguage =
    POPULAR_SITE_LANGUAGES.find(language => language.code === currentLanguage) ||
    POPULAR_SITE_LANGUAGES[0]

  return (
    <div ref={rootRef} className="notranslate relative">
      <style jsx global>{`
        #${TRANSLATE_ELEMENT_ID} {
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        body > .skiptranslate,
        iframe.goog-te-banner-frame,
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
        }

        html.translated-ltr body,
        html.translated-rtl body,
        body {
          top: 0 !important;
        }
      `}</style>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className={cn(
          'flex h-9 items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-2.5 text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors',
          'hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-700',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40',
          'dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:text-indigo-300'
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Change website language"
      >
        <Globe2 className="h-3.5 w-3.5" />
        {selectedLanguage.code}
        <ChevronDown className={cn('h-3 w-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-[70] mt-2 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_54px_-30px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_24px_54px_-30px_rgba(2,6,23,0.8)]">
          <div className="px-2.5 pb-2 pt-1.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Website language
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Translate the current page instantly.
            </p>
          </div>

          <div className="grid max-h-[320px] grid-cols-2 gap-1 overflow-y-auto pr-1">
            {POPULAR_SITE_LANGUAGES.map(language => {
              const active = language.code === currentLanguage
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => {
                    setCurrentLanguage(language.code)
                    setOpen(false)
                    void applyGoogleLanguage(language.code)
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-colors',
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                  )}
                >
                  <span className="truncate">{language.label}</span>
                  {active ? <Check className="h-3.5 w-3.5" /> : <span className="text-[10px] uppercase text-slate-400">{language.code}</span>}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
