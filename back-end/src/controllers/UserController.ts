import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../models/User";
import dotEnv from "dotenv";
dotEnv.config();

const jwtSecret = process.env.JWT_SECRET || "";
function generateToken(id) {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
}
class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;

    const user = await UserRepository.findOne({ email });

    if (user) {
      return res.status(422).json({ errors: ["Email já cadastrado!"] });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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
}

export default new UserController();
