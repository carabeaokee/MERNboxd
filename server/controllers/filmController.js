import { FilmModel } from "../models/filmModel.js";
import { imageUpload } from "../utilities/uploadImage.js";

export const createFilm = async (req, res) => {
  console.log("creating film");
  const { title, year, director, synopsis } = req.body;

  if (!title || !director || !year || !synopsis || !req.file) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  const filmExists = await FilmModel.findOne({
    title: title,
    year: year,
    director: director,
  });

  if (filmExists) {
    return res.status(400).json({ error: "This film already exists" });
  }

  try {
    const uploadedImage = await imageUpload(req.file, "poster");

    if (!uploadedImage || !uploadedImage.secure_url) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    const { secure_url } = uploadedImage;
    const newFilm = new FilmModel({
      title: title,
      year: year,
      director: director,
      synopsis: synopsis,
      poster: secure_url,
    });

    const film = await newFilm.save();
    res.status(200).json(film);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while creating the film" });
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
