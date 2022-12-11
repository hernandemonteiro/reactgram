import express from "express";
import UserController from "../controllers/UserController";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidate";
import { loginValidation } from "../middlewares/loginValidation";
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

export default userRouter;
