import mongoose from "mongoose";

// Defining a new schema for reviews
const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    body: { type: String, required: true },
    title: { type: String, required: true },
  },
  // Enabling timestamps for the schema. This will add 'createdAt' and 'updatedAt' fields
  { timestamps: true }
);

export const ReviewModel = mongoose.model("review", reviewSchema);
