'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  BookOpen,
  BrainCircuit,
  Copy,
  FileText,
  GraduationCap,
  HelpCircle,
  ListChecks,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { callOpenRouter, cn, copyToClipboard } from '@/lib/utils'

const STUDY_TOOLS = [
  {
    id: 'summarizer',
    icon: BookOpen,
    label: 'Summarizer',
    desc: 'Summarize text or articles',
    tone: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    prompt: 'Summarize this text clearly and concisely in bullet points with key takeaways:',
  },
  {
    id: 'notes',
    icon: FileText,
    label: 'Notes Generator',
    desc: 'Convert content into study notes',
    tone: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    prompt: 'Convert this content into well-organized study notes with headings and bullet points:',
  },
  {
    id: 'qa',
    icon: HelpCircle,
    label: 'Q&A Generator',
    desc: 'Generate questions from text',
    tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    prompt: 'Generate 10 study questions and detailed answers based on this text. Format as Q and A pairs:',
  },
  {
    id: 'flashcards',
    icon: BrainCircuit,
    label: 'Flashcards',
    desc: 'Create flashcard sets',
    tone: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
    prompt: 'Create 10 flashcards in FRONT and BACK format from this content:',
  },
  {
    id: 'explain',
    icon: BrainCircuit,
    label: 'Concept Explainer',
    desc: 'Explain complex topics simply',
    tone: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
    prompt: 'Explain this concept in simple terms with examples:',
  },
  {
    id: 'checklist',
    icon: ListChecks,
    label: 'Study Checklist',
    desc: 'Build a revision checklist',
    tone: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300',
    prompt: 'Create a structured study checklist and revision plan for this topic:',
  },
]

export default function LearnClient() {
  const [activeTool, setActiveTool] = useState('summarizer')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const tool = STUDY_TOOLS.find(item => item.id === activeTool)!

  async function run() {
    if (!input.trim()) return

    setLoading(true)
    setOutput('')
    try {
      const result = await callOpenRouter(
        [{ role: 'user', content: `${tool.prompt}\n\n${input}` }],
        'openai/gpt-4o-mini',
        'You are an expert educational assistant. Provide clear, structured, and practical study materials.'
      )
      setOutput(result)
    } catch {
      setOutput(
        'Add NEXT_PUBLIC_OPENROUTER_API_KEY to .env.local to enable AI study tools.\n\nSample output:\n- Key concept 1: Definition and explanation\n- Key concept 2: Important details\n- Summary: Main takeaways from the content'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              Learn Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              AI Study Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Summarize material, create notes, generate flashcards, and build study plans from one workspace.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {STUDY_TOOLS.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTool(item.id)
                  setOutput('')
                }}
                className={cn(
                  'rounded-2xl border p-4 text-center transition-colors',
                  activeTool === item.id
                    ? 'border-indigo-200 bg-indigo-50 shadow-sm dark:border-indigo-900 dark:bg-indigo-950/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                )}
              >
                <div className={cn('mx-auto flex h-10 w-10 items-center justify-center rounded-2xl', item.tone)}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-slate-50">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.desc}</p>
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-slate-50">
              <span className={cn('flex h-6 w-6 items-center justify-center rounded-xl', tool.tone)}>
                <tool.icon className="h-3.5 w-3.5" />
              </span>
              {tool.label} Input
            </label>
            <textarea
              value={input}
              onChange={event => setInput(event.target.value)}
              placeholder={`Paste your material for ${tool.label.toLowerCase()}`}
              rows={14}
              className="premium-textarea min-h-[360px]"
            />
            <div className="flex gap-2">
              <button
                onClick={run}
                disabled={!input.trim() || loading}
                className="btn-primary flex-1 justify-center gap-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <tool.icon className="h-4 w-4" />}
                {loading ? 'Generating' : `Run ${tool.label}`}
              </button>
              <button
                onClick={() => {
                  setInput('')
                  setOutput('')
                }}
                className="btn-secondary px-3 py-2.5"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-950 dark:text-slate-50">Result</label>
              {output && (
                <button
                  onClick={() => {
                    copyToClipboard(output)
                    toast.success('Copied')
                  }}
                  className="btn-secondary gap-1.5 px-3 py-2 text-xs"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </button>
              )}
            </div>

            <div className="custom-scrollbar min-h-[360px] overflow-auto rounded-3xl border border-border bg-white p-4 dark:bg-slate-900">
              {loading ? (
                <div className="flex h-full min-h-[320px] items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-300" />
                    <p className="mt-3 text-sm text-muted-foreground">AI is preparing your output</p>
                  </div>
                </div>
              ) : output ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-200">{output}</pre>
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-center">
                  <div>
                    <div className={cn('mx-auto flex h-12 w-12 items-center justify-center rounded-2xl opacity-80', tool.tone)}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Your {tool.label.toLowerCase()} result will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
