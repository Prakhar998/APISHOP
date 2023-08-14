import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "../errors/forbidden-error";
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw new ForbiddenError("Token not defined!");
  }
  next();
};

export const validateToken = function (token: string, sessionToken) {
  try {
    const publickKey: any = process.env.JWT_KEY;
    return jwt.verify(sessionToken, process.env.JWT_KEY) as UserPayload;
  } catch (e) {
    throw new Error("Invalid Token");
  }
};
