import mongoose from "mongoose";

// Defining a new schema for films
const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  director: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  poster: { type: String, required: true },
  synopsis: { type: String, required: true },
});
export const FilmModel = mongoose.model("film", filmSchema);
