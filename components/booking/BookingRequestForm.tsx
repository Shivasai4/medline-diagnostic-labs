"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import SectionHeading from "@/components/shared/SectionHeading"
import { useSearchParams } from "next/navigation"
import { ChevronsUpDown } from "lucide-react"
import {
  BOOKING_SERVICE_OPTIONS,
  BOOKING_TIME_SLOTS,
  COLLECTION_TYPES,
  INITIAL_BOOKING_FORM_DATA,
  formatBookingServiceLabel,
  formatBookingServicePrice,
  getBookingServiceFromSlug,
  getBookingServicePrice,
  sanitizeBookingFormData,
  validateBookingFormData,
  type BookingFormData,
  type BookingFormField,
} from "@/lib/booking"
import { sanitizeIndianPhoneInput } from "@/lib/phone-validation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

export default function BookingRequestForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_BOOKING_FORM_DATA)
  const [touched, setTouched] = useState<Partial<Record<BookingFormField, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [queryPrefillApplied, setQueryPrefillApplied] = useState(false)
  const [serviceSearch, setServiceSearch] = useState("")
  const [servicePopoverOpen, setServicePopoverOpen] = useState(false)

  const cleanedData = useMemo(() => sanitizeBookingFormData(formData), [formData])
  const validationErrors = useMemo(() => validateBookingFormData(cleanedData), [cleanedData])
  const selectedServicePrice = useMemo(() => getBookingServicePrice(formData.service), [formData.service])
  const selectedServiceOption = useMemo(
    () => BOOKING_SERVICE_OPTIONS.find((service) => service.name === formData.service),
    [formData.service],
  )
  const selectedServiceLabel = selectedServiceOption ? formatBookingServiceLabel(selectedServiceOption) : "Select and search a test"
  const filteredServiceOptions = useMemo(() => {
    const searchTerm = serviceSearch.trim().toLowerCase()

    if (!searchTerm) {
      return BOOKING_SERVICE_OPTIONS
    }

    return BOOKING_SERVICE_OPTIONS.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm) ||
        String(service.id).includes(searchTerm) ||
        String(service.price).includes(searchTerm),
    )
  }, [serviceSearch])

  const getError = (field: BookingFormField) => {
    if (!submitAttempted && !touched[field]) {
      return null
    }
    return validationErrors[field] ?? null
  }

  const markTouched = (field: BookingFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const updateField = (field: BookingFormField, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      if (field === "collectionType" && value !== "Home Collection") {
        next.address = ""
      }
      return next
    })
  }

  useEffect(() => {
    if (queryPrefillApplied) {
      return
    }

    const serviceSlug = searchParams.get("service")
    if (!serviceSlug) {
      setQueryPrefillApplied(true)
      return
    }

    const mappedService = getBookingServiceFromSlug(serviceSlug)
    if (mappedService) {
      setFormData((prev) => ({ ...prev, service: mappedService }))
    }

    setQueryPrefillApplied(true)
  }, [queryPrefillApplied, searchParams])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setServerError(null)

    const payload = sanitizeBookingFormData(formData)
    const currentErrors = validateBookingFormData(payload)
    setFormData(payload)

    if (Object.keys(currentErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/book-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: payload }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error ?? "Unable to submit booking request.")
      }

      setSubmitted(true)
      setFormData(INITIAL_BOOKING_FORM_DATA)
      setServiceSearch("")
      setTouched({})
      setSubmitAttempted(false)
      window.setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      setServerError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Book a Test"
          title="Diagnostic Booking Request"
          subtitle="Submit your preferred test details and our team will confirm the appointment shortly."
        />

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-[0_18px_34px_-28px_rgba(11,42,74,0.65)] sm:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {submitted && (
              <div className="sm:col-span-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Booking request submitted successfully
              </div>
            )}
            {serverError && (
              <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-foreground">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(event) => {
                  updateField("fullName", event.target.value)
                  markTouched("fullName")
                }}
                onBlur={() => markTouched("fullName")}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  getError("fullName") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              />
              {getError("fullName") && <p className="mt-1 text-xs text-red-600">{getError("fullName")}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={(event) => {
                  updateField("phone", sanitizeIndianPhoneInput(event.target.value))
                  markTouched("phone")
                }}
                onBlur={() => markTouched("phone")}
                placeholder="10-digit mobile number"
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  getError("phone") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              />
              {getError("phone") && <p className="mt-1 text-xs text-red-600">{getError("phone")}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => {
                  updateField("email", event.target.value)
                  markTouched("email")
                }}
                onBlur={() => markTouched("email")}
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                  getError("email") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              />
              {getError("email") && <p className="mt-1 text-xs text-red-600">{getError("email")}</p>}
            </div>

            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
                Service <span className="text-red-500">*</span>
              </label>
              <Popover
                open={servicePopoverOpen}
                onOpenChange={(open) => {
                  setServicePopoverOpen(open)
                  if (!open) {
                    setServiceSearch("")
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    id="service"
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={servicePopoverOpen}
                    onBlur={() => markTouched("service")}
                    className={`w-full justify-between rounded-lg px-4 py-2.5 text-left text-sm font-normal ${
                      formData.service ? "text-foreground" : "text-muted-foreground"
                    } ${getError("service") ? "border-red-400 focus-visible:ring-red-200" : "border-input"}`}
                  >
                    <span className="truncate">{selectedServiceLabel}</span>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Search test name or price"
                      value={serviceSearch}
                      onValueChange={setServiceSearch}
                    />
                    <CommandList>
                      <CommandEmpty>No tests found.</CommandEmpty>
                      <CommandGroup heading={`Showing ${filteredServiceOptions.length} of ${BOOKING_SERVICE_OPTIONS.length} tests`}>
                        {filteredServiceOptions.map((service) => (
                          <CommandItem
                            key={service.id}
                            value={`${service.name} ${service.price}`}
                            onSelect={() => {
                              updateField("service", service.name)
                              markTouched("service")
                              setServicePopoverOpen(false)
                              setServiceSearch("")
                            }}
                          >
                            <div className="flex w-full items-center justify-between gap-3">
                              <span className="truncate">{service.name}</span>
                              <span className="shrink-0 text-xs font-semibold text-primary">
                                {formatBookingServicePrice(service.price)}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {selectedServicePrice !== undefined && (
                <p className="mt-1 text-xs font-medium text-primary">Selected test price: {formatBookingServicePrice(selectedServicePrice)}</p>
              )}
              {getError("service") && <p className="mt-1 text-xs text-red-600">{getError("service")}</p>}
            </div>

            <div>
              <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-foreground">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={(event) => {
                  updateField("date", event.target.value)
                  markTouched("date")
                }}
                onBlur={() => markTouched("date")}
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 ${
                  getError("date") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              />
              {getError("date") && <p className="mt-1 text-xs text-red-600">{getError("date")}</p>}
            </div>

            <div>
              <label htmlFor="timeSlot" className="mb-1.5 block text-sm font-medium text-foreground">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={(event) => {
                  updateField("timeSlot", event.target.value)
                  markTouched("timeSlot")
                }}
                onBlur={() => markTouched("timeSlot")}
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 ${
                  getError("timeSlot") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              >
                <option value="">Select a slot</option>
                {BOOKING_TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {getError("timeSlot") && <p className="mt-1 text-xs text-red-600">{getError("timeSlot")}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="collectionType" className="mb-1.5 block text-sm font-medium text-foreground">
                Sample Collection Type <span className="text-red-500">*</span>
              </label>
              <select
                id="collectionType"
                name="collectionType"
                required
                value={formData.collectionType}
                onChange={(event) => {
                  updateField("collectionType", event.target.value)
                  markTouched("collectionType")
                }}
                onBlur={() => markTouched("collectionType")}
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 ${
                  getError("collectionType") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                }`}
              >
                <option value="">Select collection type</option>
                {COLLECTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {getError("collectionType") && <p className="mt-1 text-xs text-red-600">{getError("collectionType")}</p>}
            </div>

            {formData.collectionType === "Home Collection" && (
              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  required={formData.collectionType === "Home Collection"}
                  rows={3}
                  value={formData.address}
                  onChange={(event) => {
                    updateField("address", event.target.value)
                    markTouched("address")
                  }}
                  onBlur={() => markTouched("address")}
                  placeholder="Enter complete home collection address"
                  className={`w-full resize-none rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    getError("address") ? "border-red-400 focus:ring-red-200" : "border-input focus:ring-ring"
                  }`}
                />
                {getError("address") && <p className="mt-1 text-xs text-red-600">{getError("address")}</p>}
              </div>
            )}

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-foreground">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Any instructions for the lab team"
                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
