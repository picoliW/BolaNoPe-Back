import { NOT_FOUND } from "@shared/consts/ErrorConsts";
import { HttpStatusCode } from "@shared/enums/HttpStatusCode";

export class NotFoundError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.NOT_FOUND;
    this.error = NOT_FOUND;
  }
}
