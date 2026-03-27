import { createHmac, timingSafeEqual } from "node:crypto"

export const ADMIN_SESSION_COOKIE = "medline_admin_session"

const SESSION_TTL_SECONDS = 60 * 30
const DEFAULT_ADMIN_EMAIL = "medlinelabs2014@gmail.com"
const DEFAULT_ADMIN_PASSWORD = "Admin@123"

export type AdminSession = {
  email: string
  exp: number
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "change-this-admin-session-secret"
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url")
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return timingSafeEqual(aBuffer, bBuffer)
}

export function isAdminCredentialsValid(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_LOGIN_EMAIL ?? DEFAULT_ADMIN_EMAIL
  const expectedPassword = process.env.ADMIN_LOGIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD

  return email.trim().toLowerCase() === expectedEmail.trim().toLowerCase() && password === expectedPassword
}

export function createAdminSessionValue(email: string) {
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }

  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = signValue(payloadEncoded)
  return `${payloadEncoded}.${signature}`
}

export function verifyAdminSessionValue(sessionValue: string | undefined) {
  if (!sessionValue) {
    return null
  }

  const [payloadEncoded, signature] = sessionValue.split(".")
  if (!payloadEncoded || !signature) {
    return null
  }

  const expectedSignature = signValue(payloadEncoded)
  if (!safeEqual(expectedSignature, signature)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadEncoded, "base64url").toString("utf8")) as AdminSession
    if (!payload.email || !payload.exp) {
      return null
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  }
}
