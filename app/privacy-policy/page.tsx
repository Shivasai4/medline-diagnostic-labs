import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | MedLine Diagnostic Labs",
  description: "Privacy policy of Medline Diagnostic Labs.",
}

const privacySections = [
  {
    title: "1. Information We Collect",
    body: "We may collect the following information:\n\nName\nContact number\nEmail address\nAge and gender\nMedical test details\nPayment information (for online transactions)",
  },
  {
    title: "2. How We Use Your Information",
    body: "The information collected may be used for:\n\nBooking appointments\nProcessing diagnostic tests\nGenerating and delivering test reports\nCommunication regarding appointments or reports\nImproving our services",
  },
  {
    title: "3. Medical Data Protection",
    body: "Patient medical data is treated as confidential. We use appropriate security measures to protect personal and medical information from unauthorized access, disclosure, or misuse.",
  },
  {
    title: "4. Sharing of Information",
    body: "Medline Diagnostic Labs does not sell, rent, or trade patient information. Information may only be shared when:\n\nRequired by law or government authorities\nNecessary for providing diagnostic services\nWith patient consent",
  },
  {
    title: "5. Data Security",
    body: "We implement reasonable technical and administrative safeguards to protect patient data stored in our systems.",
  },
  {
    title: "6. Patient Rights",
    body: "Patients may request access, correction, or deletion of their personal data by contacting us.",
  },
  {
    title: "7. Policy Updates",
    body: "This privacy policy may be updated from time to time. Changes will be reflected on this page.",
  },
  {
    title: "8. Contact",
    body: "For privacy-related concerns, contact:\n\nMedline Diagnostic Labs\nHyderabad, India",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-base text-muted-foreground">Medline Diagnostic Labs - Hyderabad</p>
        <p className="mt-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
          Medline Diagnostic Labs respects and protects the privacy of our patients and website users.
        </p>

        <div className="mt-10 space-y-7">
          {privacySections.map((section) => (
            <article key={section.title}>
              <h2 className="text-lg font-semibold text-primary sm:text-xl">{section.title}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80 sm:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
