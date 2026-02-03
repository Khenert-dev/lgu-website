import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Official } from "@/models/Official"

export async function GET() {
  await connectDB()
  const items = await Official.find().sort({ role: 1 }).lean()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  if (!body.role || !body.name) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  const created = await Official.create(body)
  return NextResponse.json(created)
}
