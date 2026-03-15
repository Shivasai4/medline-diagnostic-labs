import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type AnnouncementData = {
  message: string
  isActive: boolean
  updatedAt: string | null
  updatedBy: string | null
}

const DEFAULT_ANNOUNCEMENT: AnnouncementData = {
  message: "",
  isActive: false,
  updatedAt: null,
  updatedBy: null,
}

const announcementFilePath = join(process.cwd(), "data", "announcement.json")

export async function getAnnouncement() {
  try {
    const file = await readFile(announcementFilePath, "utf8")
    const parsed = JSON.parse(file) as Partial<AnnouncementData>

    return {
      ...DEFAULT_ANNOUNCEMENT,
      ...parsed,
    }
  } catch {
    return DEFAULT_ANNOUNCEMENT
  }
}

export async function saveAnnouncement(nextAnnouncement: AnnouncementData) {
  await mkdir(join(process.cwd(), "data"), { recursive: true })
  await writeFile(announcementFilePath, `${JSON.stringify(nextAnnouncement, null, 2)}\n`, "utf8")

  return nextAnnouncement
}
