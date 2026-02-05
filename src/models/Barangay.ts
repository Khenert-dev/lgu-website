import { Schema, model, models } from "mongoose"

const BarangaySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: String,
    lat: Number,
    lng: Number,

    history: [
      {
        year: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],

    officials: [
      {
        name: { type: String },
        position: { type: String },
        photo: { type: String },
      },
    ],
  },
  { timestamps: true }
)

export const Barangay =
  models.Barangay || model("Barangay", BarangaySchema)
