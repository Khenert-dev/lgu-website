import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { randomUUID } from "crypto"

export const config = {
  api: { bodyParser: false },
}

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

  const ext = file.name.split(".").pop()
  const filename = `${randomUUID()}.${ext}`
  const dir = path.join(process.cwd(), "public/uploads/officials")

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(path.join(dir, filename), buffer)

  return NextResponse.json({
    url: `/uploads/officials/${filename}`,
  })
}
