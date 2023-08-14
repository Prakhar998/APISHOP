import express, { Express, NextFunction, Request, Response } from "express";
import cors = require("cors");
import bodyParser from "body-parser";
import { NotFoundError } from "./errors/not-found";
import { userRoute } from "./routes/user-route";
import errorHandler from "./middleware/error-handler";
import cookieSession from "cookie-session";
import { adminRoute } from "./routes/admin-route";
import { productRoute } from "./routes/product-route";
import { SystemRoute } from "./routes/system-route";

const app: Express = express();
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, secure: false, maxAge: 24 * 60 * 60 * 1000 }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productRoute);
app.use("/api/system", SystemRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

export default app;
