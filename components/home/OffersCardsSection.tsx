import { Tag } from "lucide-react"
import { getAnnouncement } from "@/lib/admin-announcement"

export default async function OffersCardsSection() {
  const announcement = await getAnnouncement()
  const offers = announcement.offers.filter((offer) => offer.isActive && offer.message.trim())

  if (!offers.length) {
    return null
  }

  return (
    <section className="relative pb-10 pt-2 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary/70">Current Offers</p>
            <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Best Deals This Week</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <article
              key={offer.id}
              className="rounded-2xl border border-primary/15 bg-white/95 p-5 shadow-[0_22px_38px_-30px_rgba(11,42,74,0.8)]"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <Tag className="h-3.5 w-3.5" />
                Offer {index + 1}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/85 sm:text-base">{offer.message}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
