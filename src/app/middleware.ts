import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // protect admin routes
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("__session")

    if (!session) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = "/login"
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
