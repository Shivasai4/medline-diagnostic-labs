import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" })
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://medlinelabs.com").replace(/\/+$/, "")
const siteTitle = "Medline Diagnostic Labs | Leading To Better Health | Hyderabad"
const siteDescription =
  "Medline Diagnostic Labs is a NABL-accredited diagnostic laboratory in Hyderabad. Book blood tests, full body checkups, and home sample collection with fast report turnaround."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Medline Diagnostic Labs",
  keywords: [
    "medline diagnostic",
    "medline diagnostic labs",
    "medline diagnostics",
    "diagnostic lab hyderabad",
    "blood test hyderabad",
    "home sample collection hyderabad",
    "nabl lab hyderabad",
    "full body checkup hyderabad",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Medline Diagnostic Labs",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 820,
        alt: "Medline Diagnostic Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/cover.jpg"],
  },
  category: "healthcare",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
