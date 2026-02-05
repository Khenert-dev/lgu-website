import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Municipalinfo } from "@/models/Municipalinfo"

export async function GET() {
  try {
    await connectDB()
    const info = await Municipalinfo.findOne().lean()
    return NextResponse.json(
      info || { mission: "", vision: "", history: "" }
    )
  } catch (err) {
    console.error("MUNICIPAL INFO GET ERROR:", err)
    return NextResponse.json(
      { error: "Failed to load municipal info" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    const updated = await Municipalinfo.findOneAndUpdate(
      {},
      {
        mission: body.mission || "",
        vision: body.vision || "",
        history: body.history || "",
      },
      { upsert: true, new: true }
    )

    return NextResponse.json(updated)
  } catch (err) {
    console.error("MUNICIPAL INFO POST ERROR:", err)
    return NextResponse.json(
      { error: "Failed to save municipal info" },
      { status: 500 }
    )
  }
}
