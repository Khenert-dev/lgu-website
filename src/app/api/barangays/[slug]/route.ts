import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Barangay } from "@/models/Barangay"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const slug = params.slug.toLowerCase().trim()
  const item = await Barangay.findOne({ slug }).lean()

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

  const slug = params.slug.toLowerCase().trim()
  const body = await req.json()

  const updated = await Barangay.findOneAndUpdate(
    { slug },
    {
      name: body.name,
      description: body.description,

      images: body.images ?? [],
      famousFor: body.famousFor ?? [],

      lat: body.lat,
      lng: body.lng,
      history: body.history ?? [],
      officials: body.officials ?? [],
    },
    { new: true }
  )

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  revalidatePath("/barangays")
  revalidatePath(`/barangays/${slug}`)

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const slug = params.slug.toLowerCase().trim()
  const res = await Barangay.deleteOne({ slug })

  if (res.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  revalidatePath("/barangays")

  return NextResponse.json({ deleted: true })
}
