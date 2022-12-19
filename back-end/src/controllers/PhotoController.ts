import { PhotoRepository } from "../models/Photo";
import mongoose from "mongoose";
import { UserRepository } from "../models/User";

class PhotoController {
  async insertPhoto(req, res) {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await UserRepository.findById(reqUser._id);

    const newPhoto = await PhotoRepository.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });

    if (!newPhoto) {
      res.status(422).json({
        errors: ["Houve um problema, por favor, tente novamente mais tarde!"],
      });
      return;
    }

    res.status(201).json(newPhoto);
  }

  async deletePhoto(req, res) {
    const { id } = req.params;

    const reqUser = req.user;

    const photo = await PhotoRepository.findById(
      new mongoose.Types.ObjectId(id)
    );

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    if (photo.userId != reqUser._id) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor, tente novamente mais tarde!"],
      });
      return;
    }

    await PhotoRepository.findByIdAndDelete(photo._id);

    res.status(200).json({
      id: photo._id,
      message: "Foto excluida com sucesso!",
    });
  }
}

export default new PhotoController();
