import MailService from "../services/mail/mailService";
import logger from "../utils/logging";

export async function startMailServer() {
  logger.info("Connection with SMTP server ...");
  const mailService = MailService.getInstance();
  if (process.env.NODE_ENV === "development") {
    await mailService.createLocalConnection();
  } else {
    await mailService.createConnection();
  }
  logger.info("SMTP Server Connected");
  logger.info("SMTP Connection verified");
}
