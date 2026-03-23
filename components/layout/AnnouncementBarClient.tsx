"use client"

import { type AnnouncementOffer, useAnnouncementOffers } from "@/hooks/use-announcement-offers"

type AnnouncementBarClientProps = {
  initialOffers: AnnouncementOffer[]
}

export default function AnnouncementBarClient({ initialOffers }: AnnouncementBarClientProps) {
  const { offers } = useAnnouncementOffers(initialOffers)
  const activeOffers = offers.filter((offer) => offer.isActive && offer.message.trim())

  if (!activeOffers.length) {
    return null
  }

  return (
    <div className="announcement-marquee bg-primary text-primary-foreground">
      <div className="announcement-marquee-track py-2">
        {activeOffers.map((offer) => (
          <p key={offer.id} className="announcement-marquee-item text-sm font-semibold">
            {offer.message}
          </p>
        ))}
      </div>
    </div>
  )
}
