import { FilmModel } from "../models/filmModel.js";
import { imageUpload } from "../utilities/uploadImage.js";

// Function to create a film
export const createFilm = async (req, res) => {
  console.log("creating film");
  // Retrieve the title, year, director, synopsis and file from the request body
  const { title, year, director, synopsis } = req.body;

  // Check if all fields are filled out
  if (!title || !director || !year || !synopsis || !req.file) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  // Check if the film already exists
  const filmExists = await FilmModel.findOne({
    title: title,
    year: year,
    director: director,
  });

  // If the film exists, return an error
  if (filmExists) {
    return res.status(400).json({ error: "This film already exists" });
  }

  // Upload the poster image to Cloudinary
  try {
    const uploadedImage = await imageUpload(req.file, "poster");

    // If the image upload fails, return an error
    if (!uploadedImage || !uploadedImage.secure_url) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Create a new film
    const { secure_url } = uploadedImage;
    const newFilm = new FilmModel({
      title: title,
      year: year,
      director: director,
      synopsis: synopsis,
      poster: secure_url,
    });

    // Save the new film
    const film = await newFilm.save();
    res.status(200).json(film);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An error occurred while creating the film" });
  }
};

// Function to retrieve all films
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

// Function to retrieve a film by its ID
export const getFilmById = async (req, res) => {
  try {
    // Retrieve the film ID from the request parameters
    const { id } = req.params;
    console.log("FILM id:>> ", id);
    // Retrieve the film by its ID and populate the reviews
    const film = await FilmModel.findById({ _id: id }).populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username",
      },
      // select: "body",
    });
    console.log("film:>> ", film);

    // If the film does not exist, return an error
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    // Send the film as a response
    res.status(200).json(film);
  } catch (error) {
    console.error("Error fetching film:", error);
    res
      .status(500)
      .json({ message: "Error fetching film", error: error.message });
  }
};

// Function to retrieve films by query
export const getFilmsByQuery = async (req, res) => {
  try {
    // Retrieve the year and director from the request query
    const { year, director, title } = req.query;

    // Create an empty query object
    let query = {};

    // If the year is provided, add it to the query
    if (year) {
      // Check if year is a range
      if (year.includes("-")) {
        // Split the year range into start and end years
        const [startYear, endYear] = year.split("-");
        query.year = { $gte: startYear, $lte: endYear };
      } else {
        query.year = year;
      }
    }

    // If the director is provided, add it to the query
    if (director) {
      query.director = { $regex: new RegExp(director, "i") };
    }

    // If the title is provided, add it to the query
    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    // if (genre) {
    //   query.genre = genre;
    // }

    // if (language) {
    //   query.language = language;
    // }

    // if (country) {
    //   query.country = country;
    // }

    // if (rating) {
    //   query.rating = rating;
    // }

    // if (runtime) {
    //   query.runtime = runtime;
    // }

    // Retrieve the films that match the query
    const films = await FilmModel.find(query);

    console.log("films:>> ", films);

    // If no films are found, return a message
    if (films.length > 0) {
      res.status(200).json(films);
    } else {
      res.status(200).json({ message: "no films found" });
    }
  } catch (error) {
    console.error("Error fetching films:", error);
    res
      .status(500)
      .json({ message: "Error fetching films", error: error.message });
  }
};
