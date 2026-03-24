'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Bot,
  ChevronDown,
  Code,
  Copy,
  Languages,
  Lightbulb,
  PenLine,
  RefreshCw,
  Send,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'
import { callOpenRouter, cn } from '@/lib/utils'

const MODELS = [
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', free: true, badge: 'Fast' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', free: false, badge: 'Powerful' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', free: false, badge: 'Balanced' },
  { id: 'google/gemini-flash-1.5', name: 'Gemini 1.5 Flash', provider: 'Google', free: true, badge: 'Fast' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B', provider: 'Meta', free: true, badge: 'Open' },
]

const PROMPT_TEMPLATES = [
  { icon: Code, label: 'Write Code', prompt: 'Write a React component for a polished product card with image, title, description, and call to action.' },
  { icon: PenLine, label: 'Blog Post', prompt: 'Write a professional blog post about the future of AI tools in 2026.' },
  { icon: Languages, label: 'Translate', prompt: 'Translate the following text to Spanish: "Hello, welcome to Multiverse."' },
  { icon: Lightbulb, label: 'Explain Concept', prompt: 'Explain machine learning to a beginner using clear analogies.' },
  { icon: Sparkles, label: 'Summarize', prompt: 'Summarize the key points of how AI is changing product workflows.' },
  { icon: Zap, label: 'Brainstorm', prompt: 'Give me 10 startup ideas that combine AI with practical productivity tools.' },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export default function AIHubClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(MODELS[0].id)
  const [modelOpen, setModelOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const selectedModel = MODELS.find(item => item.id === model) || MODELS[0]

  async function sendMessage(content = input.trim()) {
    if (!content || loading) return

    setInput('')
    const userMessage: Message = { role: 'user', content, id: Date.now().toString() }
    setMessages(previous => [...previous, userMessage])
    setLoading(true)

    try {
      const history = [...messages, userMessage].map(message => ({ role: message.role, content: message.content }))
      const response = await callOpenRouter(
        history,
        model,
        'You are Multiverse AI. Be concise, accurate, professional, and helpful.'
      )
      setMessages(previous => [
        ...previous,
        { role: 'assistant', content: response, id: `${Date.now() + 1}` },
      ])
    } catch {
      setMessages(previous => [
        ...previous,
        {
          role: 'assistant',
          content: 'Add NEXT_PUBLIC_OPENROUTER_API_KEY to .env.local to enable AI chat and writing tools.',
          id: `${Date.now() + 1}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen premium-shell">
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
              AI Universe
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 md:text-5xl">
              AI Hub
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Chat with leading models for writing, coding, translation, ideation, and research in one focused interface.
            </p>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
              <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-slate-50">Conversation Workspace</h2>
              <p className="text-sm text-muted-foreground">Choose a model and start a focused conversation.</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setModelOpen(!modelOpen)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              {selectedModel.name}
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-bold',
                  selectedModel.free ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                )}
              >
                {selectedModel.badge}
              </span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', modelOpen && 'rotate-180')} />
            </button>

            {modelOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                {MODELS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setModel(item.id)
                      setModelOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70',
                      item.id === model && 'bg-indigo-50 dark:bg-indigo-950/30'
                    )}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.provider}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-bold',
                        item.free ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      )}
                    >
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="premium-card p-5">
              <h3 className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">Prompt Library</h3>
              <div className="mt-4 space-y-2">
                {PROMPT_TEMPLATES.map(item => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      onClick={() => sendMessage(item.prompt)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                      </div>
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="premium-card p-5">
              <h3 className="font-display text-lg font-bold text-slate-950 dark:text-slate-50">Models</h3>
              <div className="mt-4 space-y-3">
                {MODELS.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="premium-card flex h-[680px] flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto p-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-800">
                    <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-950 dark:text-slate-50">
                    What can I help you with?
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Start a conversation or select one of the prompt templates to begin.
                  </p>
                </div>
              ) : (
                <>
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      {message.role === 'assistant' && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                          <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                        </div>
                      )}

                      <div
                        className={cn(
                          'max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-7',
                          message.role === 'user'
                            ? 'rounded-tr-md bg-indigo-600 text-white'
                            : 'rounded-tl-md border border-border bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200'
                        )}
                      >
                        <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(message.content)
                              toast.success('Copied')
                            }}
                            className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </button>
                        )}
                      </div>

                      {message.role === 'user' && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                          <User className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                        <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <div className="rounded-3xl rounded-tl-md border border-border bg-white px-4 py-3 dark:bg-slate-900">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map(index => (
                            <div
                              key={index}
                              className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                              style={{ animationDelay: `${index * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border bg-background p-4">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-colors focus-within:border-indigo-400 dark:border-slate-800 dark:bg-slate-900">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything. Press Enter to send, Shift+Enter for a new line."
                  rows={3}
                  className="w-full resize-none bg-transparent px-4 pb-14 pt-4 text-sm outline-none"
                />

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={() => setMessages([])}
                      className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
                      title="Clear conversation"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">Powered by OpenRouter using {selectedModel.name}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
