import express from "express";
import UserController from "../controllers/UserController";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidate";
import { imageUpload } from "../middlewares/imageUpload";
import { loginValidation } from "../middlewares/loginValidation";
import { userUpdateValidation } from "../middlewares/userUpdateValidation";
import { userCreateValidation } from "../middlewares/userValidation";

const userRouter = express();

userRouter.post(
  "/register",
  userCreateValidation(),
  validate,
  UserController.register
);

userRouter.post("/login", loginValidation(), validate, UserController.login);

userRouter.get("/profile", authGuard, UserController.getCurrentUser);

userRouter.put(
  "/update",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  UserController.update
);

userRouter.get("/:id", UserController.getUserById);

export default userRouter;
