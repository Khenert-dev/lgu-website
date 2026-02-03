import mongoose, { Schema } from "mongoose"

const OfficialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Official =
  mongoose.models.Official ||
  mongoose.model("Official", OfficialSchema)
