import { CalendarCheck, UserCheck, TestTube, FileText } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

const steps = [
  {
    number: 1,
    icon: CalendarCheck,
    title: "Book Online",
    description: "Fill the form or call us to schedule your home visit.",
  },
  {
    number: 2,
    icon: UserCheck,
    title: "We Come to You",
    description: "A certified technician visits your home at the chosen time.",
  },
  {
    number: 3,
    icon: TestTube,
    title: "Sample Collected",
    description: "Hygienic, painless sample collection at your doorstep.",
  },
  {
    number: 4,
    icon: FileText,
    title: "Reports Delivered",
    description: "Digital reports sent via WhatsApp or email within hours.",
  },
]

export default function HomeCollectionSteps() {
  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Home Sample Collection in 4 Easy Steps"
          subtitle="Experience hassle-free diagnostic testing from the comfort of your home."
        />
        <div className="relative mt-12">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-primary/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center flex flex-col items-center gap-4">
                <div className="relative z-10 h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <step.icon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-medium text-primary">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
