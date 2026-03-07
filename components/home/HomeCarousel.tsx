"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
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
    title: "Comprehensive Health Profiles",
    text: "Preventive and diagnostic packages designed for fast, reliable reporting.",
    image: "/placeholder.jpg",
    cta: "/services",
    ctaLabel: "View Packages",
  },
  {
    title: "Advanced Lab Technology",
    text: "Automation-driven processing and stringent controls for dependable results.",
    image: "/placeholder.jpg",
    cta: "/contact",
    ctaLabel: "Book a Test",
  },
  {
    title: "Trusted Clinical Team",
    text: "Experienced professionals focused on clinical accuracy and patient care.",
    image: "/trusted_clinical_team.jpg",
    cta: "/contact",
    ctaLabel: "Talk to Us",
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
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 5000)

    return () => clearInterval(id)
  }, [api])

  return (
    <section className="bg-secondary py-14 lg:py-20 border-y border-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">Inside MedLine</h2>
          <p className="mt-3 text-muted-foreground">
            A distinct MedLine visual section with a cleaner card-first carousel.
          </p>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.title}>
                <div className="overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_20px_45px_-30px_rgba(11,42,74,0.45)]">
                  <div className="relative h-64 sm:h-72">
                  <Image src={slide.image} alt={slide.title} width={1214} height={282} className="object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent" />
                  </div>
                  <div className="p-7 sm:p-9">
                    <div className="h-1.5 w-14 rounded-full bg-primary mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary">{slide.title}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed max-w-3xl">{slide.text}</p>
                    <div className="mt-6">
                      <Link
                        href={slide.cta}
                        className="inline-flex items-center rounded-md border border-primary/25 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                      >
                        {slide.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-3 top-1/2 rounded-md bg-white border-primary/20 text-primary hover:bg-primary hover:text-white" />
          <CarouselNext className="right-3 top-1/2 rounded-md bg-white border-primary/20 text-primary hover:bg-primary hover:text-white" />
        </Carousel>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${current === index ? "w-9 bg-primary" : "w-2.5 bg-primary/35"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}