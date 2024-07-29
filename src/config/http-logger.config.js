const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const { createLogger, format, transports } = require("winston");
const CloudWatchTransport = require("winston-cloudwatch");

// Ensure logs directory exists
const logDirectory = path.join(__dirname, "../logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream for access logs
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
  maxFiles: 14, // keep 14 days of logs
});

// Create a custom token to log the request body
morgan.token("body", (req) => JSON.stringify(req.body));

// Create a custom token to log the response body
morgan.token("response-body", (req, res) => {
  return res.responseBody ? JSON.stringify(res.responseBody) : "";
});

// Determine if the app is in development mode
const isDevelopment = process.env.NODE_ENV === "development";
const logDriver = process.env.LOG_DRIVER || "file";

// Create a Winston logger
const winstonLogger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [],
});

if (logDriver === "cloud") {
  winstonLogger.add(
    new CloudWatchTransport({
      logGroupName: process.env.CLOUDWATCH_LOG_GROUP_NAME,
      logStreamName: process.env.CLOUDWATCH_LOG_STREAM_NAME,
      awsRegion: process.env.AWS_REGION,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      jsonMessage: true,
    })
  );
} else {
  winstonLogger.add(
    new transports.File({
      filename: path.join(__dirname, "../logs", "access.log"),
      maxsize: 20 * 1024 * 1024, // 20 MB
      maxFiles: 14, // keep 14 days of logs
      tailable: true,
    })
  );
}

// Create a custom stream for Morgan to use Winston
const stream = {
  write: (message) => {
    winstonLogger.info(message.trim());
  },
};

// Function to create Morgan logger
function createMorganLogger() {
  if (isDevelopment) {
    // Development environment: log to console
    return morgan("dev");
  } else {
    if (logDriver === "cloud") {
      // Production environment: log to CloudWatch
      return morgan(
        "[method]: :method [url]: :url [status]: :status [length]: :res[content-length] - [time]: :response-time ms [payload]: :body [response]: :response-body",
        { stream }
      );
    } else {
      // Production environment: log to file with rotation
      return morgan(
        "[method]: :method [url]: :url [status]: :status [length]: :res[content-length] - [time]: :response-time ms [payload]: :body [response]: :response-body",
        { stream: accessLogStream }
      );
    }
  }
}

module.exports = createMorganLogger;