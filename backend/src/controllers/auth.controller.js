const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
});

const refreshToken = asyncHandler(async (req, res) => {
  const result = await authService.refreshAccessToken(req.body.refreshToken);
  res.json({ success: true, data: result });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.id);
  res.json({ success: true, message: "Đăng xuất thành công" });
});

module.exports = { register, login, refreshToken, logout };
