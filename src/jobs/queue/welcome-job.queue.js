const { Queue } = require("bullmq");

//redis
const redisOptions = require("@config/redis.config");

//app logger
const appLogger = require("@config/app-logger.config");

const welcomeJobQueue = new Queue("welcomeJobQueue", redisOptions);

const addToWelcomeJobQueue = async (data) => {
  try {
    const job = await welcomeJobQueue.add("welcomeJob", data);

    appLogger.info(`Job added to Queue One with ID: ${job.id}`);
  } catch (err) {
    appLogger.error("Error adding job to welcome Queue:", err);
  }
};

module.exports = { addToWelcomeJobQueue };
