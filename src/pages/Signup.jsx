import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import logo from "../assets/crib.png";
import "../styles/animatedBackground.css";
import SlidePage from "../components/SlidePage";
import AnimatedButton from "../components/AnimatedButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
      valid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup Submitted ✅", formData);
      // Later: connect this to your Spring Boot API
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
          <img
            src={logo}
            alt="Crib Logo"
            style={{ width: 80, marginBottom: 16 }}
          />

          <Typography
            component="h1"
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2.0rem" }, fontWeight: "bold" }}
          >
            Create a Crib
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 1, width: { xs: "100%", sm: "80%" } }}
          >
            <Box
            sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                flexWrap: "wrap",
            }}
            >
            <TextField
                name="firstname"
                label="First Name"
                fullWidth
                required
                value={formData.firstname}
                onChange={handleChange}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
                sx={{ flex: 1 }} // make it take equal space
            />

            <TextField
                name="lastname"
                label="Last Name"
                fullWidth
                required
                value={formData.lastname}
                onChange={handleChange}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
                sx={{ flex: 1 }} // equal width as first name
            />
            </Box>

            <TextField
              margin="normal"
              name="username"
              label="Username"
              fullWidth
              required
              value={formData.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <TextField
              margin="normal"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="new-email"
            />

            <TextField
              margin="normal"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </AnimatedButton>

            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
            >
              Already have a Crib? <a style={{textDecoration: "none"}} href="/login">Login</a>
            </Typography>
          </Box>
        </Paper>
      </SlidePage>
    </Container>
  );
}
