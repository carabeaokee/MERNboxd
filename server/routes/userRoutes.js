import express from "express";
import {
  getAllUsers,
  testRoute,
  createUser,
  updateUserAvatar,
} from "../controllers/userController.js";
import { multerUpload } from "../middleware/multer.js";

// define a new router
const userRouter = express.Router();

// define the routes
userRouter.get("/test", testRoute);
userRouter.get("/allusers", getAllUsers);
userRouter.post("/register", createUser);
userRouter.post(
  "/profile/:id",
  multerUpload.single("avatar"),
  updateUserAvatar
);

export default userRouter;
