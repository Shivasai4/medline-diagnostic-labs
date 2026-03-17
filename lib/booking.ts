import { getIndianPhoneError, sanitizeIndianPhoneInput } from "@/lib/phone-validation"

export const BOOKING_SERVICES = [
  "Complete Blood Test (CBP)",
  "Thyroid Profile (T3, T4, TSH)",
  "Diabetes Test (HbA1c, Fasting Sugar)",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Vitamin D & B12",
  "COVID / Viral Tests",
  "Full Body Checkup Packages",
] as const

export const BOOKING_TIME_SLOTS = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM"] as const

export const COLLECTION_TYPES = ["Home Collection", "Visit Lab"] as const

export type BookingService = (typeof BOOKING_SERVICES)[number]
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

const BOOKING_SERVICE_BY_SLUG: Record<string, BookingService> = {
  "complete-blood-count": "Complete Blood Test (CBP)",
  "thyroid-panel": "Thyroid Profile (T3, T4, TSH)",
  "hba1c-diabetes": "Diabetes Test (HbA1c, Fasting Sugar)",
  "lipid-profile": "Lipid Profile",
  "liver-function-test": "Liver Function Test (LFT)",
  "kidney-function-test": "Kidney Function Test (KFT)",
  "vitamin-d": "Vitamin D & B12",
  "vitamin-b12": "Vitamin D & B12",
  "covid-19-antibody-test": "COVID / Viral Tests",
  "full-body-checkup": "Full Body Checkup Packages",
}

export function getBookingServiceFromSlug(slug: string) {
  return BOOKING_SERVICE_BY_SLUG[slug]
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
  } else if (!BOOKING_SERVICES.includes(formData.service as BookingService)) {
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
