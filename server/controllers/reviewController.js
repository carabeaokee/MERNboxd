import { ReviewModel } from "../models/reviewModel.js";
// import { FilmModel } from "../models/filmModel.js";

export const getAllReviews = async (req, res) => {
  //   console.log("getting AllFilms");
  try {
    // Using the ReviewModel to find all films in the database
    const reviews = await ReviewModel.find()
      .populate({
        path: "author",
        select: "username",
      })
      .populate({
        path: "film",
        select: "title",
      });
    // console.log("found these reviews:", allReviews);

    res.send({ reviews });
  } catch {
    // If there is an error, the function responds with a status of 404 and a JSON object with the error message
    res.status(404).json({ message: error.message });
  }
};
