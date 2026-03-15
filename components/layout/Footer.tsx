import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="MedLine Diagnostic Labs"
                width={420}
                height={140}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading To Better Health. NABL-accredited diagnostic laboratory providing accurate, affordable, and timely diagnostic services across Hyderabad.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-primary">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact Us" },
                { href: "/login", label: "Login / Portal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Departments */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-primary">Departments</h3>
            <ul className="flex flex-col gap-3">
              {[
                "Clinical Biochemistry",
                "Hematology",
                "Histopathology",
                "Molecular Biology",
                "Microbiology",
              ].map((dept) => (
                <li key={dept}>
                  <Link
                    href="/services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {dept}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-primary">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Road No. 13, Snehapuri Colony, RK Puram, Nagole, Hyderabad - 500035</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91-98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@medlinelabs.com" className="hover:text-primary transition-colors">
                  info@medlinelabs.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>Mon-Sat: 7:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>(c) 2026 MedLine Diagnostic Labs. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}





