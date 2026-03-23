"use client"

import { useState } from "react"

type Role = "customer" | "patient"

type RoleConfig = {
  label: string
  title: string
  subtitle: string
  route: string
}

const roles: Record<Role, RoleConfig> = {
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
  const [activeRole, setActiveRole] = useState<Role>("customer")

  const currentRole = roles[activeRole]

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleRoleClick = (role: Role) => {
    setActiveRole(role)
  }

  const handleContinue = () => {
    openInNewTab(currentRole.route)
  }

  return (
    <section className="min-h-[calc(100vh-200px)] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/10 bg-white/92 p-7 shadow-[0_28px_46px_-34px_rgba(11,42,74,0.72)] backdrop-blur-sm lg:p-9">
          <h2 className="text-2xl font-semibold text-navy">{currentRole.label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">This will open the selected portal in a new tab.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
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

          <div className="mt-7 rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/80">Portal Access</p>
            <p className="mt-1 text-xl font-semibold text-primary">{currentRole.title}</p>
            <p className="mt-1 text-sm text-primary/80">{currentRole.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="mt-7 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(37,99,235,0.95)] transition hover:bg-primary/90"
          >
            Open {currentRole.label}
          </button>

        </div>
      </div>
    </section>
  )
}
