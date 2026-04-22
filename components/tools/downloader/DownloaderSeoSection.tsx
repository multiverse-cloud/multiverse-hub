import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { DownloaderRouteEntry } from "@/lib/downloader-route-data";
import {
  PremiumContainer,
  PremiumSection,
} from "@/components/platform/premium/Surface";

type RelatedRoute = {
  label: string;
  href: string;
  description: string;
};

export default function DownloaderSeoSection({
  route,
  relatedRoutes = [],
}: {
  route?: DownloaderRouteEntry;
  relatedRoutes?: RelatedRoute[];
}) {
  if (!route) {
    return null;
  }

  return (
    <PremiumSection className="bg-white py-10 dark:bg-slate-950 sm:py-12">
      <PremiumContainer className="max-w-5xl">
        <div className="space-y-8">
          <section className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {route.platform} downloader
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-3xl">
              Download {route.platform === "All Platforms" ? "public media" : `${route.platform} ${route.intentLabel.toLowerCase()}`} without the clutter
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              {route.description} Paste a public link, preview the detected media, and choose the available format. Multiverse keeps the page simple, fast, and built for mobile.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              Key features
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.features.map(feature => (
                <div
                  key={feature}
                  className="flex gap-2.5 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-200/70 dark:bg-slate-900/55 dark:text-slate-300 dark:ring-slate-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              How to download {route.platform === "All Platforms" ? "media" : `${route.platform} ${route.intentLabel.toLowerCase()}`}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {route.howToSteps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedRoutes.length > 0 ? (
            <section className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200/70 dark:bg-slate-900/55 dark:ring-slate-800 sm:p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Related downloaders
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedRoutes.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block rounded-lg bg-white p-3 ring-1 ring-slate-200/80 transition duration-200 hover:-translate-y-0.5 hover:ring-slate-300 dark:bg-slate-950 dark:ring-slate-800 dark:hover:ring-slate-700"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{item.label}</p>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </PremiumContainer>
    </PremiumSection>
  );
}
