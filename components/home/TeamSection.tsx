import Image from "next/image"

const teamMembers = [
  {
    id: "founder",
    label: "Founder Leadership",
    name: "Dr. Ganji Venu",
    title: "Founder & MD",
    image: "/venu.png",
    imageAlt: "Dr. Ganji Venu, Founder and MD",
    description:
      "MedLine Diagnostic Labs (MDL) serves primarily as a reference laboratory with fully automated equipment to cater to the needs of patients, physicians, laboratories, and hospitals.",
    points: [
      "MDL specializes in high-complexity diagnostics using state-of-the-art automated platforms.",
      "By applying these techniques, MDL provides clinicians from different specialties with reliable, tailored diagnostic information for better diagnosis, evaluation, and treatment planning.",
    ],
  },
  {
    id: "advisor",
    label: "Medical Advisory",
    name: "Dr. Mahender B Dewal",
    title: "Medical Advisor | Ph.D. from MIT, USA",
    image: "/mahender.png",
    imageAlt: "Dr. Mahender B Dewal, Medical Advisor",
    description:
      "Founding Member and Chief Scientific Officer at Expansion Technologies Inc. and MIT affiliate, Cambridge, USA.",
    points: [
      "Provides strategic scientific guidance to strengthen quality-driven diagnostics and innovation at MedLine Labs.",
      "Supports long-term clinical vision, research alignment, and advanced testing excellence at MedLine.",
    ],
  },
]

export default function TeamSection() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">Our Team</h2>
        </div>

        <div className="space-y-8">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="rounded-[20px] border border-primary/15 bg-card/95 p-5 shadow-sm sm:p-6 lg:p-7"
            >
              <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
                <div className="relative mx-auto h-[190px] w-[190px] overflow-hidden rounded-[18px] sm:h-[220px] sm:w-[220px] lg:mx-0">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 640px) 190px, 220px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    {member.label}
                  </p>
                  <h3 className="mt-2 break-words text-2xl font-bold text-primary sm:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-1 break-words text-sm font-medium tracking-wide text-slate-700 sm:text-base">
                    {member.title}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {member.description}
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {member.points.map((point) => (
                      <p
                        key={point}
                        className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
