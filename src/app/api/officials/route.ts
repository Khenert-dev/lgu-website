import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Official } from "@/models/Official"

export async function GET() {
  await connectDB()

  const items = await Official.find()
    .sort({ order: 1, role: 1 })
    .lean()

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

  const doc: any = {
    role: body.role,
    name: body.name,
    image: body.image,
  }

  // ✅ only set order if valid
  if (typeof body.order === "number" && !Number.isNaN(body.order)) {
    doc.order = body.order
  }

  const created = await Official.create(doc)
  return NextResponse.json(created)
}
