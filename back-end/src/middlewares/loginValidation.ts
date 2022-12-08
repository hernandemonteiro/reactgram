import { body } from "express-validator";

export function loginValidation() {
  return [
    body("email")
      .isString()
      .withMessage("Email não digitado!")
      .isEmail()
      .withMessage("Digite um email válido"),
    body("password")
      .isString()
      .withMessage("Senha não pode estar vazia.")
      .isLength({ min: 5 })
      .withMessage("Senha precisa ter no minimo 5 caracteres."),
  ];
}
