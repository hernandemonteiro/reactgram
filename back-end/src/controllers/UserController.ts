import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../models/User";

class UserController {
  private jwtSecret;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
  }

  generateToken(id) {
    jwt.sign({ id }, this.jwtSecret || "", {
      expiresIn: "7d",
    });
  }

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
      token: this.generateToken(newUser._id),
    });
  }

  async login(req, res) {
    res.send("Login");
  }
}

export default new UserController();
