import mongoose from "mongoose";

// Defining a new schema for films
const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: String, required: true },
    director: { type: String, required: true },
  },
  // Enabling timestamps for the schema. This will add 'createdAt' and 'updatedAt' fields
  { timestamps: true }
);

export const FilmModel = mongoose.model("film", filmSchema);
