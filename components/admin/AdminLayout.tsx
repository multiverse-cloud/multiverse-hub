"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Layers,
  Compass,
  Globe2,
  Search,
  Flag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Menu,
  X,
  Activity,
  Loader2,
  LogOut,
  Sparkles,
  Bell,
  FileText,
} from "lucide-react";

import ThemeToggle from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

type LucideIcon = React.ComponentType<{ className?: string }>;

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  available: boolean;
  section: "content" | "manage" | "system";
};

// ─── Nav definition ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  // CONTENT
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    available: true,
    section: "content",
  },
  {
    label: "Tools",
    href: "/admin/tools",
    icon: Wrench,
    available: true,
    section: "content",
  },
  {
    label: "Discover Lists",
    href: "/admin/discover",
    icon: Compass,
    available: true,
    section: "content",
  },
  {
    label: "Prompt Hub",
    href: "/admin/prompts",
    icon: Sparkles,
    available: true,
    section: "content",
  },
  {
    label: "UI Templates",
    href: "/admin/templates",
    icon: Layers,
    available: true,
    section: "content",
  },
  // MANAGE
  {
    label: "Feature Flags",
    href: "/admin/flags",
    icon: Flag,
    available: true,
    section: "manage",
  },
  {
    label: "API Status",
    href: "/admin/api-status",
    icon: Activity,
    available: true,
    section: "manage",
  },
  // SYSTEM / COMING SOON
  {
    label: "Universes",
    href: "/admin/universes",
    icon: Globe2,
    available: false,
    section: "system",
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Layers,
    available: false,
    section: "system",
  },
  {
    label: "SEO Pages",
    href: "/admin/seo",
    icon: FileText,
    available: false,
    section: "system",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    available: false,
    section: "system",
  },
];

