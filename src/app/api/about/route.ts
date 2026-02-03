import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import About from "@/models/About"

export async function GET() {
  try {
    await connectDB()

    let doc = await About.findOne()

    if (!doc) {
      doc = await About.create({})
    }

    return NextResponse.json(doc)
  } catch (err) {
    console.error("GET /api/about ERROR:", err)
    return NextResponse.json({ error: "GET failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    await About.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true }
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("POST /api/about ERROR:", err)
    return NextResponse.json({ error: "POST failed" }, { status: 500 })
  }
}
