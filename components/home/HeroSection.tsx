"use client"

import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20" id="home">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="font-serif text-[34px] font-semibold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-[64px]">
              Medline Diagnostic Labs
              <span className="mt-1 block text-navy">Accurate Reports. Faster Clinical Action.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-[1.85] text-foreground/85 sm:text-lg">
              A clean, trusted diagnostics experience built for MedLine. Advanced lab workflows, strict quality control, and timely reporting across Hyderabad, including Nagole and nearby areas.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/book-test"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl bg-primary px-9 py-3.5 text-center text-base font-semibold text-primary-foreground shadow-[0_18px_34px_-20px_rgba(37,99,235,0.9)] transition hover:bg-primary/90 sm:w-auto"
              >
                Book a Test
              </Link>
              <Link
                href="/services"
                className="w-full rounded-2xl border border-primary/20 bg-white/95 px-9 py-3.5 text-center text-base font-semibold text-primary shadow-[0_14px_26px_-20px_rgba(11,42,74,0.55)] transition hover:bg-primary/5 sm:w-auto"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_32px_52px_-34px_rgba(11,42,74,0.75)]">
              <Image
                src="/cover.jpg"
                alt="Modern diagnostics laboratory"
                width={1200}
                height={820}
                className="h-[330px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent" />
              <p className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 text-center text-base font-medium text-white sm:text-lg">
                Precision-led diagnostics with dependable turnaround.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

