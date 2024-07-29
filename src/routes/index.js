//express router instance
const httpStatus = require("http-status");
const { Router } = require("express");
const router = Router();

//handler for all api routes
const apiRouteHandler = require("@routes/api");

//load messages
const messages = require("@config/messages.config");

const currentApiVersion = process.env.API_VERSION || "v1";

//handle api routes
router.use(`/api/${currentApiVersion}`, apiRouteHandler);

//index route
router.get("/", (req, res) => {
  return res.status(httpStatus.OK).json({
    status: "success",
    statusCode: httpStatus.OK,
    message: messages.app.all_ok,
  });
});

// 404 handler
router.use((req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    status: "failed",
    statusCode: httpStatus.NOT_FOUND,
    message: messages.app.errors.page_not_found,
  });
});

module.exports = router;
