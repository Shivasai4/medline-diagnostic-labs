import Link from "next/link"
import {
  Droplet, Heart, Activity, Pill, Scan, Sun, Zap, FileHeart, Beaker, Shield,
} from "lucide-react"
import type { Service } from "@/data/services"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplet, Heart, Activity, Pill, Scan, Sun, Zap, FileHeart, Beaker, Shield,
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Activity

  return (
    <div className="group bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1 cursor-pointer">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-medium text-primary mb-2">{service.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.shortDescription}</p>
      <div className="flex items-center justify-end">
        <Link
          href={`/book-test?service=${service.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}
