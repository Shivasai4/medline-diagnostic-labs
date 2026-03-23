import { unstable_noStore as noStore } from "next/cache"
import { getAnnouncement } from "@/lib/admin-announcement"
import OffersCardsSectionClient from "@/components/home/OffersCardsSectionClient"

export default async function OffersCardsSection() {
  noStore()
  const announcement = await getAnnouncement()
  return <OffersCardsSectionClient initialOffers={announcement.offers} />
}
