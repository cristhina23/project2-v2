
// Not Found handler (404)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};



// Error Handler (500 - Internal Server Error)
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  });
};

module.exports = { notFound, errorHandler };
