//get express group router instance
const Router = require("express-group-router");
const router = new Router();

//controller
const welcomeController = require("@controllers/welcome.controller");

//handle all the welcome routes
router.group("/welcome", (welcomeRouter) => {
  welcomeRouter.get("/", welcomeController.sayWelcome);
});

module.exports = router.init();
