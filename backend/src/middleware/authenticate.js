const ApiError = require("../utils/apiError");
const { verifyAccessToken } = require("../utils/jwt");

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("Thiếu access token"));
  }
  const token = header.split(" ")[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = payload; // { id, role, email }
    next();
  } catch (err) {
    next(ApiError.unauthorized("Access token không hợp lệ hoặc đã hết hạn"));
  }
}

module.exports = authenticate;
