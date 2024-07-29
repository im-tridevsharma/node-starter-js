module.exports = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      status: "error",
      statusCode: 429,
      message: "You have exceeded the rate limit. Please try again later.",
    });
  },
  skipSuccessfulRequests: false, // Count successful requests as well as failed ones
};
