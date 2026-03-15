import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin-auth"

export async function GET() {
  const cookieStore = await cookies()
  const session = verifyAdminSessionValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, adminEmail: session.email })
}
