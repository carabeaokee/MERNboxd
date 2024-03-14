import multer from "multer";
import path from "path";

// Multer configuration
export const multerUpload = multer({
  // Configure the storage properties
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1 * 1024 * 1024, // limit file size to 1MB
  },
  // Configure the file filter
  fileFilter: (req, file, cb) => {
    // Check if the file extension is supported
    let extension = path.extname(file.originalname);
    // If the extension is not supported, return an error
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    // If the extension is supported, return no error
    cb(null, true);
  },
});
