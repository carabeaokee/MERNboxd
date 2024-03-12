import multer from "multer";
import path from "path";

export const multerUpload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1 * 1024 * 1024, // limit file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
      return;
    }
    cb(null, true);
  },
});
