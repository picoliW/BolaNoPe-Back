import { NextFunction, Request, Response } from "express";
import { CreateReserveSchema } from "./CreateReserveSchema";

export const validateCreateReserve = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = CreateReserveSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
