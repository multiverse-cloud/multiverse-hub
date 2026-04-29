import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import NewsletterSignup from "./NewsletterSignup";

const FOOTER_LINKS = {
  "Tool Collections": [
    { name: "All Tools", href: "/tools" },
    { name: "PDF Tools", href: "/tools/pdf" },
    { name: "Image Tools", href: "/tools/image" },
    { name: "Video Tools", href: "/tools/video" },
    { name: "Text Tools", href: "/tools/text" },
    { name: "Dev Tools", href: "/tools/dev" },
    { name: "SEO Tools", href: "/tools/seo" },
  ],
  "Popular Tools": [
    {
      name: "YouTube Thumbnail",
      href: "/tools/video/youtube-thumbnail-downloader",
    },
    { name: "Merge PDF", href: "/tools/pdf/merge-pdf" },
    { name: "Compress PDF", href: "/tools/pdf/compress-pdf" },
    { name: "Compress Image", href: "/tools/image/compress-image" },
    { name: "Word Counter", href: "/tools/text/word-counter" },
    { name: "JSON Formatter", href: "/tools/dev/json-formatter" },
    { name: "QR Code Generator", href: "/tools/image/qr-code-generator" },
  ],
  Universes: [
    { name: "Library Hub", href: "/library" },
    { name: "Design AI", href: "/design" },
    { name: "Dev Universe", href: "/dev" },
    { name: "Discover", href: "/discover" },
    { name: "Prompt Hub", href: "/prompts" },
    { name: "Templates", href: "/templates" },
    { name: "Daily Tools", href: "/tools/calculator" },
    { name: "Fixes", href: "/fixes" },
  ],
  Resources: [
    { name: "Search", href: "/search" },
    { name: "UI Universe", href: "/ui" },
    { name: "Template Library", href: "/templates" },
    { name: "Discover", href: "/discover" },
    { name: "Feedback", href: "/feedback" },
    { name: "What's New", href: "/whats-new" },
  ],
};

export default function Footer({
  variant = "default",
}: { variant?: "default" | "template" } = {}) {
  const templateVariant = variant === "template";
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "premium-shell border-t",
        templateVariant
          ? "border-[#252626] bg-[#101111] text-[#e7e5e4]"
          : "border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950",
      )}
    >
      {/* Newsletter Section */}
      <div
        className={cn(
          "border-b",
          templateVariant
            ? "border-[#252626] bg-[#131313]"
            : "border-slate-200/80 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-900/60",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            {/* Badge with pulsing green dot */}
            <div className="flex justify-center">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold",
                  templateVariant
                    ? "bg-[#1b1c1c] text-[#c6c6c7]"
                    : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
                )}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Updates + Feedback
              </div>
            </div>

            <h2 className="font-display text-2xl font-extrabold md:text-3xl">
              Stay in the loop
            </h2>
            <p
              className={cn(
                "text-sm leading-6",
                templateVariant ? "text-[#acabaa]" : "text-muted-foreground",
              )}
            >
              New tools, feature drops, and product updates — straight to your
              inbox.
            </p>

            <div className="flex justify-center">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Image
                src="/SiteLogo.png"
                alt="mtverse"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span
                className={cn(
                  "font-display text-lg font-extrabold tracking-tight",
                  templateVariant ? "text-[#e7e5e4]" : "",
                )}
              >
                <span
                  className={cn(
                    templateVariant
                      ? "text-[#e7e5e4]"
                      : "text-slate-950 dark:text-slate-50",
                  )}
                >
                  mt
                </span>
                <span
                  className={cn(
                    templateVariant
                      ? "text-blue-400"
                      : "text-blue-600 dark:text-blue-400",
                  )}
                >
                  verse
                </span>
              </span>
            </Link>

            <p
              className={cn(
                "max-w-xs text-sm leading-6",
                templateVariant ? "text-[#acabaa]" : "text-muted-foreground",
              )}
            >
              160+ free online tools for PDF, image, video, text, and developer
              workflows. Fast, private, and always free.
            </p>

            <div className="flex items-center gap-3">
            <Link
              href="/feedback"
              aria-label="Feedback"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-2xl border transition-colors",
                  templateVariant
                    ? "border-[#252626] text-[#acabaa] hover:border-[#3a3b3b] hover:text-[#e7e5e4]"
                    : "border-slate-200 text-muted-foreground hover:border-indigo-300 hover:text-foreground dark:border-slate-800 dark:hover:border-slate-700",
                )}
              >
                <Mail className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h3 className="text-sm font-semibold">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm leading-6 transition-colors",
                        templateVariant
                          ? "text-[#acabaa] hover:text-[#e7e5e4]"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center sm:flex-row sm:text-left",
            templateVariant
              ? "border-[#252626]"
              : "border-slate-200 dark:border-slate-800",
          )}
        >
          <p
            className={cn(
              "text-sm leading-6",
              templateVariant ? "text-[#767575]" : "text-muted-foreground",
            )}
          >
            © {year} mtverse. All rights reserved.
          </p>

          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 text-sm leading-6 sm:justify-end",
              templateVariant ? "text-[#767575]" : "text-muted-foreground",
            )}
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="transition-colors hover:text-foreground"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
