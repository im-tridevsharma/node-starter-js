const dotenv = require("dotenv");
dotenv.config();

//express router instance
const { Router } = require("express");
const router = Router();

//handler for all welcome routes
const welcomeRouteHandler = require("@routes/api/welcome.routes");

//handle welcome routes
router.use(welcomeRouteHandler);

module.exports = router;
