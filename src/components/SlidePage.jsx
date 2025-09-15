import { motion } from "framer-motion";

export default function SlidePage({ children }) {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: "-100vw", opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
