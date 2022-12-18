import { PhotoRepository } from "../models/Photo";
import mongoose from "mongoose";

class PhotoController {
  async insertPhoto(req, res) {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    res.send("photo insert");
  }
}

export default new PhotoController();
