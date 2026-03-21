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
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-border/60 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-3 sm:h-[80px] lg:h-[88px]">
          <Link href="/" onClick={(event) => handleNavClick(event, "/")} className="shrink-0">
            <Image
              src="/logo.png"
              alt="MedLine Diagnostic Labs"
              width={500}
              height={180}
              className="h-11 w-auto object-contain sm:h-12 lg:h-14 xl:h-16"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center px-1 lg:flex xl:px-5">
            <nav className="flex min-w-0 items-center justify-center gap-0 xl:gap-1.5" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`relative whitespace-nowrap rounded-lg px-2 py-1.5 text-[13px] font-medium transition-colors xl:px-3.5 xl:py-2 xl:text-base ${
                      isActive ? "text-primary" : "text-foreground/75 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link
              href="/login"
              onClick={(event) => handleNavClick(event, "/login")}
              className="inline-flex min-w-[92px] justify-center rounded-lg border border-primary/30 bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-[0_10px_18px_-14px_rgba(37,99,235,0.6)] transition hover:bg-primary/5"
            >
              Login
            </Link>
            <Link
              href="/book-test"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[158px] justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_20px_-14px_rgba(37,99,235,0.95)] transition hover:bg-primary/90 xl:px-8 xl:py-3 xl:text-base"
            >
              Book a Test
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-auto cursor-pointer rounded-lg p-2 text-foreground transition hover:bg-secondary lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 overflow-x-hidden px-4 pb-4 pt-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition sm:text-base ${
                  isLinkActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/login"
                onClick={(event) => handleNavClick(event, "/login")}
                className="block rounded-lg border border-primary/30 bg-white px-4 py-3 text-center text-sm font-semibold text-primary shadow-[0_10px_18px_-14px_rgba(37,99,235,0.6)] transition hover:bg-primary/5"
              >
                Login
              </Link>
              <Link
                href="/book-test"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_20px_-14px_rgba(37,99,235,0.95)] transition hover:bg-primary/90 sm:text-base"
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



