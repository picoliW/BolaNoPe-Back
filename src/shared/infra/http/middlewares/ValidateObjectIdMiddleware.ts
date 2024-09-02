import { ValidateObjectId } from "./ValidateObjectIdSchema";
import { NextFunction, Request, Response } from "express";

export const validateObjectIdMIddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = ValidateObjectId.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
