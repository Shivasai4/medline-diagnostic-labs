import HeroSection from "@/components/home/HeroSection"
import HomeCarousel from "@/components/home/HomeCarousel"
import AboutSection from "@/components/home/AboutSection"
import ServicesSection from "@/components/home/ServicesSection"
import DepartmentsSection from "@/components/home/DepartmentsSection"
import TechnologySection from "@/components/home/TechnologySection"
import TeamSection from "@/components/home/TeamSection"
import QualitySection from "@/components/home/QualitySection"
import ConnectSection from "@/components/home/ConnectSection"
import MedicalWaveBackground from "@/components/home/MedicalWaveBackground"

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "DiagnosticLab", "LocalBusiness"],
            name: "MedLine Diagnostic Labs",
            description: "NABL-accredited diagnostic laboratory in Hyderabad",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
            telephone: "+91-9876543210",
            url: "https://medlinelabs.com",
          }),
        }}
      />

      <MedicalWaveBackground />

      <div className="home-medical-content">
        <HeroSection />
        <HomeCarousel />
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
