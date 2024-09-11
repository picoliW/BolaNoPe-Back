import { NextFunction, Request, Response } from "express";
import { UpdateReserveSchema } from "./UpdateReserveSchema";

export const validateUpdateReserve = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = UpdateReserveSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
