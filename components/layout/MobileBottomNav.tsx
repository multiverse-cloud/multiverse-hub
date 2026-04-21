"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Wrench, Layers3, Bot, ShieldAlert } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Library", href: "/library", icon: Layers3 },
  { name: "Prompts", href: "/prompts", icon: Bot },
  { name: "Fixes", href: "/fixes", icon: ShieldAlert },
] as const;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll-down, show on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        // layout
        "fixed bottom-0 left-0 right-0 z-40 md:hidden",
        // background + border
        "border-t border-slate-200/80 dark:border-slate-800/80",
        "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl",
        // show / hide animation
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
      // iPhone notch / home-indicator safe area via inline style
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 min-w-0",
                "transition-colors duration-150 select-none",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300",
              )}
            >
              {/* Gradient top-indicator bar */}
              <span
                className={cn(
                  "absolute inset-x-3 top-0 h-[3px] rounded-b-full",
                  "bg-gradient-to-r from-indigo-500 to-purple-500",
                  "transition-opacity duration-150",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />

              {/* Icon */}
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-150",
                  isActive ? "scale-110" : "scale-100",
                )}
                strokeWidth={isActive ? 2.25 : 1.75}
              />

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] leading-none transition-all duration-150",
                  isActive ? "font-bold" : "font-medium",
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
