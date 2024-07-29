const httpStatus = require("http-status");

//get express group router instance
const Router = require("express-group-router");
const router = new Router();

//handle all the welcome routes
router.group("/welcome", (welcomeRouter) => {
    
    welcomeRouter.get("/", (req, res) => {
        return res.json({status: "success", statusCode: httpStatus.OK, message: "Hello from welcome route!"});
    });
});

module.exports = router.init();