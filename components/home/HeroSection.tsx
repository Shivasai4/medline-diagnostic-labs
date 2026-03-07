"use client"

import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, FlaskConical, Clock3 } from "lucide-react"

const heroStats = [
  { icon: ShieldCheck, label: "Quality Protocols", value: "CLIA-Aligned" },
  { icon: FlaskConical, label: "Daily Test Capacity", value: "2500+ Samples" },
  { icon: Clock3, label: "Report Delivery", value: "Within 24 Hours" },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-navy-light/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-primary text-balance">
              Accurate Reports.
              <span className="block text-navy-light">Faster Clinical Action.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl leading-relaxed">
              A clean, trusted diagnostics experience built for MedLine. Advanced lab workflows, strict quality control, and timely reporting across Hyderabad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Book a Test
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-primary/25 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_24px_50px_-28px_rgba(11,42,74,0.55)]">
              <Image
                src="/placeholder.jpg"
                alt="Modern diagnostics laboratory"
                width={900}
                height={700}
                className="h-[360px] w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/5 to-transparent" />
              <p className="absolute left-5 bottom-5 text-sm font-medium text-white/95">
                Precision-led diagnostics with dependable turnaround.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {heroStats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-primary/15 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(11,42,74,0.5)]"
            >
              <item.icon className="h-6 w-6 text-primary mb-3" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}