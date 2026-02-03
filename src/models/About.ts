import mongoose, { Schema } from "mongoose"

const HistorySchema = new Schema(
  {
    year: String,
    title: String,
    description: String,
  },
  { _id: false }
)

const AboutSchema = new Schema(
  {
    overview: { type: String, default: "" },
    role: { type: String, default: "" },
    mission: { type: String, default: "" },
    vision: { type: String, default: "" },
    values: { type: [String], default: [] },
    sealMeaning: { type: String, default: "" },
    history: { type: [HistorySchema], default: [] },
  },
  { timestamps: true }
)

/**
 * VERY IMPORTANT:
 * Use mongoose.models to avoid recompilation crash
 */
export default mongoose.models.About ||
  mongoose.model("About", AboutSchema)
