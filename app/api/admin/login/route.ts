import { NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  getAdminSessionCookieOptions,
  isAdminCredentialsValid,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string }
    const email = String(body?.email ?? "").trim()
    const password = String(body?.password ?? "")

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    if (!isAdminCredentialsValid(email, password)) {
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 })
    }

    const sessionValue = createAdminSessionValue(email)
    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, getAdminSessionCookieOptions())
    return response
  } catch {
    return NextResponse.json({ error: "Unable to login right now." }, { status: 500 })
  }
}
