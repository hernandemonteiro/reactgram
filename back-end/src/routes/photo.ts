import express from "express";
import {
  commentValidation,
  photoInsertValidation,
  photoUpdateValidation,
} from "../middlewares/photoValidation";
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

photoRoutes.get("/user/:id", authGuard, PhotoController.getUserPhotos);

photoRoutes.get("/:id", authGuard, PhotoController.getPhotoById);

photoRoutes.put(
  "/:id",
  authGuard,
  photoUpdateValidation(),
  validate,
  PhotoController.updatePhoto
);

photoRoutes.put("/like/:id", authGuard, PhotoController.likePhoto);

photoRoutes.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  PhotoController.commentPhoto
);

export default photoRoutes;
