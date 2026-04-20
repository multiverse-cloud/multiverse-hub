"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-2xl border border-slate-200 dark:border-slate-800"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  function handleToggle() {
    setAnimating(true);
    setTheme(isDark ? "light" : "dark");
    // Reset animation flag after it completes
    setTimeout(() => setAnimating(false), 350);
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-2xl border",
        "touch-manipulation select-none",
        "border-slate-200 transition-colors duration-200",
        "hover:border-indigo-300 hover:bg-slate-50",
        "dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {/* Sun icon — visible in dark mode (switching to light) */}
      <Sun
        className={cn(
          "absolute h-4 w-4 text-amber-500 transition-all duration-300 ease-in-out",
          isDark
            ? cn(
                "opacity-100 rotate-0 scale-100",
                animating && "rotate-90 scale-75 opacity-0",
              )
            : "opacity-0 -rotate-90 scale-50",
        )}
        aria-hidden="true"
      />
      {/* Moon icon — visible in light mode (switching to dark) */}
      <Moon
        className={cn(
          "absolute h-4 w-4 text-slate-700 dark:text-slate-300 transition-all duration-300 ease-in-out",
          !isDark
            ? cn(
                "opacity-100 rotate-0 scale-100",
                animating && "-rotate-90 scale-75 opacity-0",
              )
            : "opacity-0 rotate-90 scale-50",
        )}
        aria-hidden="true"
      />
    </button>
  );
}
