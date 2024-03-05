import { FilmModel } from "../models/filmModel.js";

// export const testRoute = (req, res) => {
//   res.send("User Route Test");
// };

export const getAllFilms = async (req, res) => {
  //   console.log("getting AllFilms");
  try {
    // Using the FilmModel to find all films in the database
    const allFilms = await FilmModel.find();
    // console.log("found thee users:", allUsers);

    // If successful, the function responds with a status of 200 and a JSON object of all films
    res.status(200).json(allFilms);
  } catch {
    // If there is an error, the function responds with a status of 404 and a JSON object with the error message
    res.status(404).json({ message: error.message });
  }
};
