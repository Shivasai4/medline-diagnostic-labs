import Link from "next/link"

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 bg-secondary py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            Our Services
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            We offer a wide range of diagnostic services to support your health and well-being. Our extensive test menu includes:
          </p>
        </div>

        {/* Service overview cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30 sm:p-8">
            <h3 className="text-lg font-bold text-primary mb-3">Specialty & Super-Specialty Tests</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced diagnostics for precise disease detection and management.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30 sm:p-8">
            <h3 className="text-lg font-bold text-primary mb-3">{"Disease & Condition Profiles"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Customized test combinations tailored to identify and monitor specific health issues.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30 sm:p-8">
            <h3 className="text-lg font-bold text-primary mb-3">Wellness Check-ups</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Comprehensive health assessments designed for different age groups, promoting preventive care.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 cursor-pointer shadow-sm"
          >
            Read More About Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}


