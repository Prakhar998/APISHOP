import { ValidationError } from "class-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("Error in Request!");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => {
      return {
        field: error.property,
        message: error.constraints![Object.keys(error.constraints!)[0]],
      };
    });
  }
}
