import { ReviewModel } from "../models/reviewModel.js";
import { FilmModel } from "../models/filmModel.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate({
        path: "author",
        select: "username",
      })
      .populate({
        path: "film",
        select: "title",
      });

    res.send({ reviews });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  const { id } = req.params; // film id
  const reviewData = req.body; // review data

  try {
    const film = await FilmModel.findById(id);

    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    const newReview = new ReviewModel(reviewData);
    const review = await newReview.save();

    // Add the new review to the film's reviews
    film.reviews.push(review._id);

    // Save the updated film
    await film.save();

    res.status(200).json(film);
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};
