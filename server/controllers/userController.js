import { UserModel } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utilities/bcrypt.js";

import { imageUpload } from "../utilities/uploadImage.js";
import { generateToken } from "../middleware/jwt.js";

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
    console.log("hashing password");
    // Hash the password
    const hashedPassword = await hashPassword(user.password);

    // Create a new user
    const newUser = new UserModel({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });
    // Save the new user
    const savedUser = await newUser.save();
    // Send the saved user as a response
    res.status(200).json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

// function to login a user
export const loginUser = async (req, res) => {
  console.log("logging in user");
  // Retrieve the username and password from the request body
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  console.log("user :>> ", user);

  if (user) {
    // Check if the password is correct
    const { password: hashedPassword } = user;
    console.log("hashedPassword :>> ", hashedPassword);
    // Verify the password
    const verified = await verifyPassword(password, hashedPassword);

    // If the password is correct, generate a token
    if (verified) {
      const token = generateToken(user);
      // Send the token as a response
      if (token) {
        console.log("used verified");
        res
          .status(201)
          .json({ message: "User logged in", token: token, _id: user._id });
      } else {
        console.log("Failed to generate token");
      }
    } else {
      console.log("Verification failed");
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const UpdateAllUserPW = async (req, res) => {
  console.log("updating all users to have hashed passwords");
  try {
    const allUsers = await UserModel.find();
    allUsers.forEach(async (user) => {
      const { password } = user;
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      await user.save();
    });
    res.status(200).json({ message: "All users updated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
