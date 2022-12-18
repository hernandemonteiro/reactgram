import { PhotoRepository } from "../models/Photo";
import mongoose from "mongoose";

class PhotoController {
  async insertPhoto(req, res) {
    const { title } = req.body;
    const image = req.file.filename;

    console.log(req.body);

    res.send("photo insert")
  }
}

export default new PhotoController();
