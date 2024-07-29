function responseBodyInterceptor(req, res, next) {
  const originalSend = res.send;

  res.send = function (body) {
    res.responseBody = body;
    return originalSend.apply(res, arguments);
  };

  next();
}

module.exports = responseBodyInterceptor;
