const csrf = require("csrf");

const csrfProtection = csrf();
const secret = process.env.CSRF_SECRET || "your-secret-key"; // Set a secret for CSRF token generation

//load messages
const messages = require("@lang/messages");

// Middleware to handle CSRF token creation and validation
function csrfMiddleware(req, res, next) {
  // Generate a CSRF token and set it in the cookies
  const token = csrfProtection.create(secret);

  // Set CSRF token in a cookie
  res.cookie("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
    sameSite: "strict",
    maxAge: 3600 * 1000, // Token validity period (1 hour in milliseconds)
  });

  // Attach the token to response locals
  res.locals.csrfToken = token;

  // Verify CSRF token in requests
  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE"
  ) {
    const tokenFromCookie = req.cookies["csrf-token"];
    const tokenFromRequest =
      req.headers["csrf-token"] ||
      req.body._csrf ||
      req.query._csrf ||
      tokenFromCookie;

    if (!csrfProtection.verify(secret, tokenFromRequest)) {
      return res.status(403).json({
        status: "failed",
        statusCode: 403,
        message: messages.app.errors.csrf_token_error,
      });
    }
  }

  next();
}

module.exports = csrfMiddleware;
