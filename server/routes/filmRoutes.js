import express from "express";
import {
  getAllFilms,
  getFilmById,
  createFilm,
  getFilmsByQuery,
} from "../controllers/filmController.js";
import { multerUpload } from "../middleware/multer.js";

// Create a new router
const filmRouter = express.Router();

// Define the routes
filmRouter.get("/allfilms", getAllFilms);
filmRouter.post("/addfilm", multerUpload.single("poster"), createFilm);
filmRouter.get("/filter", getFilmsByQuery);
filmRouter.get("/:id", getFilmById);

export default filmRouter;
