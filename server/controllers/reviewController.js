import { ReviewModel } from "../models/reviewModel.js";
import { FilmModel } from "../models/filmModel.js";

// Function to retrieve all reviews
export const getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews and populate the author and film fields
    const reviews = await ReviewModel.find()
      .populate({
        path: "author",
        select: "username avatar",
      })
      .populate({
        path: "film",
        select: "title poster",
      });

    // Send the reviews as a response
    res.send({ reviews });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Function to add a review
export const addReview = async (req, res) => {
  console.log("Adding review");
  // Retrieve the userId, body and filmId from the request body
  const { userId, body, filmId } = req.body;

  // Check if all fields are filled out
  if (!userId || !body || !filmId) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  // Create a new review
  const newReview = new ReviewModel({
    author: userId,
    body: body,
    film: filmId,
  });

  // Save the new review
  const savedReview = await newReview.save();
  console.log("new review:>> ", savedReview);

  // Retrieve the new review and populate the author and film fields
  const review = await ReviewModel.findById(savedReview._id).populate([
    {
      path: "author",
      select: "username avatar",
    },
    {
      path: "film",
      select: "title poster",
    },
  ]);

  // Check if the film exists
  const film = await FilmModel.findById(filmId);

  if (!film) {
    console.error("Error: Film not found");
    res.status(404).json({ message: "Film not found" });
    return;
  }

  if (!film.reviews) {
    film.reviews = [];
  }
  film.reviews.push(review._id);

  // Save the updated film
  try {
    await film.save();

    // Send the review and film as a response
    res.status(200).json({ review, film });
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};
