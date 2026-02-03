import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { News } from "@/models/News"

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()
  const item = await News.findById(params.id).lean()
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
  { params }: { params: { id: string } }
) {
  await connectDB()
  await News.deleteOne({ _id: params.id })
  return NextResponse.json({ ok: true })
}
