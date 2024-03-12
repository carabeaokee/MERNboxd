import { FilmModel } from "../models/filmModel.js";
import { imageUpload } from "../utilities/uploadImage.js";

// export const testRoute = (req, res) => {
//   res.send("User Route Test");
// };

export const createFilm = async (req, res) => {
  console.log("creating film");
  const film = req.body;

  if (
    !film.title ||
    !film.director ||
    !film.year ||
    !film.synopsis ||
    !film.poster
  ) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  const filmExists = await FilmModel.findOne({
    $and: [
      { title: film.title },
      { year: film.year },
      { director: film.director },
    ],
  });

  if (filmExists) {
    return res.status(400).json({ error: "This film already exists" });
  }

  try {
    const uploadedImage = await imageUpload(req.file, "poster");
    const { secure_url, public_id } = uploadedImage;
    const newFilm = new FilmModel({
      title: film.title,
      year: film.year,
      director: film.director,
      synopsis: film.synopsis,
      poster: secure_url,
    });

    const film = await newFilm.save();
    res.status(200).json(film);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

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
