import type { Metadata } from "next"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: "Contact Medline Diagnostic Labs | Hyderabad",
  description:
    "Contact Medline Diagnostic Labs for test bookings, home sample collection, reports, and support in Hyderabad, including Nagole and nearby areas.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Medline Diagnostic Labs | Hyderabad",
    description:
      "Contact Medline Diagnostic Labs for test bookings, home sample collection, reports, and support in Hyderabad, including Nagole and nearby areas.",
    url: `${siteUrl}/contact`,
    type: "website",
    images: ["/cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Medline Diagnostic Labs | Hyderabad",
    description:
      "Contact Medline Diagnostic Labs for test bookings, home sample collection, reports, and support in Hyderabad, including Nagole and nearby areas.",
    images: ["/cover.jpg"],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
