import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { v4 as uuid } from "uuid"

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const buffers: Buffer[] = []
  for await (const chunk of req) buffers.push(chunk as Buffer)
  const fileBuffer = Buffer.concat(buffers)

  const filename = `${uuid()}.jpg` // force jpg for simplicity
  const dir = path.resolve("./public/uploads/barangays")
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  const filePath = path.join(dir, filename)
  fs.writeFileSync(filePath, fileBuffer)

  res.status(200).json({ url: `/uploads/barangays/${filename}` })
}
