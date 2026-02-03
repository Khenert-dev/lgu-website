import mongoose, { Schema, models } from "mongoose"

const OfficeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
)

export const Office =
  models.Office || mongoose.model("Office", OfficeSchema)
