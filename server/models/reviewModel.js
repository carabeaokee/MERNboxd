import mongoose from "mongoose";

// Defining a new schema for reviews
const reviewSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    body: { type: String, required: true },
    film: { type: mongoose.Schema.Types.ObjectId, ref: "film" },
  },
  // Enabling timestamps for the schema. This will add 'createdAt' and 'updatedAt' fields
  { timestamps: true }
);

export const ReviewModel = mongoose.model("review", reviewSchema);
