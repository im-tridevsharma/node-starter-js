const httpStatus = require("http-status");

//get express group router instance
const Router = require("express-group-router");
const router = new Router();

//queue
const { addToWelcomeJobQueue } = require("@queues/welcome-job.queue");

//handle all the welcome routes
router.group("/welcome", (welcomeRouter) => {
  welcomeRouter.get("/", async (req, res) => {
    //add job to welcome queue
    await addToWelcomeJobQueue({ message: "Welcome from Job!" });

    return res.json({
      status: "success",
      statusCode: httpStatus.OK,
      message: "Hello from welcome route!",
    });
  });
});

module.exports = router.init();
