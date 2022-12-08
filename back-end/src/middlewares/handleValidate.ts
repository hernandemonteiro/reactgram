import { validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Array<string> = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  return res.status(422).json({
    errors: extractedErrors,
  });
}
