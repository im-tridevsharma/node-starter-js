const cron = require("node-cron");

//app logger
const appLogger = require("@config/app-logger.config");

//load all the tasks
const welcomeTask = require("@tasks/welcome.task");

// Define cron jobs
cron.schedule("0 0 * * *", async () => {
    try {
        await welcomeTask();

        appLogger.info("Welcome task completed successfully.");
    }catch(error) {
        appLogger.error('Error performing welcome task:', error);
    }
});

module.exports = cron;
