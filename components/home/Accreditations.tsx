import { Award, ShieldCheck, BadgeCheck, Medal, Star } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

const badges = [
  { icon: Award, title: "NABL Accredited", subtitle: "National Standard" },
  { icon: ShieldCheck, title: "CLIA Certified", subtitle: "US Quality Standard" },
  { icon: BadgeCheck, title: "ISO 9001:2015", subtitle: "Quality Management" },
  { icon: Medal, title: "CAP Accredited", subtitle: "Pathology Excellence" },
  { icon: Star, title: "20+ Years Trusted", subtitle: "Since 2004" },
]

export default function Accreditations() {
  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Trust & Quality"
          title="Certifications & Accreditations"
          subtitle="Our laboratory meets the highest national and international standards."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="bg-card border border-primary/20 rounded-xl p-5 text-center flex flex-col items-center gap-3 transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <badge.icon className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-primary">{badge.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
