import { AppConstant } from "../constant/constant";
import { CustomError } from "./custom-errors";

export class ForbiddenError extends CustomError {
  statusCode: number = AppConstant.CODE_FORBIDDEN_CODE;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
