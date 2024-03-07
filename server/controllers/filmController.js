import { FilmModel } from "../models/filmModel.js";

// export const testRoute = (req, res) => {
//   res.send("User Route Test");
// };

export const getAllFilms = async (req, res) => {
  try {
    const films = await FilmModel.find();
    res.status(200).json({
      message: "All Films",
      films: films,
    });
    // res.send("All Films");
  } catch (error) {
    console.error("Error fetching films:", error);
    res
      .status(500)
      .json({ message: "Error fetching films", error: error.message });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("FILM id:>> ", id);
    const film = await FilmModel.findById({ _id: id }).populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username",
      },
      // select: "body",
    });
    console.log("film:>> ", film);

    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    res.status(200).json(film);
  } catch (error) {
    console.error("Error fetching film:", error);
    res
      .status(500)
      .json({ message: "Error fetching film", error: error.message });
  }
};
