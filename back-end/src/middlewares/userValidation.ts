import { body } from "express-validator";

export function userCreateValidation() {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório.")
      .isEmail()
      .withMessage("insira um e-mail em formato válido!"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no minímo 5 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas são diferentes.");
        }
        return true;
      }),
  ];
}
