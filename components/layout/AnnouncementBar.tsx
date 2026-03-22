import { getAnnouncement } from "@/lib/admin-announcement"

export default async function AnnouncementBar() {
  const announcement = await getAnnouncement()
  const activeOffers = announcement.offers.filter((offer) => offer.isActive && offer.message.trim())

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
