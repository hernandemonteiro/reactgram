import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../models/User";
import dotEnv from "dotenv";
import mongoose from "mongoose";
dotEnv.config();

const jwtSecret = process.env.JWT_SECRET || "";
function generateToken(id) {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
}
class UserController {
  async createPasswordSalt(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async register(req, res) {
    const { name, email, password } = req.body;

    const user = await UserRepository.findOne({ email });

    if (user) {
      return res.status(422).json({ errors: ["Email já cadastrado!"] });
    }

    const passwordHash = await this.createPasswordSalt(password);

    const newUser = await UserRepository.create({
      name,
      email,
      password: passwordHash,
    });

    if (!newUser) {
      return res
        .status(422)
        .json({ errors: ["Houve um erro, por favor tente mais tarde!"] });
    }

    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserRepository.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado!"] });
      return;
    }
    if (
      !(await bcrypt.compare(
        password,
        user.password || "default_error_password"
      ))
    ) {
      res.status(422).json({ errors: ["Senha inválida!"] });
      return;
    }

    res.status(201).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  }

  async getCurrentUser(req, res) {
    const user = req.user;
    res.status(201).json(user);
  }

  async update(req, res) {
    const { name, password, bio } = req.body;

    let profileImage = null;

    if (req.file) {
      profileImage = req.file.filename;
    }

    const reqUser = req.user;

    const user: any = await UserRepository.findById(
      new mongoose.Types.ObjectId(reqUser._id)
    );

    if (name) {
      user.name = name;
    }

    if (password) {
      const passwordHash = await this.createPasswordSalt(password);

      user.password = passwordHash;
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (bio) {
      user.bio = bio;
    }

    await user.save();

    res.status(200).json(user);
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserRepository.findById(
        new mongoose.Types.ObjectId(id)
      ).select("-password");
      !user
        ? res.status(404).json({ errors: ["Usuário não encontrado!"] })
        : res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ errors: ["Usuário(id) não encontrado!"] });
    }
  }
}

export default new UserController();
