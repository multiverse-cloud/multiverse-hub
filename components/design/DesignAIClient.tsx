"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Code2,
  Copy,
  Download,
  Image as ImageIcon,
  Layout,
  Loader2,
  Paintbrush,
  Sparkles,
  Wand2,
} from "lucide-react";
import { callOpenRouter, cn, generateImage } from "@/lib/utils";

const DESIGN_TOOLS = [
  {
    id: "ui-generator",
    icon: Layout,
    label: "UI Generator",
    desc: "Create interface concepts and code",
    tone: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  },
  {
    id: "logo-maker",
    icon: Sparkles,
    label: "Logo Maker",
    desc: "Generate brand directions",
    tone: "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300",
  },
  {
    id: "poster-generator",
    icon: ImageIcon,
    label: "Poster Generator",
    desc: "Create campaign visuals",
    tone: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
  },
  {
    id: "landing-page",
    icon: Layout,
    label: "Landing Page",
    desc: "Draft complete page structures",
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    id: "component-gen",
    icon: Code2,
    label: "Component Generator",
    desc: "Generate React components",
    tone: "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  },
  {
    id: "thumbnail-gen",
    icon: ImageIcon,
    label: "Thumbnail Generator",
    desc: "Create social thumbnail directions",
    tone: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
];

const EXAMPLE_PROMPTS: Record<string, string[]> = {
  "ui-generator": [
    "A SaaS pricing page with three clear plans and enterprise CTA",
    "A minimal dashboard sidebar with clean navigation states",
    "A modern login form with social authentication actions",
  ],
  "logo-maker": [
    "A modern logo for a fintech product named NexaFlow",
    "A clean symbol for a pet care brand named PawPal",
    "A professional mark for a legal product named LegalEdge",
  ],
  "poster-generator": [
    "A conference poster for an AI product summit",
    "A dramatic sci-fi film poster with cinematic typography",
    "A music event poster with bold headline hierarchy",
  ],
  "landing-page": [
    "A landing page for a project management SaaS product",
    "A mobile app landing page for a fitness startup",
    "An agency portfolio landing page with case studies",
  ],
  "component-gen": [
    "A toast component with success, error, and info variants",
    "A sortable data table with row actions and filters",
    "A multi-step form with clear progress states",
  ],
  "thumbnail-gen": [
    "A YouTube thumbnail for a VS Code productivity tutorial",
    "A LinkedIn banner for a senior frontend engineer",
    "A social card for a blog post about AI trends",
  ],
};

const UI_SYSTEM_PROMPTS: Record<string, string> = {
  "ui-generator":
    "You are an expert UI designer and React developer. Generate a polished React component with Tailwind CSS. Output only component code starting with export default function.",
  "logo-maker":
    "You are a professional brand designer. Create a clean SVG logo concept. Output valid SVG code with a viewBox of 0 0 200 200.",
  "poster-generator":
    "You are a visual designer. Create a refined HTML and CSS poster layout with strong typography and clean composition.",
  "landing-page":
    "You are an expert web designer and developer. Generate a clean HTML landing page with embedded CSS and strong content hierarchy.",
  "component-gen":
    "You are a React expert. Generate a production-ready React component with TypeScript and Tailwind CSS.",
  "thumbnail-gen":
    "You are a social design specialist. Create an SVG thumbnail layout in 1280 by 720 format with strong contrast and clear title placement.",
};

export default function DesignAIClient() {
  const [activeTool, setActiveTool] = useState("ui-generator");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"code" | "preview">("preview");

  const tool = DESIGN_TOOLS.find((item) => item.id === activeTool)!;
  const examples = EXAMPLE_PROMPTS[activeTool] || [];

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput("");
    setImageUrl("");

    try {
      if (
        activeTool === "logo-maker" ||
        activeTool === "poster-generator" ||
        activeTool === "thumbnail-gen"
      ) {
        const prefix =
          activeTool === "logo-maker"
            ? "Professional vector logo concept, "
            : activeTool === "poster-generator"
              ? "High quality poster design, "
              : "Professional thumbnail design, ";
        const enhancedPrompt = `${prefix}${prompt}, clean, modern, detailed`;
        const url = await generateImage(enhancedPrompt);
        setImageUrl(url);
        setOutput(`Image generated with prompt:\n\n${enhancedPrompt}`);
      } else {
        const systemPrompt = UI_SYSTEM_PROMPTS[activeTool];
        const result = await callOpenRouter(
          [{ role: "user", content: prompt }],
          "openai/gpt-4o-mini",
          systemPrompt,
        );
        setOutput(result);
      }
    } catch {
      setOutput(
        'Add NEXT_PUBLIC_OPENROUTER_API_KEY to .env.local for live AI generation.\n\nExample output:\n\nexport default function HeroSection() {\n  return (\n    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">\n      <div className="text-center">\n        <h1 className="text-6xl font-black">Your Product</h1>\n        <p className="mt-4 text-xl text-slate-300">A clean, professional launch surface.</p>\n      </div>\n    </section>\n  )\n}',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Paintbrush className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              Design AI Universe
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl md:text-5xl">
              Design AI Studio
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Generate UI concepts, component code, brand directions, posters,
              and social assets in one workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: tool picker + prompt + examples + generate */}
          <div className="space-y-5 lg:col-span-1">
            {/* Tool selector */}
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-950 dark:text-slate-50">
                Choose tool
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {DESIGN_TOOLS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTool(item.id);
                        setOutput("");
                        setImageUrl("");
                        setPrompt("");
                      }}
                      className={cn(
                        "rounded-2xl border p-3 sm:p-4 text-left transition-colors active:scale-[0.97]",
                        activeTool === item.id
                          ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/40"
                          : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700",
                      )}
                    >
                      <div
                        className={cn(
                          "mb-2.5 flex h-8 w-8 items-center justify-center rounded-xl",
                          item.tone,
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-950 dark:text-slate-50 leading-snug">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground hidden sm:block">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prompt textarea */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder={`Describe your ${tool.label.toLowerCase()} request`}
                className="premium-textarea min-h-[100px] sm:min-h-[120px]"
              />
            </div>

            {/* Example prompts — horizontal scroll on mobile */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Quick examples
              </p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:flex-col sm:overflow-x-visible sm:pb-0">
                {examples.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="shrink-0 sm:shrink rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-sm text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100 max-w-[80vw] sm:max-w-none sm:w-full"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button — full width on mobile */}
            <button
              onClick={generate}
              disabled={!prompt.trim() || loading}
              className="btn-primary w-full sm:w-auto justify-center gap-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              {loading ? "Generating" : `Generate ${tool.label}`}
            </button>
          </div>

          {/* Right column: output area */}
          <div className="lg:col-span-2">
            <div className="premium-card min-h-[200px] overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-1">
                  {!imageUrl && output && (
                    <>
                      <button
                        onClick={() => setTab("preview")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                          tab === "preview"
                            ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setTab("code")}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                          tab === "code"
                            ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        Code
                      </button>
                    </>
                  )}
                </div>

                {output && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(output);
                        toast.success("Copied");
                      }}
                      className="btn-secondary gap-1.5 px-3 py-2 text-xs"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                    {imageUrl && (
                      <a
                        href={imageUrl}
                        download="design.jpg"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary gap-1.5 px-3 py-2 text-xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4">
                {!output && !imageUrl && !loading && (
                  <div className="flex min-h-[200px] sm:min-h-[440px] flex-col items-center justify-center text-center">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-3xl",
                        tool.tone,
                      )}
                    >
                      <tool.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-slate-950 dark:text-slate-50">
                      {tool.label}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                      {tool.desc}
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="flex min-h-[200px] sm:min-h-[440px] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
                      <Loader2 className="h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Generating your result
                    </p>
                  </div>
                )}

                {imageUrl && !loading && (
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt="Generated design"
                      className="w-full rounded-2xl border border-border"
                      style={{ maxHeight: "460px", objectFit: "contain" }}
                    />
                  </div>
                )}

                {output &&
                  !imageUrl &&
                  !loading &&
                  (tab === "code" ? (
                    <pre className="custom-scrollbar max-h-[460px] overflow-auto rounded-2xl border border-border bg-slate-50 p-4 text-xs whitespace-pre-wrap dark:bg-slate-950/60">
                      {output}
                    </pre>
                  ) : (
                    <div className="custom-scrollbar max-h-[460px] overflow-auto rounded-2xl border border-border bg-slate-50 p-4 dark:bg-slate-950/60">
                      <pre className="text-sm whitespace-pre-wrap leading-6 text-slate-700 dark:text-slate-200">
                        {output}
                      </pre>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
