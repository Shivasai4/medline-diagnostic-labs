import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAnnouncement, saveAnnouncement } from "@/lib/admin-announcement"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin-auth"

export async function GET() {
  const announcement = await getAnnouncement()
  return NextResponse.json(announcement)
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const session = verifyAdminSessionValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as { message?: string; isActive?: boolean }
    const message = String(body?.message ?? "").trim().slice(0, 500)
    const isActive = Boolean(body?.isActive)

    if (isActive && !message) {
      return NextResponse.json({ error: "Announcement message is required when active." }, { status: 400 })
    }

    const announcement = await saveAnnouncement({
      message,
      isActive,
      updatedAt: new Date().toISOString(),
      updatedBy: session.email,
    })

    return NextResponse.json(announcement)
  } catch {
    return NextResponse.json({ error: "Unable to save announcement." }, { status: 500 })
  }
}
