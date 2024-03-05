import { UserModel } from "../models/userModel.js";

export const testRoute = (req, res) => {
  res.send("User Route Test");
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
