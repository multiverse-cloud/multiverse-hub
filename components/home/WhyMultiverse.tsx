import Link from "next/link";
import { Banknote, Globe, Infinity, Lock, Sparkles, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Speed",
    desc: "Every tool loads in under a second. No spinners, no delays — just results.",
    tone: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
    borderHover: "hover:border-amber-200 dark:hover:border-amber-900",
  },
  {
    icon: Banknote,
    title: "Completely Free",
    desc: "Use every tool for free. No premium tiers, no hidden paywalls.",
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
    borderHover: "hover:border-emerald-200 dark:hover:border-emerald-900",
  },
  {
    icon: Globe,
    title: "No Sign-Up Needed",
    desc: "Start using any tool in seconds. No account required for core features.",
    tone: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
    borderHover: "hover:border-blue-200 dark:hover:border-blue-900",
  },
  {
    icon: Sparkles,
    title: "Studio-Grade UI",
    desc: "Purpose-built workspaces for each tool — not generic one-size-fits-all layouts.",
    tone: "bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300",
    borderHover: "hover:border-violet-200 dark:hover:border-violet-900",
  },
  {
    icon: Infinity,
    title: "150+ & Growing",
    desc: "PDF, image, video, audio, text, dev, SEO, calculator, and file tools — with more added weekly.",
    tone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300",
    borderHover: "hover:border-indigo-200 dark:hover:border-indigo-900",
  },
  {
    icon: Lock,
    title: "Privacy First",
    desc: "Files are processed locally in your browser. Nothing is stored on our servers.",
    tone: "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300",
    borderHover: "hover:border-rose-200 dark:hover:border-rose-900",
  },
];

export default function WhyMultiverse() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Emerald-tinted feature cards background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/80 via-emerald-50/10 to-slate-50/80 dark:from-slate-950 dark:via-emerald-950/5 dark:to-slate-950" />
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-emerald-100/30 blur-[100px] dark:bg-emerald-900/8" />
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="section-header">
          <p className="section-label">Why Multiverse</p>
          <h2 className="section-title">Built different. Built better.</h2>
          <p className="section-sub">
            Other sites give you one tool. We give you the entire workshop —
            fast, free, and private.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const badge = String(index + 1).padStart(2, "0");

            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 ${feature.borderHover} animate-fade-in`}
                style={{
                  animationDelay: `${index * 0.08}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Number badge */}
                <span className="absolute right-4 top-4 text-[10px] font-bold text-muted-foreground/40 select-none">
                  {badge}
                </span>

                <div
                  className={`mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${feature.tone}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-2 font-bold transition-colors group-hover:text-slate-950 dark:group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Explore All Free Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
