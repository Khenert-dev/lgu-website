import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Office } from "@/models/Office"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await req.json()

    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const update: any = {
      name: body.name,
      description: body.description,
      image: body.image,
    }

    // ✅ Guard order
    if (typeof body.order === "number" && !Number.isNaN(body.order)) {
      update.order = body.order
    }

    const updated = await Office.findByIdAndUpdate(
      params.id,
      update,
      { new: true, runValidators: true }
    )

    return NextResponse.json(updated)
  } catch (err) {
    console.error("OFFICES PUT ERROR:", err)
    return NextResponse.json(
      { error: "Failed to update office" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    await Office.findByIdAndDelete(params.id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("OFFICES DELETE ERROR:", err)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}
