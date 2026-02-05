import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Barangay } from "@/models/Barangay"
import { revalidatePath } from "next/cache"

export const dynamic = "force-dynamic"

export async function GET() {
  await connectDB()
  const items = await Barangay.find().sort({ name: 1 }).lean()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  await connectDB()

  const body = await req.json()
  const slug = body.slug.toLowerCase().trim()

  const created = await Barangay.create({
    name: body.name,
    slug,
    description: body.description,
    image: body.image,
    lat: body.lat,
    lng: body.lng,
    history: body.history ?? [],
    officials: body.officials ?? [],
  })

  revalidatePath("/barangays")
  revalidatePath(`/barangays/${slug}`)

  return NextResponse.json(created)
}
