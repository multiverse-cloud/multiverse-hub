"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Flag,
  Save,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import toast from "react-hot-toast";

const DEFAULT_FLAGS = [
  {
    id: "ai_chat",
    group: "AI",
    label: "AI Chat Interface",
    desc: "Enable the full AI chat page at /ai",
    enabled: true,
  },
  {
    id: "ai_image_gen",
    group: "AI",
    label: "AI Image Generation",
    desc: "Enable Pollinations AI image generator",
    enabled: true,
  },
  {
    id: "design_ai",
    group: "Design",
    label: "Design AI Universe",
    desc: "Enable /design universe",
    enabled: true,
  },
  {
    id: "news",
    group: "News",
    label: "News Universe",
    desc: "Enable /news (GNews)",
    enabled: true,
  },
  {
    id: "discover",
    group: "Discover",
    label: "Discover Universe",
    desc: "Enable /discover top-10 lists",
    enabled: true,
  },
  {
    id: "admin_panel",
    group: "System",
    label: "Admin Panel",
    desc: "Enable protected /admin access with the internal admin session",
    enabled: true,
  },
  {
    id: "newsletter",
    group: "Marketing",
    label: "Newsletter Signup",
    desc: "Show newsletter form in footer",
    enabled: true,
  },
  {
    id: "dark_mode",
    group: "UI",
    label: "Dark Mode Toggle",
    desc: "Allow users to switch dark/light mode",
    enabled: true,
  },
  {
    id: "tool_share",
    group: "Tools",
    label: "Tool Share Button",
    desc: "Show share button on tool detail pages",
    enabled: true,
  },
  {
    id: "tool_save",
    group: "Tools",
    label: "Tool Save/Bookmark",
    desc: "Disabled while the public site runs without accounts or favorites",
    enabled: false,
  },
  {
    id: "adsense",
    group: "Monetization",
    label: "Google AdSense",
    desc: "Enable ad placements",
    enabled: false,
  },
  {
    id: "beta_tools",
    group: "Tools",
    label: "Show Beta Tools",
    desc: "Show tools marked as beta",
    enabled: true,
  },
];

const GROUPS = Array.from(new Set(DEFAULT_FLAGS.map((f) => f.group)));

export default function FlagsPage() {
  const [flags, setFlags] = useState(DEFAULT_FLAGS);

  function toggle(id: string) {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    );
  }

  function save() {
    toast.success("Feature flags saved! (JSON config updated)");
  }

  return (
    <div className="max-w-screen-lg space-y-5">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin" className="transition-colors hover:text-foreground">
          Admin
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">Feature Flags</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
            <Flag className="h-5 w-5 text-orange-500" /> Feature Flags
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enable or disable platform features without redeploying
          </p>
        </div>
        <button
          onClick={save}
          className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      {GROUPS.map((group) => (
        <div
          key={group}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="border-b border-border bg-muted/30 px-5 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group}
            </h2>
          </div>
          <div className="divide-y divide-border">
            {flags
              .filter((f) => f.group === group)
              .map((flag) => (
                <div
                  key={flag.id}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div className="mr-4 min-w-0 flex-1">
                    <p className="text-sm font-semibold">{flag.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {flag.desc}
                    </p>
                    <code className="mt-0.5 block font-mono text-xs text-indigo-600 dark:text-indigo-400">
                      {flag.id}
                    </code>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={`text-xs font-medium ${flag.enabled ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
                    >
                      {flag.enabled ? "On" : "Off"}
                    </span>
                    <button onClick={() => toggle(flag.id)}>
                      {flag.enabled ? (
                        <ToggleRight className="h-8 w-8 text-emerald-500 transition-colors hover:text-emerald-600" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
