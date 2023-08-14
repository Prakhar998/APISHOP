export class AppConstant {
  //status code
  static CODE_BAD_REQUEST: number = 400;
  static CODE_INTERNAL_SERVER_ERROR: number = 500;
  static CODE_NOT_FOUND: number = 404;
  static CODE_UNAUTHORIZE_CODE: number = 401;
  static CODE_FORBIDDEN_CODE: number = 401;
  static OTP_LENGTH = 6;
  static APP_NAME = "ApiShop";

  //app string
  static MSG_DB_CONNECTION_ERROR = "Error Connecting to database";
  static MSG_NOT_FOUND = "Route Not found";
  static MSG_DB_URI_NOT_FOUND = "❌ MONGO_URI not defined";
  static MSG_DB_USER_NOT_FOUND = "❌ MONGO_USERNAME not defined";
  static MSG_DB_PASSWORD_NOT_FOUND = "❌ MONGO_PASSWORD not defined";
  static MSG_DB_NOT_FOUND = "❌ MONGO_DB not defined";
  static MSG_DB_CONNECTION_SUCCESS = "🎉 MongoDB Connected ";
  static MSG_INVALID_INPUT = "Invalid  Input";
  static MSG_ACCOUNT_CREATION_FAILED = "Account Creation failed!, try again after some time";
  static MAIN_FOLDER_UPLOAD_MSG = "upload file path not found!";
}
