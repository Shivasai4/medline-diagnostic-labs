import { Award } from "lucide-react"

export default function QualitySection() {
  return (
    <section className="bg-secondary py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Award className="h-9 w-9 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            Quality Excellence
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed text-pretty">
            At MedLine Diagnostic Labs, quality is our unwavering commitment and core pillar of excellence. We adhere strictly to national and international standards, including NABL, CAP, and ISO 15189, to ensure every diagnostic test and report is precise, reliable, and trustworthy.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            Our comprehensive quality management system encompasses rigorous calibration of equipment, strict compliance with standardized protocols, and continuous staff training. Through regular internal audits and quality control procedures, we ensure the highest levels of accuracy, consistency, and confidentiality in all our services.
          </p>
        </div>
      </div>
    </section>
  )
}
