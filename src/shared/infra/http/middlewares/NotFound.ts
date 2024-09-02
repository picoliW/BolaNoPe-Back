import { Request, Response } from "express";
import { ROUTE_DOES_NOT_EXIST } from "@shared/consts/ErrorMessageConsts";
import { HttpStatusCode } from "@shared/enums/HttpStatusCode";

export const NotFound = (_: Request, res: Response) =>
  res.status(HttpStatusCode.NOT_FOUND).send(ROUTE_DOES_NOT_EXIST);
