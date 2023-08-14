import { AppConstant } from "../constant/constant";
import { CustomError } from "./custom-errors";

export class UnAuthorizeError extends CustomError {
  statusCode: number = AppConstant.CODE_UNAUTHORIZE_CODE;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnAuthorizeError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
