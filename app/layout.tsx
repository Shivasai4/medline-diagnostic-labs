import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { getSiteUrl } from "@/lib/site-url"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" })
const siteUrl = getSiteUrl()
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
    "diagnostic center hyderabad",
    "diagnostic lab nagole",
    "diagnostic center kothapet",
    "blood test hyderabad",
    "home blood sample collection hyderabad",
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
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/favicon-48x48.png"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