const SECTION_META: Record<NavItem["section"], { label: string }> = {
  content: { label: "Content" },
  manage: { label: "Manage" },
  system: { label: "Coming Soon" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function groupNavItems(items: NavItem[]): [NavItem["section"], NavItem[]][] {
  const order: NavItem["section"][] = ["content", "manage", "system"];
  const map = new Map<NavItem["section"], NavItem[]>();
  for (const item of items) {
    if (!map.has(item.section)) map.set(item.section, []);
    map.get(item.section)!.push(item);
  }
  return order.filter((s) => map.has(s)).map((s) => [s, map.get(s)!]);
}

const GROUPED = groupNavItems(NAV_ITEMS);

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavItemRow({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  const isComingSoon = item.section === "system" && !item.available;

  const baseClass = cn(
    "group relative flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium transition-all duration-150 select-none",
    collapsed && "justify-center px-0 w-9 mx-auto",
    item.available
      ? active
        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-900/20"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
      : "cursor-not-allowed text-slate-400 dark:text-slate-600 opacity-60",
  );

  const inner = (
    <>
      <Icon
        className={cn(
          "shrink-0 transition-colors",
          collapsed ? "w-[18px] h-[18px]" : "w-4 h-4",
          active && item.available ? "text-white" : "",
        )}
      />
      {!collapsed && (
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate">{item.label}</span>
          {isComingSoon && (
            <span className="ml-auto shrink-0 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              soon
            </span>
          )}
        </span>
      )}
    </>
  );

  if (!item.available) {
    return (
      <button
        type="button"
        disabled
        title={collapsed ? `${item.label} (coming soon)` : undefined}
        className={cn(baseClass, "w-full")}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={baseClass}
    >
      {inner}
    </Link>
  );
}

function SidebarNav({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
      {GROUPED.map(([section, items], gi) => (
        // pathname may be null on first render; fall back to empty string
        <div key={section} className={cn("px-2", gi > 0 && "mt-4")}>
          {/* Section label */}
          {!collapsed ? (
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
              {SECTION_META[section].label}
            </p>
          ) : (
            <div className="mb-1.5 flex justify-center">
              <div className="h-px w-5 rounded-full bg-slate-200 dark:bg-slate-700/60" />
            </div>
          )}

          {/* Items */}
          <div className="space-y-0.5">
            {items.map((item) => (
              <NavItemRow
                key={item.href}
                item={item}
                active={(pathname ?? "") === item.href}
                collapsed={collapsed}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

// ─── Page title from pathname ─────────────────────────────────────────────────

function getPageTitle(pathname: string | null): string {
  const match = NAV_ITEMS.find((i) => i.href === (pathname ?? ""));
  return match?.label ?? "Admin";
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function AdminLayout({
  children,
  adminEmail,
}: {
  children: React.ReactNode;
  adminEmail?: string | null;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const displayEmail: string =
    adminEmail != null ? String(adminEmail) : "admin@multiverse";
  const avatarInitial = displayEmail.charAt(0).toUpperCase();

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // redirect regardless
    }
    window.location.href = "/admin-login";
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 h-full",
          "bg-white dark:bg-slate-950",
          "border-r border-slate-100 dark:border-slate-800/80",
          "shadow-[2px_0_12px_-4px_rgba(0,0,0,0.08)]",
          "transition-all duration-200",
          collapsed ? "w-16" : "w-[240px]",
        )}
      >
        {/* Logo area */}
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b-2 border-indigo-500/30",
            "bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-900/80 dark:to-slate-950",
            collapsed ? "justify-center px-0" : "gap-3 px-4",
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-900/30">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
                mtverse Admin
              </p>
              <p className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400 tracking-wide">
                Control Panel
              </p>
            </div>
          )}
        </div>

        {/* Nav sections */}
        <SidebarNav collapsed={collapsed} pathname={pathname} />

        {/* Bottom actions */}
        <div
          className={cn(
            "shrink-0 border-t border-slate-100 dark:border-slate-800/80 p-2 space-y-0.5",
          )}
        >
          {/* View site */}
          <Link
            href="/"
            title={collapsed ? "View Site" : undefined}
            className={cn(
              "flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium",
              "text-slate-500 dark:text-slate-400",
              "transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
              collapsed && "justify-center px-0 w-9 mx-auto",
            )}
          >
            <Globe2 className="h-4 w-4 shrink-0" />
            {!collapsed && <span>View Site</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title={collapsed ? "Log Out" : undefined}
            className={cn(
              "flex w-full items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium",
              "text-slate-500 dark:text-slate-400",
              "transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
              "disabled:opacity-50",
              collapsed && "justify-center px-0 w-9 mx-auto",
            )}
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4 shrink-0" />
            )}
            {!collapsed && <span>Log Out</span>}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex w-full items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium",
              "text-slate-400 dark:text-slate-500",
              "transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300",
              collapsed && "justify-center px-0 w-9 mx-auto",
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ───────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 flex w-[240px] flex-col bg-white dark:bg-slate-950 shadow-2xl">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b-2 border-indigo-500/30 px-4 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-900/80 dark:to-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-sm shadow-indigo-900/30">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    mtverse Admin
                  </p>
                  <p className="text-[10px] font-medium text-indigo-500 dark:text-indigo-400">
                    Control Panel
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
              {GROUPED.map(([section, items], gi) => (
                <div key={section} className={cn("px-2", gi > 0 && "mt-4")}>
                  <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                    {SECTION_META[section].label}
                  </p>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <NavItemRow
                        key={item.href}
                        item={item}
                        active={pathname === item.href}
                        collapsed={false}
                        onClick={() => setMobileOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Mobile bottom */}
            <div className="shrink-0 border-t border-slate-100 dark:border-slate-800/80 p-2 space-y-0.5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-150"
              >
                <Globe2 className="h-4 w-4 shrink-0" />
                <span>View Site</span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 h-9 rounded-lg px-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-150 disabled:opacity-50"
              >
                {loggingOut ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 shrink-0" />
                )}
                <span>Log Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main content area ────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header
          className={cn(
            "flex h-14 shrink-0 items-center gap-3 px-4",
            "border-b border-slate-100 dark:border-slate-800/80",
            "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md",
            "sticky top-0 z-30",
          )}
        >
          {/* Left: hamburger + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">
                Admin
              </span>
              <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600 hidden sm:inline shrink-0" />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {pageTitle}
              </span>
            </div>
          </div>

          {/* Center: search */}
          <div className="mx-4 hidden flex-1 justify-center md:flex">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="search"
                placeholder="Search admin…"
                className={cn(
                  "w-full h-8 rounded-lg border pl-8 pr-3 text-sm",
                  "bg-slate-50 dark:bg-slate-900",
                  "border-slate-200 dark:border-slate-700/80",
                  "text-slate-800 dark:text-slate-200",
                  "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400",
                  "transition-all duration-150",
                )}
              />
            </div>
          </div>

          {/* Right: actions */}
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            {/* Theme toggle — compact version in header */}
            <ThemeToggle />

            {/* Notification bell */}
            <button
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-lg",
                "text-slate-500 dark:text-slate-400",
                "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200",
                "transition-colors",
              )}
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {/* Red dot */}
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
            </button>

            {/* Divider */}
            <div className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-700/60" />

            {/* Email display */}
            <div className="hidden text-right sm:block">
              <p className="text-[11px] font-semibold leading-none text-slate-700 dark:text-slate-200">
                Admin Session
              </p>
              <p className="mt-0.5 max-w-[140px] truncate text-[10px] leading-none text-slate-400 dark:text-slate-500">
                {displayEmail}
              </p>
            </div>

            {/* Avatar badge */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                "bg-indigo-600 text-white text-xs font-bold",
                "shadow-sm shadow-indigo-900/20",
                "ring-2 ring-indigo-500/20",
              )}
              title={displayEmail}
            >
              {avatarInitial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
