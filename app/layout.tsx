import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "MedLine Diagnostic Labs | Leading To Better Health | Hyderabad",
  description:
    "NABL-accredited diagnostic lab in Hyderabad. Book blood tests, full body checkups, home sample collection. Fast reports in 24 hours.",
  keywords:
    "diagnostic lab hyderabad, blood test hyderabad, home sample collection, nabl lab hyderabad, full body checkup hyderabad",
  openGraph: {
    title: "MedLine Diagnostic Labs",
    description: "Leading To Better Health - Hyderabad's trusted diagnostic partner.",
    type: "website",
  },
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
