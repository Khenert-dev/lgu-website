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
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    )
  }

  const body = await req.json()

  const update: any = {
    role: body.role,
    name: body.name,
    image: body.image,
  }

  // ✅ only apply order if valid
  if (typeof body.order === "number" && !Number.isNaN(body.order)) {
    update.order = body.order
  }

  const updated = await Official.findByIdAndUpdate(
    params.id,
    update,
    { new: true }
  )

  if (!updated) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "Invalid ID" },
      { status: 400 }
    )
  }

  const deleted = await Official.findByIdAndDelete(params.id)

  if (!deleted) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({ deleted: true })
}
