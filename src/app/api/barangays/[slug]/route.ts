import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Barangay } from "@/models/Barangay"

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const item = await Barangay.findOne({ slug: params.slug }).lean()

  if (!item) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(item)
}

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const res = await Barangay.deleteOne({ slug: params.slug })

  if (res.deletedCount === 0) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({ deleted: true })
}
