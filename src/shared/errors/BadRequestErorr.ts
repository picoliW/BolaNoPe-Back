import { BAD_REQUEST } from "@shared/consts/ErrorConsts";
import { HttpStatusCode } from "@shared/enums/HttpStatusCode";

export class BadRequestError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.error = BAD_REQUEST;
  }
}
