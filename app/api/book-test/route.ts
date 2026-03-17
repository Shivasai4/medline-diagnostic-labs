import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sanitizeBookingFormData, validateBookingFormData, type BookingFormField } from "@/lib/booking"

export const runtime = "nodejs"

type BookingRequestBody = {
  data?: Partial<Record<BookingFormField, string>>
}

const DEFAULT_RECEIVER_EMAIL = "ganjishivasai4@gmail.com"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readEnv(name: string) {
  const value = process.env[name]
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function readEnvAny(names: string[]) {
  for (const name of names) {
    const value = readEnv(name)
    if (value) {
      return value
    }
  }
  return undefined
}

function parsePort(value: string | undefined) {
  if (!value) {
    return 587
  }

  const cleaned = value.replace(/[^\d]/g, "")
  const parsed = Number.parseInt(cleaned, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 587
}

function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatRows(data: ReturnType<typeof sanitizeBookingFormData>) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Name", value: data.fullName },
    { label: "Phone Number", value: data.phone },
    { label: "Email", value: data.email || "-" },
    { label: "Service", value: data.service },
    { label: "Date", value: data.date },
    { label: "Time Slot", value: data.timeSlot },
    { label: "Collection Type", value: data.collectionType },
    { label: "Address", value: data.address || "-" },
    { label: "Notes", value: data.notes || "-" },
  ]

  return rows
}

function buildTextMessage(data: ReturnType<typeof sanitizeBookingFormData>) {
  const rows = formatRows(data)
  return rows.map((row) => `${row.label}: ${row.value}`).join("\n")
}

function buildHtmlMessage(data: ReturnType<typeof sanitizeBookingFormData>) {
  const rows = formatRows(data)
    .map((row) => {
      return `<tr><td style="padding:8px 12px;border:1px solid #d9e2ff;font-weight:600;background:#f5f8ff;">${escapeHtml(row.label)}</td><td style="padding:8px 12px;border:1px solid #d9e2ff;">${escapeHtml(row.value)}</td></tr>`
    })
    .join("")

  return `<table style="border-collapse:collapse;border:1px solid #d9e2ff;width:100%;max-width:760px;">${rows}</table>`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequestBody
    const data = sanitizeBookingFormData(body?.data ?? {})
    const errors = validateBookingFormData(data)

    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0] ?? "Please provide valid booking details."
      return NextResponse.json({ error: firstError, errors }, { status: 400 })
    }

    const smtpHost = readEnvAny(["SMTP_HOST", "MAIL_HOST"]) ?? "smtp.gmail.com"
    const smtpPort = parsePort(readEnvAny(["SMTP_PORT", "MAIL_PORT"]))
    const smtpUser = readEnvAny(["SMTP_USER", "SMTP_USERNAME", "MAIL_USER", "EMAIL_USER"])
    const smtpPass = readEnvAny(["SMTP_PASS", "SMTP_PASSWORD", "MAIL_PASS", "EMAIL_PASS"])
    const smtpFrom = readEnvAny(["SMTP_FROM", "MAIL_FROM", "EMAIL_FROM"]) ?? smtpUser
    const smtpSecure = readEnvAny(["SMTP_SECURE", "MAIL_SECURE"])
    const useSecureConnection = smtpSecure ? smtpSecure.toLowerCase() === "true" : smtpPort === 465

    if (!smtpUser || !smtpPass || !smtpFrom) {
      const missing: string[] = []
      if (!smtpUser) missing.push("SMTP_USER")
      if (!smtpPass) missing.push("SMTP_PASS")
      if (!smtpFrom) missing.push("SMTP_FROM")

      return NextResponse.json(
        {
          error: `Email service is not configured. Missing: ${missing.join(", ")}.`,
        },
        { status: 500 },
      )
    }

    const receiverEmail =
      readEnvAny(["BOOKING_RECEIVER_EMAIL", "RECEIVER_EMAIL", "CONTACT_RECEIVER_EMAIL", "MAIL_TO"]) ??
      DEFAULT_RECEIVER_EMAIL

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: useSecureConnection,
      requireTLS: !useSecureConnection,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const subject = "New Test Booking Request"
    const text = `New booking request received.\n\n${buildTextMessage(data)}`
    const html = `<p style="margin:0 0 12px 0;">New booking request received.</p>${buildHtmlMessage(data)}`
    const replyTo = data.email && isValidEmail(data.email) ? data.email : undefined

    await transporter.sendMail({
      from: smtpFrom,
      to: receiverEmail,
      subject,
      text,
      html,
      replyTo,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("book-test-email-error", error)
    const maybeError = error as { code?: string } | undefined

    if (maybeError?.code === "EAUTH") {
      return NextResponse.json(
        { error: "SMTP authentication failed. Please verify SMTP_USER and SMTP_PASS." },
        { status: 500 },
      )
    }

    if (maybeError?.code === "ECONNECTION" || maybeError?.code === "ETIMEDOUT") {
      return NextResponse.json(
        { error: "Unable to connect to the email server. Check SMTP_HOST and SMTP_PORT." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Unable to submit booking request right now." }, { status: 500 })
  }
}
