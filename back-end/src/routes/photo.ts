import express from "express";
import { photoInsertValidation } from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidate";
import PhotoController from "../controllers/PhotoController";
import { imageUpload } from "../middlewares/imageUpload";

const photoRoutes = express();

photoRoutes.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  PhotoController.insertPhoto
);

export default photoRoutes;
