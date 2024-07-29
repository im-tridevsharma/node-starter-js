module.exports = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"], // Add any trusted CDN sources here
      "style-src": ["'self'"], // Add any trusted CDN sources here
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'"], // Add any API endpoints you need to connect to
      "font-src": ["'self'"],
      "object-src": ["'none'"],
      "frame-ancestors": ["'none'"],
      "form-action": ["'self'"],
      "upgrade-insecure-requests": [],
    },
  },
  dnsPrefetchControl: { allow: false },
  expectCt: { maxAge: 86400, enforce: true }, // 24 hours
  frameguard: { action: "deny" }, // Prevent clickjacking
  hidePoweredBy: true, // Remove X-Powered-By header
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // 1 year HSTS with preload
  ieNoOpen: true, // Set X-Download-Options to prevent IE from executing downloads
  noSniff: true, // Prevent MIME-type sniffing
  permittedCrossDomainPolicies: { policy: "none" }, // Block Adobe Flash/Acrobat cross-domain policies
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Control the Referrer header
  xssFilter: true, // Enable XSS filtering
};
