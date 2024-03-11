import express from "express";
import { getAllFilms, getFilmById } from "../controllers/filmController.js";
// import FilmModel from "../models/filmModel.js";

const filmRouter = express.Router();

// filmRouter.post("/allfilms", async (req, res) => {
//   const film = new FilmModel(req.body);

//   try {
//     await film.save();
//     res.status(201).send(film);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

filmRouter.get("/allfilms", getAllFilms);
filmRouter.get("/:id", getFilmById);

export default filmRouter;
