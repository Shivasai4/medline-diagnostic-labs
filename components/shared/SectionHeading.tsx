interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeading({ label, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <span className="text-sm font-medium tracking-widest text-navy-light uppercase">{label}</span>
      <h2 className="text-3xl font-semibold text-primary mt-1 text-balance">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground mt-2 max-w-xl text-pretty leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
