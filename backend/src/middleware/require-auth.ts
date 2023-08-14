import { NextFunction, Request, Response } from "express";
import { UnAuthorizeError } from "../errors/unauthorize-errors";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.currentUser) {
    throw new UnAuthorizeError("You need signin to access this resource");
  }
  if (!req?.currentUser!["isActive"]) {
    throw new UnAuthorizeError(`Your account has been blocked,contact with administrator`);
  }
  next();
};
