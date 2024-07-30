const httpStatus = require("http-status");
const { addToWelcomeJobQueue } = require("@queues/welcome-job.queue");

const sayWelcome = async (req, res) => {
  //add job to welcome queue
  await addToWelcomeJobQueue({ message: "Welcome from Job!" });

  return res.json({
    status: "success",
    statusCode: httpStatus.OK,
    message: "Hello from welcome route!",
  });
};

const welcomeController = {
    sayWelcome
}

module.exports = welcomeController;