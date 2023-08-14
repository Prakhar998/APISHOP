import { Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
export class SystemController {
  static healthCheck(req: Request, res: Response) {
    return ResponseUtil.sendResponse(
      res,
      "OK",
      {
        message: "App is up and running",
        serverIP: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress,
      },
      null,
      200
    );
  }
}
