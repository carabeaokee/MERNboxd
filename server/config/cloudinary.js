// Importing the dotenv library to load environment variables from a .env file
import * as dotenv from "dotenv";
// Loading the .env file
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

// Function to configure the Cloudinary client
export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};
