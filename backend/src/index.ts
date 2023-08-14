import app from "./app";
import * as dotenv from "dotenv";
import errorHandler from "./middleware/error-handler";
import { dbConnect } from "./config/dbConnect";
import logger from "./utils/logging";

dotenv.config();
const PORT = process.env.PORT || 5005;
app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`✨ Server is running on port ${PORT}`);
});
dbConnect();
