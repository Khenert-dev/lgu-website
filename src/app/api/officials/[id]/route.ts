import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Official } from "@/models/Official"
import { Types } from "mongoose"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const body = await req.json()

  const updated = await Official.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  )

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  const res = await Official.findByIdAndDelete(params.id)

  if (!res) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ deleted: true })
}
