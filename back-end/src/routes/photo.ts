import express from "express";
import { photoInsertValidation } from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidate";

const photoRoutes = express();

photoRoutes.get("", () => {});

export default photoRoutes;
