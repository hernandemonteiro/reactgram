import express, { Application } from "express";
import Database from "./infra/db";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import testRouter from "./routes/test";
import userRouter from "./routes/user";

dotenv.config();
class StartUp {
  public app: Application;
  private _db: Database = new Database();

  constructor() {
    this.app = express();
    this.routes();
    this._db.connect();
  }

  routes() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cors({ credentials: true, origin: "https://localhost:3000" }));

    this.app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    // imported routes;
    this.app.use("/api/test/", testRouter);
    this.app.use("/api/user/", userRouter);
  }
}

export default new StartUp();
