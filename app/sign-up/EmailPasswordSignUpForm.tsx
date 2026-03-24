'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, Circle, Eye, EyeOff, Loader2, Lock, Mail, RefreshCcw, User } from 'lucide-react'
import { useSignUp } from '@clerk/nextjs'
import { getSafeRedirectPath } from '@/lib/auth-redirects'
import { getClerkErrorMessage } from '@/lib/clerk-error'

type PasswordValidation = {
  complexity?: Record<string, boolean>
  strength?: {
    state: 'pass' | 'fail' | 'excellent'
    keys?: string[]
  }
}

function splitFullName(fullName: string) {
  const trimmedName = fullName.trim()

  if (!trimmedName) {
    return {
      firstName: undefined,
      lastName: undefined,
    }
  }

  const [firstName, ...remaining] = trimmedName.split(/\s+/)

  return {
    firstName,
    lastName: remaining.join(' ') || undefined,
  }
}

function getPasswordTips(password: string) {
  return [
    {
      label: 'Use 8 or more characters',
      complete: password.length >= 8,
    },
    {
      label: 'Mix uppercase and lowercase letters',
      complete: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    {
      label: 'Add at least one number',
      complete: /\d/.test(password),
    },
    {
      label: 'Add a special character',
      complete: /[^A-Za-z0-9]/.test(password),
    },
  ]
}

function getPasswordSafetyMessage(validation: PasswordValidation | null) {
  if (!validation) {
    return ''
  }

  if (validation.complexity?.max_length) {
    return 'Use a slightly shorter password.'
  }

  if (validation.complexity?.min_zxcvbn_strength || validation.strength?.state === 'fail') {
    return 'Choose a less common password so it is harder to guess.'
  }

  return ''
}

export default function EmailPasswordSignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoaded, signUp, setActive } = useSignUp()
  const nextPath = searchParams?.get('next') || null
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [verifyingEmail, setVerifyingEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resendingCode, setResendingCode] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation | null>(null)

  useEffect(() => {
    if (!isLoaded || !signUp || !password) {
      setPasswordValidation(null)
      return
    }

    try {
      signUp.validatePassword(password, {
        onValidation: result => {
          setPasswordValidation(result as PasswordValidation)
        },
      })
    } catch {
      setPasswordValidation(null)
    }
  }, [isLoaded, password, signUp])

  const passwordTips = useMemo(() => getPasswordTips(password), [password])
  const passwordSafetyMessage = getPasswordSafetyMessage(passwordValidation)
  const passwordsMatch = !confirmPassword || password === confirmPassword

  async function completeSignUp(sessionId: string | null) {
    if (!setActive || !sessionId) {
      throw new Error('Your account was created, but the session could not be activated.')
    }

    await setActive({ session: sessionId })

    router.replace(getSafeRedirectPath(nextPath, '/'))
    router.refresh()
  }

  async function handleCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded || !signUp) {
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
      const { firstName, lastName } = splitFullName(fullName)
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email.trim(),
        password,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await completeSignUp(result.createdSessionId)
        return
      }

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setVerifyingEmail(true)
      setNotice(`We sent a 6-digit code to ${email.trim()}. Enter it below to finish setup.`)
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to create your account right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isLoaded || !signUp) {
      setError('Authentication is still loading. Please try again in a moment.')
      return
    }

    setError('')
    setNotice('')
    setLoading(true)

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      })

      if (result.status !== 'complete' || !result.createdSessionId) {
        setError('Email verification is not complete yet. Please check the code and try again.')
        return
      }

      await completeSignUp(result.createdSessionId)
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to verify that code right now. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleResendCode() {
    if (!isLoaded || !signUp) {
      return
    }

    setError('')
    setNotice('')
    setResendingCode(true)

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setNotice(`A fresh verification code is on the way to ${email.trim()}.`)
    } catch (error) {
      setError(getClerkErrorMessage(error, 'Unable to resend the code right now. Please try again.'))
    } finally {
      setResendingCode(false)
    }
  }

  if (verifyingEmail) {
    return (
      <form onSubmit={handleVerifyEmail} className="space-y-4">
        <div className="rounded-[24px] border border-border bg-card px-4 py-4">
          <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">Verify your email</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            We&apos;ve sent a code to <span className="font-semibold text-foreground">{email}</span>. Enter it to finish
            creating your account.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Verification code</label>
          <input
            type="text"
            value={verificationCode}
            onChange={event => setVerificationCode(event.target.value)}
            placeholder="123456"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            className="w-full rounded-2xl border border-border bg-muted/50 px-4 py-3 text-center text-sm tracking-[0.35em] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
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
          Verify email and continue
        </button>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendingCode || !isLoaded}
            className="btn-secondary w-full justify-center gap-2 py-3 disabled:opacity-60"
          >
            {resendingCode ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Resend code
          </button>

          <button
            type="button"
            onClick={() => {
              setVerifyingEmail(false)
              setVerificationCode('')
              setNotice('')
              setError('')
            }}
            className="btn-secondary w-full justify-center py-3"
          >
            Use a different email
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleCreateAccount} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Full name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            placeholder="Alex Johnson"
            autoComplete="name"
            className="w-full rounded-2xl border border-border bg-muted/50 py-3 pl-10 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>
      </div>

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

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Create a password"
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

        {password ? (
          <div className="rounded-[24px] border border-border bg-card px-4 py-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {passwordTips.map(tip => {
                const Icon = tip.complete ? CheckCircle2 : Circle

                return (
                  <div key={tip.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon
                      className={
                        tip.complete
                          ? 'h-4 w-4 text-emerald-500'
                          : 'h-4 w-4 text-slate-300 dark:text-slate-700'
                      }
                    />
                    <span>{tip.label}</span>
                  </div>
                )
              })}
            </div>

            {passwordSafetyMessage ? (
              <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">{passwordSafetyMessage}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Confirm password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            placeholder="Re-enter your password"
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

        {!passwordsMatch ? (
          <p className="text-sm text-red-600 dark:text-red-400">Those passwords do not match yet.</p>
        ) : null}
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
        Create account
      </button>
    </form>
  )
}
