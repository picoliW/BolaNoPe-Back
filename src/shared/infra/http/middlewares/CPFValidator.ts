import { cpf } from "cpf-cnpj-validator";
import { Request, Response, NextFunction } from "express";

export default function CPFValidator(
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response {
  const { cpf: cpfValue } = request.body;

  if (cpfValue && !cpf.isValid(cpfValue)) {
    return response.status(400).json({ message: "Invalid CPF" });
  }

  return next();
}
