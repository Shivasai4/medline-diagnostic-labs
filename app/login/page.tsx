"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"

type TabType = "admin" | "patient" | "customer"

const tabs: { key: TabType; label: string }[] = [
  { key: "admin", label: "Admin Login" },
  { key: "patient", label: "Patient Login" },
  { key: "customer", label: "Customer Login" },
]

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabType>("admin")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setMessage("Authentication coming soon.")
    setTimeout(() => setMessage(""), 4000)
  }

  return (
    <section className="bg-secondary min-h-[calc(100vh-200px)] flex items-center justify-center py-16">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="MedLine Diagnostic Labs"
              width={360}
              height={120}
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setMessage("")
                }}
                className={`flex-1 pb-3 text-sm font-medium transition-all duration-200 border-b-2 cursor-pointer ${
                  activeTab === tab.key
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-primary/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {message && (
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-sm text-primary mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
