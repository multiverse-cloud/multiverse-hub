import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function ToolBreadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  const fullPathTitle = items.map((item) => item.label).join(" > ");
  const hasCollapse = items.length >= 3;
  const first = items[0];
  const last = items[items.length - 1];
  const middle = items.slice(1, -1);

  return (
    <nav
      aria-label="Breadcrumb"
      title={fullPathTitle}
      className={cn(
        "flex min-w-0 max-w-full items-center gap-0.5 overflow-hidden text-xs sm:gap-1 sm:text-sm",
        className,
      )}
    >
      <ol className="flex min-w-0 items-center gap-0.5 sm:gap-1">
        <li className="flex min-w-0 shrink-0 items-center gap-0.5 sm:gap-1">
          {first.href ? (
            <Link
              href={first.href}
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
            >
              {first.href === "/" ? (
                <>
                  <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Home</span>
                  <span className="sr-only">Home</span>
                </>
              ) : (
                <span className="max-w-[90px] truncate sm:max-w-[150px] lg:max-w-none">
                  {first.label}
                </span>
              )}
            </Link>
          ) : (
            <span className="max-w-[90px] truncate px-1.5 py-0.5 text-muted-foreground sm:max-w-[150px] lg:max-w-none">
              {first.label}
            </span>
          )}
        </li>

        {hasCollapse && middle.length > 0 ? (
          <>
            <li aria-hidden="true" className="flex shrink-0 items-center sm:hidden">
              <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
            </li>
            <li aria-hidden="true" className="flex shrink-0 items-center sm:hidden">
              <span className="select-none px-0.5 text-[11px] text-muted-foreground/60">
                ...
              </span>
            </li>
          </>
        ) : null}

        {middle.map((item, index) => (
          <li
            key={`middle-${index}`}
            className="hidden min-w-0 items-center gap-0.5 sm:flex sm:gap-1"
          >
            <ChevronRight
              className="h-3 w-3 shrink-0 text-muted-foreground/40"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="max-w-[110px] truncate rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800 sm:max-w-[150px] lg:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[110px] truncate px-1.5 py-0.5 text-muted-foreground sm:max-w-[150px] lg:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}

        {items.length > 1 ? (
          <li className="flex min-w-0 items-center gap-0.5 sm:gap-1">
            <ChevronRight
              className="h-3 w-3 shrink-0 text-muted-foreground/40"
              aria-hidden="true"
            />
            <span
              aria-current="page"
              className="max-w-[min(46vw,190px)] truncate px-0.5 font-medium text-foreground sm:max-w-[240px] lg:max-w-none"
            >
              {last.label}
            </span>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
