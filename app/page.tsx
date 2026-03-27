import HeroSection from "@/components/home/HeroSection"
import HomeCarousel from "@/components/home/HomeCarousel"
import OffersCardsSection from "@/components/home/OffersCardsSection"
import AboutSection from "@/components/home/AboutSection"
import ServicesSection from "@/components/home/ServicesSection"
import DepartmentsSection from "@/components/home/DepartmentsSection"
import TechnologySection from "@/components/home/TechnologySection"
import TeamSection from "@/components/home/TeamSection"
import QualitySection from "@/components/home/QualitySection"
import ConnectSection from "@/components/home/ConnectSection"
import MedicalWaveBackground from "@/components/home/MedicalWaveBackground"
import type { Metadata } from "next"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://medlinelabs.com").replace(/\/+$/, "")

export const metadata: Metadata = {
  title: "Medline Diagnostic Labs | NABL Diagnostic Lab in Hyderabad",
  description:
    "Medline Diagnostic Labs in Hyderabad offers blood tests, full body checkups, and home sample collection with trusted quality and quick report delivery.",
  keywords: [
    "medline diagnostic",
    "medline diagnostic labs",
    "medline diagnostics hyderabad",
    "diagnostic center in hyderabad",
    "nabl diagnostic lab hyderabad",
  ],
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DiagnosticLab",
            "@id": `${siteUrl}/#organization`,
            name: "Medline Diagnostic Labs",
            alternateName: "MedLine Diagnostic Labs",
            description: "NABL-accredited diagnostic laboratory in Hyderabad",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Road No. 13, Snehapuri Colony, RK Puram, Nagole",
              postalCode: "500035",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
            telephone: "+91-9849860088",
            email: "medlinelabs2014@gmail.com",
            url: siteUrl,
            image: [`${siteUrl}/logo.png`, `${siteUrl}/cover.jpg`],
            geo: {
              "@type": "GeoCoordinates",
              latitude: 17.36958508351457,
              longitude: 78.55301307602255,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "07:00",
                closes: "20:00",
              },
            ],
            areaServed: {
              "@type": "City",
              name: "Hyderabad",
            },
          }),
        }}
      />

      <MedicalWaveBackground />

      <div className="home-medical-content">
        <HeroSection />
        <HomeCarousel />
        <OffersCardsSection />
        <AboutSection />
        <ServicesSection />
        <DepartmentsSection />
        <TechnologySection />
        <TeamSection />
        <QualitySection />
        <ConnectSection />
      </div>
    </>
  )
}
