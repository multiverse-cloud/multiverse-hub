'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail, RefreshCcw } from 'lucide-react'
import { useSignIn } from '@clerk/nextjs'
import AuthShell from '@/app/_components/AuthShell'
import { getSafeRedirectPath } from '@/lib/auth-redirects'
import { getClerkErrorMessage } from '@/lib/clerk-error'

function getPasswordTips(password: string) {
  return [
    { label: 'Use 8 or more characters', complete: password.length >= 8 },
    { label: 'Mix uppercase and lowercase letters', complete: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: 'Add at least one number', complete: /\d/.test(password) },
  ]
}

export default function ForgotPasswordPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, signIn, setActive } = useSignIn()
  const nextPath = searchParams?.get('next') || null
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const passwordTips = useMemo(() => getPasswordTips(password), [password])
  const signInHref = nextPath ? `/sign-in?next=${encodeURIComponent(nextPath)}` : '/sign-in'

  async function handleSendCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded || !signIn) {
      setError('Authentication is still loading. Please try again in a moment.')
      return
    }

    setError('')
    setNotice('')
    setLoading(true)

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim(),
      })

      setStep('reset')
      setNotice(`We sent a reset code to ${email.trim()}. Enter it below to choose a new password.`)
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to send a reset code right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded || !signIn || !setActive) {
      setError('Authentication is still loading. Please try again in a moment.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match yet.')
      return
    }

    setError('')
    setNotice('')
    setLoading(true)

    try {
      const attempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code.trim(),
      })

      const completed =
        attempt.status === 'complete'
          ? attempt
          : await signIn.resetPassword({
              password,
              signOutOfOtherSessions: true,
            })

      if (completed.status !== 'complete' || !completed.createdSessionId) {
        setError('Password reset is not complete yet. Please try again.')
        return
      }

      await setActive({ session: completed.createdSessionId })

      router.replace(getSafeRedirectPath(nextPath, '/'))
      router.refresh()
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to reset your password right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleResendCode() {
    if (!isLoaded || !signIn) {
      return
    }

    setError('')
    setNotice('')
    setResending(true)

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim(),
      })

      setNotice(`A fresh reset code is on the way to ${email.trim()}.`)
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to resend the code right now. Please try again.'))
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Get back into your account"
      description="Reset your password with a secure email code, then continue straight back to your account."
      sideEyebrow="Recovery"
      sideTitle="A proper reset flow, without the rough edges."
      sideDescription="Request a code, set a new password, and return to your tools or admin workspace with the same Clerk account."
      metrics={[
        { value: 'Email code', label: 'Verification' },
        { value: '1 min', label: 'Typical reset' },
        { value: 'Secure', label: 'Recovery flow' },
      ]}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Remembered it already?{' '}
          <Link href={signInHref} className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
            Back to sign in
          </Link>
        </p>
      }
    >
      {step === 'email' ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="hello@example.com"
                autoComplete="email"
                inputMode="email"
                required
                className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/20 dark:text-red-300">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="btn-primary w-full justify-center gap-2 py-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send reset code
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="rounded-[24px] border border-border bg-card px-4 py-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Enter the code we sent to <span className="font-semibold text-foreground">{email}</span>, then choose a
              new password.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Reset code</label>
            <input
              type="text"
              value={code}
              onChange={event => setCode(event.target.value)}
              placeholder="123456"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-center text-sm tracking-[0.35em] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">New password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Create a new password"
                autoComplete="new-password"
                required
                className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(current => !current)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {password ? (
            <div className="rounded-[24px] border border-border bg-card px-4 py-3">
              <div className="grid gap-2 sm:grid-cols-2">
                {passwordTips.map(tip => (
                  <p key={tip.label} className="text-sm text-muted-foreground">
                    {tip.complete ? 'Ready:' : 'Tip:'} {tip.label}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Confirm new password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                placeholder="Repeat your new password"
                autoComplete="new-password"
                required
                className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(current => !current)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {confirmPassword && password !== confirmPassword ? (
              <p className="text-sm text-red-600 dark:text-red-400">Those passwords do not match yet.</p>
            ) : null}
          </div>

          {notice ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-950/60 dark:bg-emerald-950/20 dark:text-emerald-300">
              {notice}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/20 dark:text-red-300">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="btn-primary w-full justify-center gap-2 py-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Reset password
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resending || !isLoaded}
              className="btn-secondary w-full justify-center gap-2 py-3 disabled:opacity-60"
            >
              {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
              Resend code
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email')
                setCode('')
                setPassword('')
                setConfirmPassword('')
                setNotice('')
                setError('')
              }}
              className="btn-secondary w-full justify-center py-3"
            >
              Change email
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
