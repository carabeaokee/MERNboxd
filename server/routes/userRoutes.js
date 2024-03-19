import express from "express";
import {
  getAllUsers,
  testRoute,
  loginUser,
  createUser,
  updateUserAvatar,
  UpdateAllUserPW,
} from "../controllers/userController.js";
import { multerUpload } from "../middleware/multer.js";

// define a new router
const userRouter = express.Router();

// define the routes
userRouter.get("/test", testRoute);
userRouter.get("/allusers", getAllUsers);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post(
  "/profile/:id",
  multerUpload.single("avatar"),
  updateUserAvatar
);
userRouter.post("/updatepw", UpdateAllUserPW);

export default userRouter;
