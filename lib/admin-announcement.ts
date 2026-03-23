import { randomUUID } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type AnnouncementOffer = {
  id: string
  message: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  updatedBy: string | null
  serviceId: number | null
  testName: string | null
  mrp: number | null
  discountPercent: number | null
  offerPrice: number | null
}

export type AnnouncementData = {
  offers: AnnouncementOffer[]
}

type LegacyAnnouncementData = {
  message?: string
  isActive?: boolean
  updatedAt?: string | null
  updatedBy?: string | null
}

const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  offers: [],
}

const announcementFilePath = join(process.cwd(), "data", "announcement.json")

function normalizeOffer(rawOffer: Partial<AnnouncementOffer>): AnnouncementOffer | null {
  const testName = String(rawOffer.testName ?? "").trim().slice(0, 200) || null

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

  const mrp = normalizeMoney(rawOffer.mrp)
  const offerPrice = normalizeMoney(rawOffer.offerPrice)
  const discountPercent = normalizeDiscountPercent(rawOffer.discountPercent)
  const serviceIdValue = Number(rawOffer.serviceId)
  const serviceId = Number.isFinite(serviceIdValue) && serviceIdValue > 0 ? Math.round(serviceIdValue) : null

  const fallbackMessage =
    testName && discountPercent
      ? `${discountPercent}% off on ${testName}`
      : testName
        ? `Special offer on ${testName}`
        : ""

  const message = (String(rawOffer.message ?? "").trim().slice(0, 500) || fallbackMessage).trim()

  if (!message) {
    return null
  }

  const createdAt = typeof rawOffer.createdAt === "string" && rawOffer.createdAt
    ? rawOffer.createdAt
    : new Date().toISOString()

  const updatedAt = typeof rawOffer.updatedAt === "string" && rawOffer.updatedAt
    ? rawOffer.updatedAt
    : createdAt

  return {
    id: typeof rawOffer.id === "string" && rawOffer.id ? rawOffer.id : randomUUID(),
    message,
    isActive: Boolean(rawOffer.isActive),
    createdAt,
    updatedAt,
    updatedBy: rawOffer.updatedBy ?? null,
    serviceId,
    testName,
    mrp,
    discountPercent,
    offerPrice,
  }
}

function fromLegacyAnnouncement(rawAnnouncement: LegacyAnnouncementData): AnnouncementData {
  const legacyMessage = String(rawAnnouncement.message ?? "").trim().slice(0, 500)
  if (!legacyMessage) {
    return DEFAULT_ANNOUNCEMENT
  }

  const fallbackUpdatedAt = rawAnnouncement.updatedAt ?? new Date().toISOString()

  return {
    offers: [
      {
        id: randomUUID(),
        message: legacyMessage,
        isActive: Boolean(rawAnnouncement.isActive),
        createdAt: fallbackUpdatedAt,
        updatedAt: fallbackUpdatedAt,
        updatedBy: rawAnnouncement.updatedBy ?? null,
        serviceId: null,
        testName: null,
        mrp: null,
        discountPercent: null,
        offerPrice: null,
      },
    ],
  }
}

export async function getAnnouncement() {
  try {
    const file = await readFile(announcementFilePath, "utf8")
    const parsed = JSON.parse(file) as Partial<AnnouncementData> & LegacyAnnouncementData

    if (Array.isArray(parsed.offers)) {
      return {
        offers: parsed.offers
          .map((offer) => normalizeOffer(offer))
          .filter((offer): offer is AnnouncementOffer => Boolean(offer)),
      }
    }

    return fromLegacyAnnouncement(parsed)
  } catch {
    return DEFAULT_ANNOUNCEMENT
  }
}

export async function saveAnnouncement(nextAnnouncement: AnnouncementData) {
  await mkdir(join(process.cwd(), "data"), { recursive: true })
  await writeFile(announcementFilePath, `${JSON.stringify(nextAnnouncement, null, 2)}\n`, "utf8")

  return nextAnnouncement
}
