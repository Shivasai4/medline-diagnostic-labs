"use client"

import { useState, type FormEvent } from "react"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"
import { getIndianPhoneError, sanitizeIndianPhoneInput } from "@/lib/phone-validation"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [phoneTouched, setPhoneTouched] = useState(false)

  const validatePhone = (value: string, showRequired: boolean) => {
    if (!showRequired && !value) {
      return null
    }
    return getIndianPhoneError(value)
  }

  const handlePhoneChange = (rawValue: string) => {
    const cleanedValue = sanitizeIndianPhoneInput(rawValue)
    setPhone(cleanedValue)
    setPhoneError(validatePhone(cleanedValue, phoneTouched))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const cleanedPhone = sanitizeIndianPhoneInput(String(formData.get("phone") ?? ""))
    const nextPhoneError = validatePhone(cleanedPhone, true)

    setPhoneTouched(true)
    setPhone(cleanedPhone)
    setPhoneError(nextPhoneError)

    if (nextPhoneError) {
      setError(nextPhoneError)
      return
    }

    const payload = {
      formType: "contact",
      data: {
        fullName: String(formData.get("fullName") ?? "").trim(),
        phone: cleanedPhone,
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
      },
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Failed to send message.")
      }

      setSubmitted(true)
      form.reset()
      setPhone("")
      setPhoneError(null)
      setPhoneTouched(false)
      window.setTimeout(() => setSubmitted(false), 5000)
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Something went wrong."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact Us"
          title="Get In Touch"
          subtitle="Have a question or need to book a test? Reach out to us via the form or contact details below."
        />

        <div className="mt-12 flex flex-col gap-10 lg:flex-row">
          <div className="flex-[3]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
              {submitted && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  Your message has been sent! We will get back to you shortly.
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
              )}

              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(event) => handlePhoneChange(event.target.value)}
                onBlur={() => {
                  setPhoneTouched(true)
                  setPhoneError(validatePhone(phone, true))
                }}
                className={`rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  phoneError ? "border-red-400 focus:ring-red-200" : "border-border"
                }`}
              />
              {phoneError && <p className="text-xs text-red-600">{phoneError}</p>}
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                className="resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="flex-[2]">
            <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+919849860088" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      +91-9849860088
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:medlinelabs2014@gmail.com" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      medlinelabs2014@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/919849860088"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-green-600"
                    >
                      +91-9849860088
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Road No. 13, Snehapuri Colony, RK Puram, Nagole, Hyderabad 500035
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Working Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Sat: 7:00 AM - 8:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8783637763718!2d78.55301307602255!3d17.36958508351457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98cf6970d235%3A0x70ef219a3580de47!2sMedline%20Diagnostic%20Labs!5e0!3m2!1sen!2sus!4v1773256024730!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MedLine Diagnostic Labs Location"
          />
        </div>
      </div>
    </section>
  )
}
