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

export const addReview = async (req, res) => {
  //   console.log("creating film");
  const review = req.body;
  //   console.log("req.body:>> ", req.body);

  try {
    const newReview = new ReviewModel(review);
    const review = await newReview.save();
    // console.log("newReview:>> ", newReview);
    res.status(200).json(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
