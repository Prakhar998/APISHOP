import { AppConstant } from "../constant/constant";
import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
  statusCode: number = AppConstant.CODE_BAD_REQUEST;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
