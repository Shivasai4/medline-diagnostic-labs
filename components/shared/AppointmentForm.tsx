"use client"

import { useState, type FormEvent } from "react"
import { services } from "@/data/services"

export default function AppointmentForm({ preSelectedService }: { preSelectedService?: string }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const form = e.target as HTMLFormElement
    form.reset()
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
        className="rounded-lg border border-border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
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
            {s.name} — {s.price}
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
