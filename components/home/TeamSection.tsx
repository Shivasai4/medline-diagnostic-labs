import Link from "next/link"
import { Users, Briefcase, Stethoscope, ShieldCheck, Wrench, Building2, TrendingUp } from "lucide-react"

const teamCategories = [
  {
    icon: Briefcase,
    code: "EM",
    title: "Executive Management",
    subtitle: "Strategic Leadership & Operations",
    experience: "25+ Years Experience",
    tags: ["Strategic Vision", "Operational Excellence", "Healthcare Quality"],
    description: "Led by highly experienced professionals in the field of medical diagnostics with over 25 years of specialized expertise.",
  },
  {
    icon: Users,
    code: "SMC",
    title: "Senior Medical Consultants",
    subtitle: "Clinical Oversight & Diagnostic Excellence",
    experience: "Expert Level",
    tags: ["Clinical Oversight", "Diagnostic Interpretation", "Patient Care"],
    description: "Highly seasoned medical professionals with extensive clinical and laboratory expertise who provide clinical oversight.",
  },
  {
    icon: ShieldCheck,
    code: "QAL",
    title: "Quality Assurance Leadership",
    subtitle: "Quality Management & Compliance",
    experience: "Veteran Level",
    tags: ["Quality Management", "Safety Compliance", "Accreditation"],
    description: "Veterans dedicated to maintaining high standards of quality, safety, and compliance within the laboratory.",
  },
  {
    icon: Wrench,
    code: "TEaS",
    title: "Technical Experts & Supervisors",
    subtitle: "Laboratory Operations & Technical Excellence",
    experience: "20+ Years Experience",
    tags: ["Hematology", "Microbiology", "Histopathology"],
    description: "Technologists and technicians with over 20 years of specialized experience in laboratory procedures across various disciplines.",
  },
  {
    icon: Building2,
    code: "AaOM",
    title: "Administrative & Operations",
    subtitle: "Healthcare Administration & Operations",
    experience: "Seasoned Professionals",
    tags: ["Staffing", "Procurement", "Regulatory Compliance"],
    description: "Seasoned professionals who manage the day-to-day administrative functions including staffing, procurement, and logistics.",
  },
  {
    icon: TrendingUp,
    code: "BDaML",
    title: "Business Development",
    subtitle: "Market Expansion & Strategic Growth",
    experience: "Veteran Level",
    tags: ["Market Analysis", "Strategic Partnerships", "Brand Recognition"],
    description: "Veterans with deep understanding of the healthcare market, responsible for expanding the laboratory's client base.",
  },
]

export default function TeamSection() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            Our Team
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            Our team comprises highly qualified pathologists, medical technologists, and laboratory professionals with over 20 years of collective experience.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Read more <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamCategories.map((cat) => (
            <div
              key={cat.code}
              className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {cat.code}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary leading-tight">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground">{cat.subtitle}</p>
                </div>
              </div>
              <div className="mb-3">
                <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {cat.experience}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
