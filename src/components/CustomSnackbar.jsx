import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function CustomSnackbar({ message, duration = 4000 }) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  useEffect(() => {
    if (message) {
      // Auto-detect severity based on keywords
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("success") || lowerMsg.includes("🎉")) {
        setSeverity("success");
      } else if (lowerMsg.includes("fail") || lowerMsg.includes("error") || lowerMsg.includes("❌")) {
        setSeverity("error");
      } else if (lowerMsg.includes("warning") || lowerMsg.includes("incomplete")) {
        setSeverity("warning");
      } else {
        setSeverity("info");
      }

      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
