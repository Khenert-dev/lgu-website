import { Schema, model, models } from "mongoose"

const OfficialSchema = new Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    image: String,
  },
  { timestamps: true }
)

export const Official =
  models.Official || model("Official", OfficialSchema)
