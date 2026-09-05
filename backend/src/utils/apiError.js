class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, details);
  }
  static unauthorized(message = "Chưa xác thực") {
    return new ApiError(401, message);
  }
  static forbidden(message = "Không có quyền thực hiện") {
    return new ApiError(403, message);
  }
  static notFound(message = "Không tìm thấy dữ liệu") {
    return new ApiError(404, message);
  }
  static conflict(message) {
    return new ApiError(409, message);
  }
}

module.exports = ApiError;
