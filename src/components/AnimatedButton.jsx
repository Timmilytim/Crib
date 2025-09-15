// src/components/AnimatedButton.jsx
import { Button } from "@mui/material";
import { motion } from "framer-motion";

export default function AnimatedButton({ children, ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ width: "100%" }}
    >
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 2 }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
