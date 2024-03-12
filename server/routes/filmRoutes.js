import express from "express";
import {
  getAllFilms,
  getFilmById,
  createFilm,
} from "../controllers/filmController.js";
import { multerUpload } from "../middleware/multer.js";

const filmRouter = express.Router();

filmRouter.get("/allfilms", getAllFilms);
filmRouter.get("/:id", getFilmById);
filmRouter.post("/addfilm", multerUpload.single("poster"), createFilm);

export default filmRouter;
