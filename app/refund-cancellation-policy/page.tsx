import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | MedLine Diagnostic Labs",
  description: "Refund and cancellation policy of Medline Diagnostic Labs.",
}

const refundSections = [
  {
    title: "1. Appointment Cancellation",
    body: "Patients may cancel appointments prior to the scheduled time. Cancellation requests should be made through phone, website, or in person.",
  },
  {
    title: "2. Refund Eligibility",
    body: "Refunds may be issued in the following cases:\n\nDuplicate payment\nPayment made but service not availed\nTest cancelled by Medline Diagnostic Labs\nTechnical error during online payment",
  },
  {
    title: "3. Non-Refundable Cases",
    body: "Refunds will not be issued in the following situations:\n\nSample has already been collected\nTest has already been conducted\nDelay caused due to incomplete patient information",
  },
  {
    title: "4. Refund Processing Time",
    body: "Approved refunds will be processed within 5-7 business days to the original payment method used during the transaction.",
  },
  {
    title: "5. Changes to Policy",
    body: "Medline Diagnostic Labs reserves the right to modify this refund policy at any time without prior notice.",
  },
  {
    title: "6. Contact",
    body: "For refund-related queries:\n\nMedline Diagnostic Labs\nHyderabad, India",
  },
]

export default function RefundCancellationPolicyPage() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary sm:text-4xl">Refund & Cancellation Policy</h1>
        <p className="mt-3 text-base text-muted-foreground">Medline Diagnostic Labs - Hyderabad</p>

        <div className="mt-10 space-y-7">
          {refundSections.map((section) => (
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
