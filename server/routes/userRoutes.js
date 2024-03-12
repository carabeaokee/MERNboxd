import express from "express";
import {
  getAllUsers,
  testRoute,
  createUser,
} from "../controllers/userController.js";

const userRouter = express.Router();
// app.METHOD(PATH, HANDLER)
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

userRouter.get("/test", testRoute);
userRouter.get("/allusers", getAllUsers);
userRouter.post("/register", createUser);

export default userRouter;
