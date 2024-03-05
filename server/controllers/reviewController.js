import { ReviewModel } from "../models/reviewModel.js";

export const getAllReviews = async (req, res) => {
  //   console.log("getting AllFilms");
  try {
    // Using the ReviewModel to find all films in the database
    const allReviews = await ReviewModel.find();
    // console.log("found these reviews:", allReviews);

    // If successful, the function responds with a status of 200 and a JSON object of all reviews
    res.status(200).json(allReviews);
  } catch {
    // If there is an error, the function responds with a status of 404 and a JSON object with the error message
    res.status(404).json({ message: error.message });
  }
};
