import { getAnnouncement } from "@/lib/admin-announcement"

export default async function AnnouncementBar() {
  const announcement = await getAnnouncement()

  if (!announcement.isActive || !announcement.message.trim()) {
    return null
  }

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-sm font-medium sm:px-6 lg:px-8">
        {announcement.message}
      </div>
    </div>
  )
}
