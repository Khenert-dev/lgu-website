import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Office } from "@/models/Office"

export async function GET() {
  try {
    await connectDB()
    const items = await Office.find().sort({ name: 1 }).lean()
    return NextResponse.json(items)
  } catch (err) {
    console.error("OFFICES GET ERROR:", err)
    return NextResponse.json(
      { error: "Failed to load offices" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const created = await Office.create({
      name: body.name,
      description: body.description,
      image: body.image,
    })

    return NextResponse.json(created)
  } catch (err) {
    console.error("OFFICES POST ERROR:", err)
    return NextResponse.json(
      { error: "Failed to save office" },
      { status: 500 }
    )
  }
}
