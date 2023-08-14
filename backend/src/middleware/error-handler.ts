import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AppConstant } from "../constant/constant";
import { CustomError } from "../errors/custom-errors";
import { ResponseUtil } from "../utils/Response";

export function catchErrors(fn) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return ResponseUtil.sendError(res, err.message, err.statusCode, err.serializeErrors());
  }

  if (err.length > 0 && err[0] instanceof ValidationError) {
    const errors = formatErrors(err);
    return res.status(422).send({
      errors: [{ message: AppConstant.MSG_INVALID_INPUT, errors: errors }],
    });
  }

  return ResponseUtil.sendError(res, err.message, AppConstant.CODE_INTERNAL_SERVER_ERROR, err);
}

export function formatErrors(err: any) {
  const errors = {};
  err.forEach((e) => {
    if (!errors[e.property]) {
      errors[e.property] = [];
    }

    errors[e.property].push(e.constraint[Object.keys(e.constraints)[0]]);
  });
  return errors;
}

export default errorHandler;
