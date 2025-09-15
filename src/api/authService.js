import api from "./axios";

// Login
export const login = (email, password) => {
  return api.post("/auth/login", {
    email_or_username: email,
    password,
  });
};

// Signup
export const signup = (data) => {
  return api.post("/auth/signup", data);
};

// Forgot Password
export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email });
};

// Verify OTP
export const verifyOtp = (email, otp) => {
  return api.post("/auth/verify-otp", { email, otp });
};

// Reset Password
export const resetPassword = (email, newPassword) => {
  return api.post("/auth/reset-password", { email, newPassword });
};
