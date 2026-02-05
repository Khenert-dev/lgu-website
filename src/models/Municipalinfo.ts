import mongoose, { Schema, models } from "mongoose"

const MunicipalinfoSchema = new Schema(
  {
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    history: { type: String, default: "" },
  },
  { timestamps: true }
)

export const Municipalinfo =
  models.Municipalinfo ||
  mongoose.model("Municipalinfo", MunicipalinfoSchema)
