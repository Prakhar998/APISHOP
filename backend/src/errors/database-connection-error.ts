import { AppConstant } from "../constant/constant";
import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = AppConstant.CODE_INTERNAL_SERVER_ERROR;

  reason = AppConstant.MSG_DB_CONNECTION_ERROR;
  constructor() {
    super("");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.reason }];
  }
}
