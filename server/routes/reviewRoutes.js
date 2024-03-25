import express from "express";
import { getAllReviews, addReview } from "../controllers/reviewController.js";
import jwtAuth from "../middleware/jwtAuth.js";

// define a new router
const reviewRouter = express.Router();

// define the routes
reviewRouter.get("/allreviews", getAllReviews);
reviewRouter.post("/addreview", jwtAuth, addReview);

export default reviewRouter;
