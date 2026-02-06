import { Schema, model, models } from "mongoose"

const BarangaySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    images: { type: [String], default: [] },
    famousFor: { type: [String], default: [] },

    lat: Number,
    lng: Number,

    history: [
      {
        year: String,
        title: String,
        description: String,
      },
    ],

    officials: [
      {
        name: String,
        position: String,
        photo: String,
      },
    ],
  },
  { timestamps: true }
)

export const Barangay =
  models.Barangay || model("Barangay", BarangaySchema)
