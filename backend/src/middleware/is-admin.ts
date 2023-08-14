import { NextFunction, Request, Response } from "express";
import { UnAuthorizeError } from "../errors/unauthorize-errors";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser!["isAdmin"]) {
    throw new UnAuthorizeError("Don't have enough permission to access this resource");
  }
  next();
};
