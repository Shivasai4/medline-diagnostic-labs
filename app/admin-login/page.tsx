"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setAuthError("Email and password are required.")
      return
    }

    setIsSubmitting(true)
    setAuthError(null)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Unable to login.")
      }

      router.push("/admin")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to login right now."
      setAuthError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-200px)] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/10 bg-white/92 p-7 shadow-[0_28px_46px_-34px_rgba(11,42,74,0.72)] backdrop-blur-sm lg:p-9">
          <div className="mb-7 flex items-center justify-between gap-3">
            <Image
              src="/logo.png"
              alt="MedLine Diagnostic Labs"
              width={420}
              height={128}
              className="h-14 w-auto object-contain"
              priority
            />
            <Link href="/login" className="text-sm font-medium text-primary/80 transition hover:text-primary">
              Portal Login
            </Link>
          </div>

          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">Admin Login</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/75 sm:text-lg">
            Sign in to manage website offers and announcements.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
            {authError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{authError}</div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="medlinelabs2014@gmail.com"
                required
                className="w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(37,99,235,0.95)] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Continue to Admin Access"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
