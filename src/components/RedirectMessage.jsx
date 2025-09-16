import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function RedirectMessage({ 
  message = "Redirecting...", 
  success = true, 
  delay = 2000, 
  to = "/" , 
  state = {}
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to, { state });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, navigate, to, state]);

  return (
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
          color: success ? "success.main" : "error.main",
          mb: 2,
        }}
      >
        {success ? "✅ Success!" : "⚠️ Something went wrong"}
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        {message}
      </Typography>
    </motion.div>
  );
}
