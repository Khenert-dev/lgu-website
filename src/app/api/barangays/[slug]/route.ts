import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Schema, model, models } from "mongoose"

/* ================= SCHEMA ================= */

const BarangaySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: String,
    lat: Number,
    lng: Number,
  },
  { timestamps: true }
)

const Barangay =
  models.Barangay || model("Barangay", BarangaySchema)

/* ================= GET /api/barangay/[slug] ================= */

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()

  const item = await Barangay.findOne({
    slug: params.slug,
  }).lean()

  if (!item) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(item)
}
