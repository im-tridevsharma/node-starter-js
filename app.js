/**
 * Start of the Node Js Application using Express.
 * ----------------Let's Start-------------------
 */

//register module alias
require("module-alias/register");

//load env variables
require("dotenv").config();

/* Get all the modules required... */
const express = require("express");
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const applicationRouteHandler = require("@routes"); //main route handler
const applicationErrorHandler = require("@services/application-error-handler.service");

//get all the configs
const helmetOptions = require("@config/helmet.config");
const rateLimitOptions = require("@config/express-rate-limit.config");
const httpLogger = require("@config/http-logger.config");

//get all the middlewares
const responseBodyInterceptor = require("@middlewares/response-interceptor.middleware");
const csrfProtection = require("@middlewares/csrf.middleware");

//application instance
const app = express();

//security middlewares
app.use(helmet(helmetOptions));

//express middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Apply CSRF protection middleware
app.use(csrfProtection);

//request limiter
app.use(expressRateLimit(rateLimitOptions));

// response body interceptor middleware
app.use(responseBodyInterceptor);

//logger
app.use(httpLogger());

//handle all the requests
app.use(applicationRouteHandler);

//application unexpected error handler
app.use(applicationErrorHandler);

//start the application
const PORT = process.env.SERVER_PORT || 3000; //default port
const applicationMode = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(
    `Application is running on port: ${PORT} | Application Mode: ${applicationMode}`
  );
});