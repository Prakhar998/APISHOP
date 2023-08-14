import { createLogger, transports, format } from "winston";
const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.message, stack: info.stack });
  }
  return info;
});
const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        enumerateErrorFormat(),
        format.colorize(),
        format.splat(),
        format.printf(({ timestamp, level, message, metadata }) => {
          return `[${timestamp}] ${level}: ${message}. metadata: ${JSON.stringify(metadata)}`;
        })
      ),
    }),
    new transports.File({
      dirname: "logs",
      filename: "apispocc_logs.log",
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(format.metadata(), format.timestamp()),
});
export default logger;
