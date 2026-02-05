import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { token } = await req.json()

  const res = NextResponse.json({ ok: true })

  res.cookies.set("__session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })

  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete("__session")
  return res
}
