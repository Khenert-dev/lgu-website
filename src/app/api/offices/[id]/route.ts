import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import { Office } from "@/models/Office"

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
