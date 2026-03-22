import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { type AnnouncementOffer, getAnnouncement, saveAnnouncement } from "@/lib/admin-announcement"
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
    const body = (await request.json()) as {
      offers?: Array<Partial<AnnouncementOffer>>
    }

    if (!Array.isArray(body.offers)) {
      return NextResponse.json({ error: "Offers payload must be an array." }, { status: 400 })
    }

    const now = new Date().toISOString()
    const offers = body.offers
      .map((rawOffer) => ({
        id: typeof rawOffer.id === "string" && rawOffer.id ? rawOffer.id : randomUUID(),
        message: String(rawOffer.message ?? "").trim().slice(0, 500),
        isActive: Boolean(rawOffer.isActive),
        createdAt:
          typeof rawOffer.createdAt === "string" && rawOffer.createdAt
            ? rawOffer.createdAt
            : now,
        updatedAt: now,
        updatedBy: session.email,
      }))
      .filter((offer) => offer.message.length > 0)

    const announcement = await saveAnnouncement({
      offers,
    })

    return NextResponse.json(announcement)
  } catch {
    return NextResponse.json({ error: "Unable to save announcement." }, { status: 500 })
  }
}
