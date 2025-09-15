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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // Password validation
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted ✅", { email, password });
      // Here, connect to your Spring Boot API later
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

          <Typography
            component="h1"
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2.0rem" }, fontWeight: "bold" }}
          >
            Login to The Crib
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 1, width: { xs: "100%", sm: "80%" } }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="new-email"
            />

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
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />


            <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }}>
              Login
            </AnimatedButton>

            <Typography
              variant="body2"
              align="center"
              sx={{fontSize: { xs: "0.8rem", sm: "0.9rem"}, mb: 1.5}}
            >
              Don’t have a Crib? <a style={{textDecoration: "none"}}  href="/signup">Sign up</a>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
            >
             👉 <a style={{textDecoration: "none"}} href="/forgot-password">Misplaced your keys?</a> 👈
            </Typography>
          </Box>
        </Paper>
      </SlidePage>
    </Container>
  );
}
