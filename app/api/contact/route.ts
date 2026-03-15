import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

type FormType = "contact" | "partnership" | "career"

type ContactPayload = {
  formType: FormType
  data: Record<string, string>
}

const DEFAULT_RECEIVER_EMAIL = "ganjishivasai4@gmail.com"

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

    const missing = requiredFieldsByType[formType as FormType].filter((key) => !data[key])
    if (missing.length > 0) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM ?? smtpUser

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set SMTP environment variables." },
        { status: 500 },
      )
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ?? DEFAULT_RECEIVER_EMAIL

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
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
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 })
  }
}
