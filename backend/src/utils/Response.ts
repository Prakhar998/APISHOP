import { Response } from "express";

export class ResponseUtil {
  static sendResponse<T>(
    res: Response,
    message: string,
    data: T,
    paginationInfo: any = null,
    statusCode: number = 200,
    count?: number
  ): Response<T> {
    return res.status(statusCode).json({
      count,
      success: true,
      message,
      data,
      paginationInfo,
    });
  }
  static sendError<T>(res: Response, message: string | null, statusCode = 500, error: T): Response<T> {
    return res.status(statusCode).send({ customMessage: message, error: error });
  }
}
