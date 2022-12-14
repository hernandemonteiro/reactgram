import { body } from "express-validator";

export function photoInsertValidation() {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O titulo é obrigatório!")
      .isString()
      .withMessage("O titulo é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("o titulo precisa ter no minimo 3 caracteres!"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
}

export function photoUpdateValidation() {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O titulo é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("o titulo precisa ter no minimo 3 caracteres!"),
  ];
}

export function commentValidation() {
  return [body("comment").isString().withMessage("O comentário é obrigatório")];
}
