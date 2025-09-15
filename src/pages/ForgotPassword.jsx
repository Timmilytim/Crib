import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import logo from "../assets/crib.png";
import "../styles/animatedBackground.css";
import SlidePage from "../components/SlidePage";
import AnimatedButton from "../components/AnimatedButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setSubmitted(true);

    // TODO: Call Spring Boot API to send reset OTP
    console.log("Reset OTP sent ✅", email);

    // Simulate short delay then redirect
    setTimeout(() => {
      navigate("/verify-otp", { state: { email } });
    }, 2000);
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
          <img
            src={logo}
            alt="Crib Logo"
            style={{ width: 80, marginBottom: 16 }}
          />

          {!submitted ? (
            <>
              <Typography
                component="h1"
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                  fontWeight: "bold",
                }}
              >
                Forgot Password
              </Typography>

              <Typography
                variant="body2"
                align="center"
                sx={{
                  mb: 3,
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  color: "text.secondary",
                }}
              >
                Enter your email and we’ll send you a reset code.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  name="email"
                  label="Email Address"
                  fullWidth
                  required
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(error)}
                  helperText={error}
                />

                <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }}>
                  Send Reset Code
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
                ✅ Code Sent!
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Redirecting you to OTP verification...
              </Typography>
            </motion.div>
          )}
        </Paper>
      </SlidePage>
    </Container>
  );
}
