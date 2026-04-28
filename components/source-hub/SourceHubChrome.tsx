"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function LoaderMarkup() {
  return (
    <div id="source-hub-loader" className="source-hub-loader">
      <div className="source-hub-loader-content">
        <div className="source-hub-loader-logo">
          <div className="source-hub-loader-logo-icon">
            <Image
              src="/SiteLogo.png"
              alt="mtverse"
              width={56}
              height={56}
              className="w-full h-full"
            />
          </div>
          <span className="source-hub-loader-logo-text">mtverse</span>
        </div>

        <div className="source-hub-loader-spinner">
          <div className="source-hub-spinner-ring source-hub-spinner-ring-outer" />
          <div className="source-hub-spinner-ring source-hub-spinner-ring-inner" />
        </div>

        <div className="source-hub-loader-text">
          <p>Loading...</p>
          <p>Preparing your experience</p>
        </div>

        <div className="source-hub-loader-progress-bar">
          <div className="source-hub-loader-progress-value" />
        </div>
      </div>
    </div>
  );
}

export default function SourceHubChrome() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const navigationPendingRef = useRef(false);

  const clearTimer = useCallback((timer: number | null) => {
    if (timer !== null) window.clearTimeout(timer);
  }, []);

  const hideLoader = useCallback(
    (delay = 420) => {
      clearTimer(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        navigationPendingRef.current = false;
        setVisible(false);
      }, delay);
    },
    [clearTimer],
  );

  const showLoader = useCallback(() => {
    clearTimer(hideTimerRef.current);
    clearTimer(fallbackTimerRef.current);
    navigationPendingRef.current = true;
    setVisible(true);
    fallbackTimerRef.current = window.setTimeout(() => hideLoader(0), 5000);
  }, [clearTimer, hideLoader]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function finishNavigation() {
      hideLoader(120);
    }

    window.addEventListener("pageshow", finishNavigation);

    return () => {
      clearTimer(hideTimerRef.current);
      clearTimer(fallbackTimerRef.current);
      window.removeEventListener("pageshow", finishNavigation);
    };
  }, [clearTimer, hideLoader]);

  useEffect(() => {
    if (!navigationPendingRef.current) return;
    hideLoader(360);
  }, [pathname, hideLoader]);

  useEffect(() => {
    function handleManualLoader() {
      showLoader();
    }

    window.addEventListener("multiverse:show-loader", handleManualLoader);
    return () => {
      window.removeEventListener("multiverse:show-loader", handleManualLoader);
    };
  }, [showLoader]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:"))
        return;

      try {
        const nextUrl = new URL(link.href, window.location.origin);
        if (nextUrl.origin !== window.location.origin) return;
        if (link.closest('[data-no-loader="true"]')) return;
        if (nextUrl.pathname === window.location.pathname) return;
        if (nextUrl.href === window.location.href) return;
        showLoader();
      } catch {}
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [showLoader]);

  return (
    <>
      <style jsx global>{`
        .source-hub-scope {
          font-family: var(--font-plus-jakarta), sans-serif;
          overflow-x: hidden;
        }

        .source-hub-scope .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .source-hub-scope .source-hub-noise {
          background-image: none;
        }

        .source-hub-scope .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .source-hub-scope .card-hover:hover {
          transform: translateY(-8px);
          box-shadow:
            0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 8px 10px -6px rgb(0 0 0 / 0.1);
        }

        .source-hub-scope .skeleton {
          background: linear-gradient(
            90deg,
            #f1f5f9 25%,
            #e2e8f0 50%,
            #f1f5f9 75%
          );
          background-size: 200% 100%;
          animation: source-hub-skeleton-loading 1.5s infinite;
        }

        .source-hub-scope .animate-gradient-x {
          background-size: 200% 200%;
          animation: source-hub-gradient-x 15s ease infinite;
        }

        .source-hub-scope .animate-pulse-slow {
          animation: source-hub-pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1)
            infinite;
        }

        .source-hub-scope .animate-slide-in-right {
          animation: source-hub-slide-in-right 0.3s ease-out forwards;
        }

        .source-hub-scope .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .source-hub-loader {
          position: fixed;
          inset: 0;
          z-index: 45;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #ffffff 50%,
            #eff6ff 100%
          );
          transition:
            opacity 0.25s ease-out,
            visibility 0.25s ease-out;
          pointer-events: auto;
        }

        .source-hub-loader-hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .source-hub-loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .source-hub-loader-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .source-hub-loader-logo-icon {
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .source-hub-loader-mark {
          transform: rotate(180deg);
          transform-origin: center;
        }

        .source-hub-loader-logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
        }

        .source-hub-loader-spinner {
          position: relative;
          width: 4.5rem;
          height: 4.5rem;
        }

        .source-hub-spinner-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 4px solid transparent;
        }

        .source-hub-spinner-ring-outer {
          border-top-color: #2563eb;
          border-right-color: #60a5fa;
          animation: source-hub-loader-spin 1.5s linear infinite;
        }

        .source-hub-spinner-ring-inner {
          inset: 0.6rem;
          border-bottom-color: #3b82f6;
          border-left-color: #93c5fd;
          animation: source-hub-loader-spin-reverse 2s linear infinite;
        }

        .source-hub-loader-text {
          text-align: center;
        }

        .source-hub-loader-text p:first-child {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .source-hub-loader-text p:last-child {
          font-size: 0.875rem;
          color: #64748b;
          margin-top: 0.5rem;
        }

        .source-hub-loader-progress-bar {
          width: 14rem;
          height: 6px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
        }

        .source-hub-loader-progress-value {
          height: 100%;
          background: #2563eb;
          width: 40%;
          animation: source-hub-loader-progress 2s ease-in-out infinite;
        }

        .dark .source-hub-loader {
          background:
            radial-gradient(
              circle at top,
              rgba(37, 99, 235, 0.18),
              transparent 35%
            ),
            linear-gradient(135deg, #020617 0%, #0f172a 55%, #111827 100%);
        }

        .dark .source-hub-loader-logo-text {
          color: #f8fafc;
        }

        .dark .source-hub-loader-text p:first-child {
          color: #e2e8f0;
        }

        .dark .source-hub-loader-text p:last-child {
          color: #94a3b8;
        }

        .dark .source-hub-loader-progress-bar {
          background: rgba(148, 163, 184, 0.2);
        }

        @keyframes source-hub-skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes source-hub-gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes source-hub-pulse-slow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes source-hub-slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes source-hub-loader-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes source-hub-loader-spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes source-hub-loader-progress {
          0% {
            transform: translateX(-100%);
            width: 30%;
          }
          50% {
            width: 60%;
          }
          100% {
            transform: translateX(250%);
            width: 30%;
          }
        }
      `}</style>
      {mounted && visible ? <LoaderMarkup /> : null}
    </>
  );
}
