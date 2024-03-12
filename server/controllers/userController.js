import { UserModel } from "../models/userModel.js";

export const testRoute = (req, res) => {
  res.send("User Route Test");
};

export const createUser = async (req, res) => {
  console.log("creating user");
  const user = req.body;

  if (!user.email || !user.password || !user.username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  const userExists = await UserModel.findOne({
    $or: [{ email: user.email }, { username: user.username }],
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "An account with this email or username already exists" });
  }

  try {
    const newUser = new UserModel(user);
    const user = await newUser.save();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getAllUsers = async (req, res) => {
  console.log("getting AllUsers");
  try {
    const allUsers = await UserModel.find();
    console.log("found all users:", allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
