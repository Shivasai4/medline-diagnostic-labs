import { getAnnouncement } from "@/lib/admin-announcement"
import OffersCardsSectionClient from "@/components/home/OffersCardsSectionClient"

export default async function OffersCardsSection() {
  const announcement = await getAnnouncement()
  return <OffersCardsSectionClient initialOffers={announcement.offers} />
}
