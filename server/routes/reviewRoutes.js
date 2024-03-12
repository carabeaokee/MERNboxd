import express from "express";
import { getAllReviews, addReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/allreviews", getAllReviews);
reviewRouter.post("/films/:id/reviews", addReview);

export default reviewRouter;
