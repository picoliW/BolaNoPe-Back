import { VALIDATION } from "@shared/consts/ErrorConsts";
import { HttpStatusCode } from "@shared/enums/HttpStatusCode";

export class ValidationError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.error = VALIDATION;
  }
}
