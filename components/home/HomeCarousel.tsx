"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    eyebrow: "CLIA-Aligned Operations",
    title: "Quality You Can Trust",
    description:
      "Calibration-led workflows, dual verification, and strict QC checkpoints keep every report clinically dependable.",
    highlights: ["Dual-path validation", "Transparent reporting", "Fast turnaround"],
    image: "/cover.jpg",
    caption: "Precision and consistency in every run.",
    cta: "/contact",
    ctaLabel: "Talk to Us",
  },
  {
    eyebrow: "Automation First",
    title: "Advanced Diagnostic Engine",
    description:
      "High-throughput analyzers and digitally managed sample tracking reduce friction from collection to final report.",
    highlights: ["Automated analyzers", "Barcode traceability", "24-hour reporting lanes"],
    image: "/Automation-driven.jpg",
    caption: "Smarter lab systems for better clinical action.",
    cta: "/services",
    ctaLabel: "Explore Services",
  },
  {
    eyebrow: "Patient-Centric Care",
    title: "Compassion Meets Accuracy",
    description:
      "Experienced professionals and patient-first communication ensure clarity, comfort, and confidence at every step.",
    highlights: ["Expert pathologists", "Clear guidance", "Reliable support"],
    image: "/trusted_clinical_team.jpg",
    caption: "Human care backed by scientific rigor.",
    cta: "/contact",
    ctaLabel: "Book a Test",
  },
]

export default function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    if (!api) return

    const id = setInterval(() => {
      api.scrollNext()
    }, 6000)

    return () => clearInterval(id)
  }, [api])

  return (
    <section className="relative overflow-hidden pb-16 pt-14 lg:pb-20 lg:pt-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-primary sm:text-5xl">Inside MedLine</h2>
          <p className="mt-4 text-lg leading-relaxed text-primary/70">
            A premium snapshot of the systems, people, and quality discipline behind every report.
          </p>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <article className="overflow-hidden rounded-[32px] border border-white/75 bg-[linear-gradient(140deg,rgba(255,255,255,0.95)_0%,rgba(246,250,255,0.97)_100%)] shadow-[0_34px_56px_-40px_rgba(11,42,74,0.85)]">
                  <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.06fr_1fr] lg:items-center lg:gap-10 lg:p-10">
                    <div>
                      <p className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        {slide.eyebrow}
                      </p>
                      <h3 className="mt-5 text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                        {slide.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                        {slide.description}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {slide.highlights.map((item) => (
                          <p key={item} className="inline-flex items-center gap-2 text-sm font-medium text-primary/90">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            {item}
                          </p>
                        ))}
                      </div>

                      <div className="mt-8">
                        <Link
                          href={slide.cta}
                          className="inline-flex rounded-xl bg-primary px-8 py-3 text-base font-semibold text-white shadow-[0_14px_28px_-18px_rgba(37,99,235,0.95)] transition hover:bg-primary/90"
                        >
                          {slide.ctaLabel}
                        </Link>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={1200}
                        height={820}
                        className="h-[330px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                      <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white sm:text-base">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-2 top-[48%] h-11 w-11 rounded-xl border-primary/20 bg-white/95 text-primary backdrop-blur hover:bg-primary hover:text-white sm:-left-4" />
          <CarouselNext className="-right-2 top-[48%] h-11 w-11 rounded-xl border-primary/20 bg-white/95 text-primary backdrop-blur hover:bg-primary hover:text-white sm:-right-4" />
        </Carousel>

        <div className="mt-8 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${current === index ? "w-9 bg-primary" : "w-2.5 bg-primary/25"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

