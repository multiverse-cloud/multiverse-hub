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
let translateInitialized = false

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

function initializeTranslateElement() {
  ensureTranslateElement()
  if (translateInitialized) return
  if (!window.google?.translate?.TranslateElement) return

  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: TRANSLATE_LANGUAGES,
      autoDisplay: false,
    },
    TRANSLATE_ELEMENT_ID
  )
  translateInitialized = true
}

function waitForTranslateCombo(timeoutMs = 5000) {
  return new Promise<HTMLSelectElement | null>(resolve => {
    const existingCombo = getTranslateCombo()
    if (existingCombo) {
      resolve(existingCombo)
      return
    }

    const startedAt = Date.now()
    const interval = window.setInterval(() => {
      const combo = getTranslateCombo()
      if (combo) {
        window.clearInterval(interval)
        resolve(combo)
        return
      }

      if (Date.now() - startedAt >= timeoutMs) {
        window.clearInterval(interval)
        resolve(null)
      }
    }, 100)
  })
}

async function loadGoogleTranslate() {
  if (typeof window === 'undefined') return
  if (getTranslateCombo()) return
  if (window.google?.translate?.TranslateElement) {
    initializeTranslateElement()
    await waitForTranslateCombo()
    return
  }
  if (translateReadyPromise) return translateReadyPromise

  translateReadyPromise = new Promise(resolve => {
    ensureTranslateElement()

    window.googleTranslateElementInit = () => {
      initializeTranslateElement()
      waitForTranslateCombo().then(() => resolve())
    }

    const existingScript = document.getElementById(TRANSLATE_SCRIPT_ID)
    if (existingScript) {
      const startedAt = Date.now()
      const interval = window.setInterval(() => {
        if (window.google?.translate?.TranslateElement || Date.now() - startedAt > 5000) {
          window.clearInterval(interval)
          initializeTranslateElement()
          waitForTranslateCombo().then(() => resolve())
        }
      }, 100)
      return
    }

    const script = document.createElement('script')
    script.id = TRANSLATE_SCRIPT_ID
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = () => {
      translateReadyPromise = null
      resolve()
    }
    document.body.appendChild(script)
  })

  return translateReadyPromise
}

function dispatchTranslateChange(combo: HTMLSelectElement, languageCode: string) {
  combo.value = languageCode
  combo.dispatchEvent(new Event('change', { bubbles: true }))
}

async function applyGoogleLanguage(languageCode: string) {
  window.localStorage.setItem(STORAGE_KEY, languageCode)
  setGoogleTranslateCookie(languageCode)

  if (languageCode === 'en') {
    window.location.reload()
    return
  }

  await loadGoogleTranslate()
  const combo = await waitForTranslateCombo()
  if (combo) {
    dispatchTranslateChange(combo, languageCode)
    return
  }

  // Cookie fallback: after CSP allows the script, reload lets Google Translate
  // initialize using the saved language if the combo was slow to appear.
  window.location.reload()
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
      loadGoogleTranslate().then(async () => {
        const combo = await waitForTranslateCombo()
        if (!combo) return
        dispatchTranslateChange(combo, savedLanguage)
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
        <div className="absolute right-0 top-full z-[70] mt-2 w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_54px_-30px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_24px_54px_-30px_rgba(2,6,23,0.8)]">
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
