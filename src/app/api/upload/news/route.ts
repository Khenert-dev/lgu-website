import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get("file") as File | null

  if (!file) {
    return NextResponse.json(
      { error: "No file" },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split(".").pop() || "jpg"
  const filename = `${uuid()}.${ext}`

  const dir = path.join(process.cwd(), "public/uploads/news")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const filepath = path.join(dir, filename)
  fs.writeFileSync(filepath, buffer)

  return NextResponse.json({
    url: `/uploads/news/${filename}`,
  })
}
