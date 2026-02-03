import mongoose, { Schema, models } from "mongoose"

const BarangaySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: String,
    lat: Number,
    lng: Number,
  },
  { timestamps: true }
)

export const Barangay =
  models.Barangay || mongoose.model("Barangay", BarangaySchema)
