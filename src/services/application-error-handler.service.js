const appLogger = require("@config/app-logger.config");

module.exports = (err, req, res, next) => {
  appLogger.error(`Error occurred: ${err.message}`, {
    method: req.method,
    url: req.url,
    stack: err.stack,
    statusCode: err.statusCode || 500,
  });

  res.status(err.statusCode || 500).json({
    error: {
      message: err.message,
      status: err.statusCode || 500,
    },
  });
};
