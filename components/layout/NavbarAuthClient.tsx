'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'
import MobileNav from './MobileNav'

function SignInButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href="/sign-in"
      className={
        mobile
          ? 'flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white'
          : 'hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 sm:flex'
      }
    >
      <Sparkles className={mobile ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      Sign In
    </Link>
  )
}

export default function NavbarAuthClient({ clerkEnabled }: { clerkEnabled: boolean }) {
  const mobileAuthSlot = clerkEnabled ? (
    <>
      <SignedOut>
        <SignInButton mobile />
      </SignedOut>
      <SignedIn>
        <div className="flex justify-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </>
  ) : (
    <SignInButton mobile />
  )

  return (
    <>
      {clerkEnabled ? (
        <>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="hidden sm:flex">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </>
      ) : (
        <SignInButton />
      )}

      <MobileNav authSlot={mobileAuthSlot} />
    </>
  )
}
