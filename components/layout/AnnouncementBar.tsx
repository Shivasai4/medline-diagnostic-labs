import { unstable_noStore as noStore } from "next/cache"
import { getAnnouncement } from "@/lib/admin-announcement"
import AnnouncementBarClient from "@/components/layout/AnnouncementBarClient"

export default async function AnnouncementBar() {
  noStore()
  const announcement = await getAnnouncement()
  return <AnnouncementBarClient initialOffers={announcement.offers} />
}
