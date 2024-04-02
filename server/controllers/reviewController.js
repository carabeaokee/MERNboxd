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
  // console.log("req.body", req.body);
  const userId = req.user._id;

  // console.log("userID", userID);
  // const user = req.user;
  // const { username } = user;
  // console.log("username", username);
  // Retrieve the userId, body and filmId from the request body
  const { body, filmId } = req.body;
  console.log("filmId", filmId);

  // Check if all fields are filled out
  if (!body) {
    return res.status(400).json({ message: "cant submit review no letters " });
  }

  // Create a new review
  const newReview = new ReviewModel({
    author: userId,
    body: body,
    film: filmId,
  });

  // Save the new review
  const savedReview = await newReview.save();

  // Retrieve the new review and populate the author and film fields
  // const review = await ReviewModel.findById(savedReview._id).populate([
  //   {
  //     path: "author",
  //     select: "username avatar",
  //   },
  //   {
  //     path: "film",
  //     select: "title poster",
  //   },
  // ]);

  // Check if the film exists
  const film = await FilmModel.findById({ _id: filmId });
  // console.log("FILMS!!!!!!!!!!", film);

  if (!film) {
    console.error("Error: Film not found");
    res.status(404).json({ message: "Film not found" });
    return;
  }

  if (!film.reviews) {
    film.reviews = [];
  }
  film.reviews.push(savedReview._id);

  // Save the updated film
  try {
    const updatedFilm = await film.save();
    // const populatedFilm = updatedFilm
    //   .populate({
    //     path: "reviews",
    //   })
    //   .populate({
    //     path: "author",
    //     // select: "username avatar",
    //   });

    // Send the review and film as a response
    res.status(200).json({ savedReview, updatedFilm });
  } catch (error) {
    console.error("Error adding review:", error);
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};
