import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { isValidIndianPhone, sanitizeIndianPhoneInput } from "@/lib/phone-validation"

export const runtime = "nodejs"

type FormType = "contact" | "partnership" | "career"

type ContactPayload = {
  formType: FormType
  data: Record<string, string>
}

const DEFAULT_RECEIVER_EMAIL = "medlinelabs2014@gmail.com"

const requiredFieldsByType: Record<FormType, string[]> = {
  contact: ["fullName", "phone", "message"],
  partnership: ["firstName", "email", "phone", "organization"],
  career: ["firstName", "lastName", "email", "phone", "position"],
}

const labelMap: Record<string, string> = {
  fullName: "Full Name",
  firstName: "First Name",
  lastName: "Last Name",
  phone: "Phone",
  email: "Email",
  organization: "Organization",
  interest: "Partnership Interest",
  message: "Message",
  position: "Position of Interest",
  coverLetter: "Cover Letter",
}

const subjectByType: Record<FormType, string> = {
  contact: "New Contact Form Submission",
  partnership: "New Business Partnership Inquiry",
  career: "New Career Application",
}

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

function sanitizeValue(value: unknown) {
  return String(value ?? "").trim().slice(0, 5000)
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatKey(key: string) {
  return labelMap[key] ?? key
}

function buildMessageLines(data: Record<string, string>) {
  return Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${formatKey(key)}: ${value}`)
}

function buildMessageHtml(data: Record<string, string>) {
  const rows = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      return `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">${escapeHtml(formatKey(key))}</td><td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(value)}</td></tr>`
    })
    .join("")

  return `<table style="border-collapse:collapse;border:1px solid #ddd;">${rows}</table>`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const formType = body?.formType

    if (!formType || !["contact", "partnership", "career"].includes(formType)) {
      return NextResponse.json({ error: "Invalid form type." }, { status: 400 })
    }

    const data = Object.fromEntries(
      Object.entries(body?.data ?? {}).map(([key, value]) => [key, sanitizeValue(value)]),
    )

    if (typeof data.phone === "string") {
      data.phone = sanitizeIndianPhoneInput(data.phone)
    }

    const missing = requiredFieldsByType[formType as FormType].filter((key) => !data[key])
    if (missing.length > 0) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    if (data.phone && !isValidIndianPhone(data.phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits and start with 6, 7, 8, or 9." },
        { status: 400 },
      )
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
      readEnvAny(["CONTACT_RECEIVER_EMAIL", "MAIL_TO", "CONTACT_EMAIL"]) ?? DEFAULT_RECEIVER_EMAIL

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

    const subject = subjectByType[formType as FormType]
    const lines = buildMessageLines(data)
    const text = `${subject}\n\n${lines.join("\n")}`
    const html = `<p>${escapeHtml(subject)}</p>${buildMessageHtml(data)}`

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
    console.error("contact-email-error", error)
    const maybeError = error as { code?: string; message?: string } | undefined

    if (maybeError?.code === "EAUTH") {
      return NextResponse.json(
        { error: "SMTP authentication failed. Check SMTP_USER/SMTP_PASS and app password settings." },
        { status: 500 },
      )
    }

    if (maybeError?.code === "ECONNECTION" || maybeError?.code === "ETIMEDOUT") {
      return NextResponse.json(
        { error: "Unable to connect to email server. Check SMTP_HOST/SMTP_PORT on Vercel." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 })
  }
}
