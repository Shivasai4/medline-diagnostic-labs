import { getAnnouncement } from "@/lib/admin-announcement"

export default async function AnnouncementBar() {
  const announcement = await getAnnouncement()

  if (!announcement.isActive || !announcement.message.trim()) {
    return null
  }

  return (
    <div className="announcement-marquee bg-primary text-primary-foreground">
      <div className="announcement-marquee-track py-2">
        <p className="announcement-marquee-item text-sm font-semibold">{announcement.message}</p>
      </div>
    </div>
  )
}
