import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER } from "@shared/consts/ErrorConsts";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { CustomError } from "./interfaces/CustomError.interface";
import { SOMETHING_WRONG } from "@shared/consts/ErrorMessageConsts";
import { HttpStatusCode } from "@shared/enums/HttpStatusCode";

export const ErrorHandlerMiddleware = (
  err: BadRequestError | NotFoundError | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }

  const customError: CustomError = {
    statusCode: err.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: err.message || SOMETHING_WRONG,
    error: err.error || INTERNAL_SERVER,
  };

  res.status(customError.statusCode as number).json(customError);

  next();
};
