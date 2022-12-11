import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = "";

    if (req.baseUrl.includes("user")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    callback(null, `uploads/${folder}/`);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return callback(new Error("Por favor, envie apenas .png ou .jpg"));
    }
    callback(undefined, true);
  },
});
