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

photoRoutes.delete("/:id", authGuard, PhotoController.deletePhoto);

photoRoutes.get("/", authGuard, PhotoController.getAllPhotos);

export default photoRoutes;
