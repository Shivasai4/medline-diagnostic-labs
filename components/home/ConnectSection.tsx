"use client"

import { MapPin, Zap, FileText, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { getIndianPhoneError, sanitizeIndianPhoneInput } from "@/lib/phone-validation"

type ConnectFormType = "partnership"

type FormNotice = {
  tone: "success" | "error"
  message: string
} | null

const initialPartnershipForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  interest: "",
}

export default function ConnectSection() {
  const [formData, setFormData] = useState(initialPartnershipForm)
  const [submittingForm, setSubmittingForm] = useState<ConnectFormType | null>(null)
  const [partnershipNotice, setPartnershipNotice] = useState<FormNotice>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const validatePhone = (value: string, showRequired: boolean) => {
    if (!showRequired && !value) {
      return null
    }
    return getIndianPhoneError(value)
  }

  const handlePhoneChange = (rawValue: string) => {
    const cleanedValue = sanitizeIndianPhoneInput(rawValue)
    setFormData((p) => ({ ...p, phone: cleanedValue }))
    setPhoneError(validatePhone(cleanedValue, false))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formType = form.dataset.formType as ConnectFormType | undefined
    if (!formType) {
      return
    }

    const rawData = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value).trim()]),
    ) as Record<string, string>
    const cleanedPhone = sanitizeIndianPhoneInput(rawData.phone ?? "")
    const nextPhoneError = validatePhone(cleanedPhone, true)

    rawData.phone = cleanedPhone
    setPhoneError(nextPhoneError)

    if (nextPhoneError) {
      setPartnershipNotice({
        tone: "error",
        message: nextPhoneError,
      })
      return
    }

    setSubmittingForm(formType)
    setPartnershipNotice(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType,
          data: rawData,
        }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Unable to submit right now.")
      }

      setPartnershipNotice({
        tone: "success",
        message: "Details sent successfully.",
      })

      form.reset()
      setFormData(initialPartnershipForm)
      setPhoneError(null)
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Something went wrong."
      setPartnershipNotice({
        tone: "error",
        message,
      })
    } finally {
      setSubmittingForm(null)
    }
  }

  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary text-balance sm:text-4xl">Connect With Us</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
            {"Ready to experience precision diagnostics or join our team? Choose how you'd like to connect with MedLine Diagnostic Labs."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary">Location</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Road No. 13, Snehapuri Colony, RK Puram, Nagole, Hyderabad - 500035
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a
                  href="tel:+919849860088"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +91-9849860088
                </a>
                <a
                  href="mailto:medlinelabs2014@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  medlinelabs2014@gmail.com
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary">Why Choose Us</h3>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Fastest Turnaround Times
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  99.9% Diagnostic Accuracy
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {"24/7 Expert Support"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Home Sample Collection
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary">{"Policies & Terms"}</h3>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground transition-colors hover:text-primary">
                    {"Terms & Conditions"}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground transition-colors hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-cancellation-policy"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {"Refund & Cancellation Policy"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-1 text-lg font-bold text-primary">Business Partnership</h3>
            <p className="mb-6 text-sm text-muted-foreground">Connect with us for partnership opportunities</p>
            {partnershipNotice && (
              <div
                className={`mb-4 rounded-lg border p-3 text-sm ${
                  partnershipNotice.tone === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {partnershipNotice.message}
              </div>
            )}
            <form data-form-type="partnership" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  required
                  onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                required
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                required
                inputMode="numeric"
                maxLength={10}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => setPhoneError(validatePhone(formData.phone, true))}
                className={`rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                  phoneError ? "border-red-400 focus:ring-red-200" : "border-input"
                }`}
              />
              {phoneError && <p className="text-xs text-red-600">{phoneError}</p>}
              <input
                name="organization"
                type="text"
                placeholder="Organization"
                value={formData.organization}
                required
                onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                name="interest"
                value={formData.interest}
                onChange={(e) => setFormData((p) => ({ ...p, interest: e.target.value }))}
                className="cursor-pointer rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Partnership Interest</option>
                <option value="referral">Referral Partnership</option>
                <option value="corporate">Corporate Wellness</option>
                <option value="collection-center">Collection Center</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                disabled={submittingForm === "partnership"}
                className="cursor-pointer rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submittingForm === "partnership" ? "Sending..." : "Send Partnership Inquiry"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-1 text-lg font-bold text-primary">Join Our Team</h3>
            <p className="text-sm text-muted-foreground">Explore career opportunities with us</p>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">
              Send your resume to{" "}
              <a
                href="mailto:medlinelabs2014@gmail.com"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                medlinelabs2014@gmail.com
              </a>
              .
            </p>
            <a
              href="mailto:medlinelabs2014@gmail.com?subject=Resume%20Submission%20-%20MedLine%20Diagnostic%20Labs"
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Send Resume by Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
