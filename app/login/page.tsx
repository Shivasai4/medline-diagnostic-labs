"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

type Role = "admin" | "customer" | "patient"

type RoleConfig = {
  label: string
  title: string
  subtitle: string
  route: string
}

const roles: Record<Role, RoleConfig> = {
  admin: {
    label: "Admin Login",
    title: "Admin Access",
    subtitle: "Manage website offers and announcements.",
    route: "/admin",
  },
  customer: {
    label: "Customer Login",
    title: "Customer Access",
    subtitle: "Book tests and manage appointments.",
    route: "https://lab18.cloudpathology.io",
  },
  patient: {
    label: "Patient Login",
    title: "Patient Access",
    subtitle: "View reports and track upcoming tests.",
    route: "https://patient-in.creliohealth.com/patient/login",
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [activeRole, setActiveRole] = useState<Role>("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<string | null>(null)

  const currentRole = roles[activeRole]

  const handleRoleClick = (role: Role) => {
    setAuthError(null)
    setAuthSuccess(null)

    const selectedRole = roles[role]
    if (selectedRole.route.startsWith("http")) {
      window.location.assign(selectedRole.route)
      return
    }

    setActiveRole(role)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      return
    }

    if (currentRole.route.startsWith("http")) {
      window.location.assign(currentRole.route)
      return
    }

    if (activeRole !== "admin") {
      router.push(currentRole.route)
      return
    }

    setIsSubmitting(true)
    setAuthError(null)
    setAuthSuccess(null)

    const pendingAdminTab = window.open("", "_blank")

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

      if (pendingAdminTab && !pendingAdminTab.closed) {
        pendingAdminTab.location.href = "/admin"
      } else {
        const adminWindowFallback = window.open("/admin", "_blank")
        if (!adminWindowFallback) {
          router.push("/admin")
        }
      }

      setAuthSuccess("Admin panel opened in a new tab.")
      setPassword("")
    } catch (error) {
      if (pendingAdminTab && !pendingAdminTab.closed) {
        pendingAdminTab.close()
      }

      const message = error instanceof Error ? error.message : "Unable to login right now."
      setAuthError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-200px)] py-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10 lg:px-8">
        <div className="rounded-3xl border border-primary/10 bg-white/85 p-7 shadow-[0_24px_40px_-34px_rgba(11,42,74,0.65)] backdrop-blur-sm lg:p-9">
          <div className="mb-7 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="MedLine Diagnostic Labs"
              width={420}
              height={128}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">Portal Login</h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/75 sm:text-lg">
            Select your access type and continue securely to your dashboard.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {(Object.entries(roles) as [Role, RoleConfig][]).map(([key, role]) => (
              <button
                key={key}
                onClick={() => handleRoleClick(key)}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  activeRole === key
                    ? "border-primary bg-primary text-white shadow-[0_14px_26px_-18px_rgba(37,99,235,0.9)]"
                    : "border-primary/15 bg-white text-primary hover:border-primary/35"
                }`}
              >
                <p className="text-sm font-semibold">{role.label}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/80">Selected Role</p>
            <p className="mt-1 text-xl font-semibold text-primary">{currentRole.title}</p>
            <p className="mt-1 text-sm text-primary/80">{currentRole.subtitle}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white/92 p-7 shadow-[0_28px_46px_-34px_rgba(11,42,74,0.72)] backdrop-blur-sm lg:p-9">
          <h2 className="text-2xl font-semibold text-navy">{currentRole.label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Enter your registered credentials to continue.</p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
            {authError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{authError}</div>
            )}
            {authSuccess && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{authSuccess}</div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@medline.com"
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
              {isSubmitting ? "Signing in..." : `Continue to ${currentRole.title}`}
            </button>

            <button type="button" className="text-left text-sm font-medium text-primary/80 transition hover:text-primary">
              Forgot Password?
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
