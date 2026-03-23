import { randomUUID } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, isAbsolute, join, resolve } from "node:path"

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

const configuredAnnouncementStorageFile = process.env.ANNOUNCEMENT_STORAGE_FILE?.trim()
const announcementFilePath = configuredAnnouncementStorageFile
  ? isAbsolute(configuredAnnouncementStorageFile)
    ? configuredAnnouncementStorageFile
    : resolve(process.cwd(), configuredAnnouncementStorageFile)
  : join(process.cwd(), "data", "announcement.json")
const fallbackAnnouncementFilePath = join(tmpdir(), "medline-announcement.json")
const announcementKvKey = process.env.ANNOUNCEMENT_KV_KEY ?? "medline:announcement"
const kvRestApiUrl = process.env.KV_REST_API_URL
const kvRestApiToken = process.env.KV_REST_API_TOKEN

const hasKvConfig = Boolean(kvRestApiUrl && kvRestApiToken)

async function runKvCommand(command: string[]) {
  if (!hasKvConfig) {
    return null
  }

  const response = await fetch(kvRestApiUrl as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvRestApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`KV command failed with status ${response.status}`)
  }

  const payload = (await response.json()) as { result?: unknown }
  return payload.result ?? null
}

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

function toAnnouncementData(parsed: Partial<AnnouncementData> & LegacyAnnouncementData): AnnouncementData {
  if (Array.isArray(parsed.offers)) {
    return {
      offers: parsed.offers
        .map((offer) => normalizeOffer(offer))
        .filter((offer): offer is AnnouncementOffer => Boolean(offer)),
    }
  }

  return fromLegacyAnnouncement(parsed)
}

async function readAnnouncementFromFile(filePath: string) {
  try {
    const file = await readFile(filePath, "utf8")
    const parsed = JSON.parse(file) as Partial<AnnouncementData> & LegacyAnnouncementData
    return toAnnouncementData(parsed)
  } catch {
    return null
  }
}

async function writeAnnouncementToFile(filePath: string, nextAnnouncement: AnnouncementData) {
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, `${JSON.stringify(nextAnnouncement, null, 2)}\n`, "utf8")
}

export async function getAnnouncement() {
  if (hasKvConfig) {
    try {
      const rawFromKv = await runKvCommand(["GET", announcementKvKey])
      if (typeof rawFromKv === "string" && rawFromKv.trim()) {
        const parsedFromKv = JSON.parse(rawFromKv) as Partial<AnnouncementData> & LegacyAnnouncementData
        return toAnnouncementData(parsedFromKv)
      }
    } catch (error) {
      console.error("Unable to read announcement from KV. Falling back to file storage.", error)
    }
  }

  const primaryAnnouncement = await readAnnouncementFromFile(announcementFilePath)
  if (primaryAnnouncement) {
    return primaryAnnouncement
  }

  if (fallbackAnnouncementFilePath !== announcementFilePath) {
    const fallbackAnnouncement = await readAnnouncementFromFile(fallbackAnnouncementFilePath)
    if (fallbackAnnouncement) {
      return fallbackAnnouncement
    }
  }

  return DEFAULT_ANNOUNCEMENT
}

export async function saveAnnouncement(nextAnnouncement: AnnouncementData) {
  if (hasKvConfig) {
    await runKvCommand(["SET", announcementKvKey, JSON.stringify(nextAnnouncement)])
    return nextAnnouncement
  }

  try {
    await writeAnnouncementToFile(announcementFilePath, nextAnnouncement)
    return nextAnnouncement
  } catch (error) {
    console.error("Unable to write announcement to primary file storage.", error)

    if (fallbackAnnouncementFilePath === announcementFilePath) {
      throw error
    }

    await writeAnnouncementToFile(fallbackAnnouncementFilePath, nextAnnouncement)
    console.warn(
      "Announcement saved to temporary storage. Configure ANNOUNCEMENT_STORAGE_FILE or KV for persistent cross-restart storage.",
    )
  }

  return nextAnnouncement
}
