import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import UniverseTopBar from "@/components/public/UniverseTopBar";
import { absoluteUrl } from "@/lib/site-url";
import { getSeoLandingPage, type SeoLandingSlug } from "@/lib/seo-landing-pages";

export default function SeoLandingPage({ slug }: { slug: SeoLandingSlug }) {
  const page = getSeoLandingPage(slug);

  if (!page) {
    return null;
  }

  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.metaTitle,
      headline: page.h1,
      description: page.metaDescription,
      url: absoluteUrl(`/${page.slug}`),
      isPartOf: {
        "@type": "WebSite",
        name: "mtverse",
        url: absoluteUrl("/"),
      },
      about: page.keywords,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title,
          item: absoluteUrl(`/${page.slug}`),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${page.title} links`,
      itemListElement: page.sections
        .flatMap((section) => section.links)
        .map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.label,
          url: absoluteUrl(link.href),
        })),
    },
  ];

  return (
    <PublicLayout schemaMarkup={schemaMarkup}>
      <UniverseTopBar
        items={[{ label: "Home", href: "/" }, { label: page.title }]}
        actionName={page.title}
        actionSlug={page.slug}
      />

      <article className="bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <section className="border-b border-slate-200/80 bg-slate-50/70 dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
                  {page.eyebrow}
                </p>
                <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  {page.h1}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  {page.description}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={page.primaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {page.primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href={page.secondaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                  >
                    {page.secondaryCta.label}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                {page.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-slate-50 px-3 py-4 text-center dark:bg-slate-900"
                  >
                    <div className="font-display text-xl font-black">{stat.value}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-6">
          <div className="grid gap-5 lg:grid-cols-2">
            {page.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <h2 className="font-display text-2xl font-black tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {section.body}
                </p>
                <div className="mt-5 grid gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-900/60"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-slate-950 dark:text-slate-50">
                          {link.label}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {link.note}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-slate-50/70 dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-6">
            <div>
              <h2 className="font-display text-2xl font-black tracking-tight">
                Built for search intent, not clutter
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                These pages connect high-demand searches to real tools, prompts,
                templates, and components. Clear headings, useful links, and FAQ
                schema make the page easier for users and search engines to
                understand.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.useCases.map((useCase) => (
                <div
                  key={useCase}
                  className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm leading-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-2xl font-black tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="p-5">
                    <h3 className="text-base font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-display text-xl font-black tracking-tight">
                Related free resources
              </h2>
              <div className="mt-4 grid gap-2">
                {page.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:text-slate-950 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800 dark:hover:text-white"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </article>
    </PublicLayout>
  );
}
