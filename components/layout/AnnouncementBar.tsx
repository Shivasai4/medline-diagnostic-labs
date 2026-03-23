import { getAnnouncement } from "@/lib/admin-announcement"
import AnnouncementBarClient from "@/components/layout/AnnouncementBarClient"

export default async function AnnouncementBar() {
  const announcement = await getAnnouncement()
  return <AnnouncementBarClient initialOffers={announcement.offers} />
}
