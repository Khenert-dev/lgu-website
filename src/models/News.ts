import mongoose, { Schema } from "mongoose"

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String }, // upload or URL
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const News =
  mongoose.models.News ||
  mongoose.model("News", NewsSchema)
