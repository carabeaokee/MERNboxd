import { UserModel } from "../models/userModel.js";

export const testRoute = (req, res) => {
  res.send("User Route Test");
};

export const createUser = async (req, res) => {
  console.log("req.body :>> ", req.body);
  const user = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  const newUser = new UserModel(user);
  try {
    const result = await newUser.save();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }
};

export const getAllUsers = async (req, res) => {
  //   console.log("getting AllUsers");
  try {
    const allUsers = await UserModel.find();
    // console.log("found thee users:", allUsers);
    res.status(200).json(allUsers);
  } catch {
    res.status(404).json({ message: error.message });
  }
};
