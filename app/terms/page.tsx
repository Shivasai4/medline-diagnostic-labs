import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | MedLine Diagnostic Labs",
  description: "Terms and conditions for MedLine Diagnostic Labs services and website usage.",
}

const termsSections = [
  {
    title: "1. Services",
    body: "Medline Diagnostic Labs provides diagnostic services including but not limited to laboratory tests, health checkups, and related healthcare services. All services are subject to availability and operational requirements.",
  },
  {
    title: "2. Appointment & Test Booking",
    body: "Patients may book appointments through our website, phone, or in person. While booking, patients must provide accurate personal and medical information. Medline Diagnostic Labs reserves the right to reschedule or cancel appointments due to operational needs or unforeseen circumstances.",
  },
  {
    title: "3. Test Reports",
    body: "Diagnostic test results are generated based on laboratory analysis and standard medical procedures. The reports provided are for informational purposes and should always be interpreted by a qualified medical practitioner. Medline Diagnostic Labs is not responsible for medical decisions made without consulting a doctor.",
  },
  {
    title: "4. Payment",
    body: "Payments for diagnostic services may be made online or offline. All charges for services must be cleared before reports are released unless otherwise agreed.",
  },
  {
    title: "5. Accuracy of Information",
    body: "While we strive to maintain high accuracy and quality in our diagnostic services, Medline Diagnostic Labs does not guarantee that the website content or reports will always be free from errors or delays.",
  },
  {
    title: "6. Website Usage",
    body: "Users agree not to misuse this website, attempt unauthorized access, or interfere with the functioning of the website or services.",
  },
  {
    title: "7. Limitation of Liability",
    body: "Medline Diagnostic Labs shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or reliance on diagnostic reports.",
  },
  {
    title: "8. Changes to Terms",
    body: "We reserve the right to modify these Terms & Conditions at any time without prior notice. Updated versions will be posted on this website.",
  },
  {
    title: "9. Contact Information",
    body: "If you have any questions regarding these Terms & Conditions, please contact:\n\nMedline Diagnostic Labs\nHyderabad, India",
  },
]

export default function TermsPage() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Terms & Conditions</h1>
        <p className="mt-3 text-base text-muted-foreground">Medline Diagnostic Labs - Hyderabad</p>
        <p className="mt-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
          Welcome to Medline Diagnostic Labs. By accessing our website or using our diagnostic services, you agree to
          the following Terms & Conditions.
        </p>

        <div className="mt-10 space-y-7">
          {termsSections.map((section) => (
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
