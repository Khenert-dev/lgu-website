import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { News } from "@/models/News"

export async function GET() {
  await connectDB()
  const items = await News.find()
    .sort({ publishedAt: -1 })
    .lean()

  return NextResponse.json(items)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const created = await News.create({
    title: body.title,
    body: body.body,
    image: body.image,
  })

  return NextResponse.json(created)
}
