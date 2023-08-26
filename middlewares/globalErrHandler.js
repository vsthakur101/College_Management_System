const globalErrorHandler = (err, req, res, next) => {
  const { stack, message, status = "failed", statusCode = 500 } = err;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const notFound = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  next(err);
};

module.exports = {
  globalErrorHandler,
  notFound,
};
