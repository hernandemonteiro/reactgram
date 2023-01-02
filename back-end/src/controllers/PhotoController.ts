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
    try {
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
    } catch (error) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  }

  async getAllPhotos(req, res) {
    const photos = await PhotoRepository.find({})
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(photos);
  }

  async getUserPhotos(req, res) {
    const { id } = req.params;

    const photos = await PhotoRepository.find({ userId: id })
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(photos);
  }

  async getPhotoById(req, res) {
    const { id } = req.params;

    const photo = await PhotoRepository.findById(
      new mongoose.Types.ObjectId(id)
    );

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    res.json(200).json(photo);
  }

  async updatePhoto(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const reqUser = req.user;

    const photo = await PhotoRepository.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada."] });
      return;
    }

    if (photo.userId != reqUser._id) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
  }

  async likePhoto(req, res) {
    const { id } = req.params;

    const reqUser = req.user;

    const photo = await PhotoRepository.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({ errors: ["Você já curtiu esta foto."] });
      return;
    }

    photo.likes.push(reqUser._id);

    await photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "A foto foi curtida!",
    });
  }

  async commentPhoto(req, res) {
    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;

    const user = await UserRepository.findById(reqUser._id);

    const photo = await PhotoRepository.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "Comentário adicionado com sucesso!",
    });
  }

  async searchPhotos(req, res) {
    const { q } = req.query;

    const photos = await PhotoRepository.find({
      title: new RegExp(q, "i"),
    }).exec();

    res.status(200).json(photos);
  }
}

export default new PhotoController();
