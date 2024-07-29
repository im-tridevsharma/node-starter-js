const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, splat, json } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// Custom format for logging
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Determine if the app is in development mode
const isDevelopment = process.env.NODE_ENV === "development";

// Create the logger
const logger = createLogger({
  level: ["info"],
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  defaultMeta: { logger: "winston" },
  transports: [
    // Daily rotating file transport for logs
    new DailyRotateFile({
      filename: path.join(__dirname, "../logs", "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "../logs", "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "../logs", "rejections.log"),
    }),
  ],
});

// Add console transport if in development mode
if (isDevelopment) {
  logger.add(new transports.Console({
    format: combine(format.colorize(), logFormat),
  }));
}

module.exports = logger;
