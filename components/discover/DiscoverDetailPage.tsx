import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Info,
  Lightbulb,
  ListChecks,
  ShieldAlert,
  Sparkles,
  Star,
  Tags,
  Users,
} from 'lucide-react'
import { DiscoverList } from '@/lib/discover-data'

type DiscoverIntent = {
  label: string
  summary: string
  guidance: string
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

function getDiscoverIntent(title: string): DiscoverIntent {
  const normalized = title.toLowerCase()

  if (normalized.startsWith('how to fix')) {
    return {
      label: 'How to Fix',
      summary: 'Troubleshooting path',
      guidance: 'Use the steps in order so you can isolate the real bottleneck before changing too many variables.',
    }
  }

  if (normalized.startsWith('how to start')) {
    return {
      label: 'How to Start',
      summary: 'Beginner path',
      guidance: 'Treat this as a starter path, not a mastery checklist. Early clarity matters more than doing everything at once.',
    }
  }

  if (normalized.startsWith('what is')) {
    return {
      label: 'What Is',
      summary: 'Concept explainer',
      guidance: 'Read for the core mental model first, then use the examples and related pages to go deeper.',
    }
  }

  if (normalized.includes(' vs ') || normalized.includes('which is better')) {
    return {
      label: 'Comparison',
      summary: 'Decision guide',
      guidance: 'Anchor your choice in your real workflow, budget, and tolerance for tradeoffs instead of chasing generic winner claims.',
    }
  }

  if (normalized.startsWith('tips for')) {
    return {
      label: 'Tips',
      summary: 'Improvement guide',
      guidance: 'Apply one or two ideas first, then keep only the ones that improve your results in real usage.',
    }
  }

  if (normalized.startsWith('free ')) {
    return {
      label: 'Free',
      summary: 'Budget-first picks',
      guidance: 'Start with the lowest-friction option, test it on a real task, then upgrade only if limits become obvious.',
    }
  }

  if (normalized.startsWith('top ') || normalized.startsWith('best ')) {
    return {
      label: 'Ranking',
      summary: 'Curated shortlist',
      guidance: 'Use the shortlist to reduce decision fatigue. Pick based on fit, not only on the number one spot.',
    }
  }

  return {
    label: 'Discover',
    summary: 'Editorial page',
    guidance: 'Use the overview first, then jump to the section that matches your current decision or curiosity.',
  }
}

function estimateReadMinutes(list: DiscoverList) {
  if (list.type === 'guide') {
    return Math.max(4, list.steps.length * 2 + Math.ceil(list.faq.length / 2))
  }

  return Math.max(4, list.items.length + list.methodology.length + Math.ceil(list.faq.length / 2))
}

function getAudienceLabel(list: DiscoverList) {
  return list.audience || 'general readers'
}

function getAngleLabel(list: DiscoverList) {
  return list.angle || list.methodology[0] || list.description
}

function collectSpotlightTags(list: DiscoverList) {
  const counts = new Map<string, number>()

  for (const tag of list.tags) {
    counts.set(tag, (counts.get(tag) || 0) + 2)
  }

  for (const item of list.items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([tag]) => tag)
}

function getQuickAnswer(list: DiscoverList) {
  if (list.type === 'ranking') {
    const lead = list.items[0]
    if (!lead) return list.intro

    return `${lead.name} is the safest starting recommendation here if you want ${lowerFirst(
      lead.bestFor
    )}. The rest of the page helps you decide when a lower-ranked option fits your situation better.`
  }

  const firstStep = list.steps[0]
  const secondStep = list.steps[1]
  if (!firstStep) return list.intro

  return `If you want the fastest useful path, start with "${firstStep.title}"${
    secondStep ? ` and then move straight into "${secondStep.title}"` : ''
  }. That usually gives you enough structure to keep the rest of the guide practical.`
}

function getRankingUseCases(list: DiscoverList) {
  return list.items.slice(0, 4).map(item => ({
    title: item.name,
    eyebrow: `#${item.rank} on this list`,
    summary: item.bestFor,
    rating: item.rating,
    tags: item.tags.slice(0, 2),
  }))
}

function getRankingDecisionNotes(list: DiscoverList, intent: DiscoverIntent) {
  const topTags = collectSpotlightTags(list)

  return [
    `Start with the pick whose "best for" line sounds closest to your real use case, not the one with the most familiar name.`,
    `Use ${topTags.slice(0, 2).join(' and ')} as filtering clues when two options seem equally strong.`,
    intent.guidance,
  ]
}

function getGuideChecklist(list: DiscoverList, intent: DiscoverIntent) {
  const topTags = collectSpotlightTags(list)

  return [
    {
      title: 'Know your actual use case',
      detail: `This guide is written for ${lowerFirst(
        list.description
      )}, so define the real problem before you try every step blindly.`,
    },
    {
      title: 'Keep the scope narrow',
      detail: `Focus on ${topTags.slice(0, 2).join(' and ')} first instead of changing everything at once.`,
    },
    {
      title: 'Use the guide as a sequence',
      detail: intent.guidance,
    },
  ]
}

function getGuideMistakes(list: DiscoverList, intent: DiscoverIntent) {
  const normalized = list.title.toLowerCase()

  if (normalized.startsWith('how to fix')) {
    return [
      'Changing multiple settings at the same time, which makes the real cause harder to identify.',
      'Buying a new tool or device before you confirm whether the issue is software, workflow, or setup related.',
      'Stopping after the first improvement instead of checking whether the fix actually holds in normal daily use.',
    ]
  }

  if (normalized.startsWith('what is')) {
    return [
      'Memorizing jargon before you understand the core idea in plain language.',
      'Confusing a product example with the broader concept the page is trying to explain.',
      'Skipping examples and related pages, which makes the concept feel abstract for longer than necessary.',
    ]
  }

  if (normalized.includes(' vs ') || normalized.includes('which is better')) {
    return [
      'Comparing feature lists without tying them to your actual workflow.',
      'Choosing based only on hype or brand familiarity instead of friction, cost, and long-term fit.',
      'Testing only one easy scenario and ignoring the harder task that will actually decide the better option.',
    ]
  }

  if (normalized.startsWith('how to start')) {
    return [
      'Trying to build an advanced setup before you prove that the starter path works for you.',
      'Collecting too many options early and losing the clean momentum the guide is meant to create.',
      'Judging the path too quickly before you finish the first few steps with real effort.',
    ]
  }

  return [
    'Trying to apply every idea at once instead of keeping the path simple and testable.',
    'Ignoring your actual context while copying a workflow that belongs to a different type of user.',
    'Skipping the review step, which makes it harder to tell what is genuinely helping.',
  ]
}

function getStepSupportNote(list: DiscoverList, stepIndex: number) {
  if (stepIndex === 0) {
    return `This opening step gives the page its direction, so do not rush it just because it looks simple.`
  }

  if (stepIndex === list.steps.length - 1) {
    return `Use this final step to lock in what worked. That is what turns the guide from one-time reading into a repeatable system.`
  }

  return `This step matters because it connects the earlier idea to the more practical decision that comes next.`
}

export default function DiscoverDetailPage({
  list,
  relatedLists,
}: {
  list: DiscoverList
  relatedLists: DiscoverList[]
}) {
  const intent = getDiscoverIntent(list.title)
  const readMinutes = estimateReadMinutes(list)
  const spotlightTags = collectSpotlightTags(list)
  const quickAnswer = getQuickAnswer(list)
  const rankingUseCases = list.type === 'ranking' ? getRankingUseCases(list) : []
  const rankingDecisionNotes = list.type === 'ranking' ? getRankingDecisionNotes(list, intent) : []
  const guideChecklist = list.type === 'guide' ? getGuideChecklist(list, intent) : []
  const guideMistakes = list.type === 'guide' ? getGuideMistakes(list, intent) : []

  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <div className="page-hero-inner">
          <Link
            href="/discover"
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discover
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="tag-beta text-[10px]">{list.category}</span>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {intent.label}
            </span>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {list.type}
            </span>
            {list.scope ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                {list.scope}
              </span>
            ) : null}
            {list.featured ? (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                Featured
              </span>
            ) : null}
          </div>

          <h1 className="max-w-5xl text-3xl font-bold md:text-4xl">{list.title}</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">{list.description}</p>

          <div className={`mt-6 grid gap-4 sm:grid-cols-2 ${list.scope ? 'xl:grid-cols-5' : 'xl:grid-cols-4'}`}>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Updated</p>
              <p className="mt-2 text-sm font-black tracking-tight">{list.updatedAt}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
              <p className="mt-2 text-sm font-black tracking-tight">{getAudienceLabel(list)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Subcategory</p>
              <p className="mt-2 text-sm font-black tracking-tight">{list.subcategory || list.category}</p>
            </div>
            {list.scope ? (
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Scope</p>
                <p className="mt-2 text-sm font-black tracking-tight">{list.scope}</p>
              </div>
            ) : null}
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Read Time</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-black tracking-tight">
                <Clock3 className="h-4 w-4 text-indigo-500" />
                {readMinutes} min
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-content space-y-8">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-indigo-500" />
            Quick answer
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{quickAnswer}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {spotlightTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                <Tags className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <ListChecks className="h-4 w-4 text-indigo-500" />
            Editorial methodology
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {list.methodology.map(point => (
              <div key={point} className="rounded-xl bg-muted/40 px-4 py-3 text-sm text-foreground">
                {point}
              </div>
            ))}
          </div>
        </section>

        {list.type === 'ranking' ? (
          <>
            <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  Quick picks by need
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {rankingUseCases.map(useCase => (
                    <div key={useCase.title} className="rounded-xl border border-border p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {useCase.eyebrow}
                      </p>
                      <h2 className="mt-2 text-base font-bold">{useCase.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">Best for {lowerFirst(useCase.summary)}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {typeof useCase.rating === 'number' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                            <Star className="h-3 w-3 fill-current" />
                            {useCase.rating.toFixed(1)}
                          </span>
                        ) : null}
                        {useCase.tags.map(tag => (
                          <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Info className="h-4 w-4 text-indigo-500" />
                  How to choose from this list
                </div>
                <div className="space-y-3">
                  {rankingDecisionNotes.map(note => (
                    <div key={note} className="rounded-xl bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-6 py-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Users className="h-4 w-4 text-indigo-500" />
                  Comparison table
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use this view if you want the shortlist compressed into fit, rating, and standout tags.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Rank</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Pick</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Best for</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Standout tags</th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {list.items.map(item => (
                      <tr key={item.name}>
                        <td className="px-6 py-4 font-black text-foreground">#{item.rank}</td>
                        <td className="px-6 py-4 font-semibold text-foreground">{item.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{item.bestFor}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {typeof item.rating === 'number' ? item.rating.toFixed(1) : 'n/a'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              {list.items.map(item => (
                <article
                  key={item.rank}
                  id={`item-${item.rank}`}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white dark:bg-slate-100 dark:text-slate-950">
                      {item.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold">{item.name}</h2>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                      <p className="mt-3 rounded-xl bg-muted/40 px-4 py-3 text-sm text-foreground">
                        <span className="font-semibold">Why it stands out:</span> It is especially strong if you care about{' '}
                        {lowerFirst(item.bestFor)} and want a pick that still feels aligned with {getAngleLabel(list)}.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
                          Best for: {item.bestFor}
                        </span>
                        {item.pricing ? (
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                            {item.pricing}
                          </span>
                        ) : null}
                        {typeof item.rating === 'number' ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                            <Star className="h-3 w-3 fill-current" />
                            {item.rating.toFixed(1)}
                          </span>
                        ) : null}
                      </div>

                      {item.tags.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {item.url ? (
                        <Link
                          href={item.url}
                          target={item.url.startsWith('http') ? '_blank' : undefined}
                          rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Open related page <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <>
            <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                  Before you start
                </div>
                <div className="space-y-3">
                  {guideChecklist.map(item => (
                    <div key={item.title} className="rounded-xl border border-border p-4">
                      <h2 className="text-sm font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <ShieldAlert className="h-4 w-4 text-indigo-500" />
                  Common mistakes to avoid
                </div>
                <div className="space-y-3">
                  {guideMistakes.map(mistake => (
                    <div key={mistake} className="rounded-xl bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                      {mistake}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              {list.steps.map((step, index) => (
                <article key={step.step} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white dark:bg-slate-100 dark:text-slate-950">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold">{step.title}</h2>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Step {step.step}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                      <div className="mt-3 rounded-xl bg-muted/40 px-4 py-3 text-sm text-foreground">
                        <span className="font-semibold">Why this step matters:</span>{' '}
                        {getStepSupportNote(list, index)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-indigo-500" />
              Frequently asked questions
            </div>
            <div className="space-y-4">
              {list.faq.map(entry => (
                <div key={entry.question} className="rounded-xl bg-muted/40 p-4">
                  <h3 className="text-sm font-semibold">{entry.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{entry.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <ChevronRight className="h-4 w-4 text-indigo-500" />
              Related discover pages
            </div>
            <div className="space-y-3">
              {relatedLists.map(related => (
                <Link
                  key={related.slug}
                  href={`/discover/${related.slug}`}
                  className="block rounded-xl border border-border p-4 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <p className="text-sm font-semibold">{related.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{related.description}</p>
                </Link>
              ))}
              {relatedLists.length === 0 ? (
                <div className="rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
                  More related pages will appear here as this topic cluster expands.
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
