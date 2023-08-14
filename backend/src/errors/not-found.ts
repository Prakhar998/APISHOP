import { AppConstant } from "../constant/constant";
import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
  statusCode: number = AppConstant.CODE_NOT_FOUND;
  constructor(public message: string = AppConstant.MSG_NOT_FOUND) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
