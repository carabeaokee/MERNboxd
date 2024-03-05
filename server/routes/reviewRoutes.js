import express from "express";
import { getAllReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/allreviews", getAllReviews);

export default reviewRouter;
