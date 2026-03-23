"use client"

import { Tag } from "lucide-react"
import { formatBookingServicePrice } from "@/lib/booking"
import { type AnnouncementOffer, useAnnouncementOffers } from "@/hooks/use-announcement-offers"

type OffersCardsSectionClientProps = {
  initialOffers: AnnouncementOffer[]
}

export default function OffersCardsSectionClient({ initialOffers }: OffersCardsSectionClientProps) {
  const { offers } = useAnnouncementOffers(initialOffers)
  const activeOffers = offers.filter((offer) => offer.isActive && offer.message.trim())

  if (!activeOffers.length) {
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
          {activeOffers.map((offer, index) => {
            const hasStructuredPricing =
              Boolean(offer.testName) &&
              Boolean(offer.mrp) &&
              Boolean(offer.offerPrice) &&
              Boolean(offer.discountPercent)

            return (
              <article
                key={offer.id}
                className="rounded-2xl border border-primary/15 bg-white/95 p-5 shadow-[0_22px_38px_-30px_rgba(11,42,74,0.8)]"
              >
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  <Tag className="h-3.5 w-3.5" />
                  Offer {index + 1}
                </p>

                {hasStructuredPricing ? (
                  <>
                    <p className="mt-3 text-base font-semibold text-foreground sm:text-lg">{offer.testName}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-muted-foreground line-through">
                        {formatBookingServicePrice(Number(offer.mrp))}
                      </span>
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {offer.discountPercent}% OFF
                      </span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-primary sm:text-xl">
                      {formatBookingServicePrice(Number(offer.offerPrice))}
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/85 sm:text-base">{offer.message}</p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
