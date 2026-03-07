import { Award, Clock, Home, ShieldCheck, IndianRupee, BadgeCheck } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

const features = [
  {
    icon: Award,
    title: "NABL Accredited Lab",
    description: "Certified by the National Accreditation Board for Testing and Calibration Laboratories.",
  },
  {
    icon: Clock,
    title: "20+ Years Experience",
    description: "Two decades of trusted diagnostic services across Hyderabad.",
  },
  {
    icon: BadgeCheck,
    title: "Same Day Reports",
    description: "Get your test results within hours for most routine tests.",
  },
  {
    icon: Home,
    title: "Home Collection Available",
    description: "Certified technicians visit your home for painless sample collection.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Quality diagnostics at competitive prices accessible to everyone.",
  },
  {
    icon: ShieldCheck,
    title: "ISO Certified Quality",
    description: "Adherence to international quality standards for accurate results.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why MedLine"
          title="What Sets Us Apart"
          subtitle="We combine advanced technology with experienced professionals to deliver reliable diagnostic results."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center gap-3">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-primary">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
