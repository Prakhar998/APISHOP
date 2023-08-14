import mongoose from "mongoose";
import { AppConstant } from "../constant/constant";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { cloudinaryInstance } from "../services/cloudinary";
import logger from "../utils/logging";
import { startMailServer } from "./mailserver";
// import { startMailServer } from "./mailserver";
export const dbConnect = async () => {
  let mongo_env_db = "";
  if (process.env.NODE_ENV === "development") {
    mongo_env_db = check_env_isExist(process.env.MONGO_DEV_DB, AppConstant.MSG_DB_NOT_FOUND);
  } else {
    mongo_env_db = check_env_isExist(process.env.MONGO_PROD_DB, "MONGO_DB not defined");
  }

  const userName = check_env_isExist(process.env.MONGO_USERNAME, AppConstant.MSG_DB_URI_NOT_FOUND);
  const password = check_env_isExist(process.env.MONGO_PASSWORD, AppConstant.MSG_DB_PASSWORD_NOT_FOUND);
  await mongo_db_connect(userName, password, mongo_env_db);

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
};

export function check_env_isExist(env, errorMessage: string) {
  if (!env) {
    throw new Error(errorMessage);
  }
  return env;
}

const mongo_db_connect = async (username: string, password: string, db: string) => {
  try {
    await mongoose
      .connect(`mongodb+srv://${username}:${password}@apishop.5mvlsj0.mongodb.net/${db}?retryWrites=true&w=majority`)
      .then(() => {
        logger.info(`${AppConstant.MSG_DB_CONNECTION_SUCCESS} => ${db}`);
        cloudinaryInstance.config();
        startMailServer();
      });
  } catch (err: any) {
    throw new Error(err);
  }
};
