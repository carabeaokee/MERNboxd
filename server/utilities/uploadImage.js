import { v2 as cloudinary } from "cloudinary";

// Function to upload images to Cloudinary
export const imageUpload = async (file, folder) => {
  console.log("file, folder in imageUpload:>> ", file, folder);
  // Check if a file was uploaded
  if (file !== undefined) {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        // Folder to upload the image to
        folder: folder,
      });
      console.log(result);
      // Return the image URL and public ID
      const { secure_url, public_id } = result;
      return { secure_url, public_id };
    } catch (e) {
      console.log(e);
      // If an error occurs, return undefined
      return undefined;
    }
    // If no file was uploaded, return undefined
  } else {
    return undefined;
  }
};
