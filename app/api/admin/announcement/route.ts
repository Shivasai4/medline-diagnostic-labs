import { NextResponse } from "next/server"
import { randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
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

    const normalizeMoney = (value: unknown) => {
      const next = Number(value)
      if (!Number.isFinite(next) || next <= 0) {
        return null
      }
      return Math.round(next)
    }

    const normalizeDiscountPercent = (value: unknown) => {
      const next = Number(value)
      if (!Number.isFinite(next) || next <= 0 || next >= 100) {
        return null
      }
      return Math.round(next)
    }

    const now = new Date().toISOString()
    const offers = body.offers
      .map((rawOffer) => {
        const testName = String(rawOffer.testName ?? "").trim().slice(0, 200) || null
        const mrp = normalizeMoney(rawOffer.mrp)
        const discountPercent = normalizeDiscountPercent(rawOffer.discountPercent)
        const offerPrice = normalizeMoney(rawOffer.offerPrice)
        const serviceIdValue = Number(rawOffer.serviceId)
        const serviceId = Number.isFinite(serviceIdValue) && serviceIdValue > 0 ? Math.round(serviceIdValue) : null
        const fallbackMessage =
          testName && discountPercent
            ? `${discountPercent}% off on ${testName}`
            : testName
              ? `Special offer on ${testName}`
              : ""
        const message = (String(rawOffer.message ?? "").trim().slice(0, 500) || fallbackMessage).trim()

        return {
          id: typeof rawOffer.id === "string" && rawOffer.id ? rawOffer.id : randomUUID(),
          message,
          isActive: Boolean(rawOffer.isActive),
          createdAt:
            typeof rawOffer.createdAt === "string" && rawOffer.createdAt
              ? rawOffer.createdAt
              : now,
          updatedAt: now,
          updatedBy: session.email,
          serviceId,
          testName,
          mrp,
          discountPercent,
          offerPrice,
        }
      })
      .filter((offer) => offer.message.length > 0)

    const announcement = await saveAnnouncement({
      offers,
    })

    // Ensure updated offers propagate immediately to the homepage and layout marquee.
    revalidatePath("/")
    revalidatePath("/", "layout")

    return NextResponse.json(announcement)
  } catch (error) {
    console.error("Unable to save announcement.", error)
    return NextResponse.json({ error: "Unable to save announcement." }, { status: 500 })
  }
}
