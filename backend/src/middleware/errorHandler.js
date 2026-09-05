const ApiError = require("../utils/apiError");

function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`Không tìm thấy route: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Lỗi hệ thống, vui lòng thử lại sau" : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.details ? { details: err.details } : {}),
  });
}

module.exports = { notFoundHandler, errorHandler };
