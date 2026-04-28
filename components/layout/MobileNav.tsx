"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Code2,
  Compass,
  Home,
  Layers3,
  Menu,
  Paintbrush,
  Search,
  ShieldAlert,
  X,
  ChevronRight,
  Zap,
  Wrench,
  Globe,
} from "lucide-react";

const MOBILE_NAV_LINKS = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    subtitle: "Start here",
  },
  {
    name: "Tools",
    href: "/tools",
    icon: Wrench,
    subtitle: "150+ free tools",
  },
  {
    name: "Design",
    href: "/design",
    icon: Paintbrush,
    subtitle: "AI design tools",
  },
  {
    name: "Dev",
    href: "/dev",
    icon: Code2,
    subtitle: "Developer utilities",
  },
  {
    name: "Library",
    href: "/library",
    icon: Layers3,
    subtitle: "UI and templates",
  },
  {
    name: "Discover",
    href: "/discover",
    icon: Compass,
    subtitle: "Top picks & lists",
  },
  {
    name: "Prompts",
    href: "/prompts",
    icon: Layers3,
    subtitle: "AI prompt library",
  },
  {
    name: "Fixes",
    href: "/fixes",
    icon: ShieldAlert,
    subtitle: "Troubleshooting",
  },
];

const QUICK_LINKS_LEFT = [
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
  { name: "Video Tools", href: "/tools/video" },
];

const QUICK_LINKS_RIGHT = [
  { name: "All Tools", href: "/tools" },
  { name: "Library", href: "/library" },
  { name: "Feedback", href: "/feedback" },
];

export default function MobileNav({
  authSlot,
}: {
  authSlot?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const drawer = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        style={{ zIndex: 9998 }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in Drawer — from RIGHT */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ zIndex: 9999 }}
        className={cn(
          "fixed right-0 top-0 h-dvh w-72 max-w-[82vw] flex flex-col",
          "bg-white dark:bg-slate-950",
          "shadow-2xl shadow-black/20",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* ── Header ── */}
        <div className="flex-shrink-0 border-b border-slate-200/80 dark:border-slate-800/80 px-4 pt-4 pb-3 space-y-3">
          {/* Logo row */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5"
            >
              <Image
                src="/SiteLogo.png"
                alt="Multiverse"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
              />
              <span className="font-display text-base font-extrabold tracking-tight leading-none">
                <span className="text-slate-900 dark:text-slate-50">Multi</span>
                <span className="text-blue-600 dark:text-blue-400">verse</span>
              </span>
            </Link>
            <button
              onClick={close}
              aria-label="Close menu"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                "border border-slate-200/80 dark:border-slate-800/80",
                "bg-white dark:bg-slate-900",
                "text-slate-500 dark:text-slate-400",
                "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* "150+ free tools" pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1">
            <Zap className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              150+ free tools
            </span>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="flex-shrink-0 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3">
          <form action="/tools" method="get">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="text"
                name="q"
                placeholder="Search tools..."
                className={cn(
                  "w-full rounded-xl py-2.5 pl-9 pr-4 text-sm",
                  "bg-slate-100 dark:bg-slate-800/80",
                  "border border-transparent",
                  "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                  "text-slate-900 dark:text-slate-100",
                  "focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20",
                  "transition-all",
                )}
              />
            </div>
          </form>
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {MOBILE_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={close}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70",
                )}
              >
                {/* Icon pill */}
                <div
                  className={cn(
                    "flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                    isActive ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-400",
                    )}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      "text-sm font-semibold leading-tight",
                      isActive ? "text-white" : "",
                    )}
                  >
                    {link.name}
                  </div>
                  <div
                    className={cn(
                      "text-xs leading-tight mt-0.5 truncate",
                      isActive
                        ? "text-indigo-100"
                        : "text-slate-400 dark:text-slate-500",
                    )}
                  >
                    {link.subtitle}
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 flex-shrink-0 transition-colors",
                    isActive
                      ? "text-white/60"
                      : "text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* ── Auth slot ── */}
        {authSlot && (
          <div className="flex-shrink-0 border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-3">
            {authSlot}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="flex-shrink-0 border-t border-slate-200/80 dark:border-slate-800/80 px-4 pt-3 pb-4 space-y-3">
          {/* Quick links heading */}
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Quick Links
          </p>

          {/* Two-column quick links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <div className="space-y-1.5">
              {QUICK_LINKS_LEFT.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={close}
                  className="block text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="space-y-1.5">
              {QUICK_LINKS_RIGHT.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={close}
                  className="block text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 pt-1">
            <Globe className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            <p className="text-[11px] text-slate-400 dark:text-slate-600">
              © {new Date().getFullYear()} Multiverse Tools
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      {/* Hamburger button — clean rounded square, no dot */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl",
          "border border-slate-200/80 dark:border-slate-800/80",
          "bg-white/80 dark:bg-slate-900/80",
          "text-slate-600 dark:text-slate-400",
          "hover:bg-slate-50 dark:hover:bg-slate-800",
          "hover:border-slate-300 dark:hover:border-slate-700",
          "transition-all",
        )}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Portal the drawer to document.body so it escapes header stacking context */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
