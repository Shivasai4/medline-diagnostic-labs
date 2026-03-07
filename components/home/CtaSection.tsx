import Link from "next/link"
import { Phone } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-primary text-balance">
          Book Your Diagnostic Test Today
        </h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
          Home collection available across Hyderabad. Reports within 24 hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link
            href="/contact"
            className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-primary/90 cursor-pointer"
          >
            Book Appointment
          </Link>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 rounded-lg border border-primary/30 px-6 py-3 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/5 cursor-pointer"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </div>
    </section>
  )
}
