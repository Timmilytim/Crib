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
import logo from "../assets/crib.png";
import "../styles/animatedBackground.css";
import SlidePage from "../components/SlidePage";
import AnimatedButton from "../components/AnimatedButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({ password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // carry email forward if needed

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { password: "", confirm: "" };

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!confirm) {
      newErrors.confirm = "Please confirm your password";
      valid = false;
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);

      // TODO: call Spring Boot API: reset password for {email, password}
      console.log("Password reset ✅", { email, password });

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
          elevation={6}
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
          <img src={logo} alt="Crib Logo" style={{ width: 80, marginBottom: 16 }} />

          {!submitted ? (
            <>
              <Typography
                component="h1"
                variant="h5"
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: "bold" }}
              >
                Reset Password
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{
                  mb: 0,
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  color: "text.secondary",
                }}
              >
                Enter your new password below.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "80%" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  error={Boolean(errors.confirm)}
                  helperText={errors.confirm}
                  autoComplete="new-password"
                />

                <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }}>
                  Reset Password
                </AnimatedButton>
              </Box>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center" }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "success.main",
                  mb: 2,
                }}
              >
                🎉 Password Reset!
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Redirecting you to login...
              </Typography>
            </motion.div>
          )}
        </Paper>
      </SlidePage>
    </Container>
  );
}
