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
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const body = await req.json()

  const updated = await Barangay.findOneAndUpdate(
    { slug: params.slug },
    {
      name: body.name,
      description: body.description,
      image: body.image,
      lat: body.lat,
      lng: body.lng,
    },
    { new: true }
  )

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const res = await Barangay.deleteOne({ slug: params.slug })

  if (res.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json({ deleted: true })
}
