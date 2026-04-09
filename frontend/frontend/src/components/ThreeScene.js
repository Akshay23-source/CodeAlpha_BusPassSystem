import { motion } from "framer-motion";

export default function ThreeScene() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10 }}
      style={styles.box}
    />
  );
}

const styles = {
  box: {
    width: 100,
    height: 100,
    background: "cyan",
    margin: "auto"
  }
};