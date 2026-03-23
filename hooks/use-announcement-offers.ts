"use client"

import { useCallback, useEffect, useState } from "react"

export const ANNOUNCEMENT_STORAGE_EVENT_KEY = "medline:announcement-updated-at"
const ANNOUNCEMENT_POLL_INTERVAL_MS = 30_000

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

type AnnouncementResponse = {
  offers: AnnouncementOffer[]
}

export function useAnnouncementOffers(initialOffers: AnnouncementOffer[]) {
  const [offers, setOffers] = useState<AnnouncementOffer[]>(initialOffers)

  const refreshOffers = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/announcement", { cache: "no-store" })
      if (!response.ok) {
        return
      }

      const data = (await response.json()) as AnnouncementResponse
      if (!Array.isArray(data.offers)) {
        return
      }

      setOffers(data.offers)
    } catch {
      // ignore transient fetch errors; next poll/focus/storage event retries
    }
  }, [])

  useEffect(() => {
    const initialRefreshTimerId = window.setTimeout(() => {
      void refreshOffers()
    }, 0)

    const intervalId = window.setInterval(() => {
      void refreshOffers()
    }, ANNOUNCEMENT_POLL_INTERVAL_MS)

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        void refreshOffers()
      }
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ANNOUNCEMENT_STORAGE_EVENT_KEY) {
        void refreshOffers()
      }
    }

    const handleWindowFocus = () => {
      void refreshOffers()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("storage", handleStorage)
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.clearTimeout(initialRefreshTimerId)
      window.clearInterval(intervalId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [refreshOffers])

  return {
    offers,
    refreshOffers,
  }
}
