const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "5,000+", label: "Diagnostic Tests" },
  { value: "50,000+", label: "Happy Patients" },
  { value: "10,000+", label: "Home Collections" },
]

export default function StatsBar() {
  return (
    <section className="bg-secondary py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center ${
                idx < stats.length - 1 ? "md:border-r md:border-primary/15" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
