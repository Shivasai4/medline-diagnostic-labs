"use client"

import { useState, type FormEvent } from "react"
import { services } from "@/data/services"
import { getIndianPhoneError, sanitizeIndianPhoneInput } from "@/lib/phone-validation"

export default function AppointmentForm({ preSelectedService }: { preSelectedService?: string }) {
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const nextPhoneError = validatePhone(phone, true)

    setPhoneTouched(true)
    setPhoneError(nextPhoneError)

    if (nextPhoneError) {
      return
    }

    setSubmitted(true)
    form.reset()
    setPhone("")
    setPhoneError(null)
    setPhoneTouched(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-primary">Book an Appointment</h3>

      {submitted && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          Appointment request submitted! We will contact you shortly.
        </div>
      )}

      <input
        type="text"
        placeholder="Full Name"
        required
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        required
        inputMode="numeric"
        maxLength={10}
        value={phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        onBlur={() => {
          setPhoneTouched(true)
          setPhoneError(validatePhone(phone, true))
        }}
        className={`rounded-lg border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
          phoneError ? "border-red-400 focus:ring-red-200" : "border-border focus:ring-ring"
        }`}
      />
      {phoneError && <p className="text-xs text-red-600">{phoneError}</p>}
      <input
        type="email"
        placeholder="Email (optional)"
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        defaultValue={preSelectedService || ""}
        required
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="" disabled>
          Select Test Type
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        required
        min={new Date().toISOString().split("T")[0]}
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <select
        required
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="" disabled>
          Preferred Time Slot
        </option>
        <option value="7-9">7:00 AM - 9:00 AM</option>
        <option value="9-11">9:00 AM - 11:00 AM</option>
        <option value="11-1">11:00 AM - 1:00 PM</option>
        <option value="2-5">2:00 PM - 5:00 PM</option>
      </select>
      <textarea
        placeholder="Address for Home Collection"
        rows={3}
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 cursor-pointer"
      >
        Submit Appointment
      </button>
    </form>
  )
}

