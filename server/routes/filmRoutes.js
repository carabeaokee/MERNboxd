import express from "express";
import { getAllFilms, getFilmById } from "../controllers/filmController.js";

const filmRouter = express.Router();

filmRouter.get("/allfilms", getAllFilms);
filmRouter.get("/:id", getFilmById);

export default filmRouter;
