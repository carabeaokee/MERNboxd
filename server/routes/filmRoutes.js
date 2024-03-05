import express from "express";
import { getAllFilms } from "../controllers/filmController.js";

const filmRouter = express.Router();

filmRouter.get("/allfilms", getAllFilms);

export default filmRouter;
