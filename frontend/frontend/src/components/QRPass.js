import { motion } from "framer-motion";

export default function QRPass() {
  return (
    <motion.div
      initial={{ rotate: -10 }}
      animate={{ rotate: 0 }}
      style={styles.container}
    >
      <h2>🎫 Your QR Pass</h2>
      <img src="/qr.png" alt="QR" width={200} />
    </motion.div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: 40
  }
};