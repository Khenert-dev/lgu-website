import mongoose, { Schema, models } from "mongoose"

const OfficeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Office =
  models.Office || mongoose.model("Office", OfficeSchema)
