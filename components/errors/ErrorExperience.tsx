"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type RecoveryAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

type ErrorExperienceProps = {
  badge: string;
  title: string;
  description: string;
  code?: string;
  details?: string;
  actions: RecoveryAction[];
};

function ActionButton({ action }: { action: RecoveryAction }) {
  const className = cn(
    "inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all sm:w-auto",
    action.variant === "primary"
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      : "border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-100",
  );

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

function BadgePill({ label, isCode }: { label: string; isCode?: boolean }) {
  if (isCode) {
    return (
      <span className="rounded-full border border-red-200/80 bg-red-50 px-3 py-1 font-mono text-xs font-semibold text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400">
      {label}
    </span>
  );
}

export default function ErrorExperience({
  badge,
  title,
  description,
  code,
  details,
  actions,
}: ErrorExperienceProps) {
  return (
    <div className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(239,68,68,0.07),transparent_40%)] bg-background">
      {/* Decorative faded code number */}
      {code ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        >
          <span className="text-[min(40vw,280px)] font-black leading-none tracking-tighter text-slate-900/[0.04] dark:text-white/[0.04]">
            {code}
          </span>
        </div>
      ) : null}

      <main className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-lg items-center justify-center px-4 py-12 sm:px-6">
        <section className="w-full rounded-2xl border border-border/60 bg-background/95 p-7 shadow-[0_8px_40px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-10">
          {/* Badge pills */}
          <div className="flex flex-wrap items-center gap-2">
            <BadgePill label={badge} />
            {code ? <BadgePill label={`Code: ${code}`} isCode /> : null}
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {description}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {actions.map((action) => (
              <ActionButton
                key={`${action.label}:${action.href ?? "action"}`}
                action={action}
              />
            ))}
          </div>

          {/* Debug details */}
          {details ? (
            <div className="mt-6 rounded-xl border border-border/60 bg-muted/40 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                Debug info
              </p>
              <p className="mt-2 break-all font-mono text-xs leading-6 text-muted-foreground">
                {details}
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
