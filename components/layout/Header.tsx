"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState, type MouseEvent } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/#departments", label: "Departments" },
  { href: "/contact", label: "Contact Us" },
  { href: "/login", label: "Login" },
]

const STICKY_HEADER_OFFSET = 110

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === "/"

  const isLinkActive = (href: string) => {
    return (isHome && href === "/") || pathname === href
  }

  const scrollToHashTarget = (hash: string) => {
    const id = hash.replace("#", "")
    const target = document.getElementById(id)
    if (!target) {
      return false
    }

    const top = target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" })
    return true
  }

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false)

    if (href.startsWith("/#")) {
      event.preventDefault()
      const hash = href.slice(1)

      if (isHome) {
        scrollToHashTarget(hash)
        return
      }

      router.push(href)
      return
    }

    if (href === pathname) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    const hash = window.location.hash
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    const timeoutId = window.setTimeout(() => {
      if (!scrollToHashTarget(hash)) {
        window.scrollTo({ top: 0, behavior: "auto" })
      }
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-3 sm:h-24">
          <Link href="/" onClick={(event) => handleNavClick(event, "/")} className="shrink-0">
            <Image
              src="/logo.png"
              alt="MedLine Diagnostic Labs"
              width={500}
              height={180}
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
              priority
            />
          </Link>

          <div className="hidden flex-1 items-center justify-center xl:flex">
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors xl:px-4 xl:text-base ${
                    isLinkActive(link.href)
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isLinkActive(link.href) && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center xl:flex">
            <Link
              href="/contact"
              onClick={(event) => handleNavClick(event, "/contact")}
              className="rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-[0_10px_18px_-12px_rgba(37,99,235,0.9)] transition hover:bg-primary/90"
            >
              Book a Test
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-auto cursor-pointer rounded-lg p-2 text-foreground transition hover:bg-secondary xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="bg-white xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-4 pt-3 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition sm:text-base ${
                  isLinkActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3">
              <Link
                href="/contact"
                onClick={(event) => handleNavClick(event, "/contact")}
                className="block rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-white sm:text-base"
              >
                Book a Test
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}



