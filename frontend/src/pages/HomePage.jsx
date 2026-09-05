import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";

// Trang chủ tạm thời — chỉ để có chỗ hiển thị trạng thái đăng nhập lúc test tính năng Auth.
// Sẽ được thay bằng trang chủ thật (giới thiệu phòng khám, danh sách chuyên khoa...) ở bước
// làm tính năng "Tìm bác sĩ theo chuyên khoa".
export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper sx={{ p: 4, width: 420, textAlign: "center" }} elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Clinic Booking
        </Typography>

        {isAuthenticated ? (
          <>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Xin chào, <b>{user.fullName}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              ({user.email} — vai trò: {user.role})
            </Typography>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Bạn chưa đăng nhập.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
              <Button variant="contained" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                Đăng ký
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
}
