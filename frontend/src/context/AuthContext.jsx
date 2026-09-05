import { createContext, useContext, useMemo, useState } from "react";
import authService from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Lazy initializer — chỉ đọc localStorage 1 lần lúc mount, không đọc lại mỗi lần re-render.
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function persistSession({ user: sessionUser, accessToken, refreshToken }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  }

  async function login(email, password) {
    const { data } = await authService.login({ email, password });
    persistSession(data.data);
    return data.data.user;
  }

  async function register(payload) {
    const { data } = await authService.register(payload);
    persistSession(data.data);
    return data.data.user;
  }

  async function logout() {
    try {
      await authService.logout();
    } catch (err) {
      // Bỏ qua lỗi mạng khi logout — vẫn phải xóa session ở client dù server không phản hồi được.
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, login, register, logout, isAuthenticated: !!user }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải được dùng trong AuthProvider");
  return ctx;
}
