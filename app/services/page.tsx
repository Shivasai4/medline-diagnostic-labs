import { services } from "@/data/services"
import SectionHeading from "@/components/shared/SectionHeading"
import ServiceCard from "@/components/shared/ServiceCard"
import type { Metadata } from "next"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: "All Diagnostic Services | MedLine Diagnostic Labs",
  description: "Browse our complete range of diagnostic tests including blood tests, full body checkups, vitamins, organ function tests, and more.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "All Diagnostic Services | Medline Diagnostic Labs",
    description:
      "Browse our complete range of diagnostic tests including blood tests, full body checkups, vitamins, organ function tests, and more.",
    url: `${siteUrl}/services`,
    type: "website",
    images: ["/cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Diagnostic Services | Medline Diagnostic Labs",
    description:
      "Browse our complete range of diagnostic tests including blood tests, full body checkups, vitamins, organ function tests, and more.",
    images: ["/cover.jpg"],
  },
}

export default function ServicesPage() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="All Diagnostic Services"
          subtitle="Browse our comprehensive range of diagnostic tests. Book online or call us for home collection."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
