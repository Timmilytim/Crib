import { useState, useRef } from "react";
import { verifyOtp } from "../api/authService";
import { useLocation } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import logo from "../assets/crib.png";
import "../styles/animatedBackground.css";
import SlidePage from "../components/SlidePage";
import AnimatedButton from "../components/AnimatedButton";
import CustomSnackbar from "../components/CustomSnackbar";
import RedirectMessage from "../components/RedirectMessage"; // 👈 import reusable component

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [verified, setVerified] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const email = location.state?.email;

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length === 6) {
      try {
        const res = await verifyOtp(email, code);
        if (res.data.status === "SUCCESS") {
          showSnackbar("OTP Verified Successfully 🎉", "success");
          setVerified(true); // 👈 trigger redirect message
        } else {
          showSnackbar("Invalid OTP ❌", "error");
        }
      } catch (err) {
        console.error(err);
        showSnackbar("Verification failed ❌", "error");
      }
    } else {
      showSnackbar("Incomplete OTP ❌", "warning");
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

          {!verified ? (
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
                Verify OTP
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
                Enter the 6-digit code sent to your email
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                  mt: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        width: "2.5rem",
                      },
                    }}
                  />
                ))}
              </Box>

              <AnimatedButton type="submit" sx={{ mt: 3, mb: 2 }}>
                Verify
              </AnimatedButton>

              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                Didn’t receive a code?{" "}
                <Button
                  variant="text"
                  size="small"
                  onClick={() =>
                    showSnackbar("Resend OTP not implemented yet", "info")
                  }
                >
                  Resend
                </Button>
              </Typography>
            </>
          ) : (
            <RedirectMessage
              message="Redirecting you to login..."
              success={true}
              delay={2000}
              to="/login"
            />
          )}
        </Paper>
      </SlidePage>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  );
}
