"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

type FeedbackState = "idle" | "sending" | "success" | "error"

export default function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FeedbackState>("idle")
  const [notice, setNotice] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setNotice("")

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const payload = (await response.json().catch(() => ({}))) as { message?: string; error?: string }

      if (!response.ok) {
        throw new Error(payload.error || "Feedback failed")
      }

      setStatus("success")
      setNotice(payload.message || "Thanks. Your feedback was sent.")
      setName("")
      setMessage("")
    } catch (error) {
      setStatus("error")
      setNotice(error instanceof Error ? error.message : "Feedback failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="feedback-name" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Name
        </label>
        <input
          id="feedback-name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          required
          maxLength={80}
          placeholder="Your name"
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-slate-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="feedback-email" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Email
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-slate-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="feedback-message" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Message
        </label>
        <textarea
          id="feedback-message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          required
          minLength={5}
          maxLength={2000}
          rows={7}
          placeholder="Tell us what to improve, what broke, or what you want next."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-slate-600"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">{message.length}/2000</p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? "Sending..." : "Send feedback"}
      </button>

      {notice ? (
        <p
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            status === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
          )}
        >
          {notice}
        </p>
      ) : null}
    </form>
  )
}
