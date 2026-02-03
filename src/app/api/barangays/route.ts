import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Barangay } from "@/models/Barangay"

export async function GET() {
  await connectDB()
  const items = await Barangay.find().sort({ name: 1 }).lean()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  if (!body.name || !body.slug || !body.description) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  const exists = await Barangay.findOne({ slug: body.slug })
  if (exists) {
    return NextResponse.json(
      { error: "Slug already exists" },
      { status: 409 }
    )
  }

  const created = await Barangay.create(body)
  return NextResponse.json(created)
}
