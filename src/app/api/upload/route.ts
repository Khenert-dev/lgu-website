import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = path.join(
    process.cwd(),
    "public",
    "uploads"
  )

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const ext = path.extname(file.name) || ".jpg"
  const filename = `${randomUUID()}${ext}`
  const filepath = path.join(uploadsDir, filename)

  fs.writeFileSync(filepath, buffer)

  return NextResponse.json({
    url: `/uploads/${filename}`,
  })
}
