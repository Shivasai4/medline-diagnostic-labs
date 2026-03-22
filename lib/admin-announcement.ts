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
  const message = String(rawOffer.message ?? "").trim().slice(0, 500)

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
