import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Chưa có MainLayout/ProtectedRoute ở bước này — sẽ thêm khi có tính năng cần layout
// dùng chung (nav bar, sidebar...) hoặc route cần bảo vệ theo vai trò.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
