const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

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
morgan.token('response-body', (req, res) => {
  return res.responseBody ? JSON.stringify(res.responseBody) : '';
});

// Function to create Morgan logger
function createLogger() {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    // Development environment: log to console
    return morgan("dev");
  } else {
    // Production environment: log to file with rotation
    return morgan(
      "[method]: :method [url]: :url [status]: :status [length]: :res[content-length] - [time]: :response-time ms [payload]: :body [response]: :response-body",
      { stream: accessLogStream }
    );
  }
}

module.exports = createLogger;