"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Megaphone, UserCog, LogOut, Plus, Trash2 } from "lucide-react"

type Tab = "offers" | "admin"

type AnnouncementResponse = {
  offers: AnnouncementOffer[]
}

type AnnouncementOffer = {
  id: string
  message: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  updatedBy: string | null
}

type OfferPayload = {
  id?: string
  message: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  updatedBy?: string | null
}

const sidebarLinks: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "offers", label: "Offers", icon: Megaphone },
  { key: "admin", label: "Admin", icon: UserCog },
]

const SESSION_TIMEOUT_MS = 30 * 60 * 1000

export default function AdminPage() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<Tab>("offers")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [adminEmail, setAdminEmail] = useState("")

  const [offers, setOffers] = useState<AnnouncementOffer[]>([])
  const [newOfferMessage, setNewOfferMessage] = useState("")
  const [announcementSaving, setAnnouncementSaving] = useState(false)
  const [announcementNotice, setAnnouncementNotice] = useState<string | null>(null)

  const loadAnnouncement = async () => {
    try {
      const response = await fetch("/api/admin/announcement", {
        cache: "no-store",
      })

      if (!response.ok) {
        return
      }

      const data = (await response.json()) as AnnouncementResponse
      setOffers(Array.isArray(data.offers) ? data.offers : [])
    } catch {
      // ignore load errors in UI
    }
  }

  const toOfferPayload = (offer: AnnouncementOffer): OfferPayload => ({
    id: offer.id,
    message: offer.message,
    isActive: offer.isActive,
    createdAt: offer.createdAt,
    updatedAt: offer.updatedAt,
    updatedBy: offer.updatedBy,
  })

  const saveOffers = async (nextOffers: OfferPayload[], successNotice: string) => {
    setAnnouncementSaving(true)
    setAnnouncementNotice(null)

    try {
      const response = await fetch("/api/admin/announcement", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offers: nextOffers,
        }),
      })

      if (response.status === 401) {
        router.replace("/login")
        return false
      }

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Unable to save offers.")
      }

      const data = (await response.json()) as AnnouncementResponse
      setOffers(Array.isArray(data.offers) ? data.offers : [])
      setAnnouncementNotice(successNotice)
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save offers."
      setAnnouncementNotice(message)
      return false
    } finally {
      setAnnouncementSaving(false)
    }
  }

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch("/api/admin/session", {
          cache: "no-store",
        })

        if (!response.ok) {
          router.replace("/login")
          return
        }

        const data = (await response.json()) as { authenticated: boolean; adminEmail?: string }
        if (!data.authenticated) {
          router.replace("/login")
          return
        }

        setAdminEmail(data.adminEmail ?? "admin")
        await loadAnnouncement()
      } finally {
        setIsCheckingAuth(false)
      }
    }

    void verifySession()
  }, [router])

  useEffect(() => {
    if (isCheckingAuth) {
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const activityEvents: (keyof WindowEventMap)[] = ["mousemove", "keydown", "click", "scroll", "touchstart"]

    const forceLogout = async () => {
      await fetch("/api/admin/logout", { method: "POST" })
      router.replace("/login")
    }

    const resetInactivityTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        void forceLogout()
      }, SESSION_TIMEOUT_MS)
    }

    const validateSession = async () => {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" })
        if (!response.ok) {
          void forceLogout()
        }
      } catch {
        // ignore intermittent network errors
      }
    }

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer)
    })

    resetInactivityTimer()
    const intervalId = setInterval(() => {
      void validateSession()
    }, 60_000)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      clearInterval(intervalId)
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer)
      })
    }
  }, [isCheckingAuth, router])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/login")
  }

  const handleAddOffer = async () => {
    const message = newOfferMessage.trim()
    if (!message) {
      setAnnouncementNotice("Offer message is required.")
      return
    }

    const didSave = await saveOffers(
      [...offers.map(toOfferPayload), { message, isActive: true }],
      "Offer added successfully.",
    )

    if (didSave) {
      setNewOfferMessage("")
    }
  }

  const handleDeleteOffer = async (offerId: string) => {
    const shouldDelete = window.confirm("Delete this offer?")
    if (!shouldDelete) {
      return
    }

    await saveOffers(
      offers.filter((offer) => offer.id !== offerId).map(toOfferPayload),
      "Offer deleted successfully.",
    )
  }

  const handleToggleOffer = async (offerId: string, nextActive: boolean) => {
    await saveOffers(
      offers.map((offer) => {
        if (offer.id !== offerId) {
          return toOfferPayload(offer)
        }

        return {
          ...toOfferPayload(offer),
          isActive: nextActive,
        }
      }),
      nextActive ? "Offer enabled successfully." : "Offer hidden successfully.",
    )
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 text-sm text-muted-foreground">
        Verifying admin session...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col bg-primary text-primary-foreground lg:flex">
        <div className="border-b border-primary-foreground/15 p-6">
          <h2 className="text-lg font-semibold text-primary-foreground">Admin Panel</h2>
          <p className="mt-1 text-xs text-primary-foreground/75">{adminEmail}</p>
        </div>

        <nav className="flex-1 py-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActiveTab(link.key)}
              className={`flex w-full cursor-pointer items-center gap-3 border-l-4 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === link.key
                  ? "border-accent bg-primary-foreground/10 text-primary-foreground"
                  : "border-transparent text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-primary-foreground/15 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-foreground/10 px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/15"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-primary-foreground/20 bg-primary px-2 py-2 lg:hidden">
        {sidebarLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => setActiveTab(link.key)}
            className={`flex cursor-pointer flex-col items-center gap-1 px-3 py-1.5 text-xs ${
              activeTab === link.key ? "text-primary-foreground" : "text-primary-foreground/55"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-secondary p-6 pb-24 lg:p-8 lg:pb-8">
        <div className="mb-4 flex items-center justify-end lg:hidden">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>

        {activeTab === "offers" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Offers & Announcements</h1>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                Add as many offers as you want. Active offers show on the website in the top marquee and home offers cards.
              </p>

              <label className="mb-2 block text-sm font-medium text-foreground">New Offer</label>
              <textarea
                value={newOfferMessage}
                onChange={(e) => setNewOfferMessage(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Example: 20% off on Full Body Checkup this weekend."
                className="w-full resize-none rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">{newOfferMessage.length}/500</p>
                <button
                  onClick={handleAddOffer}
                  disabled={announcementSaving || !newOfferMessage.trim()}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  {announcementSaving ? "Saving..." : "Add Offer"}
                </button>
              </div>

              {announcementNotice && (
                <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
                  {announcementNotice}
                </p>
              )}

              <div className="mt-6 space-y-3">
                {offers.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                    No offers added yet.
                  </p>
                )}

                {offers.map((offer, index) => (
                  <article key={offer.id} className="rounded-xl border border-border bg-white/90 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.11em] text-primary/70">
                          Offer {index + 1}
                        </p>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{offer.message}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        disabled={announcementSaving}
                        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                      <label className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                        <input
                          type="checkbox"
                          checked={offer.isActive}
                          onChange={(e) => {
                            void handleToggleOffer(offer.id, e.target.checked)
                          }}
                          disabled={announcementSaving}
                          className="h-4 w-4"
                        />
                        Show this offer on website
                      </label>

                      <p className="text-xs text-muted-foreground">
                        Updated {offer.updatedAt ? new Date(offer.updatedAt).toLocaleString() : "-"}
                        {offer.updatedBy ? ` by ${offer.updatedBy}` : ""}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "admin" && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">Admin</h1>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="mt-1 text-base font-semibold text-foreground">{adminEmail}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Session auto-logout is enabled after 30 minutes.
              </p>

              <button
                onClick={handleLogout}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
