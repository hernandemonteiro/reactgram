import { UserRepository } from "../models/User";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "";

export async function authGuard(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ errors: ["Acesso Negado."] });

  try {
    const verified: any = jwt.verify(token, jwtSecret);

    req.user = await UserRepository.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["token inválido!"] });
  }
}
