import { Zap, Dna, Microscope } from "lucide-react"

export default function TechnologySection() {
  return (
    <section className="bg-secondary py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-balance">
            {"Advanced Technology & Equipment"}
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
            We utilize the latest medical technology and automated systems to ensure the highest accuracy and fastest turnaround times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Automated Analyzers */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Zap className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Automated Analyzers</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              High-throughput automated systems with exceptional processing capabilities for fast and accurate results.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{"2,170 tests/hour"}</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{"90% error reduction"}</span>
            </div>
          </div>

          {/* Molecular Diagnostics */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Dna className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Molecular Diagnostics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Advanced molecular platforms for precise infectious disease and cancer detection with rapid turnaround.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Infectious Disease Detection</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Cancer Detection</span>
            </div>
          </div>

          {/* Advanced Microscopy */}
          <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/30">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Microscope className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Advanced Microscopy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              High-resolution microscopy with FISH filters for detailed genetic and chromosomal analysis, enhanced by AI-based precision systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Chromosomal Analysis</span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">AI-Enhanced Precision</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-6 mt-14 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">24h</div>
            <div className="text-sm text-muted-foreground mt-1">Turnaround Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}
