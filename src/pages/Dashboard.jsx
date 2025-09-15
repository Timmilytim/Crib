import { Container, Typography, Box, Paper, Button } from "@mui/material";
import SlidePage from "../components/SlidePage";
import "../styles/animatedBackground.css";

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container
      maxWidth="xxl"
      className="animated-bg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <SlidePage>
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            width: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            🏠 Welcome to The Crib
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            You’ve successfully logged in. This dashboard will be your entry
            point to all integrated backend features we build in the future 🚀
          </Typography>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
              Explore Features
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ borderRadius: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </SlidePage>
    </Container>
  );
}
