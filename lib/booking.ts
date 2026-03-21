import { getIndianPhoneError, sanitizeIndianPhoneInput } from "@/lib/phone-validation"
import organizationServices from "@/data/organization-services.json"

export type BookingServiceOption = {
  id: number
  name: string
  price: number
}

export const BOOKING_SERVICE_OPTIONS: BookingServiceOption[] = organizationServices
  .map((service) => ({
    id: Number(service.id) || 0,
    name: String(service.name ?? "").trim(),
    price: Number(service.price) || 0,
  }))
  .filter((service) => service.id > 0 && service.name.length > 0)

export const BOOKING_TIME_SLOTS = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM"] as const

export const COLLECTION_TYPES = ["Home Collection", "Visit Lab"] as const

export type BookingTimeSlot = (typeof BOOKING_TIME_SLOTS)[number]
export type CollectionType = (typeof COLLECTION_TYPES)[number]

export type BookingFormData = {
  fullName: string
  phone: string
  email: string
  service: string
  date: string
  timeSlot: string
  collectionType: string
  address: string
  notes: string
}

export type BookingFormField = keyof BookingFormData
export type BookingFormErrors = Partial<Record<BookingFormField, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const INITIAL_BOOKING_FORM_DATA: BookingFormData = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  timeSlot: "",
  collectionType: "",
  address: "",
  notes: "",
}

const BOOKING_SERVICE_BY_SLUG: Record<string, string> = {
  "complete-blood-count": "CBC - Complete Blood Count",
  "thyroid-panel": "Thyroid Profile (T3, T4, TSH)",
  "hba1c-diabetes": "Glycosylated Hemoglobin (GHb/HBA1c)",
  "lipid-profile": "Lipid Profile",
  "liver-function-test": "Liver Function Test (LFT)",
  "kidney-function-test": "Kidney Function Test",
  "vitamin-d": "25-Hydroxy Vitamin D",
  "vitamin-b12": "Vitamin B12",
  "covid-19-antibody-test": "SARS CoV 2 Antibody Total",
  "full-body-checkup": "Complete Health Check",
}

export function getBookingServiceFromSlug(slug: string) {
  return BOOKING_SERVICE_BY_SLUG[slug]
}

const BOOKING_SERVICE_NAME_SET = new Set(BOOKING_SERVICE_OPTIONS.map((service) => service.name))
const BOOKING_SERVICE_PRICE_MAP = new Map(BOOKING_SERVICE_OPTIONS.map((service) => [service.name, service.price]))

export function getBookingServicePrice(serviceName: string) {
  return BOOKING_SERVICE_PRICE_MAP.get(serviceName)
}

export function formatBookingServicePrice(price: number) {
  return `Rs ${price.toLocaleString("en-IN")}`
}

export function formatBookingServiceLabel(service: BookingServiceOption) {
  return `${service.name} - ${formatBookingServicePrice(service.price)}`
}

export function sanitizeBookingFormData(payload: Partial<Record<BookingFormField, string>>): BookingFormData {
  return {
    fullName: String(payload.fullName ?? "").trim().slice(0, 120),
    phone: sanitizeIndianPhoneInput(String(payload.phone ?? "")),
    email: String(payload.email ?? "").trim().slice(0, 160),
    service: String(payload.service ?? "").trim(),
    date: String(payload.date ?? "").trim(),
    timeSlot: String(payload.timeSlot ?? "").trim(),
    collectionType: String(payload.collectionType ?? "").trim(),
    address: String(payload.address ?? "").trim().slice(0, 300),
    notes: String(payload.notes ?? "").trim().slice(0, 2000),
  }
}

export function validateBookingFormData(formData: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {}

  if (!formData.fullName) {
    errors.fullName = "Full name is required."
  }

  const phoneError = getIndianPhoneError(formData.phone)
  if (phoneError) {
    errors.phone = phoneError
  }

  if (formData.email && !EMAIL_REGEX.test(formData.email)) {
    errors.email = "Enter a valid email address."
  }

  if (!formData.service) {
    errors.service = "Please select a service."
  } else if (!BOOKING_SERVICE_NAME_SET.has(formData.service)) {
    errors.service = "Selected service is not valid."
  }

  if (!formData.date) {
    errors.date = "Please select a date."
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
    errors.date = "Please provide a valid date."
  }

  if (!formData.timeSlot) {
    errors.timeSlot = "Please select a time slot."
  } else if (!BOOKING_TIME_SLOTS.includes(formData.timeSlot as BookingTimeSlot)) {
    errors.timeSlot = "Selected time slot is not valid."
  }

  if (!formData.collectionType) {
    errors.collectionType = "Please select collection type."
  } else if (!COLLECTION_TYPES.includes(formData.collectionType as CollectionType)) {
    errors.collectionType = "Selected collection type is not valid."
  }

  if (formData.collectionType === "Home Collection" && !formData.address) {
    errors.address = "Address is required for home collection."
  }

  return errors
}
