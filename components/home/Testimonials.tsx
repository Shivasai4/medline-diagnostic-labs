import { Star } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"

const testimonials = [
  {
    name: "Ravi K.",
    location: "Banjara Hills",
    text: "Excellent service! The home collection was super convenient and the technician was very professional. Got my reports within 6 hours on WhatsApp.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Jubilee Hills",
    text: "Have been getting all my family's tests done at MedLine for years. The prices are very reasonable and the accuracy is top-notch. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ahmed R.",
    location: "Kukatpally",
    text: "The full body checkup was comprehensive and the staff was very courteous. The digital report is well-organized and easy to understand. Great lab!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Patient Reviews"
          title="What Our Patients Say"
          subtitle="Trusted by thousands of patients across Hyderabad."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {`"${t.text}"`}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
