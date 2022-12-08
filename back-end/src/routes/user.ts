import express from "express";
import UserController from "../controllers/UserController";
import { validate } from "../middlewares/handleValidate";
import { userCreateValidation } from "../middlewares/userValidation";

const userRouter = express();

userRouter.post(
  "/register",
  userCreateValidation(),
  validate,
  UserController.register
);

export default userRouter;
