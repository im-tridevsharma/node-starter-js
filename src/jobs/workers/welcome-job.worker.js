const { Worker } = require("bullmq");

//redis
const redisOptions = require("@config/redis.config");

//app logger
const appLogger = require("@config/app-logger.config");

const welcomeJobworker = new Worker(
  "welcomeJobQueue",
  async (job) => {
    try {
      appLogger.info(`Processing job from Welcome Queue: ${job.id}`);
      appLogger.info(`Job data: ${JSON.stringify(job.data)}`);

      // Simulate job processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      throw err;
    }
  },
  redisOptions
);

welcomeJobworker.on("completed", (job) => {
  appLogger.info(`Job ${job.id} from Welcome Queue completed successfully`);
});

welcomeJobworker.on("failed", (job, err) => {
  appLogger.info(`Job ${job.id} from Welcome Queue failed with error:`, err);
});
