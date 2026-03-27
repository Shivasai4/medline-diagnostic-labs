import { notFound } from "next/navigation"
import Link from "next/link"
import { services } from "@/data/services"
import AppointmentForm from "@/components/shared/AppointmentForm"
import { CheckCircle, Clock, ChevronRight } from "lucide-react"
import type { Metadata } from "next"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://medlinelabs.com").replace(/\/+$/, "")

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return { title: "Service Not Found" }
  return {
    title: `${service.name} | MedLine Diagnostic Labs`,
    description: service.overview,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Medline Diagnostic Labs`,
      description: service.overview,
      url: `${siteUrl}/services/${service.slug}`,
      type: "article",
      images: ["/cover.jpg"],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/services" className="hover:text-primary transition-colors">
            Services
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-medium">{service.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Content */}
          <div className="flex-[3] flex flex-col gap-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary text-balance">{service.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                  <Clock className="h-3.5 w-3.5" />
                  {service.turnaround}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{service.overview}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Who Should Take This Test</h2>
              <ul className="flex flex-col gap-2.5">
                {service.whoShouldTake.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Preparation Instructions</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{service.preparation}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Benefits</h2>
              <ul className="flex flex-col gap-2.5">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="flex-[2]">
            <div className="sticky top-28 bg-card border border-border rounded-xl p-6">
              <AppointmentForm preSelectedService={service.slug} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
