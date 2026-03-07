import Link from "next/link"
import { CheckCircle, Target, Eye } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            About MedLine Diagnostic Labs
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            Your trusted partner in accurate and reliable diagnostics with advanced technology and strict quality standards.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Read more
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Three cards - MiPath style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advanced Technology */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Advanced Technology</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Welcome to our advanced diagnostic laboratory, where cutting-edge technology meets precision medicine. We use state-of-the-art automated analyzers, molecular diagnostic platforms, and AI-assisted systems for the highest accuracy.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Read more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Mission */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Target className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Deliver high-quality diagnostic services using cutting-edge technology, ensuring accuracy, reliability, and timely results. We strive to make healthcare accessible and affordable for every family in Hyderabad and beyond.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Read more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Vision */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Eye className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Vision</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {"To be the most trusted diagnostic lab in Hyderabad, recognized for excellence in diagnostic accuracy, innovative technology, and continuous improvement with robust quality systems and compassionate patient care."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Read more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
