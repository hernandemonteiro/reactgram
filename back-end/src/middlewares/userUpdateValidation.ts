import { body } from "express-validator";

export function userUpdateValidation() {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa de pelo menos 3 caracteres!"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Senha precisa ter no minimo caracteres"),
  ];
}
