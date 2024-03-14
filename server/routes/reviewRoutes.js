import express from "express";
import { getAllReviews, addReview } from "../controllers/reviewController.js";

// define a new router
const reviewRouter = express.Router();

// define the routes
reviewRouter.get("/allreviews", getAllReviews);
reviewRouter.post("/addreview", addReview);

export default reviewRouter;
