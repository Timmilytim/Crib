import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";

import logo from "../assets/crib.png";
import "../styles/animatedBackground.css";
import SlidePage from "../components/SlidePage";
import AnimatedButton from "../components/AnimatedButton";
import CustomSnackbar from "../components/CustomSnackbar";
import { login } from "../api/authService";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
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
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            width: { xs: "100%", sm: "90%", md: "70%", lg: "50%" },
            mx: "auto",
          }}
        >
          <motion.img
            src={logo}
            alt="Crib Logo"
            style={{ width: 80, marginBottom: 16 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <Typography
            component="h1"
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: "bold" }}
          >
            Login to The Crib
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 1, width: { xs: "100%", sm: "80%" } }}
          >
            <motion.div whileFocus={{ scale: 1.02 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                autoComplete="new-email"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </AnimatedButton>

            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, mb: 1.5 }}
            >
              Don’t have a Crib?{" "}
              <a href="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
                Sign up
              </a>
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
            >
              👉{" "}
              <a href="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
                Misplaced your keys?
              </a>{" "}
              👈
            </Typography>
          </Box>
        </Paper>
      </SlidePage>

      {/* Snackbar */}
      {snackbarMessage && <CustomSnackbar message={snackbarMessage} />}
    </Container>
  );
}
