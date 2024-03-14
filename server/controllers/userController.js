import { UserModel } from "../models/userModel.js";
import { imageUpload } from "../utilities/uploadImage.js";

export const testRoute = (_, res) => {
  res.send("User Route Test");
};

// function to create a user
export const createUser = async (req, res) => {
  console.log("creating user");
  // Retrieve the email, password and username from the request body
  const user = req.body;

  // Check if all fields are filled out
  if (!user.email || !user.password || !user.username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  // Check if the user already exists
  const userExists = await UserModel.findOne({
    $or: [{ email: user.email }, { username: user.username }],
  });

  // If the user exists, return an error
  if (userExists) {
    return res
      .status(400)
      .json({ error: "An account with this email or username already exists" });
  }
  try {
    // Create a new user
    const newUser = new UserModel(user);
    // Save the new user
    const savedUser = await newUser.save();
    // Send the saved user as a response
    res.status(200).json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

// function to get all users
export const getAllUsers = async (req, res) => {
  console.log("getting AllUsers");
  try {
    // Retrieve all users
    const allUsers = await UserModel.find();
    console.log("found all users:", allUsers);
    // Send the users as a response
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to update user avatar
export const updateUserAvatar = async (req, res) => {
  // Retrieve the user id from the request parameters
  const userId = req.params.id;

  try {
    // Check if the user exists

    const uploadResult = await imageUpload(req.file);
    const avatar = uploadResult.secure_url;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    // If the user does not exist, return an error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Send the updated user as a response
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
